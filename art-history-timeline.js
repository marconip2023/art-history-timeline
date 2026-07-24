const COMMONS = f => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(f) + '?width=500';
const grad = g => `linear-gradient(135deg, ${g[1]} 0%, ${g[0]} 100%)`;

/* grad=[核心色, 光暈色]，史前(最深) → 當代(最淺)。works: {f, name, artist, where} */
const P = [
  {k:'prehistoric', n:'史前藝術', en:'Prehistoric', yr:'前40000–前3000', grad:['#221b2b','#3a2f4a'],
   region:'全球洞穴 · 巨石遺址',
   desc:'人類最早的藝術，繪於洞穴岩壁，以狩獵動物與生殖象徵為主，反映早期的信仰與生存渴望。',
   events:[{y:'約前10000',t:'農業革命與定居'}],
   works:[{f:'Lascaux_painting.jpg',name:'拉斯科洞穴壁畫',artist:'史前人類',where:'法國 · 多爾多涅'}]},

  {k:'ancient', n:'古代', en:'Ancient', yr:'前3000–400', grad:['#4a2a1a','#7d4a28'],
   region:'埃及 · 希臘 · 羅馬',
   desc:'埃及、希臘、羅馬奠定西方藝術根基，由神權象徵走向理想化人體與寫實肖像，追求秩序與比例之美。',
   events:[{y:'前508',t:'雅典民主'},{y:'前27',t:'羅馬帝國建立'}],
   works:[{f:'Venus_de_Milo_Louvre_Ma399_n4.jpg',name:'米洛的維納斯',artist:'阿歷山德羅斯（傳）',where:'巴黎 · 羅浮宮'},
          {f:'The_Parthenon_in_Athens.jpg',name:'帕德嫩神廟',artist:'伊克提諾斯／卡利克拉特',where:'雅典 · 衛城'}]},

  {k:'medieval', n:'中世紀', en:'Medieval', yr:'500–1400', grad:['#123f36','#237a5f'],
   region:'拜占庭 · 羅曼式 · 哥德式',
   desc:'藝術服務宗教，畫面平面化、象徵化，以金底鑲嵌與哥德式建築彰顯神聖，個人隱於信仰之中。',
   events:[{y:'476',t:'西羅馬滅亡'},{y:'1347',t:'黑死病'}],
   works:[{f:'Cathédrale_de_Chartres.jpg',name:'沙特爾主教座堂',artist:'哥德式建築',where:'法國 · 沙特爾'},
          {f:'Meister_der_Reichenauer_Schule_002.jpg',name:'泥金手抄本',artist:'賴興瑙修道院',where:'德國'}]},

  {k:'renaissance', n:'文藝復興', en:'Renaissance', yr:'1400–1600', grad:['#184a86','#3f8ad0'], hero:true,
   region:'意大利（佛羅倫斯、羅馬）→ 北歐',
   desc:'以人文主義為核心，藝術家透過線性透視、解剖學與明暗法重新觀察世界，復興古典並提升藝術家地位。',
   events:[{y:'1440',t:'古騰堡印刷術'},{y:'1453',t:'君士坦丁堡陷落'},{y:'1492',t:'哥倫布抵美洲'},{y:'1517',t:'宗教改革'}],
   works:[{f:'Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg',name:'蒙娜麗莎',artist:'達文西',where:'巴黎 · 羅浮宮'},
          {f:'Michelangelo_-_Creation_of_Adam_(cropped).jpg',name:'創造亞當',artist:'米開朗基羅',where:'梵蒂岡 · 西斯汀禮拜堂'},
          {f:'Sanzio_01.jpg',name:'雅典學院',artist:'拉斐爾',where:'梵蒂岡 · 使徒宮'},
          {f:'Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',name:'維納斯的誕生',artist:'波提切利',where:'佛羅倫斯 · 烏菲茲'}]},

  {k:'baroque', n:'巴洛克', en:'Baroque', yr:'1600–1750', grad:['#7a2a18','#cf6040'],
   region:'羅馬 · 荷蘭 · 西班牙',
   desc:'反宗教改革下的戲劇化藝術，以強烈明暗對比與動態構圖營造情感張力與宏偉的感官震撼。',
   events:[{y:'1545',t:'反宗教改革'},{y:'1618',t:'三十年戰爭'}],
   works:[{f:'Rembrandt_van_Rijn-De_Nachtwacht-1642.jpg',name:'夜巡',artist:'林布蘭',where:'阿姆斯特丹 · 國家博物館'},
          {f:'Caravaggio_-_La_vocazione_di_San_Matteo.jpg',name:'召喚聖馬太',artist:'卡拉瓦喬',where:'羅馬 · 聖王路易堂'}]},

  {k:'neoclassical', n:'洛可可 / 新古典', en:'Rococo / Neoclassical', yr:'1700–1800', grad:['#a03c66','#e084ab'],
   region:'法國 · 歐洲宮廷',
   desc:'由輕盈華麗的洛可可，轉向理性秩序、回歸古典的新古典，呼應啟蒙運動與革命精神。',
   events:[{y:'1748',t:'龐貝古城發掘'},{y:'1789',t:'法國大革命'}],
   works:[{f:'Death_of_Marat_by_David.jpg',name:'馬拉之死',artist:'雅克-路易·大衛',where:'布魯塞爾 · 皇家美術館'},
          {f:'Fragonard,_The_Swing.jpg',name:'鞦韆',artist:'福拉哥納爾',where:'倫敦 · 華萊士收藏館'}]},

  {k:'romantic', n:'浪漫主義', en:'Romanticism', yr:'1800–1850', grad:['#5548a0','#9689ec'],
   region:'法國 · 德國 · 英國',
   desc:'強調情感、崇高與個人，以戲劇性色彩描繪自然、革命與異國，反抗新古典的冷靜理性。',
   events:[{y:'1804',t:'拿破崙稱帝'},{y:'約1800',t:'工業革命'}],
   works:[{f:'Eugène_Delacroix_-_Le_28_Juillet._La_Liberté_guidant_le_peuple.jpg',name:'自由領導人民',artist:'德拉克洛瓦',where:'巴黎 · 羅浮宮'},
          {f:'El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg',name:'1808年5月3日',artist:'哥雅',where:'馬德里 · 普拉多'}]},

  {k:'realism', n:'寫實主義', en:'Realism', yr:'1840–1870', grad:['#5c7d24','#a3c862'],
   region:'法國',
   desc:'拒絕理想化，直接描繪勞動者與日常現實，關注社會議題，開啟現代藝術的寫實視野。',
   events:[{y:'1839',t:'攝影術發明'},{y:'1848',t:'歐洲革命'}],
   works:[{f:'Jean-François_Millet_-_Gleaners_-_Google_Art_Project.jpg',name:'拾穗',artist:'米勒',where:'巴黎 · 奧賽美術館'},
          {f:'Gustave_Courbet_-_A_Burial_at_Ornans_-_Google_Art_Project_2.jpg',name:'奧爾南的葬禮',artist:'庫爾貝',where:'巴黎 · 奧賽美術館'}]},

  {k:'impressionism', n:'印象派 / 後印象', en:'Impressionism', yr:'1860–1905', grad:['#c07a14','#f3c473'],
   region:'巴黎',
   desc:'走出畫室戶外寫生，以可見筆觸捕捉瞬間光色；後印象派進一步走向主觀情感與結構的表現。',
   events:[{y:'1874',t:'首屆印象派畫展'},{y:'約1841',t:'錫管顏料'}],
   works:[{f:'Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',name:'星夜',artist:'梵谷',where:'紐約 · 現代藝術博物館'},
          {f:'Claude_Monet,_Impression,_soleil_levant.jpg',name:'日出·印象',artist:'莫內',where:'巴黎 · 瑪摩丹美術館'}]},

  {k:'modernism', n:'現代主義', en:'Modernism', yr:'1905–1970', grad:['#d94b6a','#f7a6b7'],
   region:'歐洲 · 美國',
   desc:'立體派、表現主義、超現實與抽象接連登場，不斷打破傳統，重新定義何謂藝術。',
   events:[{y:'1914',t:'第一次世界大戰'},{y:'1939',t:'第二次世界大戰'}],
   works:[{ph:'亞維農少女',artist:'畢卡索',where:'紐約 · 現代藝術博物館'},
          {ph:'記憶的永恆',artist:'達利',where:'紐約 · 現代藝術博物館'}]},

  {k:'contemporary', n:'當代', en:'Contemporary', yr:'1970–至今', grad:['#b6c6e4','#eef2fb'],
   region:'全球',
   desc:'觀念先於形式，媒材多元開放，裝置、影像與數位並存，再無單一主流風格。',
   events:[{y:'1989',t:'冷戰結束'},{y:'約1991',t:'萬維網 / 數位時代'}],
   works:[{ph:'普普 / 觀念 / 數位藝術',artist:'沃荷、草間彌生、班克斯 等',where:'全球美術館與公共空間'}]},
];

