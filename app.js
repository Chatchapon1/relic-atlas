function renderSlot(label, selection, captions = {}) {
 const picks = [selection].flat();
 if (selection === "เว้นช่องได้") {
  return `<div class="slot"><div><small>${label}</small><strong>เว้นช่องได้</strong></div></div>`;
 }
 const items = picks.map((item, index) => {
  const image = item.toLowerCase().replaceAll(" ", "-");
  const advice = captions[item];
  const optional = advice?.optional === true;
  const primary = index === 0 && !optional;
  const status = optional ? "เว้นได้" : primary ? "แนะนำเป็นหลัก" : "เฉพาะบางด่าน";
  const caption = optional ? advice.caption : advice;
  return `<div class="pick"><span class="portrait"><img class="icon" src="assets/relics/${image}.png" alt="">${primary ? '<span class="star" aria-label="แนะนำก่อน">★</span>' : ""}</span><div><strong>${item}</strong><span class="pick-status ${optional ? "optional" : primary ? "primary" : "situational"}">${status}</span>${caption ? `<span class="pick-caption">${caption}</span>` : ""}</div></div>`;
 }).join("");
 return `<div class="slot"><small>${label}</small><div class="picks${picks.length > 1 ? " paired" : ""}">${items}</div></div>`;
}

const tagIcons = new Set(["Blaze","Blossom","Buff","Dark","Farm","Magic","Physical","Tempest","Thunder","Tide","True"]);
function renderTag(tag) {
 const icon = tagIcons.has(tag) ? `<img class="type-icon" src="assets/types/${tag}.jpg" width="20" height="20" alt="">` : "";
 return `<span class="type-tag" lang="en">${icon}${tag}</span>`;
}

units.sort((first, second) => first[1] - second[1]);

const traitPage = document.documentElement.dataset.guide === "traits";
let active = 0;
const nav=document.querySelector("nav"), query=document.querySelector("#query");
roles.forEach((name,index)=>{
 const button=document.createElement("button");
 button.textContent=name;
 button.onclick=()=>{active=index;render()};
 nav.insertBefore(button,query);
});
function render(){
 nav.querySelectorAll("button").forEach((button,i)=>button.setAttribute("aria-pressed",String(i===active)));
 const matches=units.filter(([name,role,regular,ultimate])=>(!active || role===active) && (traitPage ? [name,traitGuide[name][0]] : [name,regular,ultimate]).join(" ").toLowerCase().includes(query.value.trim().toLowerCase()));
 document.querySelector("#count").textContent=matches.length ? matches.length+" ตัวละคร" : (traitPage ? "ไม่พบตัวละครหรือ Trait ที่ค้นหา" : "ไม่พบตัวละครหรือ Relic ที่ค้นหา");
 document.querySelector("#cards").innerHTML=matches.map(([name,role,regular,ultimate,note,tags])=>{
 const file=name.replace(/[().]/g,"").replaceAll(" ","-");
 const body = traitPage ? renderTrait(name) : `${renderSlot("RELIC",regular,stageCaptions[name])}${renderSlot("ULTIMATE",ultimate,stageCaptions[name])}<p>${note}</p>`;
 return `<article><div class="unit"><img src="assets/${file}.png" alt="${name}"><div><small>${roles[role]}</small><div class="unit-title"><h2>${name}</h2>${tags.map(renderTag).join("")}</div></div></div><div class="body">${body}</div></article>`;
 }).join("");
}
query.addEventListener("input",render);
render();

