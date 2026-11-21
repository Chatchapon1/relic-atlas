const roles = ["ทั้งหมด","โจมตี","สนับสนุน","ฟาร์ม"];
const units = [
 ["Mastermind",2,"Slingshot","เว้นช่องได้","The Puppeteer เพิ่มระยะให้ตัวเองและเพื่อนในวง 25% เลือก Slingshot เมื่อต้องการให้วงบัฟถึงเพื่อนที่ยืนไกล ช่อง Ultimate เว้นได้สำหรับบทบาทนี้",["Physical","Tempest","Buff"]],
 ["Music (Artist)",2,"Slingshot","เว้นช่องได้","เลือกเพลงเพิ่มระยะ เพิ่มคริติคอล หรือลดคูลดาวน์ให้เพื่อนในวง Slingshot มีประโยชน์เมื่อช่วยให้เพื่อนอีกตัวได้รับเพลง ส่วนช่อง Ultimate เว้นได้เมื่อใช้ Music บัฟทีม",["Magic","Buff"]],
 ["Goju VS Sukuno",1,["Staff","Slingshot"],"Arcane Staff","มีประเภท Magic จึงใช้คู่นี้ได้ Staff เพิ่มดาเมจเวทต่อครั้ง ส่วน Arcane Staff มีโอกาสใช้ท่าโจมตีซ้ำ เส้นทางพาสซีฟที่เลือกช่วยเพิ่มดาเมจ Magic หรือ Burn ให้เพื่อนในระยะ ถ้าวางเพื่อนให้เข้าออร่าได้ไม่ครบ ให้เพิ่มระยะด้วย Slingshot",["Physical", "Magic", "Buff"]],
 ["Einz (Sorcerer King)",1,"Staff","Arcane Staff","ร่าง Sorcerer King เป็น Magic / Dark เลือก Staff เพิ่มดาเมจเวท และ Arcane Staff สำหรับท่าโจมตีซ้ำ",["Magic", "Dark"]],
 ["Eskanoor",1,"Greatsword",["Great Axe Rhitta","Inverted Spear"],"สำหรับร่าง The One ที่มี Physical และ Blaze ใช้ Greatsword เพิ่มดาเมจต่อครั้ง ส่วนการโจมตี Blaze และ Burn ช่วยสะสมคลื่นไฟของขวาน หอกเหมาะเมื่อเน้นคริติคอลและตีบอสตัวเดิมได้นานพอให้พาสซีฟทำงานหลายรอบ สกิล Rhitta ของ The One ช่วยเพิ่มดาเมจและระยะเวลาของ Burn ให้ทีม",["Physical", "Blaze", "Buff"]],
 ["Flame (Burning Fist)",1,"Staff",["Great Axe Rhitta","Arcane Staff"],"Staff เพิ่มดาเมจเวท แนะนำ Great Axe Rhitta สำหรับเคลียร์เวฟ เพราะการทำดาเมจ Blaze หรือการติด Burn สะสม 30 ครั้งจะปล่อยคลื่นไฟรอบตัว ส่วน Arcane Staff เด่นตอนตีบอสจาก Double Cast หลังโจมตีบอสครั้งที่ 2",["Magic", "Blaze"]],
 ["Mely (Assault)",1,"Pistol","Inverted Spear","ร่าง Assault เป็น Physical / Dark จึงใส่ Inverted Spear ได้ เลือก Pistol เพื่อลดช่วงเวลาระหว่างการโจมตีและสะสมจำนวนครั้งให้พาสซีฟหอก",["Physical", "Dark"]],
 ["Higuru (Judgement)",1,["Sword","Pistol"],"Inverted Spear","ร่าง Judgement มีประเภท Physical จึงใส่ Inverted Spear ได้ เลือก Sword เพิ่มดาเมจต่อครั้ง ส่วน Pistol ลดช่วงห่างการโจมตี ทำให้มีโอกาสติดคริติคอลเพื่อรีเฟรชดีบัฟ Light บนบอสบ่อยขึ้น",["Physical"]],
 ["Barusu (From Zero)",1,["Staff","Slingshot"],"Arcane Staff","Staff เพิ่มดาเมจเวทต่อครั้ง ส่วน Arcane Staff ช่วยใช้ท่าโจมตีซ้ำ ในด่านยาว Return by Death เพิ่มระยะให้เพื่อนในวงของ Barusu ได้ จึงสลับ Slingshot เมื่อจำเป็นต้องให้บัฟถึงเพื่อนที่อยู่ไกล",["Magic","Dark","Buff"]],
 ["Berserk (BEAST OF RAGE)",1,"Greatsword","Inverted Spear","Greatsword เสริมดาเมจ Physical ต่อครั้ง ส่วน Inverted Spear เพิ่มความแรงคริติคอลให้การโจมตีที่ติดคริอยู่แล้ว เหมาะกับบทบาทตัวทำดาเมจสาย Bleed",["Physical","Blaze"]],
 ["Hero (National Symbol)",1,"Staff","Arcane Staff","ใช้ Staff เสริมการโจมตีเวทช่วงเปิดเวฟที่ Hero ได้บัฟดาเมจตัวเอง ส่วน Arcane Staff ช่วยโจมตีซ้ำ โดยเฉพาะเมื่อตีบอส",["Magic","Blaze"]],
 ["Beyond Heaven",1,"Sword","Sacred Chalice of Fate","Sword เพิ่มดาเมจพื้นฐาน ส่วนถ้วยตรงกับประเภท True ของร่างนี้ เมื่ออัปเกรดเต็ม การโจมตีครบหกครั้งจะเพิ่มดาเมจให้สองครั้งถัดไป",["True","Thunder"]],
 ["Akuzo VS Renkuro",1,"Greatsword",["Inverted Spear","Great Axe Rhitta"],"Greatsword เสริมดาเมจกายภาพ หอกช่วยทำคริติคอลเมื่อตีเป้าหมายเลือดสูงต่อเนื่อง ส่วนขวานสะสมคลื่นไฟจากดาเมจ Blaze และการติด Burn จึงใช้เคลียร์ศัตรูที่เข้ามาพร้อมกันได้",["Physical","Tide","Blaze"]],
 ["Puci (Made in Heaven)",2,"Pistol","Arcane Staff","Pistol ลดช่วงห่างการโจมตี ช่วยให้ Puci ใช้การโจมตีที่ทำให้ศัตรูติดสตันได้บ่อยขึ้น ส่วน Arcane Staff ใช้กับประเภท Magic และช่วยเสริมดาเมจเมื่อตีบอส",["Magic","Tempest","Buff"]],
 ["Mr. Champion",2,"Slingshot","Great Axe Rhitta","Slingshot เหมาะเมื่อเพื่อนสาย Physical อยู่ชิดขอบออร่า ถ้าอยู่ในระยะครบแล้ว เว้นช่องปกติได้ และใช้ช่อง Ultimate เสริมดาเมจจากแท็ก Blaze ของตัวเอง ออร่าเพิ่มดาเมจให้เพื่อนประเภท Physical ในระยะ",["Physical", "Blaze", "Buff"]],
 ["Useless Goddess",2,"Slingshot","Arcane Staff","เป็นซัพพอร์ต Magic ที่มีท่าโจมตี เลือก Slingshot เมื่อจำเป็นต้องขยายออร่าให้ถึงเพื่อน ถ้าครอบคลุมครบแล้วเว้นช่องปกติได้ ส่วน Arcane Staff เสริมการโจมตีของตัวเอง Divine Blessing เพิ่มดาเมจให้เพื่อนประเภท Magic ในระยะ",["Magic", "Tide", "Buff"]],
 ["Sun God VS Dragon",2,"Sword","Inverted Spear","ประเภทพื้นฐานเป็น Physical / Blossom จึงใส่ Inverted Spear ได้ ส่วน True Damage เกิดระหว่าง Toon World เลือก Sword เพิ่มพลังโจมตีส่วนตัว เมื่อเปิด Toon World ทีมได้ดาเมจเพิ่ม 50% ทั่วแมพ ถ้าใช้เพื่อบัฟอย่างเดียว เว้นทั้งสองช่องได้",["Physical", "Blossom", "Buff"]],
 ["Speedcart",3,"Check","เว้นช่องได้","แท็ก Farm ใส่ Check เพื่อเพิ่มเงินเยนตั้งต้นได้ เว้น Ultimate ได้เพราะไม่มีชิ้นที่เพิ่มเงินฟาร์มโดยตรง เลือกชิ้นที่มีค่า Starting Yen สูงสุดเพื่อวางตัวทำดาเมจได้เร็วขึ้น",["Physical","Farm"]],
 ["Loid",3,"Check","เว้นช่องได้","Loid เป็น Farm จึงใส่ Check เพิ่มเงินเยนตั้งต้นได้ และเว้น Ultimate ได้สำหรับบทบาทนี้ เมื่อใช้คู่กับ Speedcart ให้ใส่ Check คนละชิ้น โบนัสเงินตั้งต้นจากยูนิตฟาร์มทั้งสองรวมกันได้",["Physical","Farm"]],
 ["AI (Idol)",2,"เว้นช่องได้","เว้นช่องได้","ใช้ AI เพื่อบัฟทีมได้โดยเว้นทั้งสองช่อง ตัวละครไม่มีดาเมจโจมตีพื้นฐาน และยังไม่มีข้อมูลยืนยันว่าเพิ่ม Range แล้วบัฟครอบคลุมเพื่อนมากขึ้น",["Magic", "Buff"]]
];
const stageCaptions = {
 "Mastermind": {"Slingshot":{optional:true, caption:"ถ้าบัฟระยะถึงตัวโจมตีครบแล้ว"}},
 "Music (Artist)": {"Slingshot":{optional:true, caption:"ถ้าเพื่อนที่ต้องการบัฟเพลงอยู่ในวงครบแล้ว"}},
 "Barusu (From Zero)": {"Staff":"ใช้เป็นตัวทำดาเมจ", "Slingshot":"ด่านยาวที่ต้องขยายวงบัฟให้ถึงเพื่อน"},
 "Akuzo VS Renkuro": {"Inverted Spear":"บอสเดี่ยวที่โจมตีได้ต่อเนื่อง", "Great Axe Rhitta":"เวฟที่ศัตรูรวมกลุ่มในระยะขวาน"},
 "Mr. Champion": {"Slingshot":{optional:true, caption:"ถ้าบัฟถึงเพื่อนสาย Physical ครบแล้ว"}, "Great Axe Rhitta":{optional:true, caption:"ถ้าใช้บัฟทีมอย่างเดียว"}},
 "Useless Goddess": {"Slingshot":{optional:true, caption:"ถ้าบัฟถึงเพื่อนสาย Magic ครบแล้ว"}, "Arcane Staff":{optional:true, caption:"ถ้าใช้บัฟทีมอย่างเดียว"}},
 "Sun God VS Dragon": {"Sword":{optional:true, caption:"ถ้าใช้บัฟ Toon World อย่างเดียว"}, "Inverted Spear":{optional:true, caption:"ถ้าใช้บัฟ Toon World อย่างเดียว"}},
 "Goju VS Sukuno": {"Staff":"ด่านที่วางทีมในออร่าได้ครบ", "Slingshot":"แผนที่หลายเลนที่ต้องขยายออร่า"},
 "Eskanoor": {"Great Axe Rhitta":"เวฟศัตรูหนาแน่น", "Inverted Spear":"บอสเดี่ยวที่ยืนตีได้นาน"},
 "Higuru (Judgement)": {"Sword":"เวฟทั่วไป เน้นดาเมจต่อครั้ง", "Pistol":"บอสเลือดสูง เมื่อทีมใช้ดาเมจ Light"},
 "Flame (Burning Fist)": {"Great Axe Rhitta":"แนะนำสำหรับเคลียร์เวฟ", "Arcane Staff":"เน้นตีบอส"}
};

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

function renderTag(tag) {
 const icon = `<img class="type-icon" src="assets/types/${tag}.jpg" width="20" height="20" alt="">`;
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

