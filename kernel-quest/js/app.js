const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const app=$('#app'),KEY='kq-datarep-v1',tux=c=>`<svg class="tux ${c||''}" viewBox="0 0 64 64"><use href="#tux"/></svg>`;
let S={xp:0,streak:0,last:'',done:{},badges:[]},L=null,rst=0;
try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const rnd=a=>a[Math.random()*a.length|0];
const nz=s=>s.toLowerCase().replace(/[\s,'’′#_()-]/g,'').replace(/(kib|mib|bits?)$/,'');
const OK=['exit 0 ✔','Compiled, zero warnings','Merged to main!','sudo make me proud','All tests passed','Nice one, sudoer!'];
const NO=['Permission denied','Segmentation fault (core dumped)','bash: answer: command not found','Error 404: answer not found','Kernel panic – not syncing'];
const LVS=[[0,'Live USB'],[60,'Dual-booter'],[150,'Sudoer'],[300,'Kernel hacker'],[500,'Root']];
const BG=[['first','🐧','Hello, World','Finish your first lesson'],['perf','✨','Zero warnings','Finish a lesson with no mistakes'],['combo','⚡','make -j8','Get 5 correct answers in a row'],['cron','⏰','Cron job','Reach a 3-day streak'],['nix','❄️','I use NixOS btw','Answer the final question'],['all','👑','Root access','Complete every lesson']];
// [type m=multiple choice / t=type it, prompt (___ = blank), answer(s) ("a|b" = alternatives), wrong options, explanation]
const T=[
{t:'Number systems',p:'~/number-systems',c:'g',L:[
{n:'Registers & overflow',i:'🔢',cmd:'cat /proc/cpuinfo',q:[
['t','A ___ is a high-speed area of memory located within the CPU.','register',0,'A register is a small, ultra-high-speed area of memory inside the CPU. It temporarily stores data during the fetch–decode–execute cycle.'],
['t','The ___ number system is the human-readable number system, which consists of 10 digits.','denary',0,'Denary (base 10) uses the digits 0–9.'],
['t','What would happen if the system tried to store a denary value greater than 255 in an 8-bit register?','overflow error|overflow',0,'Overflow errors occur when a system tries to put a value in a register that is bigger than its capacity. 8 bits can only hold 0–255.'],
['t','An overflow error will most likely cause the computer system to ___.','crash',0,'Overflow errors occur when a value is one bit larger than a register’s capacity, which might cause the system to crash.'],
['t','What is the result of adding 10101010 to 00110011 in binary?','11011101',0,'Add column by column from the right and carry the 1s: 10101010 + 00110011 = 11011101 (170 + 51 = 221).'],
['m','One example of hexadecimal usage is…','Displaying error messages',['Machine code programming','High-level language programming','Designing presentation files'],'Hex shows up in error messages and memory addresses, like the 0x7ffe… you see in a segfault.'],
['m','Which of the following is a benefit of using hexadecimal instead of binary?','Shorter representation on the screen',['Uses less memory space','Faster program execution','Faster data transmission'],'One hex digit stands for 4 bits, so values are much shorter to read and write. The computer still stores the same bits.']]},
{n:'Two’s complement & shifts',i:'➖',cmd:'chmod +x shift.sh',q:[
['t','Convert the following negative denary integer into 8-bit two’s complement: −11','11110101',0,'Start with positive 11 = 00001011. Complement it (11110100), then add 1 to get 11110101.'],
['t','Convert the following positive denary integer into 8-bit two’s complement: 76','01001100',0,'A positive number is just its normal binary. Remember to use all eight bits: 76 = 01001100.'],
['t','What is the new binary number after a 2-bit logical right shift on 00110001?','00001100',0,'In a logical right shift, bits shifted off the right-hand end are lost and zeros are added at the left-hand end.'],
['t','What is the new binary number after a 1-bit logical left shift on 00110001?','01100010',0,'In a logical left shift, bits shifted off the left-hand end are lost and zeros are added at the right-hand end.']]}]},
{t:'Text, sound and images',p:'~/media',c:'b',L:[
{n:'Text & characters',i:'🔤',cmd:'echo $LANG',q:[
['t','Emojis can be represented using the ___ character set.','unicode',0,'ASCII represents English characters, but Unicode can represent every character in every language, including emojis.'],
['t','The ASCII character set was replaced by ___ to fully encompass the languages and alphabets of the world.','unicode',0,'Unicode covers the world’s languages and alphabets.'],
['t','The number of characters that can be represented using ASCII is ___','128',0,'ASCII uses 7 bits, so 2⁷ = 128 characters.'],
['m','What does ASCII stand for?','American standard code for information interchange',['Advanced system code for internet interchange','Automatic standard code for input interpretation','American system code for intelligent instructions'],'ASCII = American Standard Code for Information Interchange.'],
['t','The computer stores ‘A’ using binary as 01000001, so what would be the denary number of ‘B’?','66',0,'01000001 is 65 in denary, so B is 66.'],
['t','Calculate how many bits are needed to store the phrase ‘I love computer’.','120',0,'Each character needs 8 bits and there are 15 characters (spaces count): 8 × 15 = 120 bits.']]},
{n:'Sound',i:'🔊',cmd:'aplay song.wav',q:[
['t','In the physical world, sounds are ___ waves that are constantly changing.','analogue|analog',0,'Data from the physical world is continuously variable and changes in a smooth curve.'],
['m','Which of the following file types is an example of a sound file?','.mp3',['.jpg','.png','.gif'],'.mp3 stores audio. The others are image formats.'],
['m','Digital sounds used by computers are made up of which of the following?','Discrete signals',['Analogue waves','Continuous smooth curves','Random noise'],'Digital sound is a sequence of discrete signals that gives the illusion of a constantly changing sound.'],
['m','The more bits that are used to measure the analogue wave, the…','More accurate the sound, and the bigger the file size will be',['Less accurate the sound, and the bigger the file size will be','More accurate the sound, and the smaller the file size will be','Less accurate the sound, and the smaller the file size will be'],'More bits per measurement means more detail, but also more data to store.'],
['t','The number of bits used to record each measurement during the sampling process is called…','sample resolution|bit depth',0,'Sample resolution is the number of bits used per measurement.'],
['t','The higher the sample rate, and the higher the sample resolution, the more ___ the sound will be, but the file used to save the sound will be much ___.',['accurate','larger|bigger'],0,'More samples and more bits per sample mean a more accurate sound, and a bigger file.']]},
{n:'Images',i:'🖼️',cmd:'convert img.png out.jpg',q:[
['t','All image file types, such as .jpg and .gif, use different ___ methods to store image data as binary.','encoding',0,'Different file types use different encoding methods, but they all store image data as binary.'],
['t','The higher the colour depth, and the higher the resolution, the more data has to be stored. This means that increasing any of these values will ___ the file size.','increase',0,'More bits per pixel or more pixels means more data to store.'],
['t','Calculate how many bits are needed to represent 512 colours in an image.','9',0,'log₂(512) = 9 bits.'],
['t','In images, what is the number of bits per pixel called?','colour depth|color depth',0,'Colour depth is how many bits are used to store the colour of each pixel.'],
['t','Pixel colour values can be represented using hexadecimal. The black colour value is ___ while the white colour value is ___.',['000000','FFFFFF'],0,'Hex colours are RGB pairs: 00 00 00 is no light (black) and FF FF FF is full light (white).'],
['m','What is being described if a picture is said to be 1080 × 720?','Resolution',['Colour depth','Sample rate','Encoding'],'Resolution is the number of pixels in an image, usually written as width × height.']]}]},
{t:'Data storage and compression',p:'~/archives',c:'p',L:[
{n:'Lossy vs lossless',i:'🗜️',cmd:'gzip -d archive.gz',q:[
['t','Two drawbacks of using lossless compression rather than lossy compression are the ___ file size and ___ transmission speed.',['larger|bigger|higher','slower|lower'],0,'Lossless files stay bigger, so they take longer to send.'],
['m','Which of the following does not describe how lossy compression is used to reduce the size of a sound file?','Data will not be removed',['Some data is permanently removed','Quieter or less noticeable sounds can be discarded','The file ends up smaller'],'Lossy compression does permanently remove some data from the original file.'],
['t','In ___ compression, data will not be lost from the original file. After the file has been uncompressed, the result is exactly the same as the original file.','lossless',0,'Lossless: nothing is lost, and decompressing gives back the exact original.'],
['m','Which of the following would be the effect of compressing a movie file using a lossy compression technique?','Decreased file size and quality',['Increased file size and quality','Increased file size, decreased quality','Decreased file size, identical quality'],'Lossy compression permanently removes data, so files are smaller but lower quality.'],
['m','Which of the following does not describe how lossless compression is used to reduce the size of a sound file?','Discards any unnecessary sounds',['Uses an algorithm to store the data differently','Restores the exact original when uncompressed','Keeps all of the original data'],'Lossless compression does not lose any data. It stores the data in a different way.'],
['t','Most compressed file types fall into one of two categories: ___, which loses some data from the file, and ___, which retains all the data but stores it differently.',['lossy','lossless'],0,'Lossy loses data, lossless keeps it all.']]},
{n:'Compression basics',i:'📦',cmd:'tar -czf backup.tar.gz ~/',q:[
['t','State the name of the lossless compression technique that involves encoding ‘runs’ of the same data as a value and a number of repetitions.','run length encoding|rle',0,'Run-length encoding (RLE) finds groups of repeating data and records it once, along with how many times it repeated.'],
['t','Files that have had no compression applied are called ___ files.','raw',0,'Raw files are uncompressed.'],
['t','Compression is normally used for three different file types: sound files, ___ files and video files.','image',0,'Sound, image and video files are the usual candidates.'],
['m','Which of the following is not a benefit of file compression?','Reducing the file quality',['Saving storage space','Increasing data transmission speed','Using less bandwidth'],'Compression can sometimes reduce quality, but that is not an aim of compression.'],
['t','A compression ___ is a simple set of instructions that is applied to a file in order to reduce its size.','algorithm',0,'An algorithm is the set of instructions that shrinks the file.'],
['m','Which of the following is an aim of file compression?','Save storage space',['Increase the file size','Improve the file quality','Make files harder to open'],'Compression reduces a file’s logical size to save storage space and improve processing time.']]},
{n:'Storage maths',i:'💾',cmd:'df -h',q:[
['t','You have a USB flash drive with 16 GiB free space. Approximately how many photographs of 128 KiB in size could the drive hold?','131072',0,'16 × 1024 × 1024 KiB ÷ 128 KiB = 131 072 photos.'],
['t','Calculate the file size of a 3 minute sound file with 44.1 kHz sample rate and 8-bit sample resolution, in kibibytes (KiB).','7751.95|7752|7751.953',0,'3 × 60 × 44100 × 8 bits ÷ 8 gives bytes. Divide by 1024 for KiB: 7751.95 KiB.'],
['t','Calculate the file size of a 50 second sound file with 44.1 kHz sample rate and 8-bit sample resolution, in kibibytes (KiB).','2153|2153.32',0,'50 × 44100 × 8 ÷ 8 = 2 205 000 bytes. Divide by 1024: about 2153 KiB.'],
['t','Calculate the file size of an image with a 2048 × 720 resolution and 256 colour values, in mebibytes (MiB).','1.41|1.406',0,'256 colours = 8-bit depth. 2048 × 720 × 8 bits ÷ 8 = 1 474 560 bytes. Divide by 1024 twice: 1.406 MiB.'],
['m','Which file type from the following will most likely have the largest file size?','1 hour of a movie file',['10 pages of a text file','1 hour of a music file','10 pages of programming code'],'Video holds image and sound data for every second, so it is by far the biggest.'],
['t','1 GiB = 2ˣ bytes. What is x?','30',0,'1 GiB = 1024 × 1024 × 1024 bytes = 2¹⁰ × 2¹⁰ × 2¹⁰ = 2³⁰.']]}]},
{t:'Boss level',p:'/usr/share/distros',c:'r',L:[
{n:'The final question',i:'❄️',cmd:'neofetch',q:[
['m','Which is the best Linux distro?','NixOS',['Ubuntu','Arch (btw)','Debian'],'Declarative configs, atomic rollbacks and reproducible builds. It was always NixOS. ❄️']]}]}];
const LS=[];T.forEach(t=>t.L.forEach(l=>{l.id=LS.length;LS.push(l)}));
const NQ=LS.reduce((n,l)=>n+l.q.length,0);
const lvl=()=>{let i=0;LVS.forEach((l,j)=>{if(S.xp>=l[0])i=j});return i};
const grow=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>$$('[data-w]').forEach(e=>e.style.width=e.dataset.w)));

