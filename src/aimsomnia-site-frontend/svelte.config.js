import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess({
    scss: {
      prependData: `@import '../index.scss';`
    }
  }),
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      fallback: 'index.html',
      precompress: false,
      strict: true,
    }),
    paths: {
      base: '',
      relative: false
    },
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore missing assets during build
        if (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.ico')) {
          console.warn(`Warning: Asset not found: ${path}`);
          return;
        }
        throw new Error(message);
      }
    }
  },
};

export default config;
