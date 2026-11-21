const HERO = "Eskanoor";
const MAX = 6;
const slug = name => name.replace(/[().]/g, "").replaceAll(" ", "-");
const byName = Object.fromEntries(units.map(unit => [unit[0], unit]));
const bySlug = Object.fromEntries(units.map(unit => [slug(unit[0]).toLowerCase(), unit[0]]));
const pool = units.filter(([name]) => name !== HERO).sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]));
const has = (name, tag) => byName[name][5].includes(tag);

const FARM = ["Speedcart", "Loid"];
const NO_ATTACK = [...FARM, "AI (Idol)"];
const dealsDamage = name => !NO_ATTACK.includes(name);
const BURN_PARTNERS = ["Flame (Burning Fist)"];
const CONTROL = {"Puci (Made in Heaven)": "สตันทุกครั้งที่โจมตี", "Beyond Heaven": "Time Stop สตัน และสโลว์"};
const presets = [
 ["ทีม Burn", ["Flame (Burning Fist)", "Akuzo VS Renkuro", "Goju VS Sukuno", "Mr. Champion", "Speedcart", "Loid"]],
 ["ทีม Magic", ["Einz (Sorcerer King)", "Goju VS Sukuno", "Barusu (From Zero)", "Useless Goddess", "AI (Idol)", "Speedcart"]],
 ["ทีม Physical", ["Mely (Assault)", "Higuru (Judgement)", "Berserk (BEAST OF RAGE)", "Mr. Champion", "Mastermind", "Speedcart"]],
 ["ทีมคุมบอส", ["Beyond Heaven", "Puci (Made in Heaven)", "Mely (Assault)", "Akuzo VS Renkuro", "AI (Idol)", "Loid"]]
];

let team = [];
let active = 0;

function readHash() {
 const match = location.hash.match(/t=([^&]*)/);
 if (!match) return [];
 const names = decodeURIComponent(match[1]).split(",").map(part => bySlug[part.toLowerCase()]).filter(name => name && name !== HERO);
 return [...new Set(names)].slice(0, MAX);
}

function writeHash() {
 const hash = team.length ? "#t=" + team.map(slug).join(",") : "";
 try { history.replaceState(null, "", location.pathname + location.search + hash); } catch (error) {}
}

function shortPick(selection) {
 const first = [selection].flat()[0];
 return first === "เว้นช่องได้" ? "เว้นได้" : first;
}

function renderMember(name, hero = false) {
 const [, role, regular, ultimate, , tags] = byName[name];
 const [trait] = traitGuide[name];
 const remove = hero ? "" : `<button type="button" class="remove" data-remove="${name}" aria-label="เอา ${name} ออกจากทีม">×</button>`;
 return `<div class="member${hero ? " is-hero" : ""}"><img class="face" src="assets/${slug(name)}.png" alt=""><div class="member-info"><small>${hero ? '<span class="badge-hero">HERO</span> ช่องพิเศษ' : roles[role]}</small><strong>${name}</strong><span class="member-tags" lang="en">${tags.join(" · ")}</span><span class="rec">Relic ${shortPick(regular)} · Ult ${shortPick(ultimate)} · Trait ${trait}</span></div>${remove}</div>`;
}

function renderBoard() {
 const empties = Array.from({length: MAX - team.length}, (_, index) => `<div class="member empty">ช่องว่าง ${team.length + index + 1}</div>`).join("");
 document.querySelector("#board").innerHTML = renderMember(HERO, true) + team.map(name => renderMember(name)).join("") + empties;
 document.querySelector("#team-count").textContent = `${team.length}/${MAX}`;
 const counts = {};
 [HERO, ...team].forEach(name => byName[name][5].forEach(tag => counts[tag] = (counts[tag] || 0) + 1));
 document.querySelector("#mix").innerHTML = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([tag, count]) => `<span class="type-tag" lang="en">${tag} ×${count}</span>`).join("");
}

function list(names) {
 return names.join(", ");
}

