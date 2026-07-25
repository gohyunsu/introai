(() => {
  const colors = {
    ink: "#171813",
    paper: "#f3f0e7",
    lime: "#e8ff64",
    coral: "#ff8066",
    blue: "#79a7ff",
    violet: "#a88cf5",
    mint: "#6fd8b3",
    muted: "#8c8e84"
  };

  const isDark = () => document.documentElement.dataset.theme === "dark";
  const ink = () => (isDark() ? "#f3f0e7" : colors.ink);
  const paper = () => (isDark() ? "#1b1c16" : colors.paper);
  const muted = () => (isDark() ? "#a9aa9f" : "#686b62");

  function fitCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(280, rect.width);
    const height = Math.max(280, rect.height);
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, width, height, dpr };
  }

  function roundedRect(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
  }

  function text(ctx, value, x, y, size = 12, color = ink(), align = "left", weight = 500) {
    ctx.save();
    ctx.font = `${weight} ${size}px "Noto Sans KR", sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(value, x, y);
    ctx.restore();
  }

  function mono(ctx, value, x, y, size = 9, color = muted(), align = "left") {
    ctx.save();
    ctx.font = `500 ${size}px "DM Mono", monospace`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(value, x, y);
    ctx.restore();
  }

  function line(ctx, x1, y1, x2, y2, color = "rgba(90,90,80,.25)", width = 1, dash = []) {
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash(dash);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
  }

  function point(ctx, x, y, color, radius = 6, stroke = paper()) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }

  function listenResize(draw) {
    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", handler);
    window.addEventListener("themechange", handler);
    return handler;
  }

  function initHeroMap() {
    const canvas = document.querySelector("#hero-map");
    if (!canvas) return;
    let frame = 0;
    const nodes = [
      { x: .16, y: .17, label: "문제", color: colors.blue, r: 17 },
      { x: .42, y: .12, label: "데이터", color: colors.blue, r: 24 },
      { x: .68, y: .22, label: "전처리", color: colors.blue, r: 17 },
      { x: .27, y: .42, label: "모델", color: colors.coral, r: 24 },
      { x: .56, y: .44, label: "손실", color: colors.coral, r: 16 },
      { x: .78, y: .53, label: "최적화", color: colors.coral, r: 19 },
      { x: .35, y: .70, label: "표현", color: colors.violet, r: 22 },
      { x: .61, y: .76, label: "일반화", color: colors.mint, r: 25 },
      { x: .82, y: .84, label: "응용", color: colors.lime, r: 18 }
    ];
    const edges = [[0,1],[1,2],[1,3],[2,4],[3,4],[4,5],[3,6],[4,6],[5,7],[6,7],[7,8],[8,0]];

    function draw() {
      const { ctx, width, height } = fitCanvas(canvas);
      ctx.clearRect(0, 0, width, height);
      const padX = 55;
      const padY = 45;
      const positions = nodes.map(n => ({
        ...n,
        px: padX + n.x * (width - padX * 2),
        py: padY + n.y * (height - padY * 2)
      }));

      edges.forEach(([a, b], index) => {
        const p1 = positions[a];
        const p2 = positions[b];
        const pulse = (Math.sin(frame * .025 - index * .7) + 1) / 2;
        line(ctx, p1.px, p1.py, p2.px, p2.py, isDark() ? "rgba(255,255,255,.18)" : "rgba(23,24,19,.2)", 1, [5, 7]);
        const x = p1.px + (p2.px - p1.px) * pulse;
        const y = p1.py + (p2.py - p1.py) * pulse;
        point(ctx, x, y, p2.color, 2.6, p2.color);
      });

      positions.forEach((n, index) => {
        ctx.save();
        ctx.shadowColor = `${n.color}88`;
        ctx.shadowBlur = 22 + Math.sin(frame * .03 + index) * 6;
        point(ctx, n.px, n.py, n.color, n.r, isDark() ? "#1b1c16" : "#fffdf7");
        ctx.restore();
        text(ctx, n.label, n.px, n.py + n.r + 17, 10, ink(), "center", 700);
      });

      frame += 1;
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        requestAnimationFrame(draw);
      }
    }
    draw();
  }

  function seededPoints() {
    return [
      [.15,.30,0],[.21,.24,0],[.27,.36,0],[.33,.22,0],[.19,.44,0],[.38,.31,0],[.30,.48,0],[.12,.54,0],
      [.61,.25,1],[.70,.19,1],[.78,.30,1],[.66,.38,1],[.84,.42,1],[.73,.50,1],[.88,.25,1],[.58,.48,1],
      [.43,.66,0],[.54,.74,0],[.32,.78,0],[.48,.88,0],[.66,.72,1],[.76,.80,1],[.85,.66,1]
    ];
  }

  function initBoundaryLab() {
    const canvas = document.querySelector("#boundary-lab");
    if (!canvas) return;
    const buttons = [...document.querySelectorAll("[data-boundary-model]")];
    const explanation = document.querySelector(".bridge-explanation");
    const reset = document.querySelector("[data-boundary-reset]");
    let model = "knn";
    let points = seededPoints();
    let query = [.5, .52];

    const descriptions = {
      knn: "가까운 샘플의 다수결. 훈련은 빠르지만 예측 때 모든 데이터를 기억합니다.",
      linear: "하나의 직선 경계를 학습. 간결하고 해석하기 쉽지만 휘어진 구조는 놓칩니다.",
      neural: "여러 비선형 조각을 합쳐 경계를 구성. 더 유연하지만 복잡도와 검증이 중요합니다."
    };

    function predict(nx, ny) {
      if (model === "linear") return nx + .18 * ny > .59 ? 1 : 0;
      if (model === "neural") {
        const wave = .50 + .10 * Math.sin(ny * 10.5) - .08 * Math.cos(nx * 8);
        return nx > wave ? 1 : 0;
      }
      const nearest = points
        .map(p => ({ d: (p[0] - nx) ** 2 + (p[1] - ny) ** 2, c: p[2] }))
        .sort((a,b) => a.d - b.d)
        .slice(0, 5);
      return nearest.reduce((sum, p) => sum + p.c, 0) >= 3 ? 1 : 0;
    }

    function draw() {
      const { ctx, width, height } = fitCanvas(canvas);
      ctx.clearRect(0,0,width,height);
      const cell = 12;
      for (let y = 0; y < height; y += cell) {
        for (let x = 0; x < width; x += cell) {
          const c = predict(x / width, y / height);
          ctx.fillStyle = c ? "rgba(255,128,102,.10)" : "rgba(121,167,255,.10)";
          ctx.fillRect(x,y,cell,cell);
        }
      }
      points.forEach(p => point(ctx, p[0] * width, p[1] * height, p[2] ? colors.coral : colors.blue, 6, "#20211b"));
      const qx = query[0] * width;
      const qy = query[1] * height;
      ctx.beginPath();
      ctx.arc(qx, qy, 13, 0, Math.PI*2);
      ctx.strokeStyle = colors.lime;
      ctx.lineWidth = 3;
      ctx.stroke();
      text(ctx, predict(...query) ? "B" : "A", qx, qy, 10, "#fff", "center", 800);
      mono(ctx, `${model.toUpperCase()} · CLICK TO ADD`, 15, height - 15, 9, "rgba(255,255,255,.52)");
    }

    buttons.forEach(button => button.addEventListener("click", () => {
      buttons.forEach(b => b.classList.toggle("is-active", b === button));
      model = button.dataset.boundaryModel;
      explanation.textContent = descriptions[model];
      draw();
    }));
    canvas.addEventListener("click", event => {
      const rect = canvas.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = (event.clientY - rect.top) / rect.height;
      query = [nx, ny];
      const cls = event.shiftKey ? 1 : predict(nx, ny);
      points.push([nx, ny, cls]);
      draw();
    });
    reset?.addEventListener("click", () => {
      points = seededPoints();
      query = [.5,.52];
      draw();
    });
    listenResize(draw);
    draw();
  }

  function controlRange(name, label, min, max, step, value, suffix = "") {
    return `
      <div class="control-group">
        <label for="${name}">${label}<output data-output="${name}">${value}${suffix}</output></label>
        <input id="${name}" data-control="${name}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" />
      </div>`;
  }

  function controlButton(name, label) {
    return `<div class="control-group"><button type="button" data-control="${name}">${label}</button></div>`;
  }

  function setResult(root, label, value) {
    const target = root.querySelector(".control-result");
    if (target) target.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  }

  function bindRange(root, name, state, draw, format = value => value) {
    const input = root.querySelector(`[data-control="${name}"]`);
    const output = root.querySelector(`[data-output="${name}"]`);
    if (!input) return;
    input.addEventListener("input", () => {
      state[name] = Number(input.value);
      if (output) output.textContent = format(state[name]);
      draw();
    });
  }

  function createTimeline(root, canvas, controls) {
    const events = [
      ["1950", "튜링 테스트", "기계의 지능을 행동으로 질문"],
      ["1957", "퍼셉트론", "학습 가능한 선형 결정"],
      ["1986", "다층망·역전파", "여러 층에 오차를 전달"],
      ["1990s", "CNN·LSTM", "공간과 시간 구조를 반영"],
      ["2012", "AlexNet", "데이터·GPU·알고리즘의 결합"],
      ["2014", "GAN", "적대적 학습으로 분포 생성"],
      ["2017", "Transformer", "Attention 기반 시퀀스 모델링"],
      ["2020s", "기반 모델", "대규모 사전학습과 멀티모달"]
    ];
    const state = { year: 4 };
    controls.innerHTML = controlRange("year", "TIMELINE", 0, events.length - 1, 1, 4) +
      `<div class="control-result"></div>`;

    function draw() {
      const { ctx, width, height } = fitCanvas(canvas);
      ctx.clearRect(0,0,width,height);
      const pad = 45;
      const y = height * .48;
      line(ctx,pad,y,width-pad,y,isDark() ? "rgba(255,255,255,.24)" : "rgba(23,24,19,.24)",2);
      events.forEach((event,i) => {
        const x = pad + i * ((width - 2*pad)/(events.length-1));
        const active = i <= state.year;
        point(ctx,x,y,active ? colors.coral : (isDark() ? "#45463f" : "#c9c6bc"), i === state.year ? 10 : 5, paper());
        if (i === state.year) {
          roundedRect(ctx, Math.max(10,x-100), y-125, 200, 82, 14);
          ctx.fillStyle = colors.lime;
          ctx.fill();
          mono(ctx,event[0],Math.max(25,x-85),y-103,9,colors.ink);
          text(ctx,event[1],Math.max(25,x-85),y-80,14,colors.ink,"left",800);
          text(ctx,event[2],Math.max(25,x-85),y-58,9,"#56584f","left",500);
        }
        if (i % 2 === 0 || width > 600) mono(ctx,event[0],x,y+25,8,muted(),"center");
      });
      text(ctx,"아이디어",pad,height-30,10,muted());
      text(ctx,"환경과 규모",width-pad,height-30,10,muted(),"right");
      setResult(root, "현재 전환점", `${events[state.year][0]} · ${events[state.year][1]}`);
    }
    bindRange(root,"year",state,draw,v => events[v][0]);
    listenResize(draw);
    draw();
  }

  function createKnn(root, canvas, controls) {
    const pts = seededPoints().slice(0,16);
    const state = { k: 5, qx: .48, qy: .52 };
    controls.innerHTML = controlRange("k","NEIGHBORS",1,15,2,5) + `<div class="control-result"></div>`;
    function nearest() {
      return pts.map((p,i)=>({ ...p, i, d:(p[0]-state.qx)**2+(p[1]-state.qy)**2 }))
        .sort((a,b)=>a.d-b.d).slice(0,state.k);
    }
    function draw() {
      const {ctx,width,height}=fitCanvas(canvas);
      ctx.clearRect(0,0,width,height);
      const near=nearest();
      const maxD=Math.sqrt(near.at(-1).d);
      ctx.beginPath();
      ctx.arc(state.qx*width,state.qy*height,maxD*Math.min(width,height),0,Math.PI*2);
      ctx.fillStyle="rgba(232,255,100,.16)";
      ctx.fill();
      ctx.strokeStyle=colors.lime;
      ctx.setLineDash([5,5]);
      ctx.stroke();
      ctx.setLineDash([]);
      pts.forEach((p,i)=>point(ctx,p[0]*width,p[1]*height,p[2]?colors.coral:colors.blue,near.some(n=>n.i===i)?8:5,paper()));
      point(ctx,state.qx*width,state.qy*height,colors.lime,11,colors.ink);
      const votes=near.reduce((s,p)=>s+p[2],0);
      setResult(root,"이웃의 투표",`${votes >= state.k/2 ? "B" : "A"} · A ${state.k-votes} : ${votes} B`);
    }
    bindRange(root,"k",state,draw,v=>`${v}개`);
    canvas.addEventListener("click",e=>{
      const r=canvas.getBoundingClientRect();
      state.qx=(e.clientX-r.left)/r.width;
      state.qy=(e.clientY-r.top)/r.height;
      draw();
    });
    listenResize(draw);draw();
  }

  function createScaling(root, canvas, controls) {
    const pts = [
      [22,170,0],[25,230,0],[28,260,0],[30,390,0],[33,450,0],[35,600,0],
      [10,8,1],[11,10,1],[12,12,1],[13,16,1],[15,20,1]
    ];
    const state={ scaled:0 };
    controls.innerHTML = controlRange("scaled","VIEW",0,1,1,0) + `<div class="control-result"></div>`;
    function transform(p) {
      if (!state.scaled) return [p[0]/40,p[1]/650,p[2]];
      const mean=[24,252],std=[9.3,223];
      return [((p[0]-mean[0])/std[0]+2)/4,((p[1]-mean[1])/std[1]+1.3)/3,p[2]];
    }
    function draw(){
      const {ctx,width,height}=fitCanvas(canvas);ctx.clearRect(0,0,width,height);
      const pad=35;
      line(ctx,pad,height-pad,width-pad,height-pad,isDark()?"#55564f":"#bbb9b0");
      line(ctx,pad,pad,pad,height-pad,isDark()?"#55564f":"#bbb9b0");
      pts.map(transform).forEach(p=>point(ctx,pad+p[0]*(width-2*pad),height-pad-p[1]*(height-2*pad),p[2]?colors.blue:colors.coral,6,paper()));
      const sample=transform([25,150,2]);
      point(ctx,pad+sample[0]*(width-2*pad),height-pad-sample[1]*(height-2*pad),colors.lime,10,colors.ink);
      mono(ctx,state.scaled?"STANDARD SCORE SPACE":"RAW UNIT SPACE",pad+8,pad+8,9,muted());
      setResult(root,"거리의 기준",state.scaled?"길이와 무게가 동등한 단위":"무게 단위가 거리를 지배");
    }
    bindRange(root,"scaled",state,draw,v=>v?"표준화":"원본");
    listenResize(draw);draw();
  }

  const regressionData = [
    [.05,.83],[.12,.76],[.19,.69],[.26,.62],[.34,.55],[.40,.52],[.46,.45],[.53,.42],
    [.59,.32],[.65,.30],[.72,.25],[.78,.18],[.84,.16],[.91,.08]
  ];

  function solvePolynomial(data, degree, lambda) {
    const n=degree+1;
    const A=Array.from({length:n},()=>Array(n).fill(0));
    const b=Array(n).fill(0);
    data.forEach(([x,y])=>{
      const xp=Array.from({length:n},(_,i)=>x**i);
      for(let i=0;i<n;i++){
        b[i]+=xp[i]*y;
        for(let j=0;j<n;j++) A[i][j]+=xp[i]*xp[j];
      }
    });
    for(let i=1;i<n;i++) A[i][i]+=lambda;
    for(let i=0;i<n;i++){
      let max=i;
      for(let j=i+1;j<n;j++) if(Math.abs(A[j][i])>Math.abs(A[max][i])) max=j;
      [A[i],A[max]]=[A[max],A[i]];[b[i],b[max]]=[b[max],b[i]];
      const pivot=A[i][i]||1e-9;
      for(let j=i;j<n;j++) A[i][j]/=pivot;b[i]/=pivot;
      for(let k=0;k<n;k++) if(k!==i){
        const factor=A[k][i];
        for(let j=i;j<n;j++) A[k][j]-=factor*A[i][j];
        b[k]-=factor*b[i];
      }
    }
    return b;
  }

  function createRegression(root, canvas, controls) {
    const state={degree:2,lambda:5};
    controls.innerHTML=controlRange("degree","POLY DEGREE",1,8,1,2)+controlRange("lambda","REGULARIZATION",0,100,1,5)+`<div class="control-result"></div>`;
    function draw(){
      const {ctx,width,height}=fitCanvas(canvas);ctx.clearRect(0,0,width,height);
      const coeff=solvePolynomial(regressionData,state.degree,state.lambda/400);
      regressionData.forEach(([x,y])=>point(ctx,x*width,y*height,colors.blue,5,paper()));
      ctx.beginPath();
      for(let i=0;i<=160;i++){
        const x=i/160;let y=0;coeff.forEach((c,k)=>y+=c*x**k);
        const px=x*width,py=Math.max(-height,Math.min(2*height,y*height));
        if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
      }
      ctx.strokeStyle=colors.coral;ctx.lineWidth=4;ctx.stroke();
      let mse=0;regressionData.forEach(([x,y])=>{let p=0;coeff.forEach((c,k)=>p+=c*x**k);mse+=(y-p)**2;});
      mse/=regressionData.length;
      setResult(root,"훈련 MSE",`${mse.toFixed(4)} · ${state.degree>=6&&state.lambda<15?"과대적합 주의":"균형 탐색"}`);
    }
    bindRange(root,"degree",state,draw,v=>`${v}차`);
    bindRange(root,"lambda",state,draw,v=>v);
    listenResize(draw);draw();
  }

  function createSigmoid(root, canvas, controls) {
    const state={z:0,threshold:50};
    controls.innerHTML=controlRange("z","LOGIT",-8,8,.1,0)+controlRange("threshold","THRESHOLD",10,90,1,50,"%")+`<div class="control-result"></div>`;
    function draw(){
      const {ctx,width,height}=fitCanvas(canvas);ctx.clearRect(0,0,width,height);
      const pad=38;
      line(ctx,pad,height-pad,width-pad,height-pad,isDark()?"#55564f":"#bbb9b0");
      line(ctx,pad,pad,pad,height-pad,isDark()?"#55564f":"#bbb9b0");
      ctx.beginPath();
      for(let i=0;i<=200;i++){
        const z=-8+i/200*16,p=1/(1+Math.exp(-z));
        const x=pad+i/200*(width-2*pad),y=height-pad-p*(height-2*pad);
        if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.strokeStyle=colors.violet;ctx.lineWidth=4;ctx.stroke();
      const p=1/(1+Math.exp(-state.z));
      const x=pad+(state.z+8)/16*(width-2*pad),y=height-pad-p*(height-2*pad);
      line(ctx,pad,height-pad-state.threshold/100*(height-2*pad),width-pad,height-pad-state.threshold/100*(height-2*pad),colors.coral,2,[6,5]);
      point(ctx,x,y,colors.lime,11,colors.ink);
      mono(ctx,"0",pad,height-pad+15,8,muted(),"center");
      mono(ctx,"1",pad,pad-12,8,muted(),"center");
      setResult(root,"MODEL OUTPUT",`p=${p.toFixed(3)} → class ${p>=state.threshold/100?1:0}`);
    }
    bindRange(root,"z",state,draw,v=>v.toFixed(1));
    bindRange(root,"threshold",state,draw,v=>`${v}%`);
    listenResize(draw);draw();
  }

  function createTree(root, canvas, controls) {
    const samples = [
      [8.5,0],[9.1,0],[9.4,0],[9.8,1],[10.1,0],[10.5,1],[10.8,1],[11.1,1],[11.6,1],[12.0,1]
    ];
    const state={threshold:50};
    controls.innerHTML=controlRange("threshold","SUGAR THRESHOLD",0,100,1,50,"%")+`<div class="control-result"></div>`;
    function gini(arr){if(!arr.length)return 0;const p=arr.reduce((s,x)=>s+x[1],0)/arr.length;return 1-p*p-(1-p)*(1-p);}
    function draw(){
      const {ctx,width,height}=fitCanvas(canvas);ctx.clearRect(0,0,width,height);
      const pad=40,th=8.2+state.threshold/100*4.1;
      samples.forEach((s,i)=>{
        const x=pad+(s[0]-8.2)/4.1*(width-2*pad);
        const y=height*.60+(i%2?18:-18);
        point(ctx,x,y,s[1]?colors.coral:colors.blue,7,paper());
      });
      const tx=pad+(th-8.2)/4.1*(width-2*pad);
      line(ctx,tx,55,tx,height-55,colors.lime,4);
      const left=samples.filter(s=>s[0]<=th),right=samples.filter(s=>s[0]>th);
      roundedRect(ctx,18,22,width/2-28,66,12);ctx.fillStyle="rgba(121,167,255,.12)";ctx.fill();
      roundedRect(ctx,width/2+10,22,width/2-28,66,12);ctx.fillStyle="rgba(255,128,102,.12)";ctx.fill();
      text(ctx,`LEFT · n=${left.length} · Gini ${gini(left).toFixed(2)}`,32,45,11,ink(),"left",700);
      text(ctx,`RIGHT · n=${right.length} · Gini ${gini(right).toFixed(2)}`,width/2+24,45,11,ink(),"left",700);
      const parent=gini(samples),weighted=(left.length*gini(left)+right.length*gini(right))/samples.length;
      setResult(root,"정보 이득",`${(parent-weighted).toFixed(3)} · threshold ${th.toFixed(2)}`);
    }
    bindRange(root,"threshold",state,draw,v=>`${v}%`);
    listenResize(draw);draw();
  }

  function createKmeans(root, canvas, controls) {
    const pts = [
      [.14,.26],[.18,.34],[.24,.22],[.29,.31],[.20,.45],[.34,.39],
      [.65,.22],[.73,.28],[.82,.20],[.76,.38],[.88,.34],
      [.42,.70],[.52,.78],[.60,.68],[.48,.88],[.67,.84]
    ];
    const palette=[colors.blue,colors.coral,colors.violet,colors.mint,colors.lime];
    let centers=[];let assignments=[];let phase="assign";
    const state={k:3};
    controls.innerHTML=controlRange("k","CLUSTERS",2,5,1,3)+controlButton("step","다음 단계")+controlButton("reset","초기화")+`<div class="control-result"></div>`;
    function reset(){
      centers=Array.from({length:state.k},(_,i)=>[.2+i*(.6/Math.max(1,state.k-1)),i%2?.7:.25]);
      assignments=Array(pts.length).fill(-1);phase="assign";
    }
    function step(){
      if(phase==="assign"){
        assignments=pts.map(p=>{
          let best=0,dist=Infinity;
          centers.forEach((c,i)=>{const d=(p[0]-c[0])**2+(p[1]-c[1])**2;if(d<dist){dist=d;best=i;}});
          return best;
        });phase="update";
      }else{
        centers=centers.map((c,i)=>{
          const group=pts.filter((_,j)=>assignments[j]===i);
          return group.length?[group.reduce((s,p)=>s+p[0],0)/group.length,group.reduce((s,p)=>s+p[1],0)/group.length]:c;
        });phase="assign";
      }
      draw();
    }
    function draw(){
      const {ctx,width,height}=fitCanvas(canvas);ctx.clearRect(0,0,width,height);
      pts.forEach((p,i)=>point(ctx,p[0]*width,p[1]*height,assignments[i]<0?colors.muted:palette[assignments[i]],6,paper()));
      centers.forEach((c,i)=>{
        ctx.save();ctx.translate(c[0]*width,c[1]*height);ctx.rotate(Math.PI/4);
        ctx.fillStyle=palette[i];ctx.fillRect(-9,-9,18,18);ctx.strokeStyle=ink();ctx.lineWidth=2;ctx.strokeRect(-9,-9,18,18);ctx.restore();
      });
      setResult(root,"NEXT",phase==="assign"?"가까운 중심에 할당":"군집 평균으로 중심 이동");
    }
    bindRange(root,"k",state,()=>{reset();draw();},v=>`${v}개`);
    controls.querySelector('[data-control="step"]').addEventListener("click",step);
    controls.querySelector('[data-control="reset"]').addEventListener("click",()=>{reset();draw();});
    reset();listenResize(draw);draw();
  }

  function createNeuron(root, canvas, controls) {
    const state={x1:3,x2:2,w1:1,w2:-5,b:1,activation:0};
    controls.innerHTML=controlRange("x1","INPUT X₁",-5,5,.1,3)+controlRange("x2","INPUT X₂",-5,5,.1,2)+
      controlRange("w1","WEIGHT W₁",-10,10,1,1)+controlRange("w2","WEIGHT W₂",-10,10,1,-5)+
      controlRange("b","BIAS",-10,10,1,1)+controlRange("activation","ACTIVATION",0,2,1,0)+`<div class="control-result"></div>`;
    const names=["sigmoid","ReLU","tanh"];
    function draw(){
      const {ctx,width,height}=fitCanvas(canvas);ctx.clearRect(0,0,width,height);
      const cy=height/2;
      const nodes=[[.13,.35,`x₁ ${state.x1.toFixed(1)}`],[.13,.66,`x₂ ${state.x2.toFixed(1)}`]];
      nodes.forEach(n=>{point(ctx,n[0]*width,n[1]*height,colors.blue,19,paper());text(ctx,n[2],n[0]*width,n[1]*height,9,colors.ink,"center",700);});
      point(ctx,.50*width,cy,colors.violet,34,paper());text(ctx,"Σ + b",.50*width,cy,12,colors.ink,"center",800);
      point(ctx,.82*width,cy,colors.lime,28,paper());text(ctx,"φ",.82*width,cy,16,colors.ink,"center",800);
      line(ctx,.17*width,.35*height,.46*width,cy,colors.blue,3);
      line(ctx,.17*width,.66*height,.46*width,cy,colors.blue,3);
      line(ctx,.54*width,cy,.78*width,cy,colors.violet,3);
      mono(ctx,`w₁ ${(state.w1/10).toFixed(1)}`,.31*width,.39*height,8,muted(),"center");
      mono(ctx,`w₂ ${(state.w2/10).toFixed(1)}`,.31*width,.62*height,8,muted(),"center");
      const v=state.x1*state.w1/10+state.x2*state.w2/10+state.b/10;
      let y=state.activation===0?1/(1+Math.exp(-v)):state.activation===1?Math.max(0,v):Math.tanh(v);
      setResult(root,"OUTPUT",`v=${v.toFixed(2)} → ${names[state.activation]}(v)=${y.toFixed(3)}`);
    }
    ["x1","x2","w1","w2","b"].forEach(n=>bindRange(root,n,state,draw,v=>n.startsWith("w")||n==="b"?(v/10).toFixed(1):v.toFixed(1)));
    bindRange(root,"activation",state,draw,v=>names[v]);
    listenResize(draw);draw();
  }

  function createConvolution(root, canvas, controls) {
    const image=[
      [0,0,0,0,0,0],[0,1,1,0,0,0],[0,1,1,0,1,1],[0,0,0,0,1,1],[0,0,1,1,1,0],[0,0,1,1,0,0]
    ];
    const kernels=[
      [[-1,0,1],[-1,0,1],[-1,0,1]],
      [[0,-1,0],[-1,5,-1],[0,-1,0]],
      [[1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]]
    ];
    const names=["EDGE","SHARPEN","BLUR"];
    const state={kernel:0,stride:1,padding:0};
    controls.innerHTML=controlRange("kernel","KERNEL",0,2,1,0)+controlRange("stride","STRIDE",1,2,1,1)+controlRange("padding","PADDING",0,1,1,0)+`<div class="control-result"></div>`;
    function conv(){
      const p=state.padding;const padded=Array.from({length:6+2*p},(_,y)=>Array.from({length:6+2*p},(_,x)=>image[y-p]?.[x-p]??0));
      const size=Math.floor((padded.length-3)/state.stride)+1;
      return Array.from({length:size},(_,oy)=>Array.from({length:size},(_,ox)=>{
        let sum=0;for(let ky=0;ky<3;ky++)for(let kx=0;kx<3;kx++)sum+=padded[oy*state.stride+ky][ox*state.stride+kx]*kernels[state.kernel][ky][kx];
        return sum;
      }));
    }
    function grid(ctx,data,x,y,size,label){
      mono(ctx,label,x,y-16,8,muted());
      const rows=data.length,cols=data[0].length,cell=Math.min(size/cols,size/rows);
      const flat=data.flat(),min=Math.min(...flat),max=Math.max(...flat);
      data.forEach((row,iy)=>row.forEach((v,ix)=>{
        const t=(v-min)/(max-min||1);
        ctx.fillStyle=`rgb(${Math.round(35+t*205)},${Math.round(38+t*205)},${Math.round(32+t*145)})`;
        ctx.fillRect(x+ix*cell,y+iy*cell,cell-2,cell-2);
      }));
    }
    function draw(){
      const {ctx,width,height}=fitCanvas(canvas);ctx.clearRect(0,0,width,height);
      const output=conv();const size=Math.min(width*.34,height*.58);
      grid(ctx,image,width*.08,height*.23,size,"INPUT · 6×6");
      grid(ctx,kernels[state.kernel],width*.45,height*.33,size*.55,`${names[state.kernel]} · 3×3`);
      grid(ctx,output,width*.72,height*.23,size,`OUTPUT · ${output.length}×${output.length}`);
      line(ctx,width*.38,height*.49,width*.43,height*.49,colors.coral,3);
      line(ctx,width*.64,height*.49,width*.69,height*.49,colors.coral,3);
      setResult(root,"OUTPUT SHAPE",`${output.length} × ${output.length} · stride ${state.stride}, padding ${state.padding}`);
    }
    bindRange(root,"kernel",state,draw,v=>names[v]);
    bindRange(root,"stride",state,draw,v=>v);
    bindRange(root,"padding",state,draw,v=>v);
    listenResize(draw);draw();
  }

  function createRnn(root, canvas, controls) {
    const tokens=["Cats","say","meow","."];
    let step=0;
    const state={memory:7};
    controls.innerHTML=controlRange("memory","RECURRENT WEIGHT",0,10,1,7)+controlButton("next","다음 토큰")+controlButton("reset","처음으로")+`<div class="control-result"></div>`;
    function draw(){
      const {ctx,width,height}=fitCanvas(canvas);ctx.clearRect(0,0,width,height);
      const pad=40,y=height*.58,gap=(width-2*pad)/(tokens.length-1);
      for(let i=0;i<tokens.length;i++){
        const x=pad+i*gap;
        if(i<tokens.length-1)line(ctx,x+22,y,x+gap-22,y,i<step?colors.violet:(isDark()?"#4a4b44":"#c4c1b7"),4);
        point(ctx,x,y,i<step?colors.violet:(i===step?colors.lime:(isDark()?"#45463f":"#d4d1c7")),i===step?24:18,paper());
        text(ctx,tokens[i],x,y+48,11,ink(),"center",700);
        if(i<step)mono(ctx,`h${i+1}`,x,y-34,8,muted(),"center");
      }
      const retention=(state.memory/10)**Math.max(step,1);
      roundedRect(ctx,width*.22,45,width*.56,70,14);ctx.fillStyle="rgba(168,140,245,.15)";ctx.fill();
      text(ctx,step?`현재 기억: “${tokens.slice(0,step).join(" ")}”`:"첫 토큰을 보내 보세요",width/2,69,13,ink(),"center",800);
      mono(ctx,`EARLY SIGNAL RETENTION ${(retention*100).toFixed(1)}%`,width/2,94,8,muted(),"center");
      setResult(root,"TIMESTEP",`${step} / ${tokens.length} · hidden state 유지 ${(retention*100).toFixed(0)}%`);
    }
    bindRange(root,"memory",state,draw,v=>(v/10).toFixed(1));
    controls.querySelector('[data-control="next"]').addEventListener("click",()=>{step=Math.min(tokens.length,step+1);draw();});
    controls.querySelector('[data-control="reset"]').addEventListener("click",()=>{step=0;draw();});
    listenResize(draw);draw();
  }

  function createAnomaly(root, canvas, controls) {
    const normals=[.08,.10,.12,.14,.15,.17,.18,.19,.20,.21,.22,.23,.24,.25,.26,.28,.29,.31,.33,.35,.38,.41,.44,.47,.52];
    const anomalies=[.43,.55,.62,.71,.79,.88,.94];
    const state={threshold:60};
    controls.innerHTML=controlRange("threshold","ALERT THRESHOLD",10,95,1,60,"%")+`<div class="control-result"></div>`;
    function draw(){
      const {ctx,width,height}=fitCanvas(canvas);ctx.clearRect(0,0,width,height);
      const pad=38,base=height-45;
      line(ctx,pad,base,width-pad,base,isDark()?"#55564f":"#bbb9b0",2);
      const all=[...normals.map(v=>[v,0]),...anomalies.map(v=>[v,1])];
      all.forEach(([v,c],i)=>{
        const x=pad+v*(width-2*pad);const y=base-28-(i%5)*23;
        point(ctx,x,y,c?colors.coral:colors.blue,5,paper());
      });
      const th=state.threshold/100,x=pad+th*(width-2*pad);
      line(ctx,x,35,x,base,colors.lime,4);
      text(ctx,"ALERT →",x+9,48,10,ink(),"left",800);
      const tp=anomalies.filter(v=>v>=th).length,fp=normals.filter(v=>v>=th).length;
      const precision=tp/(tp+fp||1),recall=tp/anomalies.length;
      setResult(root,"운영 결과",`Precision ${(precision*100).toFixed(0)}% · Recall ${(recall*100).toFixed(0)}% · 오탐 ${fp}`);
    }
    bindRange(root,"threshold",state,draw,v=>`${v}%`);
    listenResize(draw);draw();
  }

  const factories = {
    timeline: createTimeline,
    knn: createKnn,
    scaling: createScaling,
    regression: createRegression,
    sigmoid: createSigmoid,
    tree: createTree,
    kmeans: createKmeans,
    neuron: createNeuron,
    convolution: createConvolution,
    rnn: createRnn,
    anomaly: createAnomaly
  };

  window.mountLessonInteractive = function mountLessonInteractive(root, type) {
    if (!root || !factories[type]) return;
    const canvas = root.querySelector(".interactive-canvas");
    const controls = root.querySelector(".interactive-controls");
    factories[type](root, canvas, controls);
  };

  window.addEventListener("DOMContentLoaded", () => {
    initHeroMap();
    initBoundaryLab();
  });
})();
