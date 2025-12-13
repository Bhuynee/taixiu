const accountSection = document.getElementById("account-section");
const gameSection = document.getElementById("game-section");
const xuSpan = document.getElementById("xu-balance");

document.getElementById("btn-login").onclick = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!data.success) {
    alert("Sai tài khoản hoặc mật khẩu");
    return;
  }

  accountSection.style.display = "none"; // ẨN LOGIN
  gameSection.style.display = "block";   // HIỆN GAME
  xuSpan.innerText = data.xu;
};

document.getElementById("btn-register").onclick = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  alert(data.success ? "Đăng ký thành công" : data.msg);
};
