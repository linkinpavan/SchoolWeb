const events = [
  { title: 'Math Olympiad Workshop', category: 'academic', date: '14 Mar 2026' },
  { title: 'Science Fair Exhibition', category: 'academic', date: '18 Mar 2026' },
  { title: 'Inter-school Football Finals', category: 'sports', date: '22 Mar 2026' },
  { title: 'Basketball Training Camp', category: 'sports', date: '29 Mar 2026' },
  { title: 'Spring Music Showcase', category: 'cultural', date: '6 Apr 2026' },
  { title: 'Drama & Debate Evening', category: 'cultural', date: '12 Apr 2026' }
];

const testimonials = [
  {
    quote:
      '“Greenwood has transformed my child into a confident learner. The teachers are incredibly supportive.”',
    author: '— Priya Mehta, Parent of Grade 8 student'
  },
  {
    quote:
      '“Excellent balance of academics and extracurriculars. My daughter loves coming to school every day.”',
    author: '— Daniel Ortiz, Parent of Grade 5 student'
  },
  {
    quote:
      '“The campus facilities and individual attention are outstanding. Highly recommended school.”',
    author: '— Aisha Khan, Parent of Grade 10 student'
  }
];

const eventList = document.querySelector('#eventList');
const eventFilter = document.querySelector('#eventFilter');
const testimonialQuote = document.querySelector('#testimonialQuote');
const testimonialAuthor = document.querySelector('#testimonialAuthor');
const testimonialDots = document.querySelector('#testimonialDots');
const admissionForm = document.querySelector('#admissionForm');
const formMessage = document.querySelector('#formMessage');
const themeToggle = document.querySelector('#themeToggle');
const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');

function renderEvents(category = 'all') {
  const filtered = category === 'all' ? events : events.filter((event) => event.category === category);
  eventList.innerHTML = filtered
    .map(
      (event) => `
      <article class="event-card">
        <small>${event.date} · ${event.category.toUpperCase()}</small>
        <h3>${event.title}</h3>
      </article>
    `
    )
    .join('');
}

function renderTestimonial(index) {
  testimonialQuote.textContent = testimonials[index].quote;
  testimonialAuthor.textContent = testimonials[index].author;
  [...testimonialDots.children].forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
}

eventFilter.addEventListener('change', (event) => {
  renderEvents(event.target.value);
});

let testimonialIndex = 0;

testimonials.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
  dot.addEventListener('click', () => {
    testimonialIndex = index;
    renderTestimonial(testimonialIndex);
  });
  testimonialDots.append(dot);
});

setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial(testimonialIndex);
}, 5000);

admissionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!admissionForm.checkValidity()) {
    formMessage.textContent = 'Please complete all required fields correctly.';
    formMessage.style.color = '#d7263d';
    return;
  }

  const student = admissionForm.student.value.trim();
  formMessage.textContent = `Thanks ${student}! Our admissions team will contact you soon.`;
  formMessage.style.color = '#188b4d';
  admissionForm.reset();
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  themeToggle.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav.classList.toggle('show');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

document.querySelector('#year').textContent = new Date().getFullYear();
renderEvents();
renderTestimonial(testimonialIndex);