function home(){
 L=null;rst=0;const li=lvl(),nx=LVS[li+1],pct=nx?(S.xp-LVS[li][0])/(nx[0]-LVS[li][0])*100:100,cur=LS.find(l=>!S.done[l.id]);let k=0;
 app.innerHTML=`<div class="top"><div class="logo">${tux()}kernel.quest</div><span class="pill" style="color:var(--y)">🔥 ${S.streak}</span><span class="pill" style="color:var(--b)">⭐ ${S.xp}</span></div>
 <div class="term mono">$ ./learn --topic data-representation<br><span class="okk">[ OK ]</span> ${LS.length} lessons, ${NQ} questions loaded<br><span class="okk">[ OK ]</span> tux is awake<span class="curs"></span></div>
 <div class="lvl"><div><small class="mono">LEVEL ${li+1}</small><br>${LVS[li][1]}</div><div class="bar"><i data-w="${pct}%"></i></div></div>
 ${T.map((t,ti)=>`<div class="banner" style="--c:var(--${t.c});--cd:var(--${t.c}d)"><small class="mono">${ti<3?'Topic '+(ti+1):'Boss'} · ${t.p}</small><h2>${t.t}</h2></div><div class="path">${t.L.map(l=>{const o=[0,46,66,46,0,-46,-66,-46][k%8],s=S.done[l.id];return`<div class="nw" style="transform:translateX(${o}px)"><button class="node${s?' done':''}${cur==l?' cur':''}" data-l="${l.id}" style="--c:var(--${t.c});--cd:var(--${t.c}d);animation-delay:${k++*50}ms" aria-label="${l.n}">${s?'✓':l.i}</button><div class="nl">${l.n}<br><code>$ ${l.cmd}</code>${s?'<br><span class="s">'+'★'.repeat(s)+'</span>'+'☆'.repeat(3-s):''}</div></div>`}).join('')}</div>`).join('')}
 <h3 class="sec">Achievements</h3><div class="bgs">${BG.map(b=>`<div class="bg${S.badges.includes(b[0])?'':' lock'}"><i>${b[1]}</i>${b[2]}<small>${b[3]}</small></div>`).join('')}</div>
 <div style="text-align:center"><button class="link mono" data-a="rst">rm -rf ~/progress</button></div>
 <div class="foot mono">kernel.quest · IB Computer Science, Topic 1 · 🐧</div>`;
 grow();window.scrollTo(0,0);
}

