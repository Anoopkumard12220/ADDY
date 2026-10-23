(function(){
  var b=document.body, $=function(s){return document.querySelector(s)};
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var small=matchMedia('(max-width:700px)').matches;

  /* ---------- Intro ---------- */
  var seen=false; try{seen=sessionStorage.getItem('addy-intro')==='1'}catch(e){}
  var done=false;
  function finish(){
    if(done)return; done=true;
    try{sessionStorage.setItem('addy-intro','1')}catch(e){}
    var i=$('#intro'); i.classList.add('leave');
    b.classList.add('ready');
    setTimeout(function(){i.style.display='none'},1300);
  }
  var s1=$('#s1'), s2=$('#s2');
  if(reduce||seen){ b.classList.add('glass-in'); setTimeout(finish,reduce?50:400); }
  else{
    setTimeout(function(){b.classList.add('glass-in')},100);
    setTimeout(function(){s1.classList.add('show')},700);
    setTimeout(function(){s1.classList.remove('show');s1.classList.add('out')},2000);
    setTimeout(function(){s2.classList.add('show')},2300);
    setTimeout(finish,3900);
  }
  setTimeout(finish,6000); // failsafe

  /* ---------- Liquid glass canvas ---------- */
  var c=$('#gl'), x; try{x=c.getContext('2d')}catch(e){}
  if(!x)return;
  var W,H,dpr,t=0,mx=0,my=0,tx=0,ty=0,last=0;
  var blobs=[
    {x:.02,y:.12,r:.34,p:0},{x:1.0,y:.34,r:.30,p:2},{x:.12,y:1.0,r:.32,p:4},
    {x:.9,y:.98,r:.36,p:1},{x:.5,y:.5,r:.1,p:3}
  ];
  function size(){
    dpr=Math.min(window.devicePixelRatio||1,small?1.5:2);
    W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
  }
  function path(cx,cy,R,p){
    x.beginPath();
    for(var i=0;i<=56;i++){
      var a=i/56*Math.PI*2;
      var r=R*(1+.12*Math.sin(a*3+t*.5+p)+.07*Math.sin(a*5-t*.4+p*2)+.04*Math.sin(a*2+t*.3));
      var px=cx+Math.cos(a)*r, py=cy+Math.sin(a)*r;
      i?x.lineTo(px,py):x.moveTo(px,py);
    }
    x.closePath();
  }
  function draw(bl,k){
    var R=(W+H)/2*bl.r*(bl.r<.2?.6:1);
    var cx=bl.x*W+mx*k+Math.sin(t*.2+bl.p)*14, cy=bl.y*H+my*k+Math.cos(t*.17+bl.p)*14;
    x.save();
    path(cx,cy,R,bl.p);
    var g=x.createRadialGradient(cx-R*.2,cy-R*.25,R*.1,cx,cy,R*1.1);
    g.addColorStop(0,'rgba(255,255,255,.015)');g.addColorStop(.65,'rgba(170,195,205,.06)');g.addColorStop(1,'rgba(255,255,255,.24)');
    x.fillStyle=g;x.fill();
    x.clip();
    var h=x.createLinearGradient(cx-R,cy-R,cx+R*.3,cy+R*.3);
    h.addColorStop(0,'rgba(255,255,255,.2)');h.addColorStop(.4,'rgba(255,255,255,0)');
    x.fillStyle=h;x.fillRect(cx-R*1.3,cy-R*1.3,R*2.6,R*2.6);
    var sh=x.createRadialGradient(cx+R*.3,cy+R*.4,R*.4,cx+R*.3,cy+R*.4,R*1.2);
    sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,0,.55)');
    x.fillStyle=sh;x.fillRect(cx-R*1.3,cy-R*1.3,R*2.6,R*2.6);
    x.restore();
    // chromatic dispersion rims
    x.lineWidth=1.2;
    x.save();x.translate(1.6,0);path(cx,cy,R,bl.p);x.strokeStyle='rgba(255,70,100,.14)';x.stroke();x.restore();
    x.save();x.translate(-1.6,0);path(cx,cy,R,bl.p);x.strokeStyle='rgba(80,220,255,.14)';x.stroke();x.restore();
    // fresnel rim
    path(cx,cy,R,bl.p);
    var rg=x.createLinearGradient(cx-R,cy-R,cx+R,cy+R);
    rg.addColorStop(0,'rgba(255,255,255,.85)');rg.addColorStop(.5,'rgba(255,255,255,.06)');rg.addColorStop(1,'rgba(190,255,230,.4)');
    x.lineWidth=1.6;x.strokeStyle=rg;x.stroke();
    // specular streak
    x.beginPath();x.arc(cx,cy,R*.86,-2.55+Math.sin(t*.3+bl.p)*.1,-1.75,false);
    x.lineWidth=3;x.lineCap='round';x.strokeStyle='rgba(255,255,255,.4)';x.stroke();
  }
  function frame(ts){
    requestAnimationFrame(frame);
    if(document.hidden)return;
    if(small&&ts-last<33)return; last=ts;
    if(!reduce)t+=.016;
    mx+=(tx-mx)*.05;my+=(ty-my)*.05;
    x.clearRect(0,0,W,H);
    x.globalCompositeOperation='lighter';
    for(var i=0;i<blobs.length;i++)draw(blobs[i],(i+1)*-4);
    x.globalCompositeOperation='source-over';
  }
  size();addEventListener('resize',size);
  if(fine&&!reduce)addEventListener('pointermove',function(e){tx=(e.clientX/W-.5)*2;ty=(e.clientY/H-.5)*2;tx*=3;ty*=3;});
  requestAnimationFrame(frame);

  /* ---------- Magnetic dock (desktop) ---------- */
  if(fine&&!reduce){
    document.querySelectorAll('.dock a').forEach(function(a){
      a.addEventListener('pointermove',function(e){
        var r=a.getBoundingClientRect();
        a.style.transform='translate('+((e.clientX-r.left-r.width/2)*.2)+'px,-4px) scale(1.08)';
      });
      a.addEventListener('pointerleave',function(){a.style.transform=''});
    });
  }
})();
