import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Proxy plugin to strip X-Frame-Options and Content-Security-Policy for unblocker iframes
function iframeProxyPlugin() {
  return {
    name: 'iframe-proxy-plugin',
    configureServer(server) {
      server.middlewares.use('/api/proxy', async (req, res) => {
        try {
          const urlObj = new URL(req.url, 'http://localhost:3000');
          const targetUrl = urlObj.searchParams.get('url');
          if (!targetUrl) {
            res.statusCode = 400;
            res.end('Missing target url query parameter');
            return;
          }

          let parsedTarget;
          try {
            parsedTarget = new URL(targetUrl);
          } catch {
            res.statusCode = 400;
            res.end('Invalid target URL');
            return;
          }

          const response = await fetch(parsedTarget.toString(), {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.9',
            },
          });

          res.statusCode = response.status;

          // Copy response headers except frame blocking ones
          response.headers.forEach((value, key) => {
            const lower = key.toLowerCase();
            if (
              lower === 'x-frame-options' ||
              lower === 'content-security-policy' ||
              lower === 'content-security-policy-report-only' ||
              lower === 'frame-options' ||
              lower === 'cross-origin-opener-policy' ||
              lower === 'cross-origin-embedder-policy' ||
              lower === 'strict-transport-security'
            ) {
              return;
            }
            if (lower === 'content-encoding') return;
            try {
              res.setHeader(key, value);
            } catch {}
          });

          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('text/html')) {
            let html = await response.text();
            let effectiveOrigin = parsedTarget.origin;
            try {
              if (response.url) {
                effectiveOrigin = new URL(response.url).origin;
              }
            } catch {}
            // Inject base tag so relative assets resolve properly
            const baseTag = `<base href="${effectiveOrigin}/" />`;
            if (html.includes('<head>')) {
              html = html.replace('<head>', `<head>${baseTag}`);
            } else {
              html = `${baseTag}${html}`;
            }
            res.end(html);
          } else {
            const buffer = await response.arrayBuffer();
            res.end(Buffer.from(buffer));
          }
        } catch (err) {
          res.statusCode = 500;
          res.end(`Proxy error: ${err.message}`);
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react({
        include: /\.(jsx|js|tsx|ts)$/,
      }),
      tailwindcss(),
      iframeProxyPlugin(),
    ],
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.js$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
