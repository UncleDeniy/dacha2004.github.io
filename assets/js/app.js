const DEF={
 users:{sweetsvt:{name:'sweetsvt',fio:'',birthday:'2004-01-01',bio:'Создатель сайта',avatar:'assets/img/logo.png'}},
 events:[
  {title:'Встреча группы',date:'2026-05-10',place:'Дача',desc:'Сбор группы, музыка, фото, настолки, шашлык и общий чат-план на лето.',cover:'cosmos.svg'},
  {title:'Киновечер',date:'2026-05-18',place:'Дом/онлайн',desc:'Выбираем фильм, созваниваемся, кидаем мемы и собираем фотки в галерею.',cover:'violet.svg'},
  {title:'Фото-день',date:'2026-06-01',place:'Город',desc:'Сделать нормальные фотографии для профилей, обложек и галереи сайта.',cover:'aurora.svg'}],
 birthdays:[{login:'sweetsvt',name:'sweetsvt',date:'2004-01-01'}]
};
const WALLS=[['cosmos.svg','Космос'],['aurora.svg','Аврора'],['violet.svg','Фиолетовый туман'],['ocean.svg','Океан'],['sunset.svg','Закат'],['forest.svg','Лес'],['matrix.svg','Matrix'],['glass.svg','Glass'],['lava.svg','Лава'],['midnight.svg','Midnight'],['orange.svg','Оранжевый'],['cyber.svg','Cyber']];
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
function get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}function set(k,v){localStorage.setItem(k,JSON.stringify(v))}
function users(){let u=get('d4_users',null); if(!u){u=DEF.users;set('d4_users',u)} if(u.sweetsvt && !u.sweetsvt.avatar)u.sweetsvt.avatar='assets/img/logo.png'; return u}
function cur(){return get('d4_current',null)}function me(){return users()[cur()]||null}
function avatar(u=me()){return u?.avatar||'assets/img/logo.png'}
function requireAuth(){if(!cur()){set('d4_current','sweetsvt'); users();}}
function logout(){localStorage.removeItem('d4_current');location.href='login.html'}
function nav(h,t,i,a){return `<a class="${a?'active':''}" href="${h}"><span class="ico">${i}</span><span>${t}</span></a>`}
function shell(a){return `<div class="bg"></div><aside class="side"><a class="brand" href="index.html"><img src="assets/img/logo.png" alt="logo"><div><h1>Дача 2004</h1><p>закрытый сайт группы</p></div></a><nav class="nav">${nav('index.html','Главная','🏠',a=='home')}${nav('chat.html','Чат','💬',a=='chat')}${nav('gallery.html','Галерея','🖼️',a=='gallery')}${nav('events.html','Мероприятия','🎉',a=='events')}${nav('birthdays.html','Дни рождения','🎂',a=='birthdays')}${nav('settings.html','Настройки','⚙️',a=='settings')}</nav><a class="user-mini" href="profile.html"><img class="ava" data-avatar><div><b data-name></b><div class="muted">открыть профиль</div></div></a></aside>`}
function mount(a,html){requireAuth();document.body.innerHTML=`<div class="shell">${shell(a)}<main class="main"><div class="mobile-top"><a class="brand" href="index.html"><img src="assets/img/logo.png"><div><h1>Дача 2004</h1><p>закрытый сайт группы</p></div></a><a href="profile.html"><img class="ava" data-avatar></a></div>${html}</main></div><div class="intro" id="intro"><div class="intro-box"><video id="introVideo" src="assets/video/intro.mp4" autoplay playsinline webkit-playsinline></video></div><button class="btn skip" onclick="closeIntro()">Пропустить</button></div>`;applySettings();applyUser();maybeIntro()}
function applyUser(){let u=me();$$('[data-name]').forEach(e=>e.textContent=u?.name||cur()||'');$$('[data-avatar]').forEach(e=>e.src=avatar(u))}
function applySettings(){let s=get('d4_settings',{wall:'cosmos.svg',animated:true,blur:0}),b=$('.bg');if(!b)return;b.style.setProperty('--wall',`url('../img/wallpapers/${s.wall||'cosmos.svg'}')`);b.style.setProperty('--blur',(s.blur||0)+'px');b.classList.toggle('animated',!!s.animated)}
function maybeIntro(){let u=cur(); if(!u)return; let key='d4_intro_played_global_'+u; if(localStorage.getItem(key)){$('#intro')?.remove();return} let i=$('#intro'),v=$('#introVideo'); if(!i||!v)return; i.classList.add('show'); document.body.classList.add('no-scroll'); v.removeAttribute("controls"); v.controls=false; v.onerror=closeIntro; v.onended=closeIntro; v.style.objectFit='contain'; v.style.objectPosition='center center'; v.addEventListener('loadedmetadata',()=>{v.style.objectFit='contain';v.style.objectPosition='center center';}); v.play().catch(()=>{});}
function closeIntro(){let u=cur(); if(u)localStorage.setItem('d4_intro_played_global_'+u,'1');document.body.classList.remove('no-scroll');$('#intro')?.remove()}
function resetIntro(){let u=cur(); if(u)localStorage.removeItem('d4_intro_played_global_'+u); alert('Интро сброшено. Оно покажется один раз после перезагрузки.');}
function events(){let e=get('d4_events',null); if(!e){e=DEF.events;set('d4_events',e)} return e}
function birthdays(){let b=get('d4_birthdays',null); if(!b){b=DEF.birthdays;set('d4_birthdays',b)} return b}
function gallery(){let g=get('d4_gallery',null); if(!g){g=[{title:'Лого группы',src:'assets/img/logo.png'},{title:'Космос',src:'assets/img/wallpapers/cosmos.svg'},{title:'Аврора',src:'assets/img/wallpapers/aurora.svg'},{title:'Закат',src:'assets/img/wallpapers/sunset.svg'}];set('d4_gallery',g)} return g}
function nearestBirthday(){let n=new Date();return birthdays().map(x=>{let d=new Date(x.date);d.setFullYear(n.getFullYear());if(d<n)d.setFullYear(n.getFullYear()+1);return {...x,days:Math.ceil((d-n)/86400000)}}).sort((a,b)=>a.days-b.days)[0]}
function showEvent(i){let e=events()[i];$('#modal').classList.add('show');$('#modalBody').innerHTML=`<div class="event-cover" style="--wall:url('assets/img/wallpapers/${e.cover||'cosmos.svg'}')"></div><h2>${e.title}</h2><p class="muted">${e.date} · ${e.place}</p><p>${e.desc}</p><div class="row"><button class="btn" onclick="alert('Пока локально: позже подключим запись на мероприятие через backend/WordPress')">Я пойду</button><button class="btn ghost" onclick="$('#modal').classList.remove('show')">Закрыть</button></div>`}
function notify(title='Дача 2004',body='Уведомления работают'){if(Notification&&Notification.permission==='granted')new Notification(title,{body,icon:'assets/img/logo.png'});else if(Notification)Notification.requestPermission().then(p=>{if(p==='granted')new Notification(title,{body,icon:'assets/img/logo.png'})})}
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{})}
