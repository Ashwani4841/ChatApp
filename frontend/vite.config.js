// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   proxy:{
//       '/api':{
        // target:'http://localhost:3002',// this is old virsion 
//         secure:false
//       }
//     }
// })

// this is new virsion 

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chatapp-r3il.onrender.com/', // your backend port
        changeOrigin: true,
      },
    },
  },
});

