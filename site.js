/* ====================================================================
   FEEL & HEAL — interactions
   nav drawer · scroll reveal · mini emotional check-up
   ==================================================================== */
(function(){
  var WHATSAPP_NUMBER='6283115601410';

  /* ---------- mobile drawer ---------- */
  function initNav(){
    var burger=document.querySelector('.burger');
    var drawer=document.querySelector('.drawer');
    if(!burger||!drawer) return;
    function toggle(open){
      burger.classList.toggle('open',open);
      drawer.classList.toggle('open',open);
      burger.setAttribute('aria-expanded',open?'true':'false');
      burger.setAttribute('aria-label',open?'Tutup menu':'Buka menu');
      document.body.style.overflow=open?'hidden':'';
    }
    burger.addEventListener('click',function(){toggle(!drawer.classList.contains('open'));});
    drawer.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){toggle(false);});
    });
  }

  /* ---------- scroll reveal ---------- */
  function initReveal(){
    var els=Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if(!els.length) return;

    function reveal(){
      var wh=window.innerHeight;
      els.forEach(function(el){
        if(el.classList.contains('in')) return;
        var top=el.getBoundingClientRect().top;
        if(top < wh - 60){
          el.classList.add('in');
        }
      });
      /* cleanup fully revealed elements */
      els=els.filter(function(el){return !el.classList.contains('in');});
    }

    window.addEventListener('scroll',reveal,{passive:true});
    window.addEventListener('resize',reveal,{passive:true});
    /* trigger on load after a frame so initial opacity:0 paints first */
    requestAnimationFrame(function(){
      requestAnimationFrame(reveal);
    });
  }

  /* ---------- nav shrink on scroll ---------- */
  function initNavScroll(){
    var nav=document.querySelector('.nav');
    if(!nav) return;
    var scrolled=false;
    function check(){
      var s=window.scrollY>40;
      if(s!==scrolled){scrolled=s;nav.classList.toggle('scrolled',s);}
    }
    window.addEventListener('scroll',check,{passive:true});
    check();
  }

  /* ---------- mini emotional check-up ---------- */
  var QUESTIONS=[
    {q:"Akhir-akhir ini, perasaan apa yang paling sering muncul?",
     opts:[
       {t:"Cemas & overthinking",e:"😣",tag:"anxious"},
       {t:"Lelah & kehabisan tenaga",e:"😮‍💨",tag:"burnout"},
       {t:"Hampa atau bingung arah",e:"🌫️",tag:"lost"},
       {t:"Sedih karena hubungan",e:"💔",tag:"relationship"}
     ]},
    {q:"Seberapa sering itu mengganggu harimu?",
     opts:[
       {t:"Hampir setiap hari",e:"●",tag:"high"},
       {t:"Beberapa kali seminggu",e:"◐",tag:"mid"},
       {t:"Sesekali saja",e:"○",tag:"low"},
       {t:"Belum sering, tapi mulai terasa",e:"◇",tag:"watch"}
     ]},
    {q:"Bagaimana kualitas tidur & istirahatmu belakangan?",
     opts:[
       {t:"Cukup & nyenyak",e:"🌙",tag:"sleep_ok"},
       {t:"Sering terganggu / gelisah",e:"😴",tag:"sleep_bad"},
       {t:"Susah tidur / begadang terus",e:"🌑",tag:"insomnia"},
       {t:"Tidur lama tapi tetap lelah",e:"☁",tag:"oversleep"}
     ]},
    {q:"Bagaimana energimu menjalani aktivitas harian?",
     opts:[
       {t:"Masih cukup bertenaga",e:"🔋",tag:"energy_ok"},
       {t:"Sering merasa kewalahan",e:"🪫",tag:"energy_low"},
       {t:"Hampir tidak ada motivasi",e:"⬇️",tag:"energy_empty"},
       {t:"Naik turun dan sulit stabil",e:"↕",tag:"energy_unstable"}
     ]},
    {q:"Bagaimana cara kamu memandang dirimu akhir-akhir ini?",
     opts:[
       {t:"Cukup menerima diri",e:"🌼",tag:"self_ok"},
       {t:"Sering ragu pada diri",e:"🌀",tag:"self_doubt"},
       {t:"Cenderung menyalahkan diri",e:"🥀",tag:"self_blame"},
       {t:"Sering membandingkan diri",e:"≠",tag:"self_compare"}
     ]},
    {q:"Saat ada masalah, kamu biasanya...",
     opts:[
       {t:"Cerita ke orang terdekat",e:"🗣️",tag:"share"},
       {t:"Memendam sendiri",e:"🤐",tag:"keep"},
       {t:"Mengalihkan ke hal lain",e:"🎧",tag:"distract"},
       {t:"Menulis atau merenung sendiri",e:"✎",tag:"reflect"}
     ]},
    {q:"Sudah pernah cerita ke seseorang soal ini?",
     opts:[
       {t:"Belum, ini pertama kali",e:"🌷",tag:"first"},
       {t:"Pernah, tapi belum lega",e:"🍃",tag:"some"},
       {t:"Sering, ingin lebih terarah",e:"🧭",tag:"often"},
       {t:"Belum menemukan orang yang tepat",e:"?",tag:"no_safe_person"}
     ]},
    {q:"Apa yang paling kamu butuhkan sekarang?",
     opts:[
       {t:"Didengar tanpa dihakimi",e:"🫂",tag:"listen"},
       {t:"Memahami akar masalahku",e:"🔍",tag:"insight"},
       {t:"Langkah konkret untuk pulih",e:"🌱",tag:"action"},
       {t:"Dibantu menata prioritas",e:"□",tag:"prioritize"}
     ]},
    {q:"Apa yang paling kamu harapkan setelah sesi ini?",
     opts:[
       {t:"Merasa lebih tenang",e:"🍵",tag:"hope_calm"},
       {t:"Punya arah yang jelas",e:"🧭",tag:"hope_clarity"},
       {t:"Lebih kuat menghadapi hari",e:"🌿",tag:"hope_strength"},
       {t:"Berani cerita dan mulai lagi",e:"✦",tag:"hope_start"}
     ]},
    {q:"Kamu lebih nyaman dengan sesi yang...",
     opts:[
       {t:"Online via chat / call",e:"💬",tag:"online"},
       {t:"Video call (Google Meet)",e:"🎥",tag:"video"},
       {t:"Hybrid / tatap muka terbatas",e:"🤝",tag:"hybrid"},
       {t:"Chat dulu, lanjut call bila siap",e:"→",tag:"chat_then_call"}
     ]}
  ];

  var RESULTS={
    anxious:{title:"Overthinking & Kecemasan",
      desc:"Pikiranmu terdengar penuh dan jarang berhenti. Kamu butuh ruang untuk menata ulang dan bernapas."},
    burnout:{title:"Burnout & Kelelahan Emosional",
      desc:"Energimu terkuras. Ini sinyal untuk berhenti sebentar, dipahami, dan dipulihkan pelan-pelan."},
    lost:{title:"Galau & Kehilangan Arah",
      desc:"Wajar merasa bingung arah. Kita bisa bantu kamu menemukan kembali pijakan dan kebutuhan emosionalmu."},
    relationship:{title:"Tekanan dalam Hubungan",
      desc:"Hubungan bisa terasa berat. Kamu berhak punya ruang aman untuk memprosesnya tanpa dihakimi."},
    default:{title:"Ruang untuk Memahami Diri",
      desc:"Terima kasih sudah jujur pada dirimu. Feel & Heal siap menemani langkah pertamamu."}
  };

  var PACKAGES={
    standard:{
      tier:"Standard",
      title:"Guided Session",
      price:"Rp 10.000 – Rp 15.000",
      icon:"🌿",
      label:"Mulai terarah",
      desc:"Cocok untuk memahami perasaan, menggali akar masalah, dan menyusun coping strategy sederhana.",
      items:["Sesi refleksi diri terarah","Eksplorasi perasaan lebih dalam","Insight & coping strategy personal","Rekomendasi langkah lanjutan"]
    },
    premium:{
      tier:"Premium",
      title:"Healing + Follow-Up",
      price:"Rp 15.000 – Rp 20.000",
      icon:"🌳",
      label:"Pendampingan lanjutan",
      desc:"Cocok saat tekanan terasa intens dan kamu butuh ruang refleksi plus pendampingan setelah sesi.",
      items:["Semua fitur Standard","Sesi refleksi mendalam","Follow-up 1–2 hari setelah sesi","Pendampingan berkelanjutan via WA/TG"]
    }
  };

  function initCheckup(){
    var root=document.querySelector('[data-checkup]');
    if(!root) return;
    var state={i:0,answers:[]};
    /* ---- Saklar AI: set true untuk mengaktifkan refleksi yang digenerate live oleh AI.
       Saat false (default sekarang), hasil memakai refleksi non-AI berbasis jawaban. ---- */
    var USE_AI=true;

    function render(){
      root.classList.remove('has-package-result');
      var total=QUESTIONS.length;
      if(state.i>=total){return renderResult();}
      var Q=QUESTIONS[state.i];
      var pct=Math.round(((state.i)/total)*100)+10;
      var sel=state.answers[state.i];
      root.innerHTML=
        '<div class="ck-top"><span class="ck-step">Pertanyaan '+(state.i+1)+' / '+total+'</span>'+
        '<span class="ck-step">Emotional Check-Up</span></div>'+
        '<div class="ck-bar" role="progressbar" aria-valuenow="'+pct+'" aria-valuemin="0" aria-valuemax="100" aria-label="Progres check-up '+pct+'%"><i style="width:'+pct+'%"></i></div>'+
        '<div class="q" id="ck-question">'+Q.q+'</div>'+
        '<div class="opts" role="group" aria-labelledby="ck-question">'+Q.opts.map(function(o,idx){
          return '<button class="opt'+(sel===idx?' sel':'')+'" data-idx="'+idx+'" type="button" aria-pressed="'+(sel===idx?'true':'false')+'">'+
            '<span class="emo" aria-hidden="true">'+o.e+'</span><span>'+o.t+'</span></button>';
        }).join('')+'</div>'+
        '<div class="ck-nav">'+
          (state.i>0?'<button class="btn btn-cream ck-back" data-act="back" type="button">←</button>':'')+
          '<button class="btn btn-primary" data-act="next" type="button"'+(sel==null?' disabled style="opacity:.45;cursor:not-allowed"':'')+'>'+
          (state.i===total-1?'Lihat Hasil':'Lanjut')+'</button>'+
        '</div>';
      root.querySelectorAll('.opt').forEach(function(b){
        b.addEventListener('click',function(){
          state.answers[state.i]=parseInt(b.dataset.idx,10);
          render();
        });
      });
      var nb=root.querySelector('[data-act="next"]');
      if(nb) nb.addEventListener('click',function(){
        if(state.answers[state.i]==null) return;
        state.i++;render();
      });
      var bb=root.querySelector('[data-act="back"]');
      if(bb) bb.addEventListener('click',function(){state.i--;render();});
    }

    function esc(s){return String(s==null?'':s).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
    function parseJSON(txt){
      if(!txt) return null;
      var m=txt.replace(/```json/gi,'').replace(/```/g,'');
      var a=m.indexOf('{'), b=m.lastIndexOf('}');
      if(a<0||b<0) return null;
      try{return JSON.parse(m.slice(a,b+1));}catch(e){return null;}
    }
    function transcript(){
      return QUESTIONS.map(function(Q,i){
        var o=Q.opts[state.answers[i]];
        return (i+1)+'. '+Q.q+' -> '+(o?o.t+' [tag: '+o.tag+']':'-');
      }).join('\n');
    }
    function bindRestart(){
      var rb=root.querySelector('[data-act="restart"]');
      if(rb) rb.addEventListener('click',function(){state={i:0,answers:[]};render();});
    }
    function answerTags(){
      return state.answers.map(function(a,i){
        var q=QUESTIONS[i], o=q&&q.opts[a];
        return o?o.tag:null;
      }).filter(Boolean);
    }
    function answerText(i){
      var q=QUESTIONS[i], o=q&&q.opts[state.answers[i]];
      return o?o.t:'-';
    }
    function checkupFindings(custom){
      var labels=["Pola utama","Dampak harian","Kebutuhan saat ini"];
      if(custom&&custom.length){
        return custom.slice(0,3).map(function(item,i){
          var text=typeof item==='string'?item:(item&&item.text)||'';
          return {label:(item&&item.label)||labels[i]||"Hasil",text:text};
        }).filter(function(item){return item.text;});
      }
      var tags=answerTags();
      var impact="Intensitasnya masih bisa dipantau sambil kamu belajar mengenali pemicunya.";
      if(tags.indexOf('high')>=0){
        impact="Muncul hampir setiap hari, jadi wajar kalau pikiran dan energimu terasa cepat penuh.";
      }else if(tags.indexOf('mid')>=0){
        impact="Datang beberapa kali dalam seminggu, cukup sering untuk mulai diberi ruang dan perhatian.";
      }
      if(tags.indexOf('insomnia')>=0||tags.indexOf('sleep_bad')>=0){
        impact+=" Pola istirahatmu juga ikut terganggu.";
      }else if(tags.indexOf('oversleep')>=0){
        impact+=" Kamu sudah tidur cukup lama, tapi tubuhmu masih terasa belum pulih.";
      }
      if(tags.indexOf('energy_empty')>=0||tags.indexOf('energy_low')>=0||tags.indexOf('energy_unstable')>=0){
        impact+=" Energi harianmu sedang banyak terkuras.";
      }
      return [
        {label:"Pola utama",text:"Yang paling terasa sekarang adalah "+answerText(0).toLowerCase()+"."},
        {label:"Dampak harian",text:impact},
        {label:"Kebutuhan saat ini",text:"Kamu sedang butuh "+answerText(7).toLowerCase()+" dan lebih nyaman dengan "+answerText(9).toLowerCase()+"."}
      ];
    }
    function renderFindings(items){
      if(!items||!items.length) return '';
      return '<div class="ck-findings"><h4>Hasil check-up</h4>'+
        items.map(function(item){
          return '<div class="ck-finding"><span class="ck-finding-label">'+esc(item.label)+'</span>'+
            '<span>'+esc(item.text)+'</span></div>';
        }).join('')+'</div>';
    }
    function packageRecommendation(){
      var tags=answerTags();
      var main=tags[0]||'default';
      var score=0;
      var weights={
        high:2,mid:1,watch:1,insomnia:2,sleep_bad:1,oversleep:1,energy_empty:2,energy_low:1,energy_unstable:1,
        self_blame:2,self_doubt:1,self_compare:1,keep:1,first:1,no_safe_person:1,action:1,prioritize:1,hope_strength:1,hope_start:1
      };
      tags.forEach(function(t){score+=weights[t]||0;});
      if(main==='burnout'||main==='relationship') score+=1;
      var key=score>=4?'premium':'standard';
      var pkg=PACKAGES[key];
      var reasons=[];
      if(tags.indexOf('high')>=0||tags.indexOf('insomnia')>=0||tags.indexOf('energy_empty')>=0||tags.indexOf('oversleep')>=0){
        reasons.push("Intensitas jawabanmu menunjukkan kamu butuh pendampingan yang lebih terjaga.");
      }
      if(tags.indexOf('insight')>=0||tags.indexOf('prioritize')>=0){
        reasons.push("Kamu ingin memahami akar masalah, jadi sesi refleksi terarah akan lebih membantu.");
      }
      if(tags.indexOf('action')>=0||tags.indexOf('hope_strength')>=0||tags.indexOf('hope_start')>=0){
        reasons.push("Kamu mencari langkah konkret, sehingga rekomendasinya perlu berlanjut setelah sesi.");
      }
      if(tags.indexOf('keep')>=0||tags.indexOf('first')>=0||tags.indexOf('no_safe_person')>=0){
        reasons.push("Karena kamu cenderung menyimpan sendiri, follow-up bisa membantu prosesnya tetap aman.");
      }
      if(!reasons.length){
        reasons.push("Jawabanmu cocok untuk mulai dari sesi refleksi yang ringan, hangat, dan terarah.");
      }
      return {
        tier:pkg.tier,title:pkg.title,price:pkg.price,icon:pkg.icon,label:pkg.label,desc:pkg.desc,
        items:pkg.items,reasons:reasons.slice(0,2)
      };
    }
    function renderPackageCard(pkg){
      var reasons=pkg.reasons.map(function(t){return '<li>'+esc(t)+'</li>';}).join('');
      var items=pkg.items.map(function(t){return '<li>'+esc(t)+'</li>';}).join('');
      var href=pkg.href||'kontak.html';
      return '<aside class="ck-package card price feat">'+
        '<span class="badge">'+esc(pkg.label)+'</span>'+
        '<div class="price-icon" aria-hidden="true">'+esc(pkg.icon)+'</div>'+
        '<span class="tier">'+esc(pkg.tier)+'</span>'+
        '<h3>'+esc(pkg.title)+'</h3>'+
        '<span class="pamt">'+esc(pkg.price)+'</span>'+
        '<p>'+esc(pkg.desc)+'</p>'+
        '<ul class="ck-package-reasons">'+reasons+'</ul>'+
        '<ul>'+items+'</ul>'+
        '<a class="btn btn-cream" href="'+esc(href)+'">Hubungi Admin</a>'+
      '</aside>';
    }
    function contactLink(data,pkg,findings){
      var pairs=[
        ['source','checkup'],
        ['result',data.title],
        ['package',pkg.title],
        ['tier',pkg.tier],
        ['need',answerText(7)],
        ['format',answerText(9)],
        ['summary',data.summary],
        ['finding',(findings&&findings[0]&&findings[0].text)||'']
      ];
      var q=pairs.map(function(pair){
        return encodeURIComponent(pair[0])+'='+encodeURIComponent(pair[1]||'');
      }).join('&');
      return 'kontak.html?'+q+'#hubungi-admin';
    }

    function renderLoading(){
      root.classList.remove('has-package-result');
      root.innerHTML=
        '<div class="ck-loading">'+
          '<div class="ai-badge"><span class="spark">✦</span> Menyusun refleksimu</div>'+
          '<div class="ai-orb"></div>'+
          '<h3>Membaca jawabanmu<span class="dots"><i>.</i><i>.</i><i>.</i></span></h3>'+
          '<p>Sedang menyiapkan refleksi awal dari jawabanmu. Tarik napas sebentar ya.</p>'+
          '<div class="shimmer"></div><div class="shimmer w85"></div><div class="shimmer w60"></div>'+
        '</div>';
    }

    function renderCard(data,ai){
      var insights=(data.insights||[]).map(function(t){return '<li>'+esc(t)+'</li>';}).join('');
      var findingItems=checkupFindings(data.findings);
      var findings=renderFindings(findingItems);
      var pkg=packageRecommendation();
      pkg.href=contactLink(data,pkg,findingItems);
      root.classList.add('has-package-result');
      root.innerHTML=
        '<div class="ck-result-layout">'+
        '<div class="ck-result">'+
        '<div class="badge"><span>✓</span> Check-up selesai</div>'+
        '<h3>'+esc(data.title)+'</h3>'+
        '<p>'+esc(data.summary)+'</p>'+
        (insights?'<ul class="ck-insights">'+insights+'</ul>':'')+
        findings+
        (data.affirmation?'<p class="ck-affirm">“'+esc(data.affirmation)+'”</p>':'')+
        '<p style="font-size:13px;color:var(--muted)">'+
          'Refleksi awal, bukan diagnosis. '+
          'Lanjutkan bersama pendamping kami.</p>'+
        '<div class="acts" style="margin-top:18px">'+
          '<button class="btn btn-cream" data-act="restart">Ulangi check-up</button>'+
        '</div></div>'+
        renderPackageCard(pkg)+
        '</div>';
      bindRestart();
    }

    var INSIGHT={
      high:"Tekanan ini hampir setiap hari menghampiri — wajar kalau kamu merasa lelah.",
      mid:"Beberapa hari terasa lebih berat dari yang lain, dan itu manusiawi.",
      insomnia:"Tidurmu ikut terganggu — tubuh sedang memberi sinyal untuk diperhatikan.",
      sleep_bad:"Istirahatmu belum benar-benar pulih, padahal kamu membutuhkannya.",
      oversleep:"Meski tidur cukup lama, tubuhmu masih terasa belum benar-benar pulih.",
      energy_empty:"Energimu terasa nyaris habis; pelan-pelan dulu tidak apa-apa.",
      energy_low:"Kamu sering merasa kewalahan menjalani hari.",
      energy_unstable:"Energimu naik turun, jadi ritme harianmu mungkin terasa sulit ditebak.",
      self_blame:"Kamu cenderung keras pada diri sendiri — kamu pantas diperlakukan lebih lembut.",
      self_doubt:"Ada keraguan pada diri yang sedang kamu rasakan belakangan ini.",
      self_compare:"Kebiasaan membandingkan diri bisa membuat beban terasa lebih berat.",
      keep:"Kamu terbiasa memendam sendiri; di sini kamu boleh bersuara tanpa takut.",
      distract:"Kamu cenderung mengalihkan perasaan — ruang ini aman untuk benar-benar memprosesnya.",
      reflect:"Kamu mencoba memahami diri lewat refleksi, dan itu bisa jadi pintu awal yang baik.",
      first:"Ini pertama kalinya kamu menceritakan hal ini, dan itu langkah yang berani.",
      no_safe_person:"Belum menemukan orang yang tepat untuk bercerita bisa membuat semuanya terasa lebih berat."
    };
    function fallback(){
      var tags=state.answers.map(function(a,i){return QUESTIONS[i].opts[a].tag;});
      var R=RESULTS[tags[0]]||RESULTS.default;
      var ins=[];
      tags.forEach(function(t){if(INSIGHT[t]&&ins.indexOf(INSIGHT[t])<0&&ins.length<3)ins.push(INSIGHT[t]);});
      renderCard({title:R.title,summary:R.desc,insights:ins,findings:checkupFindings(),
        affirmation:"It's okay to not be okay — take your time to feel and heal."},false);
    }

    function renderResult(){
      renderLoading();
      if(!USE_AI || !(window.claude&&typeof window.claude.complete==='function')){
        return setTimeout(fallback,900);
      }
      var prompt=
        'Kamu adalah pendamping emosional yang hangat, empatik, dan tidak menghakimi untuk layanan "Feel & Heal" '+
        '(emotional check-up, guided healing session, follow-up support, roleplay session) yang menyasar '+
        'mahasiswa dan pekerja muda di Indonesia.\n\n'+
        'Berikut jawaban emotional check-up seorang klien (10 pertanyaan). Setiap baris berisi jawaban eksplisit dan tag analisis internal:\n'+transcript()+'\n\n'+
        'Analisis SEMUA 10 jawaban secara menyeluruh. Perhatikan pola dari: kondisi emosi utama, '+
        'intensitas gangguan, kualitas tidur & energi, cara pandang diri, pola koping, riwayat berbagi, '+
        'kebutuhan saat ini, harapan ke depan, dan preferensi sesi. '+
        'Sintesis semua ini menjadi refleksi yang terasa personal dan relevan dengan kondisi spesifik klien. '+
        'Jangan mengosongkan atau mengabaikan jawaban apa pun; findings wajib merujuk pada jawaban yang benar-benar dipilih.\n\n'+
        'Tulis dalam Bahasa Indonesia, gunakan kata "kamu". JANGAN memberi diagnosis medis atau klaim klinis. '+
        'Balas HANYA dengan JSON valid (tanpa teks lain, tanpa markdown) dengan struktur persis:\n'+
        '{"title":"tema emosi utama 2-4 kata berdasarkan pola keseluruhan jawaban",'+
        '"summary":"2-3 kalimat refleksi hangat yang mencerminkan kondisi spesifik klien — bukan generik",'+
        '"insights":["3 observasi konkret yang merujuk langsung pada pola jawaban klien, bukan pernyataan umum"],'+
        '"findings":["3 hasil check-up konkret: pola emosi utama, dampak harian, dan kebutuhan/format sesi yang terlihat dari jawaban klien"],'+
        '"affirmation":"satu kalimat afirmasi menenangkan dalam Bahasa Indonesia"}';
      window.claude.complete(prompt).then(function(txt){
        var data=parseJSON(txt);
        if(data&&data.title){renderCard(data,true);}else{fallback();}
      }).catch(function(){fallback();});
    }
    render();
  }

  function initContactDeepLink(){
    var target=document.querySelector('[data-checkup-context]');
    if(!window.URLSearchParams) return;
    var params=new URLSearchParams(window.location.search);
    var fromCheckup=params.get('source')==='checkup';
    function clean(key){return params.get(key)||'-';}
    var message=fromCheckup?checkupContactMessage(params):defaultContactMessage();
    document.querySelectorAll('[data-chat-link="whatsapp"]').forEach(function(link){
      link.href='https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(message);
      link.target='_blank';
      link.rel='noopener';
    });
    if(!target||!fromCheckup) return;
    target.hidden=false;
    target.innerHTML=
      '<div class="ck-findings" style="margin:18px 0">'+
        '<h4>Konteks dari hasil check-up</h4>'+
        '<div class="ck-finding"><span class="ck-finding-label">Hasil layanan</span><span>'+escapeHtml(clean('result'))+'</span></div>'+
        '<div class="ck-finding"><span class="ck-finding-label">Rekomendasi paket</span><span>'+escapeHtml(clean('tier'))+' · '+escapeHtml(clean('package'))+'</span></div>'+
        '<div class="ck-finding"><span class="ck-finding-label">Kebutuhan</span><span>'+escapeHtml(clean('need'))+' · '+escapeHtml(clean('format'))+'</span></div>'+
        '<div class="ck-finding"><span class="ck-finding-label">Ringkasan</span><span>'+escapeHtml(clean('summary'))+'</span></div>'+
        '<button class="btn btn-cream" type="button" data-copy-checkup-message>Salin pesan untuk Instagram</button>'+
      '</div>';
    var copy=target.querySelector('[data-copy-checkup-message]');
    if(copy){
      copy.addEventListener('click',function(){
        if(navigator.clipboard&&navigator.clipboard.writeText){
          navigator.clipboard.writeText(message).then(function(){copy.textContent='Pesan tersalin';});
        }else{
          copy.textContent='Salin manual dari ringkasan';
        }
      });
    }
  }

  function defaultContactMessage(){
    return 'Halo Feel & Heal, aku ingin bertanya tentang layanan pendampingan emosional.';
  }

  function checkupContactMessage(params){
    function get(key){return params.get(key)||'-';}
    return [
      'Halo Feel & Heal, aku sudah mengisi Mini Emotional Check-Up.',
      '',
      'Hasil layanan: '+get('result'),
      'Rekomendasi paket: '+get('tier')+' - '+get('package'),
      'Kebutuhan: '+get('need'),
      'Format nyaman: '+get('format'),
      '',
      'Ringkasan: '+get('summary'),
      '',
      'Aku ingin lanjut konsultasi dengan admin.'
    ].join('\n');
  }

  function escapeHtml(s){
    return String(s==null?'':s).replace(/[&<>]/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];
    });
  }

  document.addEventListener('DOMContentLoaded',function(){
    initNav();initReveal();initNavScroll();initCheckup();initContactDeepLink();
  });
})();
