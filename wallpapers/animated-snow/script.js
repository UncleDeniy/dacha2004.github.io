(function(){
 const id=document.currentScript.dataset.id, fx=document.getElementById('wallpaperFx');
 if(!fx || !(fx.className||'').includes('wallpaper-'+id)) return;
 const old=fx.querySelector('canvas[data-wallpaper-canvas]'); if(old) old.remove();
 const c=document.createElement('canvas'); c.dataset.wallpaperCanvas='1'; c.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.85'; fx.appendChild(c);
 const ctx=c.getContext('2d'); let w=0,h=0,raf; const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function resize(){w=c.width=innerWidth*devicePixelRatio;h=c.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
 addEventListener('resize',resize,{passive:true}); resize();
 const mode=id;
 const n=mode.includes('matrix')?80:mode.includes('starfield')?120:mode.includes('snow')?90:mode.includes('fireflies')?55:mode.includes('cyber')?70:70;
 const p=Array.from({length:n},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2+0.6,v:Math.random()*1.2+.25,a:Math.random()*6.28}));
 function draw(){ctx.clearRect(0,0,innerWidth,innerHeight); const t=Date.now()/1000;
  p.forEach(o=>{let col='rgba(125,220,255,.75)';
   if(mode.includes('fireflies')) col='rgba(255,230,102,.8)'; if(mode.includes('matrix')) col='rgba(84,255,155,.72)'; if(mode.includes('snow')) col='rgba(255,255,255,.82)'; if(mode.includes('nebula')) col=Math.sin(t+o.a)>0?'rgba(113,230,255,.72)':'rgba(196,120,255,.65)';
   if(mode.includes('cyber')||mode.includes('matrix')){ctx.fillStyle=col;ctx.font=(10+o.r*5)+'px monospace';ctx.fillText(mode.includes('matrix')?(Math.random()>.5?'1':'0'):'▏',o.x,o.y);o.y+=o.v*2.2;o.x+=Math.sin(t+o.a)*.25;if(o.y>innerHeight+20){o.y=-20;o.x=Math.random()*innerWidth}}
   else {ctx.beginPath();ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=12;ctx.arc(o.x,o.y,o.r*(mode.includes('starfield')?0.8:1.4),0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;o.y+=mode.includes('snow')?o.v*1.1:Math.sin(t+o.a)*.18;o.x+=mode.includes('snow')?Math.sin(t+o.a)*.35:Math.cos(t*.45+o.a)*.22;if(o.y>innerHeight+10)o.y=-10;if(o.x>innerWidth+10)o.x=-10;if(o.x<-10)o.x=innerWidth+10}}
  }); if(!reduce) raf=requestAnimationFrame(draw)} draw();
 window.addEventListener('d4:wallpaper-change',()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize);c.remove()},{once:true});
})();