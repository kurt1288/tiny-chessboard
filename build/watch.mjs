import esbuild from 'esbuild';

let ctx = await esbuild.context({
    format: "esm",
    entryPoints: ['src/main.ts'],
    outfile: 'dist/tiny-chessboard.js',
    bundle: true,
    sourcemap: true,
})

await ctx.watch();
console.log('watching...');