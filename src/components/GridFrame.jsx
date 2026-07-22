const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Fixed atmosphere: subtle film grain plus two large out-of-focus signals. */
export default function GridFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-multiply dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN, backgroundSize: '180px 180px' }}
      />
      <div className="absolute -right-[18rem] -top-[20rem] h-[42rem] w-[42rem] rounded-full bg-accent/[0.07] blur-3xl" />
      <div className="absolute -bottom-[24rem] -left-[16rem] h-[40rem] w-[40rem] rounded-full bg-signal/[0.05] blur-3xl" />
    </div>
  );
}
