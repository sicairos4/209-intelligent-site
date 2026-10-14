const THEME_KEY="209-theme", LENS_KEY="209-lens";
function setTheme(t){document.documentElement.dataset.theme=t;localStorage.setItem(THEME_KEY,t)}
setTheme(localStorage.getItem(THEME_KEY)||"civic-paper");
document.getElementById("themeToggle")?.addEventListener("click",()=>{
  const cur=document.documentElement.dataset.theme;
  setTheme(cur==="midnight-ledger"?"civic-paper":"midnight-ledger");
});
const lens=localStorage.getItem(LENS_KEY);
document.querySelectorAll(".lens").forEach(b=>{
  if(b.dataset.lens===lens)b.classList.add("active");
  b.addEventListener("click",()=>{
    document.querySelectorAll(".lens").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");localStorage.setItem(LENS_KEY,b.dataset.lens);
  });
});
async function loadJSON(path){try{const r=await fetch(path);return await r.json()}catch(e){return null}}
(async()=>{
  const data=await loadJSON("data/site.json");
  const status=document.getElementById("statusList");
  if(data?.platform_connections&&status){
    status.innerHTML=data.platform_connections.map(p=>{
      const cls=p.status==="connected"?"status-connected":p.status==="browser_fallback"?"status-browser":"status-off";
      return `<div class="status-row"><span>${p.platform}</span><span class="${cls}">${p.status.replace("_"," ")}</span></div>`;
    }).join("");
  }
  const signal=document.getElementById("latestSignal");
  if(data?.latest_signal&&signal){
    signal.innerHTML=`<p class="eyebrow">${data.latest_signal.date}</p><h3>${data.latest_signal.title}</h3><p>${data.latest_signal.summary}</p><a class="button ghost" href="${data.latest_signal.url}">Read the update</a>`;
  }
  const feed=document.getElementById("recordFeed");
  if(data?.records&&feed){
    feed.innerHTML=data.records.map(r=>`<article class="card"><p class="eyebrow">${r.date}</p><h3>${r.title}</h3><p>${r.summary}</p><a class="button ghost" href="${r.url}">Open</a></article>`).join("");
  }
})();