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

const tagIcons = new Set(["Blaze","Blossom","Buff","Dark","Farm","Magic","Physical","Tempest","Thunder","Tide","True","Light"]);
function renderUnitDetails(name) {
 const profile = unitProfiles[name];
 const tier = profile.tier ? `<p class="tier-source">Clowdy · Meta · ${profile.tier}<br><small>จากภาพ Tier List Wiki ที่คุณส่งมา</small></p>` : "";
 if (name !== "Goju VS Sukuno") {
  const format = value => value == null ? "—" : value.toLocaleString("th-TH");
  const stats = ["Damage","SPA (วินาที)","Range","ค่าวาง (Yen)","วางได้ (ตัว)"];
  const table = profile.upgrades?.length ? `<details><summary>ตารางอัปเกรด (${profile.upgrades.length} ขั้น)</summary><table><thead><tr><th>ขั้น</th><th>Damage</th><th>SPA</th><th>Range</th>${profile.gameWiki ? "<th>Yen</th><th>ปลดล็อก</th>" : ""}</tr></thead><tbody>${profile.upgrades.map(row => `<tr>${(profile.gameWiki ? [...row.slice(0,5), row[5] || ""] : row).map(v => `<td>${format(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></details>` : "";
  return `<details class="unit-details"><summary>สเตตัสและพาสซีฟของ ${name}</summary>${tier}<p><b>ค่าสเตตัสพื้นฐานตอนวาง</b> · ${[profile.rarity,profile.placement].filter(Boolean).join(" / ")}</p><dl class="base-stats">${stats.map((label,i)=>`<div><dt>${label}</dt><dd>${format(profile.stats[i])}</dd></div>`).join("")}</dl>${profile.stats.includes(null)?"<small>— รอภาพในเกม: Units Wiki → Units → ร่างนี้ → Normal · Base · Lv. 1 ให้เห็น Stats, Place และ Max placed</small>":""}${table}<h3>พาสซีฟและความสามารถ</h3><dl>${profile.abilities.map(([title,note])=>`<dt>${title}</dt><dd>${note}</dd>`).join("")}</dl>${profile.skills?.length ? `<p>ชื่อสกิลในฐานข้อมูล · ${profile.skills.join(" · ")}</p>` : ""}<small>แหล่งข้อมูล · ${profile.gameWiki ? "Units Wiki ในเกม (Normal · Base · Lv. 1) · " : ""}<a href="${profile.source}">ข้อมูลยูนิต</a>${profile.sim ? ` · <a href="${profile.sim}">สเตตัสและสกิลในตัวจำลอง</a>` : ""}${profile.guide ? ` · <a href="${profile.guide}">คู่มือสกิล</a>` : ""}</small></details>`;
 }
 return `<details class="unit-details"><summary>สเตตัสและพาสซีฟของ Goju VS Sukuno</summary>${tier}
 <p><b>Normal · Lv. 1 · ตอนวาง</b><br>Damage 3,500 · SPA 7 วินาที · Range 20<br>Ground · วางได้ 1 ตัว · ค่าวาง 3,000 Yen</p>
 <p><b>เลือกสายหลังวาง</b></p><dl>
 <dt>In Favour of the Cursed</dt><dd>ยูนิตในระยะทำดาเมจ Burn เพิ่ม 100% ผลนี้ซ้อนกันไม่ได้ เหมาะเมื่อวาง Flame หรือยูนิตเผาไหม้ในวงได้</dd>
 <dt>In Favour of the Blessed</dt><dd>การโจมตีทำให้ศัตรูติด Magic Debuff 30% นาน 15 วินาที จึงควรให้ตัวทำดาเมจเวทตีเป้าหมายที่ติดดีบัฟ</dd></dl>
 <p><b>กลไกการโจมตี</b></p><dl>
 <dt>Dimensional Slash</dt><dd>Sukuno ร่ายหนึ่งครั้งหลังโจมตี เมื่อครบ 3 ครั้ง ศัตรูทุกตัวในระยะติด Bleed 5 วินาที รวมดาเมจ 50% ของดาเมจยูนิตตลอดช่วงนั้น</dd>
 <dt>Infinite Pressure</dt><dd>ศัตรูในวงรับดาเมจ 2–10% ของดาเมจ Goju ต่อวินาที ยิ่งอยู่ใกล้ยิ่งแรง มีผลกับศัตรูบินด้วย หากศัตรูตายจากเอฟเฟกต์นี้ Goju ได้ดาเมจและระยะเพิ่มถาวรในแมตช์</dd></dl>
 <small>ตรวจจากภาพ Units Wiki ในเกมและ <a href="https://anime-crusaders-x.wiki/units/goju-vs-sukuno/">หน้าข้อมูล Goju VS Sukuno</a></small></details>`;
}

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
const library = document.documentElement.dataset.guide === "library";
const profile = document.querySelector("#profile");
const tierFilter = document.querySelector("#tier-filter");
tierFilter?.addEventListener("change", render);

function portraitFile(name) {
 return "assets/" + name.replace(/[().]/g,"").replaceAll(" ","-") + ".png";
}

function renderLibrary(matches) {
 return roles.slice(1).map((role, index) => {
  const group = matches.filter(unit => unit[1] === index + 1);
  if (!group.length) return "";
  const tiles = group.map(([name, , , , , tags]) => {
   const image = portraitFile(name);
   const form = name.match(/^(.*?) \((.+)\)$/);
   return `<button class="unit-tile" data-unit="${name}" aria-label="${name}" aria-haspopup="dialog">
    <span class="tile-art" style="--face:url('${image}')"><img src="${image}" alt=""></span>
    <span class="tile-copy"><strong>${form ? form[1] : name}</strong>${form ? `<span class="form-name">${form[2]}</span>` : ""}</span>
    <span class="tile-types">${tags.filter(tag=>tagIcons.has(tag)).map(tag=>`<img src="assets/types/${tag}.jpg" alt="${tag}" title="${tag}">`).join("")}</span>
   </button>`;
  }).join("");
  return `<div class="role-group role-${index+1}"><h2>${role} <small>${group.length}</small></h2><div class="tile-grid">${tiles}</div></div>`;
 }).join("");
}

if (library) {
 document.querySelector("#cards").addEventListener("click", event => {
  const tile = event.target.closest(".unit-tile");
  if (!tile) return;
  const [name,role,regular,ultimate,note,tags] = units.find(unit => unit[0] === tile.dataset.unit);
  document.querySelector("#profile-content").innerHTML = `<div class="unit"><img src="${portraitFile(name)}" alt=""><div><small>${roles[role]}</small><h2 id="profile-title">${name}</h2>${tags.map(renderTag).join(" ")}</div></div><div class="profile-body"><div class="gear-panel"><h3>Relics</h3>${renderSlot("RELIC",regular,stageCaptions[name])}${renderSlot("ULTIMATE",ultimate,stageCaptions[name])}<p>${note}</p></div><div class="trait-panel"><h3>Trait</h3>${renderTrait(name)}</div>${renderUnitDetails(name)}</div>`;
  const details = profile.querySelector(".unit-details");
  if (details) details.open = true;
  profile.showModal();
  profile.scrollTop = 0;
 });
 profile.addEventListener("click", event => {
  if (event.target !== profile) return;
  const box = profile.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) profile.close();
 });
}
function render(){
 nav.querySelectorAll("button").forEach((button,i)=>button.setAttribute("aria-pressed",String(i===active)));
 const matches=units.filter(([name,role,regular,ultimate,,tags])=>(!tierFilter?.value || unitProfiles[name].tier === tierFilter.value) && (!active || role===active) && (traitPage ? [name,traitGuide[name][0]] : [name,regular,ultimate,traitGuide[name][0],...tags]).join(" ").toLowerCase().includes(query.value.trim().toLowerCase()));
 document.querySelector("#count").textContent=matches.length ? matches.length+" ตัวละคร" : (traitPage ? "ไม่พบตัวละครหรือ Trait ที่ค้นหา" : "ไม่พบตัวละครหรือ Relic ที่ค้นหา");
 if (library) {
  document.querySelector("#cards").innerHTML = renderLibrary(matches);
  return;
 }
 document.querySelector("#cards").innerHTML=matches.map(([name,role,regular,ultimate,note,tags])=>{
 const file=name.replace(/[().]/g,"").replaceAll(" ","-");
 const body = traitPage ? renderTrait(name) : `${renderSlot("RELIC",regular,stageCaptions[name])}${renderSlot("ULTIMATE",ultimate,stageCaptions[name])}<p>${note}</p>`;
 return `<article><div class="unit"><img src="assets/${file}.png" alt="${name}"><div><small>${roles[role]}</small><div class="unit-title"><h2>${name}</h2>${tags.map(renderTag).join("")}</div></div></div><div class="body">${body}${renderUnitDetails(name)}</div></article>`;
 }).join("");
}
query.addEventListener("input",render);
render();

