
function cosineSimilarity(a, b) {
  let dotProduct = 0;
  let sumA = 0;
  let sumB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    sumA += a[i] ** 2;
    sumB += b[i] ** 2;
  }

  if (sumA === 0 || sumB === 0) return 0;

  return dotProduct / (Math.sqrt(sumA) * Math.sqrt(sumB)) * 100;
}

function bukaHalaman(halaman) {
  const app = document.getElementById("app");

  if (halaman === "beranda") {
    app.innerHTML = `
      <section class="panel">
        <h1>SPK CBR Diagnosis Penyakit Pertusis</h1>
        <p>Sistem Pendukung Keputusan menggunakan metode
        Case-Based Reasoning dan Cosine Similarity.</p>
        <button class="button" onclick="bukaHalaman('diagnosis')">
          Mulai Diagnosis
        </button>
      </section>`;
  }

  if (halaman === "diagnosis") {
    app.innerHTML = `
      <section class="panel">
        <h1>Diagnosis Penyakit Pertusis</h1>
        <p>Pilih semua gejala yang dialami.</p>
        <div id="daftar-gejala"></div>
        <button class="button" onclick="prosesDiagnosis()">
          Proses Diagnosis
        </button>
      </section>
      <section class="panel">
        <button class="button" onclick="bukaHalaman('beranda')">
          Kembali
        </button>
      </section>`;

    const daftar = document.getElementById("daftar-gejala");

    Object.entries(gejala).forEach(([kode, item], index) => {
      daftar.insertAdjacentHTML("beforeend", `
        <label class="gejala">
          <input type="checkbox" value="${index}">
          <strong>${kode}</strong> — ${item.nama}
        </label>`);
    });
  }

  if (halaman === "penyakit") {
    app.innerHTML = `
      <section class="panel">
        <h1>Data Penyakit</h1>
        ${Object.entries(penyakit).map(([kode, item]) => `
          <div class="hasil">
            <strong>${kode} — ${item.nama}</strong>
          </div>
        `).join("")}
        <button class="button" onclick="bukaHalaman('beranda')">
          Kembali
        </button>
      </section>`;
  }
}

function prosesDiagnosis() {
  const terpilih = [
    ...document.querySelectorAll(
      '#daftar-gejala input[type="checkbox"]:checked'
    )
  ].map(input => Number(input.value));

  if (terpilih.length === 0) {
    alert("Pilih minimal satu gejala terlebih dahulu.");
    return;
  }

  const vektorBaru = Object.keys(gejala).map((_, index) =>
    terpilih.includes(index) ? 1 : 0
  );

  const hasil = Object.entries(penyakit).map(([kode, item]) => ({
    kode,
    nama: item.nama,
    kemiripan: cosineSimilarity(vektorBaru, item.gejala)
  })).sort((a, b) => b.kemiripan - a.kemiripan);

  const terbaik = hasil[0];

  document.getElementById("app").innerHTML = `
    <section class="panel">
      <h1>Hasil Diagnosis</h1>
      <p>Kasus paling mirip berdasarkan gejala yang dipilih:</p>
      <div class="hasil">
        <h2>${terbaik.nama}</h2>
        <p>Kode penyakit: ${terbaik.kode}</p>
        <p class="persen">${terbaik.kemiripan.toFixed(2)}%</p>
        <p>Nilai kemiripan tertinggi berdasarkan Cosine Similarity.</p>
      </div>
      <h2>Perbandingan Semua Kasus</h2>
      ${hasil.map(item => `
        <div class="hasil">
          <strong>${item.kode} — ${item.nama}</strong>
          <p class="persen">${item.kemiripan.toFixed(2)}%</p>
        </div>
      `).join("")}
      <button class="button" onclick="bukaHalaman('diagnosis')">
        Diagnosis Ulang
      </button>
      <button class="button" onclick="bukaHalaman('beranda')">
        Beranda
      </button>
    </section>`;
}

document.addEventListener("DOMContentLoaded", () => {
  bukaHalaman("beranda");
});