let cur = 3;
const pills = document.getElementById('pills');
const bg = document.getElementById('bg');
const side = document.getElementById('side');
const gridEl = document.getElementById('grid');

function paintPills(){
  pills.innerHTML = P.map((p,i)=>{
    const on = i===cur;
    return `<button class="pill ${on?'on':''}" data-i="${i}" style="--g0:${p.grad[0]};--g1:${p.grad[1]}">
      <span class="pn">${p.n}</span>${on?`<span class="pmeta">${p.yr} · 你喺呢度</span>`:''}
    </button>`;
  }).join('');
  pills.querySelectorAll('.pill').forEach(b=>b.onclick=()=>{
    cur=+b.dataset.i; render();
    b.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
  });
}

function cardHTML(p,w,i){
  const media = w.f
    ? `<img src="${COMMONS(w.f)}" alt="${w.name}" loading="lazy"
         onerror="this.parentNode.style.background='${grad(p.grad)}';this.remove()">`
    : `<div class="ph">受版權保護，未能顯示</div>`;
  return `<article class="artcard" style="animation-delay:${(i*0.07).toFixed(2)}s">
    <div class="media" ${w.f?'':`style="background:${grad(p.grad)}"`}>${media}</div>
    <div class="meta">
      <div class="mrow name"><span class="em">🎨</span>${w.name||w.ph}</div>
      <div class="mrow"><span class="em">🧑‍🎨</span>${w.artist||'—'}</div>
      <div class="mrow"><span class="em">📍</span>${w.where||p.region}</div>
      <a class="seen">Make as seen ↗</a>
      <p class="mdesc">${p.desc}</p>
    </div></article>`;
}