function start(id){L={l:LS[id],qs:LS[id].q.slice(),tot:LS[id].q.length,hp:5,right:0,mist:0,combo:0,max:0,xp:0,redo:0,chk:0};
 app.innerHTML=`<div class="lh"><button class="x" data-a="quit" aria-label="Quit lesson">✕</button><div class="bar"><i id="pb"></i></div><span class="hrt" id="hp">❤️ 5</span></div><div class="cmd mono">$ ${L.l.cmd}</div><div id="main"></div><div class="ft" id="ft"></div><div style="height:230px"></div>`;
 ask();window.scrollTo(0,0)}

function foot(h,c){$('#ft').className='ft '+(c||'');$('#ft').innerHTML='<div>'+h+'</div>'}

function ask(){
 const [k,p,a,o]=L.qs[0];L.chk=0;L.sel=-1;let h;
 if(k=='m'){L.opts=shuf([a,...o]);h=`<div class="who">${tux()}<div class="bub">${p}</div></div><div style="margin-top:20px">${L.opts.map((x,i)=>`<button class="opt" data-i="${i}"><b class="kb mono">${i+1}</b>${x}</button>`).join('')}</div>`}
 else{const A=[].concat(a),s=p.split('___'),inp=(i,c)=>`<input class="blank ${c||''}" data-i="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" ${c?'placeholder="type your answer"':''} style="${c?'':'width:'+Math.min(30,Math.max(10,A[i].length+4))+'ch'}">`;
  h=`<div class="who">${tux()}<div class="bub">${s.length>1?s.map((x,i)=>x+(i<s.length-1?inp(i):'')).join(''):p}</div></div>`+(s.length>1?'':`<div style="margin-top:20px">${inp(0,'big')}</div>`)}
 $('#main').innerHTML=`<div class="q">${h}</div>`;
 foot('<button class="btn" data-a="go" id="go" disabled>Check</button>');
 const i=$('input');if(i)i.focus();
}

