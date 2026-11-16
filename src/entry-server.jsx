import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';
import { ROUTES, SITE_URL, rootFor } from './site';
import { headFor } from './seo';

export { ROUTES, SITE_URL, rootFor, headFor };

/**
 * Renders one route to an HTML string. The lazy sections suspend, so this
 * waits for the whole tree (onAllReady) instead of using renderToString,
 * which would emit their fallbacks.
 */
export function render(route) {
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _encoding, done) {
        html += chunk.toString();
        done();
      },
      final(done) {
        resolve(html);
        done();
      },
    });

    const stream = renderToPipeableStream(<App route={route} root={rootFor(route.path)} />, {
      onAllReady() {
        stream.pipe(sink);
      },
      onShellError: reject,
      onError: reject,
    });
  });
}
