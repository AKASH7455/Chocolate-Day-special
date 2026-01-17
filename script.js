document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
    SECTION & BUTTON SELECTION
  =============================== */
  const heroSection = document.getElementById("hero1");
  const gameSection = document.getElementById("game");
  const surpriseSection = document.getElementById("surprise");

  const startBtn = document.querySelector(".hero-btn");
  const truthBtn = document.querySelector(".truth-btn");
  const dareBtn = document.querySelector(".dare-btn");

  const cards = document.querySelectorAll(".surprise-card");
  const hintText = document.querySelector(".hint-text");

  let currentMode = ""; // "truth" | "dare"

  gameSection.style.display = "none";
  surpriseSection.style.display = "none";

  /* ===============================
    DATA
  =============================== */
  const truths = [
   "Jab aap mujhe dekhte ho, tab dil me sabse pehli feeling kya aati hai?",
  "Meri kaunsi baat ya aadat aapko mujhse aur zyada pyaar karne par majboor karti hai?",
  "Kya koi aisa moment hai jab aapne realize kiya ho ki aap mujhse sach me pyaar karte ho?",
  "Jab main aapke saath hota/hoti hoon, tab aapko sabse zyada kya achha lagta hai?",
  "Aapke liye pyaar ka sabse beautiful part humare beech kya hai?",
  "Kya aapko meri koi baat bahut special feel karata hai?",
  "Main aapki life me kaunsi kami poori karta/karti hoon?",
  "Aap mere saath sabse zyada khush kab feel karte ho?",
 " Mujhe hamara perfect romantic moment batao.",
    
  ];

  const dares = [
  "Mujhe 20 seconds tak tight hug do bina kuch bole.",
  "Mujhe pyaar se forehead par kiss karo.",
  "Maira haath pakad kar bolo: ‘mai tumse bhot pyar karta/karti hoon.’",
  "maire lips par soft kiss  do.",
  ];

  let truthPool = [...truths];
  let darePool = [...dares];

  /* ===============================
    FLOW CONTROLS
  =============================== */
  startBtn.addEventListener("click", () => {
    heroSection.style.display = "none";
    gameSection.style.display = "flex";
  });

  truthBtn.addEventListener("click", () => {
    currentMode = "truth";
    showSurpriseSection();
  });

  dareBtn.addEventListener("click", () => {
    currentMode = "dare";
    showSurpriseSection();
  });

  function showSurpriseSection() {
    gameSection.style.display = "none";
    surpriseSection.style.display = "block";
    resetCards();
  }

  /* ===============================
    CORE FUNCTIONS
  =============================== */
  function getRandomItem(type) {
    if (type === "truth") {
      if (truthPool.length === 0) truthPool = [...truths];
      const index = Math.floor(Math.random() * truthPool.length);
      return truthPool.splice(index, 1)[0];
    }

    if (type === "dare") {
      if (darePool.length === 0) darePool = [...dares];
      const index = Math.floor(Math.random() * darePool.length);
      return darePool.splice(index, 1)[0];
    }

    return "";
  }

  function activateCard(card) {
    cards.forEach(c => {
      if (c !== card) c.classList.add("hide");
      c.classList.remove("active");
    });

    card.classList.add("active");
  }

  function updateCardText(card, text) {
    const textEl = card.querySelector(".update-text");

    textEl.classList.remove("pop");
    void textEl.offsetWidth;
    textEl.classList.add("pop");

    textEl.textContent = text;
    textEl.style.color = "yellow";
  }

  function resetCards() {
  cards.forEach(card => {
    card.classList.remove("hide", "active");
    card.dataset.used = "false";

    const textEl = card.querySelector(".update-text");
    textEl.classList.remove("pop", "glow");

  });
}

  /* ===============================
    CARD CLICK LOGIC
  =============================== */
cards.forEach(card => {
  card.addEventListener("click", () => {
    
   
    if (!currentMode) return;

    // already used card → ignore
    if (card.dataset.used === "true") return;

    card.dataset.used = "true";

    activateCard(card);

    const text = getRandomItem(currentMode);
    updateCardText(card, text);

    // 👇 hint-text abhi dikhani hai
    hintText.classList.add("show");
     
   
  });
});

});



