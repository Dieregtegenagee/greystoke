// Booking Widget - Litepicker Integration
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Litepicker if on booking page
  const dateRangeInput = document.getElementById('dateRange');
  if (dateRangeInput && typeof Litepicker !== 'undefined') {
    const picker = new Litepicker({
      element: dateRangeInput,
      singleMode: false,
      startDate: new Date(new Date().getTime() + 86400000), // Tomorrow
      endDate: new Date(new Date().getTime() + 172800000), // Day after tomorrow
      numberOfMonths: 2,
      minDate: new Date(),
      format: 'YYYY-MM-DD',
      lang: 'en-US',
      tooltipText: function(date) {
        if (!date) return '';
        if (typeof date.toISOString === 'function') return date.toISOString().split('T')[0];
        if (typeof date.format === 'function') return date.format('YYYY-MM-DD');
        return String(date);
      },
      setup: (pickerInstance) => {
        pickerInstance.on('selected', () => {
          const start = pickerInstance.getStartDate();
          const end = pickerInstance.getEndDate();
          if (start && end) updateBookingDetails(start.toDate ? start.toDate() : start, end.toDate ? end.toDate() : end);
        });
      }
    });
  }

  // Handle booking form submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (this.checkValidity() === false) {
        e.stopPropagation();
        this.classList.add('was-validated');
      } else {
        handleBookingSubmit();
      }
    });
  }
});

function updateBookingDetails(checkIn, checkOut) {
  // Normalize inputs to native Date objects
  const startDate = normalizeDate(checkIn);
  const endDate = normalizeDate(checkOut);
  if (!startDate || !endDate) return;

  // Update date fields
  document.getElementById('checkIn').value = formatDateISO(startDate);
  document.getElementById('checkOut').value = formatDateISO(endDate);

  // Calculate nights
  const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  document.getElementById('nights').value = nights;

  // Update summary
  document.getElementById('summaryCheckIn').textContent = formatDateDisplay(startDate);
  document.getElementById('summaryCheckOut').textContent = formatDateDisplay(endDate);
  document.getElementById('summaryNights').textContent = nights;

  // Calculate pricing
  const pricePerNight = 950;
  const accommodationPrice = nights * pricePerNight;
  document.getElementById('priceAccommodation').textContent = 'R' + accommodationPrice.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  document.getElementById('priceTotal').textContent = 'R' + accommodationPrice.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function normalizeDate(d) {
  if (!d) return null;
  if (d instanceof Date) return d;
  if (typeof d.toDate === 'function') return d.toDate();
  if (typeof d.toJSDate === 'function') return d.toJSDate();
  // Fallback: try constructing Date
  return new Date(d);
}

function formatDateISO(date) {
  return date.toISOString().split('T')[0];
}

function formatDateDisplay(date) {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-ZA', options);
}

function handleBookingSubmit() {
  // Collect form data
  const formData = {
    checkIn: document.getElementById('checkIn').value,
    checkOut: document.getElementById('checkOut').value,
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    guests: document.getElementById('guests').value,
    message: document.getElementById('message').value,
    agreed: document.getElementById('agreeTerms').checked
  };

  // Log to console for now (replace with API call later)
  console.log('Booking Data:', formData);

  // Show success message
  showBookingSuccess();
}

function showBookingSuccess() {
  const message = document.createElement('div');
  message.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
  message.style.zIndex = '9999';
  message.innerHTML = '<i class="fas fa-check-circle me-2"></i><strong>Booking Submitted!</strong> Redirecting to payment...';
  document.body.appendChild(message);

  setTimeout(() => {
    // In production, redirect to Stripe checkout
    // window.location.href = '/backend/checkout.php';
    alert('Payment processing would happen here. This is a placeholder.');
  }, 2000);
}
