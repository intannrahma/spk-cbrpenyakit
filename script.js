
function cosineSimilarity(a, b) {
  let dotProduct = 0;
  let sumA = 0;
  let sumB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    sumA += a[i] * a[i];
    sumB += b[i] * b[i];
  }

  if (sumA === 0 || sumB === 0) return 0;

  return (dotProduct / (Math.sqrt(sumA) * Math.sqrt(sumB))) * 100;
}

const kasusBaru = [0, 1, 0, 1, 1, 1, 0, 0, 0];

const dataKasus = [
  {
    kode: "P01",
    nama: "Pertusis Ringan",
    gejala: [1, 1, 1, 1, 0, 0, 0, 0, 0]
  },
  {
    kode: "P02",
    nama: "Pertusis Akut",
    gejala: [0, 0, 1, 1, 1, 1, 0, 0, 0]
  },
  {
    kode: "P03",
    nama: "Pertusis Subakut / Kronis",
    gejala: [0, 0, 0, 1, 0, 0, 1, 1, 1]
  }
];

const hasilDiagnosis = dataKasus.map(kasus => ({
  ...kasus,
  kemiripan: cosineSimilarity(kasusBaru, kasus.gejala)
}));

hasilDiagnosis.sort((a, b) => b.kemiripan - a.kemiripan);

console.log(hasilDiagnosis);
