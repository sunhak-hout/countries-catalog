if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const t=e=>s(e,o),l={module:{uri:o},exports:c,require:t};i[o]=Promise.all(n.map((e=>l[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-53b89754.js",revision:null},{url:"assets/index-cfb923cb.js",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"index.html",revision:"9a21aade76d9626c274d9c97b9cd5b05"},{url:"favicon.ico",revision:"3fdcc3558b14fd6d34d33bc4ba336fab"},{url:"apple-touch-icon.png",revision:"68ce6c57b8936f83a1aa988713708278"},{url:"pwa-192x192.png",revision:"88ded9bc6fbeb822b97832f801176130"},{url:"pwa-512x512.png",revision:"c6ac9d08d128b0a5ed685a949263de47"},{url:"manifest.webmanifest",revision:"9148ce661045b292b10320b31815a632"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