function check(){
 const [k,p,a,o,w]=L.qs[0];let ok,sho;
 if(k=='m'){ok=L.opts[L.sel]==a;$$('.opt').forEach((b,i)=>{b.disabled=true;const c=L.opts[i]==a;b.classList.toggle('ok',c);b.classList.toggle('bad',!c&&i==L.sel)});sho=a}
 else{const A=[].concat(a),I=$$('input'),hit=(e,i)=>A[i].split('|').map(nz).includes(nz(e.value));ok=I.every(hit);I.forEach((e,i)=>{e.disabled=true;e.classList.add(hit(e,i)?'ok':'bad')});sho=A.map(x=>x.split('|')[0]).join('  ·  ')}
 L.chk=1;
 if(ok){L.right++;L.combo++;L.max=Math.max(L.max,L.combo);const g=10+(L.combo>2?5:0);L.xp+=g;zap('+'+g+' XP'+(L.combo>2?' 🔥×'+L.combo:''))}
 else{L.hp--;L.mist++;L.combo=0;L.redo=1;$('#hp').textContent='❤️ '+L.hp}
 $('#pb').style.width=L.right/L.tot*100+'%';
 const m=$('.tux');m.classList.remove('bn','sk');void m.offsetWidth;m.classList.add(ok?'bn':'sk');
 foot(`<div class="fb"><div class="ft-t">${ok?rnd(OK):rnd(NO)}</div>${ok?'':'<div class="sol">Correct answer: <b class="mono">'+sho+'</b></div>'}<div class="why">${w}</div></div><button class="btn${ok?'':' r'}" data-a="go" id="go">Continue</button>`,ok?'ok':'bad');
}

