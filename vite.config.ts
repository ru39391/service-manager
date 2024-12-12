import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/react')) {
            //console.log(id);
          }

          if (id.includes('node_modules')) {
            if (id.includes('/@mui/base/') && !id.includes('/@mui/lab/')) {
              return 'mui-base';
            }

            if (id.includes('/@mui/material/')) {
              return 'mui-main';
            }

            if (id.includes('/@mui/system/')) {
              return 'mui-system';
            }

            if (id.includes('/@mui/utils/')) {
              return 'mui-utils';
            }

            if (id.includes('/@mui/lab/')) {
              return 'mui-lab';
            }

            if (id.includes('/@mui/x-data-grid/')) {
              return 'mui-grid';
            }

            if (id.includes('/@mui/icons-material/')) {
              return 'mui-icons';
            }

            if (id.includes('/@mui/private-theming/')) {
              return 'mui-theming';
            }

            if (id.includes('/axios/')) {
              return 'axios';
            }

            if (id.includes('redux/')) {
              return 'redux';
            }

            if (id.includes('/@popperjs/')) {
              return 'popperjs';
            }

            if (id.includes('/@emotion/')) {
              return 'emotion';
            }

            if (id.includes('/@floating-ui/')) {
              return 'floating-ui';
            }

            if (id.includes('/react/')) {
              return 'react';
            }

            if (id.includes('/react-is/')) {
              return 'react-is';
            }

            if (id.includes('/react-dom/')) {
              return 'react-dom';
            }

            if (id.includes('/react-router')) {
              return 'react-router';
            }

            if (id.includes('/react-transition-group/')) {
              return 'react-transition-group';
            }

            return 'vendor';
          }
        }
      }
    },
  }
})
