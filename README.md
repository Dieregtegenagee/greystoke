# GreyStoke Self-Catering Website

A modern, responsive website for GreyStoke self-catering accommodation in Springs, Gauteng.

## Quick Start

### What's Included

- **8 Complete Pages**: Homepage, About, Accommodation, Booking, Gallery, Attractions, Reviews, Contact
- **Responsive Design**: Mobile-first approach, works on all devices (320px - 1920px+)
- **Interactive Features**: Litepicker calendar, Lightbox2 gallery, form validation
- **Modern Stack**: Bootstrap 5, HTML5, CSS3, Vanilla JavaScript
- **Professional Design**: Custom branding, optimized images (AVIF format), smooth animations

## Features

### Frontend Pages

1. **Homepage** - Hero section, highlights, booking widget, pricing, trust section
2. **About Us** - Coen's story, hospitality philosophy, why choose us
3. **Accommodation** - Room details, amenities grid, policies, image carousel
4. **Booking** - Litepicker calendar, guest form, pricing calculator, summary
5. **Gallery** - Masonry grid, Lightbox2 lightbox, 20 categorized images
6. **Attractions** - Local spots, nearby JNB attractions, map embed
7. **Reviews** - Rating display, review submission form, moderation-ready
8. **Contact** - Contact form, contact info, map, FAQ accordion

### Technical Features

- **Responsive Design**: Mobile (320px) → Tablet (768px) → Desktop (1024px+)
- **Form Validation**: Client-side HTML5 + Bootstrap validation
- **Date Picker**: Litepicker 2 with visual calendar
- **Lightbox**: Lightbox2 for image gallery expansion
- **Icons**: FontAwesome 6 for amenities and UI elements
- **Performance**: AVIF images, minified CSS/JS, lazy loading ready
- **SEO-Ready**: Semantic HTML, proper meta tags, structured markup
- **Accessibility**: WCAG compliance, keyboard navigation, alt text

## Setup & Deployment

### Local Testing

1. **Test pages**: Click navigation to test all pages
2. **Test forms**: Fill contact/review forms to verify validation]
python -m http.server 8000

#### Step 2: Extract & Configure

```bash
# Via SSH (preferred)
cd /home/yourusername/public_html/
unzip greystoke-lekkerslaap.zip
chmod 755 frontend/
chmod 755 config/

# Update settings.php with your details
nano config/settings.php
```

#### Step 3: Update Configuration

Edit `config/settings.php`:

```php
define('SITE_URL', 'https://yourdomain.com');
define('SITE_EMAIL', 'your@email.com');
define('SITE_PHONE', '+27 (0)XX XXX XXXX');
// Add Stripe keys when ready
// Add SMTP credentials for emails
```

#### Step 4: Access Website

- **Live URL**: `https://yourdomain.com/frontend/index.html`
- **Or** configure `.htaccess` to point to `/frontend/` as root

### Important Notes

- **Database**: Not active yet. Schema provided in `setup/schema.sql` for future backend integration
- **Stripe**: Update keys in `config/settings.php` when ready
- **Emails**: Update SMTP settings for confirmation/reminder emails
- **Forms**: Currently show success messages. Backend integration needed for actual data storage

## Customization Guide

### Changing Logo

1. Choose between `logo-v1.svg`, `logo-v2.svg`, or `logo-v3.svg` in `/frontend/img/`
2. In all HTML files, update navbar logo:
   ```html
   <img src="img/logo-v1.svg" alt="GreyStoke Logo" height="40">
   ```
3. Or commission a custom logo from Fiverr/Canva Pro

### Updating Colors

Edit `frontend/css/style.css`:

```css
:root {
  --bs-primary: #2C3E50;      /* Dark grey */
  --bs-secondary: #E74C3C;    /* Orange/rust accent */
  --bs-light: #ECF0F1;        /* Light taupe */
  /* Update hex codes to your brand colors */
}
```

### Updating Pricing

1. Edit `config/settings.php`:
   ```php
   define('PRICE_PER_NIGHT', 950); // Your nightly rate
   ```
2. Update `booking.html` pricing display
3. Pricing calculator in `booking-widget.js` will auto-calculate

### Updating Content

1. **Dates/times**: Search for "14:00" (check-in) or "10:00" (check-out)
2. **Address**: Search for "26 Irving Steyn Straat" 
3. **Phone/Email**: Search for "+27" or "@greystoke"
4. **Policies**: Edit accordion sections in `accommodation.html` and `booking.html`

### Adding Images

1. Place AVIF images in `/assets/img/{category}/`
2. Update gallery.html to add new images:
   ```html
   <div class="masonry-item">
     <a href="../../assets/img/category/image.avif" data-lightbox="gallery">
       <img src="../../assets/img/category/image.avif" alt="Description">
     </a>
   </div>
   ```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11 not supported (AVIF format)

## Performance Tips

1. **Image Optimization**: Keep AVIF images 50-100KB each
2. **Caching**: Enable browser caching via `.htaccess`:
   ```apache
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType image/avif "access plus 30 days"
     ExpiresByType text/css "access plus 7 days"
   </IfModule>
   ```
3. **Compression**: Enable GZIP in cPanel > Apache Modules
4. **CDN**: Consider using CloudFlare for faster asset delivery

## License

This website is proprietary to GreyStoke Self-Catering. All rights reserved.

---

**Version**: 1.0  
**Last Updated**: May 2026  
** EuNic Productions & Webtrix All Rights Reserved
