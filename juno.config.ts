import {defineConfig} from '@junobuild/config';

export default defineConfig({
  satellite: {
    id: 'njql7-pqaaa-aaaal-asagq-cai',
    source: 'src/aimsomnia-site-frontend/dist',
    predeploy: ['npm run build']
  }
});
