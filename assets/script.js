const symbolMap = {
    A: "∆",
    B: "∑",
    C: "Ω",
    D: "φ",
    E: "ε",
    F: "∫",
    G: "∂",
    H: "μ",
    I: "!",
    J: "∏",
    K: "∝",
    L: "⊥",
    M: "ω",
    N: "Π",
    O: "θ",
    P: "∂",
    Q: "δ",
    R: "∠",
    S: "§",
    T: "τ",
    U: "√",
    V: "∀",
    W: "Φ",
    X: "*",
    Y: "λ",
    Z: "ζ",
};

// Fungsi untuk menggeser karakter dalam symbolMap sebanyak 3 karakter maju ke depan
function shiftSymbolMap(shiftAmount) {
    const shiftedSymbolMap = {};
    const symbols = Object.values(symbolMap);
    for (let key in symbolMap) {
        const index = (symbols.indexOf(symbolMap[key]) + shiftAmount) % symbols.length;
        shiftedSymbolMap[key] = symbols[index];
    }
    return shiftedSymbolMap;
}

// Menggunakan simbol dengan pergeseran 3 karakter maju ke depan
const shiftedSymbolMap = shiftSymbolMap(3);

const daftarKata = ["BUKU", "MEJA", "KOMPUTER", "LAMPU", "SEPEDA", "AQUA", "CINCIN", "GELANG", "SEPATU", "HEADSET", "PENGGARIS", "BAJU", "CELANA","KIPAS","GELAS","KACA","PIRING","KACAMATA","KUNCI","GEMBOK","TOPI","SENDAL","TIKET","PISAU","BANTAL"];

let skor = 0;
let indeksKata = 0;
let kataTerenkripsi = '';

function tampilkanKata() {
    kataTerenkripsi = daftarKata[indeksKata].split('').map(char => shiftedSymbolMap[char] || char).join('');
    document.getElementById("kata-terenkripsi").textContent = kataTerenkripsi;
}

function pesanHasil(pesan) {
    const pesanDiv = document.createElement("div");
    pesanDiv.textContent = pesan;
    pesanDiv.className = "hasil-pesan";
    document.body.appendChild(pesanDiv);

    setTimeout(() => {
        document.body.removeChild(pesanDiv);
    }, 2000);
}

document.getElementById("periksa").addEventListener("click", function () {
    const jawaban = document.getElementById("jawaban").value.toLowerCase();
    const kataAsli = daftarKata[indeksKata].toLowerCase();
    if (jawaban === kataAsli) {
        skor++;
        document.getElementById("skor").textContent = skor;
        pesanHasil("Benar! Jawaban Anda tepat.");

        indeksKata++;
        if (indeksKata < daftarKata.length) {
            tampilkanKata();
            document.getElementById("jawaban").value = "";
        } else {
            const namaPengguna = document.getElementById("nama-pengguna").value;
            localStorage.setItem("skorAkhir", skor);
            localStorage.setItem("namaPengguna", namaPengguna);
            alert("Permainan Selesai! Skor Akhir: " + skor);
            window.location.href = "score.html";
        }
    } else {
        pesanHasil("Maaf, jawaban Anda salah.");

        setTimeout(function () {
            window.location.href = "score.html";
        }, 2000);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const skorAkhir = localStorage.getItem("skorAkhir");
    const namaPengguna = localStorage.getItem("namaPengguna");

    if (skorAkhir && namaPengguna) {
        document.getElementById("skor-akhir").textContent = skorAkhir;
        document.getElementById("nama-pengguna").textContent = namaPengguna;
    } else {
        document.getElementById("skor-akhir").textContent = "0";
        document.getElementById("nama-pengguna").textContent = "Anonim";
    }
});

document.getElementById("ulangi").addEventListener("click", function () {
    skor = 0;
    indeksKata = 0;
    tampilkanKata();
    document.getElementById("skor").textContent = skor;
    document.getElementById("jawaban").value = "";
});

document.getElementById("lanjut").addEventListener("click", function () {
    indeksKata++;
    if (indeksKata < daftarKata.length) {
        tampilkanKata();
        document.getElementById("jawaban").value = "";
    } else {
        alert("Permainan Selesai! Skor Akhir: " + skor);
    }
});

// Memanggil fungsi untuk tampilan pertama
tampilkanKata();
