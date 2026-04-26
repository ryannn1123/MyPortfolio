// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// ========== PROFILE PICTURE UPLOAD ==========
const profileUpload = document.getElementById('profileUpload');
const profileImage = document.getElementById('profileImage');
const displayNameSpan = document.getElementById('name');

// Load saved profile
const savedProfilePic = localStorage.getItem('profilePic');
if (savedProfilePic && savedProfilePic !== '') {
  profileImage.src = savedProfilePic;
}

const savedName = localStorage.getItem('profileName');
if (savedName && savedName !== '') {
  displayNameSpan.textContent = savedName;
}

// Upload new profile picture
profileUpload.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(event) {
    const imgData = event.target.result;
    profileImage.src = imgData;
    localStorage.setItem('profilePic', imgData);
    alert('Profile picture updated!');
  };
  reader.readAsDataURL(file);
});

// Click camera icon to upload
document.querySelector('.upload-icon').addEventListener('click', function() {
  profileUpload.click();
});

// ========== TYPING EFFECT ==========
const textArray = ["Web Developer", "IoT Enthusiast", "Creative Problem Solver", "Travel Explorer"];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typingElement = document.getElementById("typing");
let timeoutId = null;

function dynamicType() {
  if (!typingElement) return;
  const currentWord = textArray[wordIndex];
  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    timeoutId = setTimeout(dynamicType, 1800);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % textArray.length;
    timeoutId = setTimeout(dynamicType, 400);
    return;
  }
  timeoutId = setTimeout(dynamicType, isDeleting ? 60 : 100);
}
dynamicType();

// ========== PROJECTS DATA WITH GITHUB LINKS ==========
const projects = [
  { 
    name: "Fish Feeder System", 
    desc: "Automated ESP32-based smart feeder with remote scheduling & mobile alerts.",
    tech: "ESP32 · IoT · MQTT",
    icon: "fas fa-fish",
    fullDescription: "A fully automated fish feeding system that allows users to schedule feeding times remotely. The system uses an ESP32 microcontroller connected to Wi-Fi, allowing real-time updates and notifications.",
    features: [
      "Remote scheduling via mobile app",
      "Real-time feeding notifications",
      "Adjustable portion control",
      "Low food level alerts",
      "Battery backup system"
    ],
    githubLink: "https://github.com/yourusername/fish-feeder-system",
    liveLink: "https://yourusername.github.io/fish-feeder-system"
  },
  { 
    name: "Portfolio Website", 
    desc: "Modern portfolio with light/dark mode, dynamic typing & smooth animations.",
    tech: "HTML5 · CSS3 · JavaScript",
    icon: "fas fa-globe",
    fullDescription: "A responsive and modern portfolio website featuring light/dark mode toggle, dynamic typing animation, and interactive project cards. Built with vanilla HTML, CSS, and JavaScript for optimal performance.",
    features: [
      "Light/Dark theme switcher",
      "Dynamic typing animation",
      "Fully responsive design",
      "Project modal with details",
      "Contact form with validation"
    ],
    githubLink: "https://github.com/yourusername/portfolio-website",
    liveLink: "https://yourusername.github.io/portfolio-website"
  },
  { 
    name: "AquaSense IoT", 
    desc: "Smart water monitoring system with real-time turbidity and pH tracking.",
    tech: "Arduino · Cloud · Analytics",
    icon: "fas fa-tint",
    fullDescription: "An IoT-based water quality monitoring system that measures pH, turbidity, and temperature in real-time. Data is sent to the cloud for analysis and visualization, with alerts for abnormal readings.",
    features: [
      "Real-time pH and turbidity monitoring",
      "Cloud data storage and analytics",
      "Mobile notifications for alerts",
      "Historical data visualization",
      "Automatic report generation"
    ],
    githubLink: "https://github.com/yourusername/aquasense-iot",
    liveLink: "https://yourusername.github.io/aquasense-iot"
  },
  
  {
    name: "TravelCebu",
    desc: "Complete travel guide to Cebu, Philippines with chatbot, itinerary planner & rain prediction.",
    tech: "Dart · Flutter · PHP",
    icon: "fas fa-umbrella-beach",
    fullDescription: "TravelCebu is an interactive travel guide website showcasing the beautiful island of Cebu, Philippines. Features include a smart chatbot assistant, personalized itinerary planner, and predictive rain analytics to help travelers plan their perfect trip.",
    features: [
      "🤖 AI-Powered Chatbot Assistant",
      "📅 Smart Itinerary Planner",
      "🌧️ Predictive Rain Analytics",
      "🗺️ Interactive destination maps",
      "🍜 Local food recommendations",
      "📸 Photo gallery of Cebu",
      "💰 Budget tracking tool",
      "🎉 Festival calendar"
    ],
    githubLink: "https://github.com/yourusername/travelcebu",
    liveLink: "https://yourusername.github.io/travelcebu"
  }
];

// Generate project cards
const projectList = document.getElementById("projectList");
projects.forEach((project, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <h3><i class="${project.icon}" style="margin-right: 8px;"></i> ${project.name}</h3>
    <p>${project.desc}</p>
    <div style="margin-top: 1rem;"><span class="tech-tag">${project.tech}</span></div>
    <div style="margin-top: 1rem; text-align: right;"><i class="fas fa-arrow-right" style="color:#0ea5e9;"></i></div>
  `;
  card.onclick = () => openProjectModal(index);
  projectList.appendChild(card);
});

// Modal functions with GitHub and Live Demo buttons
const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.querySelector(".close-modal");

function openProjectModal(index) {
  const p = projects[index];
  modalBody.innerHTML = `
    <div class="project-detail">
      <div class="project-icon"><i class="${p.icon}"></i></div>
      <h2>${p.name}</h2>
      <div class="project-tech"><i class="fas fa-code"></i> ${p.tech}</div>
      <p class="project-description">${p.fullDescription}</p>
      <div class="project-features">
        <h3><i class="fas fa-star"></i> Key Features</h3>
        <ul>${p.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}</ul>
      </div>
      <div class="button-group">
        <a href="${p.githubLink}" target="_blank" class="github-btn" onclick="event.stopPropagation()">
          <i class="fab fa-github"></i> View Code on GitHub
        </a>
        <a href="${p.liveLink}" target="_blank" class="demo-btn" onclick="event.stopPropagation()">
          <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
      </div>
    </div>
  `;
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

closeModal.onclick = closeProjectModal;
window.onclick = (e) => { if (e.target === modal) closeProjectModal(); };
document.onkeydown = (e) => { if (e.key === 'Escape') closeProjectModal(); };

// ========== CONTACT FORM ==========
const sendBtn = document.getElementById("sendBtn");
const nameInput = document.getElementById("contactName");
const emailInput = document.getElementById("contactEmail");
const msgInput = document.getElementById("contactMessage");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

sendBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = msgInput.value.trim();

  if (!name) { alert("Please enter your name"); nameInput.focus(); return; }
  if (!email) { alert("Please enter your email"); emailInput.focus(); return; }
  if (!isValidEmail(email)) { alert("Please enter a valid email"); emailInput.focus(); return; }
  if (!message) { alert("Please enter a message"); msgInput.focus(); return; }

  alert(`Thanks ${name}! Your message has been sent.`);
  nameInput.value = "";
  emailInput.value = "";
  msgInput.value = "";
});

// Real-time email validation
emailInput.addEventListener('input', () => {
  emailInput.style.borderColor = isValidEmail(emailInput.value) ? "#bae6fd" : "#ef4444";
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});