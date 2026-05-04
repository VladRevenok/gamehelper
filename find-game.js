const questions = [
  {
    text: "What type of gameplay do you prefer?",
    emoji: "🎮",
    options: [
      { text: "Action & Combat", emoji: "⚔️", tags: ["action", "combat"] },
      { text: "Story & Adventure", emoji: "📖", tags: ["story", "adventure"] },
      { text: "Strategy & Thinking", emoji: "🧠", tags: ["strategy"] },
      { text: "Multiplayer & Competition", emoji: "🏆", tags: ["multiplayer", "competitive"] },
    ]
  },
  {
    text: "What's your preferred game world?",
    emoji: "🌍",
    options: [
      { text: "Open World / Exploration", emoji: "🗺️", tags: ["openworld"] },
      { text: "Post-apocalyptic / Survival", emoji: "🌿", tags: ["survival", "postapoc"] },
      { text: "Fantasy / Mythology", emoji: "🐉", tags: ["fantasy"] },
      { text: "Modern / Realistic", emoji: "🏙️", tags: ["modern", "realistic"] },
    ]
  },
  {
    text: "How much time do you usually play?",
    emoji: "⏱️",
    options: [
      { text: "Quick sessions (under 1 hour)", emoji: "⚡", tags: ["casual"] },
      { text: "Medium (1–3 hours)", emoji: "🎯", tags: ["medium"] },
      { text: "Long sessions (3+ hours)", emoji: "🌙", tags: ["long", "story"] },
      { text: "I play all day 😅", emoji: "💀", tags: ["competitive", "openworld", "long"] },
    ]
  },
  {
    text: "What's most important to you?",
    emoji: "✨",
    options: [
      { text: "Graphics & Atmosphere", emoji: "🎨", tags: ["graphics", "story"] },
      { text: "Intense Gameplay / Mechanics", emoji: "🔥", tags: ["action", "combat"] },
      { text: "Replayability", emoji: "🔄", tags: ["competitive", "multiplayer"] },
      { text: "Strong Narrative / Emotion", emoji: "💔", tags: ["story", "adventure"] },
    ]
  },
];

const games = [
  {
    name: "The Last of Us",
    emoji: "🌿",
    desc: "A masterpiece of storytelling. Survive a post-pandemic world with unforgettable characters and emotional depth.",
    tags: ["story", "adventure", "postapoc", "survival", "graphics", "long"],
    genre: "Action-Adventure",
    platform: "PS / PC",
  },
  {
    name: "Red Dead Redemption 2",
    emoji: "🤠",
    desc: "An epic open-world Western with stunning graphics, rich story and absolute freedom of action.",
    tags: ["story", "openworld", "graphics", "long", "adventure", "realistic"],
    genre: "Open World",
    platform: "PS / Xbox / PC",
  },
  {
    name: "God of War Ragnarök",
    emoji: "⚡",
    desc: "Epic Norse mythology action with breathtaking combat and a deeply emotional father-son story.",
    tags: ["action", "combat", "fantasy", "story", "graphics", "long"],
    genre: "Action RPG",
    platform: "PS",
  },
  {
    name: "Counter-Strike 2",
    emoji: "🎯",
    desc: "The ultimate competitive FPS. Pure skill, strategy and adrenaline in every round.",
    tags: ["competitive", "multiplayer", "modern", "action", "medium", "realistic"],
    genre: "FPS Competitive",
    platform: "PC",
  },
  {
    name: "Fortnite",
    emoji: "🏗️",
    desc: "Battle royale with building mechanics, regular events, and a huge player base. Never gets old.",
    tags: ["multiplayer", "competitive", "action", "casual", "medium"],
    genre: "Battle Royale",
    platform: "All Platforms",
  },
  {
    name: "Black Myth: Wukong",
    emoji: "🐒",
    desc: "A stunning action RPG inspired by Chinese mythology. Incredible visuals and challenging combat.",
    tags: ["action", "combat", "fantasy", "graphics", "story", "long"],
    genre: "Action RPG",
    platform: "PS / PC",
  },
];

let currentQuestion = 0;
let collectedTags = [];

const overlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('modalClose');
const startBtn = document.getElementById('startBtn');
const modalContent = document.getElementById('modalContent');

startBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

function openModal() {
  currentQuestion = 0;
  collectedTags = [];
  overlay.classList.add('open');
  renderQuestion();
}

function closeModal() {
  overlay.classList.remove('open');
}

function renderQuestion() {
  const q = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  modalContent.innerHTML = `
    <div class="modal-header">
      <div class="modal-step">Question ${currentQuestion + 1} of ${questions.length}</div>
      <div class="modal-question">${q.emoji} ${q.text}</div>
    </div>
    <div class="modal-progress">
      <div class="modal-progress-bar" style="width: ${progress}%"></div>
    </div>
    <div class="modal-options">
      ${q.options.map((opt, i) => `
        <button class="modal-option" onclick="selectOption(${JSON.stringify(opt.tags).replace(/"/g, '&quot;')})">
          <span class="opt-emoji">${opt.emoji}</span>
          <span>${opt.text}</span>
        </button>
      `).join('')}
    </div>
  `;

  // Animate options in
  setTimeout(() => {
    document.querySelectorAll('.modal-option').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-15px)';
      el.style.transition = `opacity 0.3s ${i * 0.07}s, transform 0.3s ${i * 0.07}s`;
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      });
    });
  }, 10);
}

function selectOption(tags) {
  collectedTags.push(...tags);
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    // fade transition
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'translateX(20px)';
    setTimeout(() => {
      modalContent.style.transition = 'none';
      modalContent.style.transform = 'translateX(-20px)';
      renderQuestion();
      requestAnimationFrame(() => {
        modalContent.style.transition = 'opacity 0.3s, transform 0.3s';
        modalContent.style.opacity = '1';
        modalContent.style.transform = 'translateX(0)';
      });
    }, 250);
    modalContent.style.transition = 'opacity 0.25s, transform 0.25s';
  }
}

function showResult() {
  // Score games by tag matches
  const scored = games.map(game => {
    const score = collectedTags.reduce((acc, tag) => acc + (game.tags.includes(tag) ? 1 : 0), 0);
    return { ...game, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  modalContent.innerHTML = `
    <div class="result-screen">
      <div class="result-label">🎯 Perfect match for you</div>
      <div class="result-game-img">${best.emoji}</div>
      <div class="result-title">${best.name}</div>
      <div class="result-desc">${best.desc}</div>
      <div class="result-tags">
        <span class="result-tag">${best.genre}</span>
        <span class="result-tag">${best.platform}</span>
      </div>
      <div class="result-actions">
        <button class="btn-primary" onclick="closeModal()" style="font-size:0.8rem;padding:0.7rem 1.5rem;">Done ✓</button>
        <button class="btn-secondary" onclick="restartQuiz()">Try Again ↺</button>
        <a href="all-games.html"><button class="btn-secondary">All Games →</button></a>
      </div>
    </div>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  collectedTags = [];
  modalContent.style.opacity = '0';
  setTimeout(() => {
    renderQuestion();
    modalContent.style.transition = 'opacity 0.3s';
    modalContent.style.opacity = '1';
  }, 200);
}

// Keyboard close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