function next(){const q=L.qs.shift();if(L.redo)L.qs.push(q);L.redo=0;if(L.hp<=0)return fail();if(!L.qs.length)return fin();ask()}

function fail(){
 app.innerHTML=`<div class="res f">${tux('sk')}<h1>Kernel panic!</h1><div>Out of hearts. Re-read the explanations and try again, no progress was lost.</div></div><div class="ft"><div><button class="btn" data-a="retry">Try again</button><button class="btn o" data-a="quit">Back to path</button></div></div>`;
}

function fin(){
 const m=L.mist,st=m==0?3:m<3?2:1,gain=L.xp+20+(m?0:10),l0=lvl(),nb=[];
 S.xp+=gain;S.done[L.l.id]=Math.max(S.done[L.l.id]||0,st);
 const td=new Date().toDateString(),yd=new Date(Date.now()-864e5).toDateString();
 if(S.last!=td){S.streak=S.last==yd?S.streak+1:1;S.last=td}
 const add=id=>{if(!S.badges.includes(id)){S.badges.push(id);nb.push(BG.find(b=>b[0]==id))}};
 add('first');if(!m)add('perf');if(L.max>=5)add('combo');if(S.streak>=3)add('cron');if(L.l.id==LS.length-1)add('nix');if(LS.every(x=>S.done[x.id]))add('all');
 save();
 app.innerHTML=`<div class="res">${tux()}<h1>Lesson complete!</h1><div class="stars">${[1,2,3].map(i=>`<span class="st${i<=st?' on':''}" style="animation-delay:${i*.25}s">★</span>`).join('')}</div>
 <div class="stats"><div style="--c:var(--y)">TOTAL XP<b>+${gain}</b></div><div style="--c:var(--g)">ACCURACY<b>${Math.round(L.tot/(L.tot+m)*100)}%</b></div><div style="--c:var(--r)">HEARTS<b>❤️ ${L.hp}</b></div></div>
 ${lvl()>l0?`<p class="mono" style="color:var(--b)">$ sudo levelup → ${LVS[lvl()][1]}</p>`:''}
 ${nb.map(b=>`<div class="nb"><span style="font-size:26px">${b[1]}</span><span>${b[2]}<br><small style="color:var(--mu)">${b[3]}</small></span></div>`).join('')}</div>
 <div class="ft"><div><button class="btn" data-a="quit">Continue</button></div></div>`;
 boom(m?70:150);
}

