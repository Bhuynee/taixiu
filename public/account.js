const loginBtn = document.getElementById("btn-login");
const registerBtn = document.getElementById("btn-register");
const xuSpan = document.getElementById("xu-balance-account");
const gameSection = document.getElementById("game-section");

loginBtn.onclick = async () => {
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

  xuSpan.innerText = data.xu;
  gameSection.style.display = "block";
};

registerBtn.onclick = async () => {
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
