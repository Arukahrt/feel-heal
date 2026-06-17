/* global React */
const { Fragment } = React;

/* ============================================================
   HERO 1 — CALM MINIMAL
   ============================================================ */
function Hero1() {
  return (
    <div className="h1">
      <nav>
        <div className="brand"><span className="dot"></span><b>Feel &amp; Heal</b></div>
        <div className="links">
          <span>Beranda</span><span>Layanan</span><span>Alur</span><span>Tentang</span>
        </div>
        <div className="navcta">Hubungi Admin</div>
      </nav>
      <div className="wrap">
        <div className="copy">
          <div className="kick">Pendampingan emosional reflektif</div>
          <h1>Ruang aman untuk <em>merasakan</em>, memahami, dan pulih.</h1>
          <p className="sub">Feel &amp; Heal menemani mahasiswa dan pekerja muda mengenali kondisi emosionalnya secara lebih terarah — tanpa menghakimi, dengan langkah yang lembut.</p>
          <div className="acts">
            <div className="btn-fill">Mulai Emotional Check-Up</div>
            <div className="btn-ghost">Lihat alur layanan</div>
          </div>
          <div className="chips">
            <span className="chip">Emotional Check-Up</span>
            <span className="chip">Guided Healing</span>
            <span className="chip">Follow-Up Support</span>
          </div>
        </div>
        <div className="visual">
          <div className="leaf"></div>
          <div className="ph"><span>foto suasana tenang</span></div>
          <div className="card">
            <div className="ttl">Check-up hari ini</div>
            <div className="big">Kamu sudah lebih baik</div>
            <div className="bar"><i></i></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HERO 2 — SOFT EDITORIAL
   ============================================================ */
function Hero2() {
  return (
    <div className="h2">
      <div className="top">
        <div className="brand">Feel &amp; Heal</div>
        <div className="links">
          <span>Beranda</span><span>Layanan</span><span>Alur</span><span>Tentang</span><span>Kontak</span>
        </div>
        <div className="meta">Emotional Wellbeing</div>
      </div>
      <div className="grid">
        <div className="left">
          <div className="issue">Vol. 01 — Reflective Companion</div>
          <h1>It&rsquo;s okay to not be okay, <em>take your time</em> to feel <span className="amp">&amp;</span> heal.</h1>
          <p className="lede">Layanan pendampingan emosional reflektif untuk mengenali kondisi emosional, memahami akar permasalahan, dan menemukan langkah healing yang lebih terarah.</p>
          <div className="rule"></div>
          <div className="idx">
            <div className="row"><span className="n">01</span><span className="t">Emotional Check-Up</span><span>identifikasi</span></div>
            <div className="row"><span className="n">02</span><span className="t">Guided Healing Session</span><span>refleksi</span></div>
            <div className="row"><span className="n">03</span><span className="t">Follow-Up Support</span><span>pendampingan</span></div>
          </div>
        </div>
        <div className="right">
          <div className="tag">Online · Hybrid</div>
          <div className="ph"><span>potret reflektif</span></div>
          <div className="cap">
            <div className="q">&ldquo;Feel. Heal. Grow.&rdquo;</div>
            <div className="pg">FH / 001</div>
          </div>
        </div>
      </div>
      <div className="actbar">
        <div className="go">Mulai Emotional Check-Up</div>
        <div className="sec">Hangat · Tanpa menghakimi · Mudah diakses</div>
      </div>
    </div>
  );
}

/* ============================================================
   HERO 3 — PLAYFUL / GEN-Z
   ============================================================ */
function Hero3() {
  return (
    <div className="h3">
      <div className="blob b1"></div>
      <div className="blob b2"></div>
      <nav>
        <div className="brand"><span className="s">F</span>Feel &amp; Heal</div>
        <div className="links">
          <span className="on">Beranda</span><span>Layanan</span><span>Alur</span><span>Tentang</span>
        </div>
        <div className="navcta">Hubungi Admin</div>
      </nav>
      <div className="stage">
        <div className="copy">
          <div className="pill"><span className="d"></span>It&rsquo;s okay to not be okay</div>
          <h1>Kenali perasaanmu, <span className="hl">pelan-pelan pulih</span>.</h1>
          <p className="sub">Ruang pendampingan emosional yang hangat buat mahasiswa &amp; pekerja muda. Mulai dari check-up, lanjut sesi healing, sampai follow-up — semua dengan caramu sendiri.</p>
          <div className="acts">
            <div className="go">Mulai Check-Up ✦</div>
            <div className="alt">Hubungi Admin</div>
          </div>
          <div className="marq">
            <span className="sticker">overthinking</span>
            <span className="sticker">burnout</span>
            <span className="sticker">insecure</span>
          </div>
        </div>
        <div className="collage">
          <div className="card c-main"><div className="ph"><span>foto / ilustrasi</span></div></div>
          <div className="card c-mood">
            <div className="lbl">Mood check</div>
            <div className="row"><i></i><i className="act"></i><i></i><i></i><i></i></div>
          </div>
          <div className="card c-chk">
            <div className="ic">✓</div>
            <div className="tx"><b>Check-up selesai</b><s>5 menit aja</s></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Hero1, Hero2, Hero3 });