function zap(t){const e=document.createElement('div');e.className='fl';e.textContent=t;document.body.append(e);setTimeout(()=>e.remove(),1000)}

const cv=$('#fx'),cx=cv.getContext('2d');let P=[],raf=0;
function boom(n){cv.width=innerWidth;cv.height=innerHeight;for(let i=0;i<n;i++)P.push({x:innerWidth/2,y:innerHeight*.35,vx:(Math.random()-.5)*15,vy:-Math.random()*14-3,s:Math.random()*8+5,r:Math.random()*6,c:['#58cc02','#1cb0f6','#ffc800','#ff4b4b','#ce82ff'][i%5],l:100});if(!raf)tick()}
function tick(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l-->0);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.r+=.2;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.globalAlpha=Math.min(1,p.l/30);cx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);cx.restore()});raf=P.length?requestAnimationFrame(tick):0}

function pick(i){if(L.chk)return;L.sel=i;$$('.opt').forEach((b,j)=>b.classList.toggle('sel',j==i));$('#go').disabled=false}
document.addEventListener('click',e=>{
 const t=e.target,n=t.closest('[data-l]');if(n)return start(+n.dataset.l);
 const o=t.closest('.opt');if(o&&L)return pick(+o.dataset.i);
 const b=t.closest('[data-a]');if(!b)return;const a=b.dataset.a;
 if(a=='go')return L.chk?next():check();
 if(a=='quit')return home();
 if(a=='retry')return start(L.l.id);
 if(a=='rst'){if(!rst){rst=1;b.textContent='tap again to confirm';return}S={xp:0,streak:0,last:'',done:{},badges:[]};save();home()}
});
document.addEventListener('input',e=>{if(L&&e.target.matches('input')){const g=$('#go');if(g)g.disabled=!$$('input').every(i=>i.value.trim())}});
document.addEventListener('keydown',e=>{
 if(!L||!$('#go'))return;
 if(e.key=='Enter'){const g=$('#go');if(!g.disabled)g.click()}
 else if(/^[1-4]$/.test(e.key)&&L.opts&&!L.chk&&document.activeElement.tagName!='INPUT'&&L.opts[+e.key-1])pick(+e.key-1);
});
home();
