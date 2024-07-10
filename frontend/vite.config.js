import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from "vite-plugin-mkcert";
import macrosPlugin from "vite-plugin-babel-macros";
import dns from 'dns'

dns.setDefaultResultOrder("verbatim");
export default defineConfig({
    plugins: [react(), mkcert(), macrosPlugin()],
    server: {
        port: 3001,
        open: true // Automatically open the browser on server start
    },
    // build: {
    //     outDir: 'build', // Output directory for the production build
    // },

    build: {
        target: "es2020",
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "es2020",
        },
    },
    define: {
        'process.env': {}, // Shim for process.env
    },

});
