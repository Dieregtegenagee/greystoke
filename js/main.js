// Main JavaScript - Global Interactions
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap form validation
  initFormValidation();

  // Initialize smooth scrolling
  initSmoothScroll();

  // Initialize mobile menu close on link click
  initMobileMenuClose();

  // Initialize active nav link
  updateActiveNavLink();
});

// Bootstrap Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', function(event) {
      if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.classList.add('was-validated');
    }, false);
  });
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Close mobile menu when a link is clicked
function initMobileMenuClose() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarToggler && navbarCollapse) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
  }
}

// Update active nav link based on current page
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Utility: Format currency ZAR
function formatCurrency(amount) {
  return 'R' + parseFloat(amount).toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Utility: Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Show toast notification
function showNotification(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `alert alert-${type} position-fixed bottom-0 end-0 m-3`;
  toast.style.zIndex = '9999';
  toast.innerHTML = `<i class="fas fa-info-circle me-2"></i>${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// Debounce function for form inputs
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Initialize quick booking widget on homepage
document.addEventListener('DOMContentLoaded', function() {
  const quickBookingForm = document.querySelector('form:has(#checkIn)');
  if (quickBookingForm && !document.getElementById('dateRange')) {
    quickBookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const checkIn = document.getElementById('checkIn').value;
      const checkOut = document.getElementById('checkOut').value;

      if (checkIn && checkOut) {
        // Redirect to booking page with dates
        window.location.href = `booking.html?checkIn=${checkIn}&checkOut=${checkOut}`;
      }
    });
  }
});

// Load booking dates from URL params if available
window.addEventListener('load', function() {
  const params = new URLSearchParams(window.location.search);
  const checkIn = params.get('checkIn');
  const checkOut = params.get('checkOut');

  if (checkIn && checkOut && document.getElementById('dateRange')) {
    const dateField = document.getElementById('dateRange');
    dateField.value = `${checkIn} to ${checkOut}`;
    document.getElementById('checkIn').value = checkIn;
    document.getElementById('checkOut').value = checkOut;
    if (typeof updateBookingDetails === 'function') {
      try {
        updateBookingDetails(new Date(checkIn), new Date(checkOut));
      } catch (err) {
        console.warn('Could not auto-update booking details from URL params', err);
      }
    }
  }
});

// Image lazy loading
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Accessibility: Keyboard navigation for cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const link = this.querySelector('a');
      if (link) link.click();
    }
  });
});

console.log('GreyStoke Website - All systems initialized');
