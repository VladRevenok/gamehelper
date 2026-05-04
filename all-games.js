const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.game-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach((card, i) => {
      const tags = card.dataset.tags || '';
      const matches = filter === 'all' || tags.includes(filter);

      if (matches) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, i * 60);
      } else {
        card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.classList.add('hidden');
        }, 250);
      }
    });
  });
});

// Entrance animation on load
window.addEventListener('load', () => {
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 300 + i * 80);
  });
});
