const openButton = document.getElementById("openInvitation");
const envelopeWrap = document.getElementById("envelopeWrap");
const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");


function triggerDirectOpen() {
  openInvitation();
}

function openInvitation() {
  if (envelopeWrap.classList.contains("opened")) return;

  envelopeWrap.classList.add("opened");
  document.body.classList.add("invitation-opening");

  setTimeout(() => {
    opening.classList.add("fade-out");
  }, 850);

  setTimeout(() => {
    opening.style.display = "none";
    document.body.classList.remove("invitation-opening");
    invitation.classList.add("active");
    document.body.style.background = "#f8eee3";
    window.scrollTo({ top: 0, behavior: "instant" });

    document.querySelector(".cover").classList.add("visible");
  }, 1500);
}



openButton.addEventListener("click", triggerDirectOpen);

openButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    triggerDirectOpen();
  }
});

/* =========================================================
   ELEGANT SCROLL ENGINE
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");
const progressBar = document.querySelector(".scroll-progress span");
const orbitDot = document.querySelector(".scroll-orbit span");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -8% 0px"
  }
);

revealElements.forEach((element) => observer.observe(element));

let ticking = false;

function updateScrollScene() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollY = window.scrollY;
  const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

  progressBar.style.transform = `scaleX(${progress})`;

  const orbitTravel = 91;
  orbitDot.style.transform = `translateY(${progress * orbitTravel}px)`;

  document.querySelectorAll(".page").forEach((page) => {
    const rect = page.getBoundingClientRect();
    const center = window.innerHeight / 2;
    const distance = (rect.top + rect.height / 2 - center) / window.innerHeight;
    const clamped = Math.max(-1, Math.min(1, distance));

    if (Math.abs(clamped) < .78) {
      page.classList.add("scroll-active");
    } else {
      page.classList.remove("scroll-active");
    }

    const wash = page.querySelector(".scene-wash");
    if (wash) {
      wash.style.transform =
        `translate3d(0, ${clamped * -35}px, 0) scale(${1.05 + Math.abs(clamped) * .05})`;
    }

    const coverTitle = page.querySelector(".cover h2");
    if (coverTitle) {
      coverTitle.style.transform =
        `translate3d(0, ${clamped * 18}px, 0)`;
    }

    const flower = page.querySelector(".paper-flower, .flower-frame");
    if (flower) {
      flower.style.transform =
        `translate3d(0, ${clamped * -16}px, 0)`;
    }
  });

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollScene);
    ticking = true;
  }
}, { passive: true });

window.addEventListener("resize", updateScrollScene);
updateScrollScene();

/* Countdown */
const weddingDate = new Date("2026-10-25T06:00:00+05:30").getTime();

function updateCountdown() {
  let distance = weddingDate - Date.now();
  if (distance < 0) distance = 0;

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance / 3600000) % 24);
  const minutes = Math.floor((distance / 60000) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* Floating petals */
const petals = document.getElementById("petals");

for (let i = 0; i < 26; i++) {
  const p = document.createElement("span");
  p.className = "petal";
  p.style.position = "absolute";
  p.style.left = Math.random() * 100 + "%";
  p.style.top = (-10 - Math.random() * 30) + "%";
  p.style.width = (5 + Math.random() * 5) + "px";
  p.style.height = (8 + Math.random() * 7) + "px";
  p.style.borderRadius = "100% 0 100% 0";
  p.style.background = "rgba(139,75,82,.22)";
  p.style.animation = `petalFall ${7 + Math.random() * 8}s linear ${Math.random() * 8}s infinite`;
  petals.appendChild(p);
}
