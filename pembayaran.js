class Pembayaran {
    constructor(idPembayaran, jumlah, tanggal, status = false) {
        this.idPembayaran = idPembayaran;
        this.jumlah = jumlah;
        this.tanggal = tanggal;
        this.status = status;
    }

    setStatus(status) {
        this.status = status;
    }

    infoPembayaran() {
        return {
            "ID Pembayaran": this.idPembayaran,
            "Jumlah": this.jumlah,
            "Tanggal": this.tanggal,
            "Status": this.status ? "Sudah Dibayar" : "Belum Dibayar"
        };
    }
}

const daftarPembayaran = [];
const dictPembayaran = {};

function tambahPembayaran(idPembayaran, jumlah, tanggal, status = false) {
    try {
        jumlah = parseFloat(jumlah);
        if (isNaN(jumlah)) throw new Error("Jumlah pembayaran harus berupa angka.");

        const pembayaranBaru = new Pembayaran(idPembayaran, jumlah, tanggal, status);
        daftarPembayaran.push(pembayaranBaru);
        dictPembayaran[idPembayaran] = pembayaranBaru;
        return `Pembayaran dengan ID ${idPembayaran} berhasil ditambahkan.`;
    } catch (error) {
        return `ERROR: ${error.message}`;
    }
}

function tampilkanSemuaPembayaran() {
    if (daftarPembayaran.length === 0) {
        return "Belum ada pembayaran yang tercatat.";
    }

    return daftarPembayaran.map(pembayaran => pembayaran.infoPembayaran());
}

function cariPembayaran(idPembayaran) {
    const pembayaran = dictPembayaran[idPembayaran];
    if (pembayaran) {
        return pembayaran.infoPembayaran();
    } else {
        return `ERROR: Pembayaran dengan ID ${idPembayaran} tidak ditemukan.`;
    }
}

function ubahStatusPembayaran(idPembayaran, status) {
    const pembayaran = dictPembayaran[idPembayaran];
    if (pembayaran) {
        pembayaran.setStatus(status);
        return `Status pembayaran dengan ID ${idPembayaran} berhasil diubah.`;
    } else {
        return `ERROR: Pembayaran dengan ID ${idPembayaran} tidak ditemukan.`;
    }
}

// Integrasi dengan HTML
function tambahPembayaranHTML() {
    const idPembayaran = document.getElementById("idPembayaran").value;
    const jumlah = document.getElementById("jumlah").value;
    const tanggal = document.getElementById("tanggal").value;
    const status = document.getElementById("status").value === "true";

    const hasil = tambahPembayaran(idPembayaran, jumlah, tanggal, status);
    document.getElementById("output").textContent = hasil;
}

function tampilkanSemuaPembayaranHTML() {
    const hasil = tampilkanSemuaPembayaran();
    document.getElementById("output").textContent = JSON.stringify(hasil, null, 2);
}

function cariPembayaranHTML() {
    const idCari = document.getElementById("idCari").value;
    const hasil = cariPembayaran(idCari);
    document.getElementById("output").textContent = JSON.stringify(hasil, null, 2);
}

function ubahStatusPembayaranHTML() {
    const idUbah = document.getElementById("idUbah").value;
    const ubahStatus = document.getElementById("ubahStatus").value === "true";

    const hasil = ubahStatusPembayaran(idUbah, ubahStatus);
    document.getElementById("output").textContent = hasil;
}
