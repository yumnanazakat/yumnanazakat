 const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  });
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;
    follower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
  document.querySelectorAll('a, button, .portfolio-item, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform += ' scale(2)'; follower.style.opacity = '0.2'; });
    el.addEventListener('mouseleave', () => { follower.style.opacity = '0.5'; });
  });

  // Navbar scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => revealObs.observe(el));

  // Timeline animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 150);
    });
  }, { threshold: 0.2 });
  timelineItems.forEach(el => timelineObs.observe(el));

  // Skill bars animation
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-category').forEach(el => barObs.observe(el));

  // Portfolio filter
  function filterPortfolio(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.portfolio-item').forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.style.display = '';
        item.style.opacity = '0';
        setTimeout(() => item.style.opacity = '1', 50);
        item.style.transition = 'opacity 0.4s ease';
      } else {
        item.style.display = 'none';
      }
    });
    // Fix wide items after filter
    document.querySelectorAll('.portfolio-item.wide').forEach(item => {
      if (item.style.display !== 'none') {
        item.style.gridColumn = 'span 2';
      }
    });
  }

  // Mobile menu
  function toggleMobile() {
    document.getElementById('mobileMenu').classList.toggle('open');
  }
  function closeMobile() {
    document.getElementById('mobileMenu').classList.remove('open');
  }

  // CV download placeholder
  function downloadCV() {
    const link = document.createElement("a");
    link.href = "Yumna%20Nazakat-CV.pdf";
    link.download = "Yumna Nazakat-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Contact form
  function sendMessage() {
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const msg = document.getElementById('messageInput').value;
    if (!name || !email || !msg) {
      alert('Please fill in all required fields.');
      return;
    }
    alert('Thank you, ' + name + '! Your message has been received. I\'ll get back to you soon.');
  }
