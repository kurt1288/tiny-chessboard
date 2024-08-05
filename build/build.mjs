import esbuild from 'esbuild';
import { minifyTemplates, writeFiles } from 'esbuild-minify-templates';

await esbuild.build({
    format: "esm",
    entryPoints: ['src/main.ts'],
    outfile: 'dist/tiny-chessboard.min.js',
    plugins: [ minifyTemplates(), writeFiles() ],
    bundle: true,
    minify: true,
    write: false, // <-- important!
});