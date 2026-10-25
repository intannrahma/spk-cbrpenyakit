
const penyakit = {
  P01: {
    nama: "Pertusis Ringan",
    gejala: [1, 1, 1, 1, 0, 0, 0, 0, 0]
  },
  P02: {
    nama: "Pertusis Akut",
    gejala: [0, 0, 1, 1, 1, 1, 0, 0, 0]
  },
  P03: {
    nama: "Pertusis Subakut / Kronis",
    gejala: [0, 0, 0, 1, 0, 0, 1, 1, 1]
  }
};

const gejala = {
  G1: { nama: "Hidung meler" },
  G2: { nama: "Bersin-bersin" },
  G3: { nama: "Demam serta merasa pengap" },
  G4: { nama: "Batuk keras dengan tarikan napas awal yang panjang" },
  G5: { nama: "Terdengar seperti mau muntah" },
  G6: { nama: "Mata merah dan berair" },
  G7: { nama: "Wajah berwarna merah atau biru" },
  G8: { nama: "Menyebabkan kelelahan yang ekstrem" },
  G9: { nama: "Suara tinggi melengking saat menarik napas" }
};

const kasusBaru = {
  kode: "P04",
  gejala: [0, 1, 0, 1, 1, 1, 0, 0, 0]
};