function render(){
  paintPills();
  const p = P[cur];

  bg.style.background =
    `radial-gradient(1100px 780px at 10% 4%, ${p.grad[1]}55, transparent 60%),`+
    `radial-gradient(1000px 800px at 92% 98%, ${p.grad[0]}3a, transparent 62%),`+
    `linear-gradient(165deg,#efece5 0%,#e7e3db 55%,#dcd7ce 100%)`;

  const ev = p.events.map(e=>`<span class="evchip"><b>${e.y}</b>${e.t}</span>`).join('');
  let note='';
  if(p.k==='renaissance'){
    const cols=[['中世紀（之前）','宗教神權主導 · 平面象徵 · 無透視'],
      ['文藝復興','人文主義 · 線性透視 · 解剖與自然 · 藝術家署名'],
      ['巴洛克（之後）','宗教情感高漲 · 戲劇動態 · 強烈明暗']];
    note=`<div class="note"><div class="nh">💬 文藝復興 — 前後期對照</div>
      ${cols.map(c=>`<div class="nrow"><b>${c[0]}</b><span>${c[1]}</span></div>`).join('')}</div>`;
  }
  side.innerHTML = `
    <div class="folder" style="--g0:${p.grad[0]};--g1:${p.grad[1]}">
      <span class="tab"></span><span class="fbody"></span></div>
    <div class="fname">${p.n} <span>${p.en}</span></div>
    <p class="sdesc">${p.desc}</p>
    <div class="evline">${ev}</div>
    ${note}`;

  gridEl.innerHTML = p.works.map((w,i)=>cardHTML(p,w,i)).join('');
}

render();
addEventListener('keydown', e=>{
  if(e.key==='ArrowRight'){cur=Math.min(P.length-1,cur+1);render();}
  else if(e.key==='ArrowLeft'){cur=Math.max(0,cur-1);render();}
});
