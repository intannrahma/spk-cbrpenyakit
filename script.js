
function cosineSimilarity(a, b) {
  let pembilang = 0;
  let jumlahA = 0;
  let jumlahB = 0;

  for (let i = 0; i < a.length; i++) {
    pembilang += a[i] * b[i];
    jumlahA += a[i] * a[i];
    jumlahB += b[i] * b[i];
  }

  const penyebut = Math.sqrt(jumlahA) * Math.sqrt(jumlahB);

  if (penyebut === 0) return 0;

  return (pembilang / penyebut) * 100;
}

function bukaHalaman(halaman) {
  if (halaman === "diagnosis") {
    tampilkanDiagnosis();
  } else if (halaman === "penyakit") {
    tampilkanPenyakit();
  } else {
    tampilkanBeranda();
  }
}

function tampilkanBeranda() {
  document.getElementById("app").innerHTML = `
    <section class="panel">
      <p>SISTEM PENDUKUNG KEPUTUSAN</p>
      <h1>Diagnosis Penyakit Tanaman Anggur</h1>
      <p>
        Sistem ini membantu membandingkan gejala tanaman anggur
        dengan basis kasus menggunakan metode Case-Based Reasoning
        dan perhitungan Cosine Similarity.
      </p>
      <button class="button" onclick="bukaHalaman('diagnosis')">
        Mulai Diagnosis
      </button>
    </section>

    <section class="panel">
      <h2>Tentang Sistem</h2>
      <p>
        Pilih gejala yang ditemukan pada tanaman. Sistem akan
        menghitung nilai kemiripan dengan setiap kasus.
      </p>
    </section>
  `;
}

function tampilkanDiagnosis() {
  let daftar = "";

  for (const kode in gejala) {
    daftar += `
      <label class="gejala">
        <input type="checkbox" name="gejala" value="${kode}">
        <b>${kode}</b> — ${gejala[kode].nama}
        <br><small>Bobot gejala: ${gejala[kode].bobot}</small>
      </label>
    `;
  }

  document.getElementById("app").innerHTML = `
    <section class="panel">
      <h1>Diagnosis Penyakit</h1>
      <p>Centang gejala yang ditemukan pada tanaman anggur.</p>
      <form id="formDiagnosis">
        ${daftar}
        <button class="button" type="submit">Proses Diagnosis</button>
      </form>
    </section>
    <div id="hasilDiagnosis"></div>
  `;

  document.getElementById("formDiagnosis").onsubmit = function(event) {
    event.preventDefault();

    const pilihan = Array.from(
      document.querySelectorAll('input[name="gejala"]:checked')
    ).map(input => input.value);

    const area = document.getElementById("hasilDiagnosis");

    if (pilihan.length === 0) {
      area.innerHTML = `
        <section class="panel">
          <h2>Gejala belum dipilih</h2>
          <p>Pilih setidaknya satu gejala.</p>
        </section>`;
      return;
    }

    const kasusBaru = Object.keys(gejala).map(
      kode => pilihan.includes(kode) ? 1 : 0
    );

    const hasil = Object.keys(basisKasus).map(kode => ({
      kode: kode,
      nilai: cosineSimilarity(kasusBaru, basisKasus[kode])
    }));

    hasil.sort((a, b) => b.nilai - a.nilai);

    const terbaik = hasil[0];

    const daftarHasil = hasil.map(item => `
      <div class="hasil">
        <b>${item.kode} — ${penyakit[item.kode].nama}</b>
        <p class="persen">${item.nilai.toFixed(2)}%</p>
      </div>
    `).join("");

    area.innerHTML = `
      <section class="panel">
        <h1>Hasil Diagnosis</h1>
        <div class="hasil">
          <p>Kasus dengan nilai kemiripan tertinggi</p>
          <h2>${penyakit[terbaik.kode].nama}</h2>
          <p class="persen">${terbaik.nilai.toFixed(2)}%</p>
          <p>Kode penyakit: ${terbaik.kode}</p>
        </div>
        <h2>Perbandingan Semua Kasus</h2>
        ${daftarHasil}
        <p>Hasil ini berdasarkan basis kasus yang tersimpan.</p>
      </section>
    `;
  };
}

function tampilkanPenyakit() {
  let daftar = "";

  for (const kode in penyakit) {
    daftar += `
      <div class="hasil">
        <b>${kode}</b>
        <h2>${penyakit[kode].nama}</h2>
        <p>${penyakit[kode].keterangan}</p>
      </div>
    `;
  }

  document.getElementById("app").innerHTML = `
    <section class="panel">
      <h1>Data Penyakit Tanaman Anggur</h1>
      <p>Daftar penyakit yang tersimpan dalam sistem.</p>
      ${daftar}
    </section>
  `;
}

tampilkanBeranda();
