// Script untuk Kirim Pesan
document.getElementById("contactForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Mencegah refresh halaman

  // Mengambil nilai dari fields
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Menghilangkan pesan error sebelumnya
  document.getElementById("nameError").classList.add("hidden");
  document.getElementById("emailError").classList.add("hidden");
  document.getElementById("messageError").classList.add("hidden");
  document.getElementById("successMessage").classList.add("hidden");

  let valid = true;

  // Validasi input kosong
  if (!name) {
      document.getElementById("nameError").classList.remove("hidden");
      valid = false;
  }
  if (!email) {
      document.getElementById("emailError").classList.remove("hidden");
      valid = false;
  }
  if (!message) {
      document.getElementById("messageError").classList.remove("hidden");
      valid = false;
  }

  if (!valid) {
      return; // Jika ada input yang kosong, hentikan proses
  }

  // Ganti teks tombol dengan icon loading
  const submitButton = document.getElementById("submitButton");
  submitButton.innerHTML = '<div class="loading-spinner"></div>';
  submitButton.disabled = true;

  // Data yang akan dikirim
  const data = { name, email, message };

  try {
      // Mengirim data menggunakan fetch API
      const response = await fetch("https://debug.nafkhanzam.com/web-programming-e03", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      });

      if (response.ok) {
          document.getElementById("successMessage").classList.remove("hidden");
      } else {
          const errorMessage = await response.text();
          alert(`Gagal mengirim pesan. Status: ${response.status}, Pesan: ${errorMessage}`);
      }
  } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengirim data: " + error.message);
  } finally {
      submitButton.innerHTML = "Kirim";
      submitButton.disabled = false;
  }
});

// Script untuk Auto Update Text Field
const inputField = document.getElementById("autoUpdateInput");
const autoUpdateText = document.getElementById("autoUpdateText");

function updateTextAndSave() {
  const inputValue = inputField.value;
  localStorage.setItem("savedText", inputValue); // Simpan di localStorage
  autoUpdateText.textContent = inputValue; // Update teks secara langsung
}

// Cek apakah ada data di localStorage ketika halaman di-refresh atau dibuka kembali
window.onload = function () {
  const savedText = localStorage.getItem("savedText"); // Ambil data dari localStorage
  if (savedText) {
      inputField.value = savedText; // Isi field dengan nilai yang tersimpan
      autoUpdateText.textContent = savedText; // Tampilkan teks yang tersimpan
  }
};

// Tambahkan event listener untuk update teks ketika pengguna mengetik
inputField.addEventListener("input", updateTextAndSave);
