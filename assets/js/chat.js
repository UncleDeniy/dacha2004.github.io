const EMOJIS='😀 😃 😄 😁 😆 😅 😂 🤣 😊 😎 😍 😘 😜 🤪 🤨 😏 😐 🙄 😴 😭 😡 🤯 🥳 😈 👻 💀 🤡 🙏 💪 🤝 👍 👎 ❤️ 💙 💜 🔥 ✨ ⭐ 🌙 ☀️ 🍕 🍔 🍟 🥤 🎂 🎉 🎮 🎧 📸 🚗 🏠'.split(' ');
const STICKERS='😂 🤣 😎 🥳 😈 👻 💀 🤡 🐸 🐱 🐶 🐺 🦊 🐻 🐼 🐵 🐧 🐦 🐉 🦄 🍌 🍉 🍕 🍔 🍟 🌭 🍿 🎂 🎁 🎉 🎮 🎧 📸 🚗 🛸 🌙 🔥 ✨ 💎 ❤️‍🔥'.split(' ');
let msgs=get('d4_chat',[]);
function renderChat(){let box=$('#messages');box.innerHTML=msgs.map(m=>`<div class="msg ${m.user===cur()?'me':''} ${m.type==='sticker'?'sticker-msg':''}"><div class="msg-top"><span>${m.name||m.user}</span><span>${m.time||''}</span></div><div class="${m.type==='sticker'?'sticker':'msg-text'}">${m.text}</div></div>`).join('');requestAnimationFrame(()=>{box.scrollTop=box.scrollHeight})}
function sendMessage(type='text',txt=null){let t=txt??$('#msgInput').value.trim(); if(!t)return;let u=me();msgs.push({user:cur(),name:u?.name||cur(),text:t,type,time:new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})});set('d4_chat',msgs);$('#msgInput').value='';renderChat();try{$('#notifySound').currentTime=0;$('#notifySound').play()}catch{};notify('Новое сообщение',t)}
function clearChat(){if(confirm('Очистить локальный чат?')){msgs=[];set('d4_chat',msgs);renderChat()}}
function buildPicker(){let p=$('#picker');p.innerHTML=`<div class="tabs"><button class="tab" onclick="showPick('emoji')">Смайлики</button><button class="tab" onclick="showPick('stickers')">Стикеры</button></div><div id="pickEmoji" class="emoji-grid"></div><div id="pickStickers" class="sticker-grid" style="display:none"></div>`;$('#pickEmoji').innerHTML=EMOJIS.map(e=>`<button onclick="addEmoji('${e}')">${e}</button>`).join('');$('#pickStickers').innerHTML=STICKERS.map(e=>`<button onclick="sendMessage('sticker','${e}')">${e}</button>`).join('')}
function showPick(t){$('#pickEmoji').style.display=t==='emoji'?'grid':'none';$('#pickStickers').style.display=t==='stickers'?'grid':'none'}
function addEmoji(e){$('#msgInput').value += e; $('#msgInput').focus()}
function togglePicker(){let p=$('#picker'); if(!p.innerHTML)buildPicker(); p.classList.toggle('open')}
function bootChat(){buildPicker();renderChat();$('#msgInput').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}})}