function analyse() {
 const all = [HERO, ...team];
 const inTeam = name => team.includes(name);
 const checks = [];
 const add = (level, title, text) => checks.push({level, title, text});

 add("info", "Eskanoor อยู่ในทีมเสมอ", "ติด Burn เอง และเมื่ออัปเกรดถึง U5 สกิล Rhitta ให้เพื่อนสาย Burn ที่อยู่ใกล้ได้ดาเมจ DoT +50% และ Burn นานขึ้น 5 วินาที อัปเกรดด้วยการเก็บคิล จึงเด่นในด่านยาว");
 if (!team.length) {
  add("info", "เริ่มจัดทีม", "เลือกตัวละครจากรายการด้านล่าง หรือกดทีมตัวอย่างด้านบนแล้วปรับต่อ");
  return checks;
 }

 const farms = team.filter(name => FARM.includes(name));
 if (farms.length) add("ok", `ตัวฟาร์ม ${farms.length} ตัว`, `${list(farms)} ใส่ Check ทุกตัว เงินตั้งต้นจากยูนิตฟาร์มรวมกันได้`);
 else if (inTeam("AI (Idol)")) add("info", "ไม่มียูนิตฟาร์ม", "AI (Idol) ช่วยลดค่าอัปเกรด แต่ไม่ได้สร้างเงินเพิ่ม ถ้าด่านยาวลองใส่ Speedcart หรือ Loid");
 else add("warn", "ไม่มียูนิตฟาร์ม", "เงินจะมาจากการเคลียร์เวฟอย่างเดียว ลองใส่ Speedcart (วางถูก) หรือ Loid (เงินรวมมากกว่าแต่อัปเกรดแพง)");

 const attackers = team.filter(name => byName[name][1] === 1);
 if (!attackers.length) add("warn", "ไม่มีตัวโจมตีหลัก", "ทีมพึ่งดาเมจจาก Eskanoor ตัวเดียว ลองเพิ่มตัวโจมตีอย่างน้อย 1–2 ตัว");
 else if (attackers.length >= 5) add("info", `ตัวโจมตี ${attackers.length} ตัว`, "ดาเมจหนาแต่แทบไม่มีบัฟหรือเงิน ลองแลกตัวโจมตีหนึ่งตัวเป็นตัวฟาร์มหรือซัพพอร์ต");
 else add("ok", `ตัวโจมตี ${attackers.length} ตัว + Eskanoor`, list(attackers));

 if (inTeam("Mr. Champion")) {
  const allies = all.filter(name => name !== "Mr. Champion" && dealsDamage(name) && has(name, "Physical"));
  if (allies.length) add("ok", "ออร่า Mr. Champion ได้ผล", `เพื่อนสาย Physical ${allies.length} ตัว: ${list(allies)} วางให้อยู่ในวงออร่า`);
  else add("warn", "ออร่า Mr. Champion ไม่มีคนรับ", "ออร่าเพิ่มดาเมจเฉพาะยูนิต Physical ในระยะ แต่ทีมนี้ไม่มี");
 }
 if (inTeam("Useless Goddess")) {
  const allies = all.filter(name => name !== "Useless Goddess" && dealsDamage(name) && has(name, "Magic"));
  if (allies.length) add("ok", "Divine Blessing ได้ผล", `เพื่อนสาย Magic ${allies.length} ตัว: ${list(allies)} วางให้อยู่ในวงบัฟ`);
  else add("warn", "Useless Goddess ไม่มีคนรับบัฟ", "บัฟเพิ่มดาเมจเฉพาะยูนิต Magic ในระยะ แต่ทีมนี้ไม่มี");
 }
 if (inTeam("Goju VS Sukuno")) {
  const burn = team.filter(name => BURN_PARTNERS.includes(name) || name === "Akuzo VS Renkuro");
  const magic = team.filter(name => name !== "Goju VS Sukuno" && dealsDamage(name) && has(name, "Magic"));
  const path = burn.length ? `Cursed เพราะมีสาย Burn (${list(burn)}) และ Eskanoor` : magic.length ? `Blessed เพราะมีเพื่อนสาย Magic (${list(magic)})` : "Cursed เพื่อเสริม Burn ของ Eskanoor";
  add("info", "เลือกเส้นทาง Goju", `แนะนำ ${path} · Blessed ทำให้ศัตรูติดดีบัฟ Magic 30% ส่วน Cursed ให้เพื่อนในวงได้ดาเมจ Burn +100%`);
 }

 const burnPartners = team.filter(name => BURN_PARTNERS.includes(name));
 if (burnPartners.length) add("ok", "เข้าคู่กับ Rhitta ของ Eskanoor", `${list(burnPartners)} ติด Burn เหมือนกัน วางใกล้ Eskanoor เพื่อรับบัฟ DoT`);
 if (inTeam("Flame (Burning Fist)")) add("ok", "Flame ได้โบนัสจาก Blaze", "Flame ได้ดาเมจเพิ่ม 25% ของยูนิต Blaze ที่แรงที่สุดในระยะ Eskanoor เป็น Blaze อยู่แล้ว จึงควรวางใกล้กัน");
 if (inTeam("Akuzo VS Renkuro")) add("ok", "Akuzo ตีเป้าที่ติด Burn แรงขึ้น", "Disorder ทำดาเมจเพิ่มกับศัตรูที่กำลังติด Burn ซึ่ง Eskanoor ช่วยติดให้" + (burnPartners.length ? ` ร่วมกับ ${list(burnPartners)}` : ""));

 const control = team.filter(name => CONTROL[name]);
 if (inTeam("Sun God VS Dragon") && control.length) add("warn", "Toon World หักล้างการคุมฝูง", `ระหว่างเปิด Toon World ศัตรูจะหลุดและติดสถานะควบคุมไม่ได้ ซึ่งชนกับ ${control.map(name => `${name} (${CONTROL[name]})`).join(", ")} ปิด Toon World เมื่อต้องการให้ทีมคุมศัตรู`);

 if (inTeam("AI (Idol)")) add("ok", "บัฟทั่วแมพจาก AI", "เพื่อนทุกตัวได้ดาเมจและ HP +15% ไม่ว่าจะยืนตรงไหน และลดค่าอัปเกรดของทุกยูนิต");
 const range = team.filter(name => ["Mastermind", "Barusu (From Zero)"].includes(name));
 if (range.length) add("info", "ตัวเพิ่มระยะ", `${list(range)} เพิ่มระยะให้เพื่อนในวง วางตัวโจมตีที่ระยะสั้นไว้ใกล้ๆ`);

 const crusader = team.filter(name => traitGuide[name][0] === "Crusader");
 if (crusader.length) add("info", "Trait Crusader วางได้จุดเดียว", `${list(crusader)} ถ้าได้ Crusader จะวางยูนิตนั้นได้ 1 จุด แลกกับดาเมจ +300%`);

 return checks;
}

