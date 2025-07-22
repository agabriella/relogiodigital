// ================= ELEMENTOS =================
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const toggleBtn = document.getElementById("toggle-format");
const welcomeEl = document.getElementById("welcome");
const welcomeTextEl = document.getElementById("welcome-text");

let use12h = false;

// ================= RELÓGIO =================
function pad(n) {
  return n.toString().padStart(2, "0");
}

function formatTime(date) {
  let h = date.getHours();
  const m = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  if (use12h) {
    const suffix = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return `${pad(h)}:${m}:${s} ${suffix}`;
  }
  return `${pad(h)}:${m}:${s}`;
}

function formatDate(date) {
  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const d = dias[date.getDay()];
  const day = pad(date.getDate());
  const month = meses[date.getMonth()];
  const year = date.getFullYear();
  return `${d}, ${day} ${month} ${year}`;
}

function updateClock() {
  const now = new Date();
  timeEl.textContent = formatTime(now);
  dateEl.textContent = formatDate(now);
}

// ================= BOAS-VINDAS DIGITANDO =================
// Digita texto caractere a caractere
function typeMessage(el, text, speed = 75, done) {
  el.textContent = "";
  let i = 0;
  const intervalId = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(intervalId);
      if (typeof done === "function") done();
    }
  }, speed);
  return intervalId;
}

let welcomeHideTimeout = null;

function hideWelcomeMessage() {
  // Cancela timeout se existir
  if (welcomeHideTimeout) {
    clearTimeout(welcomeHideTimeout);
    welcomeHideTimeout = null;
  }
  welcomeEl.classList.add("hidden");
}

function showWelcomeMessage() {
  welcomeEl.classList.remove("hidden");
  // Remove qualquer listener anterior (opcional, segurança)
  welcomeEl.replaceWith(welcomeEl.cloneNode(true));
  // Precisamos re-obter welcomeEl e welcomeTextEl após replace
  const newWelcomeEl = document.getElementById("welcome");
  const newWelcomeTextEl = document.getElementById("welcome-text");

  // Reatribui refs globais? (ou use variáveis locais)
  // Como as globais já apontam para antigas, vamos só trabalhar locais aqui:
  typeMessage(newWelcomeTextEl, "Wake up, Neo...", 75, () => {
    welcomeHideTimeout = setTimeout(() => {
      newWelcomeEl.classList.add("hidden");
    }, 1500);
  });

  // Fecha ao clicar (antes de esconder automático)
  newWelcomeEl.addEventListener("click", () => {
    newWelcomeEl.classList.add("hidden");
    if (welcomeHideTimeout) clearTimeout(welcomeHideTimeout);
  }, { once: true });
}

// Mostra ao carregar
showWelcomeMessage();

// ================= EVENTOS RELÓGIO =================
toggleBtn.addEventListener("click", () => {
  use12h = !use12h;
  updateClock();
});

// ================= INÍCIO =================
updateClock();
setInterval(updateClock, 1000);
