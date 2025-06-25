// Mobile view selector functions
function toggleViewOptions() {
  const options = document.getElementById('mobileViewOptions');
  options.classList.toggle('show');
}

function setViewport(type) {
  let content = '';
  switch(type) {
    case 'mobile':
      content = 'width=device-width, initial-scale=1.0';
      break;
    case 'tablet':
      content = 'width=768, initial-scale=1.0';
      break;
    case 'desktop':
      content = 'width=1200, initial-scale=1.0';
      break;
  }
  
  document.querySelector('meta[name="viewport"]').setAttribute('content', content);
  document.getElementById('mobileViewOptions').classList.remove('show');
}

// Improved navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Close mobile view options when clicking outside
document.addEventListener('click', function(e) {
  const options = document.getElementById('mobileViewOptions');
  const toggle = document.querySelector('.mobile-view-toggle');
  
  if (!toggle.contains(e.target) && !options.contains(e.target)) {
    options.classList.remove('show');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remove active class from all nav items
    document.querySelectorAll('nav a').forEach(navItem => {
      navItem.classList.remove('active');
    });
    
    // Add active class to clicked nav item
    this.classList.add('active');
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// Show back to top button when scrolling
window.addEventListener('scroll', function() {
  const backToTop = document.getElementById('backToTop');
  if (window.pageYOffset > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// Back to top functionality
document.getElementById('backToTop').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Enrollment form functions
let currentEnrollmentType = '';

function openEnrollForm(type = '') {
  currentEnrollmentType = type;
  const form = document.getElementById('enrollForm');
  form.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeEnrollForm() {
  const form = document.getElementById('enrollForm');
  form.classList.remove('show');
  document.body.style.overflow = '';
}

function sendEnrollment() {
  const name = document.getElementById('sname').value;
  const school = document.getElementById('sschool').value;
  const grade = document.getElementById('sgrade').value;
  const city = document.getElementById('scity').value;
  const contact = document.getElementById('swhatsapp').value;
  
  if (!name || !school || !grade || !city || !contact) {
    alert("Please fill all required fields.");
    return;
  }
  
  let message = `📥 Enrollment Request\n`;
  if (currentEnrollmentType) message += `📌 For: ${currentEnrollmentType}\n`;
  message += `🤖 Name: ${name}\n🏫 School: ${school}\n🎓 Grade: ${grade}\n🌆 City: ${city}\n📱 Contact: ${contact}`;
  
  const url = `https://wa.me/94742663484?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  closeEnrollForm();
  
  // Reset form
  document.getElementById('sname').value = '';
  document.getElementById('sschool').value = '';
  document.getElementById('sgrade').value = '';
  document.getElementById('scity').value = '';
  document.getElementById('swhatsapp').value = '';
}

// Animation on scroll
const animateElements = document.querySelectorAll('.animate-fade, .animate-slide');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

animateElements.forEach(element => {
  observer.observe(element);
});

// Close popup when clicking outside
document.getElementById('enrollForm').addEventListener('click', function(e) {
  if (e.target === this) {
    closeEnrollForm();
  }
});

// Set current year in footer
document.querySelector('.copyright').innerHTML = `&copy; ${new Date().getFullYear()} ICT with Ahshaan. All rights reserved.`;

// Poster functions
function showPoster() {
  // Check if poster was already shown in this session
  if(sessionStorage.getItem('posterShown') !== 'true') {
    setTimeout(() => {
      document.getElementById('posterPopup').classList.add('show');
      document.body.style.overflow = 'hidden';
      sessionStorage.setItem('posterShown', 'true');
    }, 1000); // Show after 1 second delay
  }
}

function closePoster() {
  document.getElementById('posterPopup').classList.remove('show');
  document.body.style.overflow = '';
}

function enrollFromPoster() {
  closePoster();
  openEnrollForm('From Poster');
}

// Show poster when page loads
window.addEventListener('load', showPoster);

// Recordings Section Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Toggle password visibility
  const togglePassword = document.querySelector('.toggle-password');
  if (togglePassword) {
    togglePassword.addEventListener('click', function() {
      const passwordInput = document.getElementById('recording-password');
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
      this.classList.toggle('fa-eye');
    });
  }

  // Switch between recording categories
  const categoryBtns = document.querySelectorAll('.recording-category-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const category = this.dataset.category;
      
      // Hide all content sections
      document.querySelectorAll('.recording-content').forEach(section => {
        section.classList.add('hidden');
      });
      
      // Show password protected if needed
      if (category !== 'free') {
        document.getElementById('password-protected').classList.add('show');
        document.getElementById('password-protected').dataset.category = category;
      } else {
        document.getElementById('password-protected').classList.remove('show');
        document.getElementById('free-content').classList.remove('hidden');
      }
    });
  });

  // Password submission
  const submitPassword = document.getElementById('submit-password');
  if (submitPassword) {
    submitPassword.addEventListener('click', function() {
      const passwordInput = document.getElementById('recording-password');
      const errorMessage = document.getElementById('password-error');
      const password = passwordInput.value.trim();
      
      // Simple password check (replace with your actual password)
      const correctPasswords = {
        'g10': 'g10',
        'g11': 'g11',
        'project': 'project'
      };
      
      const category = document.getElementById('password-protected').dataset.category;
      const correctPassword = correctPasswords[category];
      
      if (password === correctPassword) {
        // Hide password form
        document.getElementById('password-protected').classList.remove('show');
        
        // Show the correct content
        document.getElementById(`${category}-content`).classList.remove('hidden');
        
        // Clear password field
        passwordInput.value = '';
        errorMessage.style.display = 'none';
      } else {
        errorMessage.textContent = 'Incorrect password. Please try again.';
        errorMessage.style.display = 'block';
      }
    });
  }

  // Video player functionality
  const watchBtns = document.querySelectorAll('.watch-btn');
  const videoPlayer = document.getElementById('video-player');
  const videoFrame = document.getElementById('video-frame');
  const videoTitle = document.getElementById('video-title');
  const closePlayer = document.querySelector('.close-player');

  watchBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const videoUrl = this.dataset.video;
      const videoName = this.parentElement.querySelector('span').textContent;
      
      videoFrame.src = videoUrl;
      videoTitle.textContent = videoName;
      videoPlayer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  closePlayer.addEventListener('click', function() {
    videoPlayer.classList.add('hidden');
    videoFrame.src = '';
    document.body.style.overflow = '';
  });
});