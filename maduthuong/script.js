// Load nội dung vào #app
function loadView(file) {
  fetch(file)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("app").innerHTML = html;
      handleEvents(file);
    });
}

// Gọi lần đầu: load QR
loadView("qr.html");

// Gắn sự kiện tùy theo bước
function handleEvents(view) {
  if (view === "qr.html") {
    document.getElementById("nextToPhone").addEventListener("click", () => {
      loadView("phone.html");
    });
  }

  if (view === "phone.html") {
    document.getElementById("form").addEventListener("submit", function (e) {
      e.preventDefault();
      const phone = document.getElementById("phone").value.trim();

      if (!/^0\d{9}$/.test(phone)) {
        alert("Vui lòng nhập đúng số điện thoại (10 số bắt đầu bằng 0).");
        return;
      }

      loadView("result.html");
      setTimeout(() => showRandomNumber(), 300); // đợi DOM render
    });
  }
}

// Quay số và hiện kết quả
function showRandomNumber() {
  const display = document.getElementById("randomNumber");
  let count = 0;
  const final = Math.floor(Math.random() * 300) + 1;

  const interval = setInterval(() => {
    const temp = Math.floor(Math.random() * 300) + 1;
    display.textContent = String(temp).padStart(2, "0");
    count++;
    if (count >= 10) {
      clearInterval(interval);
      display.textContent = String(final).padStart(2, "0");
    }
  }, 100);
}
