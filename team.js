const HERO = "Eskanoor";
const MAX = 6;
const slug = name => name.replace(/[().]/g, "").replaceAll(" ", "-");
const byName = Object.fromEntries(units.map(unit => [unit[0], unit]));
const bySlug = Object.fromEntries(units.map(unit => [slug(unit[0]).toLowerCase(), unit[0]]));
const pool = units.filter(([name]) => name !== HERO).sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]));
// Resolve links shared before the library consolidated evolution lines.
Object.assign(bySlug, {
 "einz": "Einz (Sorcerer King)",
 "goju-limitless": "Goju VS Sukuno",
 "lao": "Lao (Heart)",
 "puci-moon": "Puci (Made in Heaven)"
});
const has = (name, tag) => byName[name][5].includes(tag);

const FARM = ["Speedcart", "Loid"];
const NO_ATTACK = [...FARM, "AI (Idol)", "Mastermind"];
const dealsDamage = name => !NO_ATTACK.includes(name);
const BURN_PARTNERS = ["Flame (Burning Fist)", "Akuzo VS Renkuro"];
const CONTROL = {"Puci (Made in Heaven)": "สตันทุกครั้งที่โจมตี", "Beyond Heaven": "Time Stop สตัน และสโลว์", "Jootaru (The World)": "หยุดเวลา", "Jolin (Stone Fate)": "Bind และ Slow", "Ayzen (Perfect)": "สตันและ Slow"};
const presets = [
 ["★ ทีมไปได้ทุกที่", ["Goju VS Sukuno", "Beyond Heaven", "Flame (Burning Fist)", "Puci (Made in Heaven)", "AI (Idol)", "Speedcart"], "จัดจากยูนิต S Tier ที่แต่ละตัวมีหน้าที่ไม่ซ้ำกัน · Goju ทำดาเมจวงกว้างและตีตัวบินได้ · Beyond Heaven ทำ True Damage ทะลุโล่และค่าต้านทาน พร้อม Time Stop ทั่วแมพ · Flame วางได้ตั้งแต่ ¥500 ช่วยเปิดเกมและได้บัฟ Burn จากทั้ง Goju (Cursed) และ Eskanoor · Puci สตันทุกครั้งที่โจมตีและเด่นตอนตีบอส · AI บัฟดาเมจและ HP ทั่วแมพ และลดค่าอัปเกรด · Speedcart เป็นตัวฟาร์มที่ใช้ได้ทุกโหมด · เลี่ยง Sun God เพราะ Toon World จะล้างสตันของ Puci และ Beyond Heaven · ประเมินจากความสามารถของยูนิต ยังไม่ได้ลองเล่นจริงทุกด่าน"],
 ["★ ทุกที่ (ฟาร์ม 2)", ["Goju VS Sukuno", "Beyond Heaven", "Flame (Burning Fist)", "AI (Idol)", "Speedcart", "Loid"], "ทีมไปได้ทุกที่แบบเน้นเงิน สำหรับด่านยากหรือด่านยาวที่ต้องรีบอัปตัวแพงอย่าง Goju · แลก Puci เป็น Loid ทำให้มีตัวฟาร์ม 2 ตัว ใส่ Check ทั้งคู่แล้วเงินตั้งต้นรวมกัน · Loid ทำเงินรวมได้มากกว่า Speedcart แต่อัปแพงกว่า · เสียสตันของ Puci แต่ยังมี Time Stop ของ Beyond Heaven ช่วยคุมศัตรู · Flame ยังช่วยเปิดเกมและได้บัฟ Burn จาก Goju (Cursed) กับ Eskanoor ครบ · ด่านสั้นหรือด่านง่าย ใช้ทีมไปได้ทุกที่แบบปกติจะคุมศัตรูได้ดีกว่า"],
 ["Flame · เวฟ Burn", ["Flame (Burning Fist)", "Akuzo VS Renkuro", "Goju VS Sukuno", "Useless Goddess", "Puci (Made in Heaven)", "Speedcart"], "เปิดด้วย Flame ราคา 500 Yen แล้วค่อยลง Speedcart ตามจังหวะเวฟ · วาง Flame ในวง Cursed ของ Goju และให้วงของ Flame ถึง Eskanoor หรือ Akuzo ที่ดาเมจสูงที่สุด · Goddess บัฟการโจมตีเวท ส่วน Puci ช่วยยื้อศัตรูที่สตันได้ให้อยู่ในวง Burn"],
 ["ทีม Magic", ["Einz (Sorcerer King)", "Goju VS Sukuno", "Barusu (From Zero)", "Useless Goddess", "AI (Idol)", "Speedcart"], "ใช้กับด่านยาวที่มีเวลาสร้างทุนลง Einz · เลือก Blessed ให้ Goju ลงดีบัฟเป้าหมายที่ Einz โจมตี และวางแคร์รีเวทในวง Goddess"],
 ["Mely + Bun · รับสตัน", ["Mely (Assault)", "Bun (Immortal)", "Undead Knight (King)", "Mr. Champion", "Jolin (Stone Fate)", "Speedcart"], "ใช้กับด่านที่ศัตรูพยายามสตันเพื่อน · ให้ Mely และ Bun อยู่ในวงของกันและกัน เปิด Full Counter แล้วให้ Bun เก็บ takedown จนครบ 100 Greed · จัดวง Mr. Champion ให้ถึงตัวโจมตี Physical ส่วน Bind ของ Jolin ช่วยให้ Undead Knight ได้เป้าหมายที่ติดสถานะ"],
 ["ทีมคุมบอส", ["Beyond Heaven", "Puci (Made in Heaven)", "Kyruto (Dual Wielder)", "Akuzo VS Renkuro", "AI (Idol)", "Loid"], "เหมาะกับบอสที่รับสถานะควบคุม วาง Kyruto ล่วงหน้าเพื่อสะสม XP เมื่อจบเวฟ · เก็บช่วงเร่งโจมตีไว้ตอนบอสอยู่ในระยะ ให้ Akuzo ลงดีบัฟ Physical และสลับจังหวะหยุดเวลากับสตัน"],
 ["Mely · เวฟหนา", ["Mely (Assault)", "Jolin (Stone Fate)", "Zero (True Emperor)", "Mr. Champion", "Flame (Burning Fist)", "Speedcart"], "ใช้ Demon King’s Mandate เมื่อมีศัตรูทยอยตายในวงหนาแน่น · วางวง Gravity ทับทางที่ Jolin ผูกศัตรู ให้ Zero มอบ Knight แก่ Mely เพื่อเพิ่มดาเมจ · Flame ช่วยรับเวฟแรกระหว่างเก็บเงินลง Mely"],
 ["Falcon + Berserk · ด่านยาว", ["Falcon (Wings of Light)", "Berserk (BEAST OF RAGE)", "Undead Knight (King)", "Akuzo VS Renkuro", "Mr. Champion", "Speedcart"], "ใช้ Speedcart จ่ายค่าเปิดทีมก่อน แล้วเล่นร่างแสงเพื่อรายได้และบัฟระยะยาว · วาง Falcon กับ Berserk ให้ถึงกันทั้งสองวง เพื่อให้ Berserk ได้ส่วนลดอัปเกรดและระยะเพิ่ม · เก็บร่าง Wings of Light ไว้ตลอดแผนนี้"]

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

function renderPresetNote() {
 const match = presets.find(([, names]) => names.length === team.length && names.every(name => team.includes(name)));
 const note = document.querySelector("#preset-note");
 note.hidden = !match?.[2];
 const [intro, ...points] = match?.[2] ? match[2].split(" · ") : [];
 note.innerHTML = intro ? `<b>${match[0]}</b>${intro}<ul>${points.map(point => `<li>${point}</li>`).join("")}</ul>` : "";
 document.querySelectorAll("[data-preset]").forEach(button => button.setAttribute("aria-pressed", String(presets[button.dataset.preset] === match)));
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
 if (farms.length === 1 && farms[0] === "Speedcart") add("ok", "ตัวฟาร์ม 1 ช่อง", "Speedcart ช่องเดียววางได้หลายจุด วางถูกและอัปเต็มได้ไว ส่วนใหญ่จึงพอ แต่ได้เงินตั้งต้นจาก Check ชิ้นเดียว ถ้าด่านยากหรือต้องรีบอัปตัวแพง ลองเพิ่ม Loid");
 else if (farms.length === 1) add("ok", "ตัวฟาร์ม 1 ช่อง", "Loid ทำเงินรวมได้มาก แต่อัปแพงและขายไม่ได้ ถ้าเงินช่วงต้นตึง ลองเพิ่ม Speedcart ที่วางถูกกว่า");
 else if (farms.length) add("ok", `ตัวฟาร์ม ${farms.length} ตัว`, `${list(farms)} ใส่ Check ทุกตัว เงินตั้งต้นจากยูนิตฟาร์มรวมกันได้`);
 else if (inTeam("Falcon (Wings of Light)")) add("info","รายได้จาก Falcon","ร่าง Wings of Light สร้าง 5,000 Yen ต่อเวฟ ควรวางแผนเงินช่วงก่อนเข้าร่างแสงด้วย");
 else if (inTeam("AI (Idol)")) add("info", "ไม่มียูนิตฟาร์ม", "AI (Idol) ช่วยลดค่าอัปเกรด แต่ไม่ได้สร้างเงินเพิ่ม ถ้าด่านยาวลองใส่ Speedcart หรือ Loid");
 else add("warn", "ไม่มียูนิตฟาร์ม", "เงินจะมาจากการเคลียร์เวฟอย่างเดียว ลองใส่ Speedcart (วางถูก) หรือ Loid (เงินรวมมากกว่าแต่อัปเกรดแพง)");

 const attackers = team.filter(name => byName[name][1] === 1);
 if (!attackers.length) add("warn", "ไม่มีตัวโจมตีหลัก", "ทีมพึ่งดาเมจจาก Eskanoor ตัวเดียว ลองเพิ่มตัวโจมตีอย่างน้อย 1–2 ตัว");
 else if (attackers.length >= 5) add("info", `ตัวโจมตี ${attackers.length} ตัว`, "ดาเมจหนาแต่แทบไม่มีบัฟหรือเงิน ลองแลกตัวโจมตีหนึ่งตัวเป็นตัวฟาร์มหรือซัพพอร์ต");
 else add("ok", `ตัวโจมตี ${attackers.length} ตัว + Eskanoor`, list(attackers));

 if (inTeam("Mr. Champion")) {
  const allies = all.filter(name => name !== "Mr. Champion" && name !== "Zen (Unbound)" && dealsDamage(name) && has(name, "Physical"));
  if (allies.length) add("ok", "ออร่า Mr. Champion ได้ผล", `เพื่อนสาย Physical ${allies.length} ตัว: ${list(allies)} วางให้อยู่ในวงออร่า`);
  else add("warn", "ออร่า Mr. Champion ไม่มีคนรับ", "ออร่าเพิ่มดาเมจเฉพาะยูนิต Physical ในระยะ แต่ทีมนี้ไม่มี");
 }
 if (inTeam("Useless Goddess")) {
  const allies = all.filter(name => name !== "Useless Goddess" && dealsDamage(name) && has(name, "Magic"));
  if (allies.length) add("ok", "Divine Blessing ได้ผล", `เพื่อนสาย Magic ${allies.length} ตัว: ${list(allies)} วางให้อยู่ในวงบัฟ`);
  else add("warn", "Useless Goddess ไม่มีคนรับบัฟ", "บัฟเพิ่มดาเมจเฉพาะยูนิต Magic ในระยะ แต่ทีมนี้ไม่มี");
 }
 if (inTeam("Goju VS Sukuno")) {
  const burn = team.filter(name => BURN_PARTNERS.includes(name));
  const magic = team.filter(name => name !== "Goju VS Sukuno" && dealsDamage(name) && has(name, "Magic"));
  const path = burn.length ? `Cursed เพราะมีสาย Burn (${list(burn)}) และ Eskanoor` : magic.length ? `Blessed เพราะมีเพื่อนสาย Magic (${list(magic)})` : "Cursed เพื่อเสริม Burn ของ Eskanoor";
  add("info", "เลือกเส้นทาง Goju", `แนะนำ ${path} · Blessed ทำให้ศัตรูติดดีบัฟ Magic 30% ส่วน Cursed ให้เพื่อนในวงได้ดาเมจ Burn +100%`);
 }

 const burnPartners = team.filter(name => BURN_PARTNERS.includes(name));
 if (burnPartners.length) add("ok", "เข้าคู่กับ Rhitta ของ Eskanoor", `${list(burnPartners)} ติด Burn เหมือนกัน วางใกล้ Eskanoor เพื่อรับบัฟ DoT`);
 if (inTeam("Flame (Burning Fist)")) add("ok", "Flame ได้โบนัสจาก Blaze", "วางให้วง Flame ถึงยูนิต Blaze อื่นที่แรงที่สุด เช่น Eskanoor โบนัส 25% คิดจากยูนิตนั้นและแบ่งเท่ากันให้ Flame ทุกตัวที่คุณวาง ครั้งแรกที่ตีบอสแต่ละตัวจะย้าย Burn ได้สูงสุด 25 สแต็ก");
 if (inTeam("Akuzo VS Renkuro")) add("ok", "Akuzo ตีเป้าที่ติด Burn แรงขึ้น", "Disorder ทำดาเมจเพิ่มกับศัตรูที่กำลังติด Burn ซึ่ง Eskanoor ช่วยติดให้" + (inTeam("Flame (Burning Fist)") ? " ร่วมกับ Flame" : ""));

 if (inTeam("Mely (Assault)")) {
  add("info","เลือกโหมดของ Mely ตามศัตรู","Full Counter ใช้รับสตันที่ศัตรูพยายามใส่ยูนิตในวง Mely ส่วน Mandate นับศัตรูที่ตายในวง 150% ของ Range เปิดพร้อมกันไม่ได้ สลับโหมดมีคูลดาวน์ 5 วินาที");
  if (inTeam("Bun (Immortal)")) add("info","Full Counter + 100 Greed","ให้ทั้งคู่ยืนในวงของกันและกัน เมื่อ Bun มี 100 Greed และ Mely เปิด Full Counter ทั้งคู่จึงได้ดาเมจเพิ่ม 50% ให้ Bun เก็บ takedown และมีเป้าโจมตีต่อเนื่อง เพราะหยุดโจมตี 10 วินาทีจะเสีย Greed");
 }
 if (inTeam("Falcon (Wings of Light)") && inTeam("Berserk (BEAST OF RAGE)")) add("info","ให้วง Falcon และ Berserk ถึงกัน","Berserk ในวง Falcon ได้ส่วนลดอัปเกรด 20% ส่วน Falcon ร่างแสงในวง Berserk ให้ Berserk ได้ระยะเพิ่ม 25%");
 if (inTeam("Zen (Unbound)")) add("info","Zen รับบัฟเพื่อนไม่ได้","วางวงบัฟให้ตัวทำดาเมจอื่น และเลือกคู่ Last Wish ที่โจมตีโดนบ่อย");
 const control = team.filter(name => CONTROL[name]);
 if (inTeam("Sun God VS Dragon") && control.length) add("warn", "Toon World หักล้างการคุมฝูง", `ระหว่างเปิด Toon World ศัตรูจะหลุดและติดสถานะควบคุมไม่ได้ ซึ่งชนกับ ${control.map(name => `${name} (${CONTROL[name]})`).join(", ")} ปิด Toon World เมื่อต้องการให้ทีมคุมศัตรู`);

 if (inTeam("AI (Idol)")) add("ok", "บัฟทั่วแมพจาก AI", "เพื่อนที่รับบัฟได้จะได้ดาเมจและ HP +15% ทั่วแมพ และลดค่าอัปเกรดของทุกยูนิต");
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
 renderPresetNote();
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