function renderChecks() {
 const order = {warn: 0, ok: 1, info: 2};
 const label = {warn: "ควรดู", ok: "ดี", info: "ข้อมูล"};
 document.querySelector("#checks").innerHTML = analyse().sort((a, b) => order[a.level] - order[b.level]).map(({level, title, text}) => `<div class="check ${level}"><span class="check-level">${label[level]}</span><b>${title}</b>${text}</div>`).join("");
}

const nav = document.querySelector("nav"), query = document.querySelector("#query");
roles.forEach((name, index) => {
 const button = document.createElement("button");
 button.type = "button";
 button.textContent = name;
 button.onclick = () => { active = index; renderRoster(); };
 nav.insertBefore(button, query);
});

function renderRoster() {
 nav.querySelectorAll("button").forEach((button, index) => button.setAttribute("aria-pressed", String(index === active)));
 const text = query.value.trim().toLowerCase();
 const full = team.length >= MAX;
 const shown = pool.filter(([name, role]) => (!active || role === active) && name.toLowerCase().includes(text));
 document.querySelector("#roster").innerHTML = shown.length ? shown.map(([name, role]) => {
  const picked = team.includes(name);
  return `<button type="button" class="tile" data-pick="${name}" aria-pressed="${picked}"${full && !picked ? ` disabled title="ทีมเต็ม ${MAX} ตัวแล้ว"` : ""}><img src="assets/${slug(name)}.png" alt=""><span>${name}</span><small>${picked ? "✓ อยู่ในทีม" : roles[role]}</small></button>`;
 }).join("") : `<p class="empty-note">ไม่พบตัวละครที่ค้นหา</p>`;
}

function render() {
 writeHash();
 renderBoard();
 renderChecks();
 renderRoster();
 document.querySelector("#share-url").hidden = true;
 document.querySelector("#share-status").textContent = "";
}

function toggle(name) {
 if (team.includes(name)) team = team.filter(member => member !== name);
 else if (team.length < MAX) team = [...team, name];
 render();
}

document.querySelector("#roster").addEventListener("click", event => {
 const tile = event.target.closest("[data-pick]");
 if (tile && !tile.disabled) toggle(tile.dataset.pick);
});
document.querySelector("#board").addEventListener("click", event => {
 const button = event.target.closest("[data-remove]");
 if (button) toggle(button.dataset.remove);
});
document.querySelector("#presets").innerHTML = '<span class="toolbar-label">ทีมตัวอย่าง:</span>' + presets.map(([label], index) => `<button type="button" data-preset="${index}">${label}</button>`).join("");
document.querySelector("#presets").addEventListener("click", event => {
 const button = event.target.closest("[data-preset]");
 if (button) { team = [...presets[button.dataset.preset][1]]; render(); }
});
document.querySelector("#clear").onclick = () => { team = []; render(); };
document.querySelector("#share").onclick = async () => {
 const status = document.querySelector("#share-status");
 const field = document.querySelector("#share-url");
 if (!team.length) { status.textContent = "เลือกตัวละครก่อนแชร์"; return; }
 try {
  await navigator.clipboard.writeText(location.href);
  status.textContent = "คัดลอกลิงก์แล้ว ส่งให้เพื่อนได้เลย";
 } catch (error) {
  field.value = location.href;
  field.hidden = false;
  field.select();
  status.textContent = "คัดลอกลิงก์จากช่องด้านล่างได้เลย";
 }
};
query.addEventListener("input", renderRoster);
window.addEventListener("hashchange", () => { team = readHash(); render(); });

team = readHash();
render();
