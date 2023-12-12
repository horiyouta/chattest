const ts = await Deno.readTextFile(`./netlify/edge-functions/server.ts`);
let html = await Deno.readTextFile(`./netlify/edge-functions/public/index.html`);

if (html.includes(`<link rel="stylesheet" href="./style.css">`)) html = html.replace(`<link rel="stylesheet" href="./style.css">`, `<style>${await Deno.readTextFile(`./netlify/edge-functions/public/style.css`)}</style>`);
if (html.includes(`<script src="./script.js"></script>`)) html = html.replace(`<script src="./script.js"></script>`, `<script>${await Deno.readTextFile(`./netlify/edge-functions/public/script.js`)}</script>`);
html = html.replaceAll(`$`, `\\$`);
html = html.replaceAll(`\``, `\\\``);

await Deno.writeTextFile(`./netlify/edge-functions/server.ts`, `${ts.split(`/** html */`)[0]}/** html */\`${html}\`, {headers: {\'Content-Type\': \`text/html\`}});}}`);