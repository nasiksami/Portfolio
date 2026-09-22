#!/usr/bin/env python3
"""Generate the Horizon token block in src/index.css from the knot table below.

The sky moves through eight palette knots as the visitor scrolls. This script
is the single source of truth for those colours: it checks every knot for
WCAG AA, finds the two arc positions where the ink family must flip, sweeps
the writer's 0.0005 grid to confirm no position falls below 4.5:1, and emits
the CSS that index.css carries between its "GENERATED" markers, plus the
matching constants for src/sky.js.

    python3 scripts/sky-tokens.py          # report + print CSS block
    python3 scripts/sky-tokens.py --write  # also splice into src/index.css and src/sky.js

No dependencies beyond the standard library.
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent

# name, arc position, sky, ground, overlay, edge, ink, ink2, ink3, accent, on-accent, signal, on-signal
KNOTS = [
    ('pre-dawn',  0.00, '#0e1226', '#171b33', '#232848', '#3a3f5e', '#f3efe6', '#cbc8c0', '#a6a5b8', '#f0a868', '#0e1226', '#e8d27a', '#0e1226'),
    ('dawn',      0.11, '#3b2444', '#2a1c33', '#3a2846', '#6a4a72', '#fbf3ea', '#e6d6cf', '#d1bdb8', '#ffb37a', '#2b1420', '#ffd479', '#2b1420'),
    ('morning',   0.14, '#f4e7d4', '#f7f0e2', '#eadfca', '#c9b89e', '#1c2430', '#454d58', '#5b6570', '#9a4512', '#ffffff', '#6b5300', '#ffffff'),
    ('noon',      0.30, '#e6eff6', '#f4efe1', '#e3dcc7', '#b9c6cf', '#14202c', '#3d4a57', '#556370', '#1a5e8c', '#ffffff', '#7d5400', '#ffffff'),
    ('afternoon', 0.46, '#efe6d6', '#efe3c9', '#e5d6b5', '#c6b391', '#241f1a', '#4a443c', '#5f584f', '#8a3f1e', '#ffffff', '#6b5200', '#ffffff'),
    ('dusk',      0.49, '#7e3a37', '#4d2730', '#5e3140', '#a2645f', '#fff3ea', '#f8dfd3', '#f1cfc2', '#ffd08f', '#3a1a17', '#ffe6a3', '#3a1a17'),
    ('night',     0.78, '#0a1420', '#111c29', '#182636', '#2b3d50', '#eef2f4', '#bfcad3', '#94a3b0', '#9fd3ff', '#0a1420', '#ffdc8a', '#0a1420'),
    ('aurora',    1.00, '#06110f', '#0c1a17', '#132924', '#23403a', '#eef4ee', '#bccbc1', '#93a89a', '#7ef0c2', '#06110f', '#c9a6ff', '#06110f'),
]
TOK = ['sky', 'ground', 'overlay', 'edge', 'fg', 'fg2', 'fg3', 'accent', 'onaccent', 'signal', 'onsignal']
# The four knots on either side of a brightness crossing: their ground must
# match their sky's luminance, or there is no instant where both pure inks pass.
CROSSING_KNOTS = ('dawn', 'morning', 'afternoon', 'dusk')
R = 0.03          # collapse radius around a flip
GRID = 0.0005     # the writer's quantisation step
FOLD_GAIN = 1.6   # primary reaches pure ink well inside the radius


def rgb(h):
    return [int(h[i:i + 2], 16) for i in (1, 3, 5)]


def lum(c):
    def f(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = c
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def cr(a, b):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def match_lum(ground_hex, sky_hex):
    g = rgb(ground_hex)
    target = lum(rgb(sky_hex))
    lo, hi = 0.0, 4.0
    for _ in range(60):
        m = (lo + hi) / 2
        if lum([min(255, v * m) for v in g]) < target:
            lo = m
        else:
            hi = m
    return '#' + ''.join(f"{round(min(255, v * hi)):02x}" for v in g)


KN = [list(k) for k in KNOTS]
for k in KN:
    if k[0] in CROSSING_KNOTS:
        k[3] = match_lum(k[3], k[2])
T = [k[1] for k in KN]
N = len(KN)


def col(k, tok):
    return rgb(k[2 + TOK.index(tok)])


def weights(t):
    w = [0.0] * N
    for i in range(N):
        lo = T[i - 1] if i > 0 else None
        hi = T[i + 1] if i < N - 1 else None
        a = (t - lo) / (T[i] - lo) if lo is not None else 1
        b = (hi - t) / (hi - T[i]) if hi is not None else 1
        w[i] = min(max(min(a, b), 0), 1)
    return w


def cont(tok, t):
    w = weights(t)
    return [sum(w[i] * col(KN[i], tok)[c] for i in range(N)) for c in range(3)]


def frange(a, b, step):
    n = int(round((b - a) / step))
    return [a + i * step for i in range(n + 1)]


def flip(i):
    """Centre of the window where pure white and pure black both clear AA on both surfaces."""
    ok = [t for t in frange(T[i], T[i + 1], 0.00001)
          if min(cr([255] * 3, cont('sky', t)), cr([255] * 3, cont('ground', t))) >= 4.5
          and min(cr([0] * 3, cont('sky', t)), cr([0] * 3, cont('ground', t))) >= 4.5]
    assert ok, f"no AA window between {KN[i][0]} and {KN[i + 1][0]}"
    # Five decimals, kept off every multiple of the sweep grid (and so of the
    # coarser writer grid) so no sampled position ever sits exactly on the step.
    centre = round((ok[0] + ok[-1]) / 2, 5)
    while abs(round(centre / GRID) * GRID - centre) < 1e-9:
        centre = round(centre + 0.00005, 5)
    assert ok[0] <= centre <= ok[-1], 'nudged flip left its AA window'
    return centre


FA, FB = flip(1), flip(4)


def step(t, a):
    return min(max((t - a) * 1e6, 0), 1)


def inkw(t):
    w = weights(t)
    sa, sb = step(t, FA), step(t, FB)
    p = w[1] + w[2]
    w[1], w[2] = p * (1 - sa), p * sa
    q = w[4] + w[5]
    w[4], w[5] = q * (1 - sb), q * sb
    return w


def ink(tok, t):
    w = inkw(t)
    return [sum(w[i] * col(KN[i], tok)[c] for i in range(N)) for c in range(3)]


def danger(t):
    return max(0, 1 - abs(t - FA) / R, 1 - abs(t - FB) / R)


def fam(t):
    return 1 - step(t, FA) + step(t, FB)


def final(tok, t):
    d = danger(t)
    fold = min(1, d * FOLD_GAIN)
    pure = 255 * fam(t)
    prim = [ink('fg', t)[c] * (1 - fold) + pure * fold for c in range(3)]
    if tok == 'fg':
        return prim
    if tok in ('fg2', 'fg3', 'accent', 'signal'):
        b = ink(tok, t)
        return [b[c] * (1 - d) + prim[c] * d for c in range(3)]
    return ink(tok, t)


def report():
    print("Knots (min text contrast on sky & ground / on-accent & on-signal):")
    for k in KN:
        m = min(min(cr(col(k, x), col(k, 'sky')), cr(col(k, x), col(k, 'ground'))) for x in ('fg', 'fg2', 'fg3', 'accent', 'signal'))
        m2 = min(cr(col(k, 'onaccent'), col(k, 'accent')), cr(col(k, 'onsignal'), col(k, 'signal')))
        print(f"  {k[0]:9s} t={k[1]:.2f} ground={k[3]} text {m:.2f} on-* {m2:.2f} {'ok' if min(m, m2) >= 4.5 else 'FAIL'}")
    print(f"Flips: sunrise={FA:.5f} sunset={FB:.5f}")
    worst, bad = 9, []
    for t in frange(0, 1, GRID):
        t = round(t, 4)
        s, g = cont('sky', t), cont('ground', t)
        for tok in ('fg', 'fg2', 'fg3', 'accent', 'signal'):
            m = min(cr(final(tok, t), s), cr(final(tok, t), g))
            worst = min(worst, m)
            if m < 4.5:
                bad.append((t, tok, round(m, 2)))
        m = min(cr(final('onaccent', t), final('accent', t)), cr(final('onsignal', t), final('signal', t)))
        worst = min(worst, m)
        if m < 4.5:
            bad.append((t, 'on-*', round(m, 2)))
    print(f"Grid sweep ({GRID} step): worst {worst:.2f}:1, below AA: {bad if bad else 'none'}")


def css():
    L = ["    /* Tent weights: each knot's influence peaks at its own arc position. */"]
    for i in range(N):
        lo = T[i - 1] if i > 0 else None
        hi = T[i + 1] if i < N - 1 else None
        if lo is None:
            e = f"clamp(0, ({T[1]} - var(--sky)) / {T[1]:.2f}, 1)"
        elif hi is None:
            e = f"clamp(0, (var(--sky) - {lo}) / {T[i] - lo:.2f}, 1)"
        else:
            e = f"clamp(0, min((var(--sky) - {lo}) / {T[i] - lo:.2f}, ({hi} - var(--sky)) / {hi - T[i]:.2f}), 1)"
        L.append(f"    --w{i}: {e};")
    L += ["", "    /* Ink flips: hard steps at the arc positions where both pure inks clear AA. */",
          f"    --flip-a: clamp(0, (var(--sky) - {FA:.5f}) * 1000000, 1);",
          f"    --flip-b: clamp(0, (var(--sky) - {FB:.5f}) * 1000000, 1);",
          "    --v0: var(--w0);",
          "    --v1: calc((var(--w1) + var(--w2)) * (1 - var(--flip-a)));",
          "    --v2: calc((var(--w1) + var(--w2)) * var(--flip-a));",
          "    --v3: var(--w3);",
          "    --v4: calc((var(--w4) + var(--w5)) * (1 - var(--flip-b)));",
          "    --v5: calc((var(--w4) + var(--w5)) * var(--flip-b));",
          "    --v6: var(--w6);",
          "    --v7: var(--w7);",
          "    --ink-family: calc(1 - var(--flip-a) + var(--flip-b)); /* 1 light ink, 0 dark ink */",
          "", "    /* Near a flip, lower-contrast inks fold into primary and primary folds to pure. */",
          f"    --danger: max(0, 1 - max(var(--sky) - {FA:.5f}, {FA:.5f} - var(--sky)) / {R}, 1 - max(var(--sky) - {FB:.5f}, {FB:.5f} - var(--sky)) / {R});",
          f"    --fold: clamp(0, var(--danger) * {FOLD_GAIN}, 1);",
          "    --pure: calc(255 * var(--ink-family));", ""]

    def S(tok, c, wv):
        return " + ".join(f"var(--{wv}{i})*{col(KN[i], tok)[c]}" for i in range(N))

    L.append("    /* Surfaces interpolate continuously. */")
    for tok, name in (('sky', 'sky'), ('ground', 'ground'), ('overlay', 'overlay'), ('edge', 'edge')):
        for c, ch in enumerate('rgb'):
            L.append(f"    --{name}-{ch}: calc({S(tok, c, 'w')});")
    L.append("    /* Primary ink. */")
    for c, ch in enumerate('rgb'):
        L.append(f"    --ink-{ch}: calc(({S('fg', c, 'v')}) * (1 - var(--fold)) + var(--pure) * var(--fold));")
    L.append("    /* Inks that fold toward primary near a flip. */")
    for tok, name in (('fg2', 'ink2'), ('fg3', 'ink3'), ('accent', 'accent'), ('signal', 'signal')):
        for c, ch in enumerate('rgb'):
            L.append(f"    --{name}-{ch}: calc(({S(tok, c, 'v')}) * (1 - var(--danger)) + var(--ink-{ch}) * var(--danger));")
    L.append("    /* Text on accent and signal fills. */")
    for tok, name in (('onaccent', 'on-accent'), ('onsignal', 'on-signal')):
        for c, ch in enumerate('rgb'):
            L.append(f"    --{name}-{ch}: calc({S(tok, c, 'v')});")
    L.append("    /* Triples for Tailwind's rgb(var(--x) / <alpha-value>). */")
    for name in TOKEN_NAMES:
        L.append(f"    --{name}-rgb: var(--{name}-r) var(--{name}-g) var(--{name}-b);")
    return "\n".join(L) + "\n"


TOKEN_NAMES = ('sky', 'ground', 'overlay', 'edge', 'ink', 'ink2', 'ink3', 'accent', 'signal', 'on-accent', 'on-signal')


def properties():
    """@property registrations: each number resolves once at the root."""
    names = ['sky'] + [f'w{i}' for i in range(N)] + ['flip-a', 'flip-b'] + [f'v{i}' for i in range(N)] + \
            ['ink-family', 'danger', 'fold', 'pure'] + [f'{n}-{ch}' for n in TOKEN_NAMES for ch in 'rgb']
    return "".join(f"@property --{n} {{\n  syntax: '<number>';\n  inherits: true;\n  initial-value: 0;\n}}\n\n" for n in names)


def write():
    css_path = ROOT / 'src' / 'index.css'
    s = css_path.read_text()
    start, end = '    /* GENERATED: sky tokens — start */\n', '    /* GENERATED: sky tokens — end */\n'
    assert start in s and end in s, 'markers missing in src/index.css'
    s = s[:s.index(start) + len(start)] + css() + s[s.index(end):]
    pstart, pend = '/* GENERATED: sky properties — start */\n', '/* GENERATED: sky properties — end */\n'
    assert pstart in s and pend in s, 'property markers missing in src/index.css'
    s = s[:s.index(pstart) + len(pstart)] + properties() + s[s.index(pend):]
    css_path.write_text(s)
    js_path = ROOT / 'src' / 'sky.js'
    j = js_path.read_text()
    j = re.sub(r'export const KNOTS = \[.*?\];', f'export const KNOTS = {json.dumps(T)};', j)
    j = re.sub(r'export const FLIPS = \{.*?\};', f'export const FLIPS = {{ sunrise: {FA:.5f}, sunset: {FB:.5f} }};', j)
    js_path.write_text(j)
    print(f"wrote {css_path.relative_to(ROOT)} and {js_path.relative_to(ROOT)}")


if __name__ == '__main__':
    report()
    if '--write' in sys.argv:
        write()
    else:
        print("\n" + properties() + css())
