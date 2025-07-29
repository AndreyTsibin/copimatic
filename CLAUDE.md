# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a high-conversion landing page for a printer/MFU/plotter repair service. The project is designed for integration with Tilda CMS using the T123 HTML block system.

**Technology Stack:**
- Frontend: Vanilla HTML5/CSS3/JavaScript 
- CSS Framework: Tailwind CSS (via CDN)
- Target Platform: Tilda CMS integration via T123 block
- Responsive Design: 320px - 1920px

## Development Commands

Since this is a static HTML/CSS/JS project designed for Tilda integration, there are no build commands or package scripts. Development workflow:

1. **Local Development:** Open `index.html` directly in browser
2. **Git Workflow:**
   - Work in `developed` branch for all development
   - Merge to `main` only for production-ready versions
   - `git checkout developed` - switch to development branch
   - `git push origin developed` - push development changes
3. **Tilda Integration:** 
   - Copy `index.html` content → Tilda T123 "HTML-код" block
   - Copy `script.js` content → Tilda Site Settings → "HTML-код для вставки внутрь head"

## Project Architecture

### File Structure
```
project/
├── index.html          # Main HTML for T123 block integration
├── script.js          # JavaScript for Tilda head injection  
└── data/              # Static data files (when created)
    ├── Бренды.html    # Brand logos HTML list
    ├── Неисправности.html # Issues with pricing data
    └── Услуги.html    # Services categorized by equipment type
```

### Tilda Integration Constraints
- **Avoid universal selectors** (`*`, `body`, `html`)
- **Never use Tilda reserved classes** (starting with `t-` or `tn-`)
- **Encapsulate all styles** in local classes
- **JavaScript must be placed in head** for global access
- **All CTA links point to `#forma`** (existing Tilda modal system)

### Design System

**Color Palette (CSS Variables):**
```css
:root {
  --primary-blue: #2563eb;
  --primary-blue-dark: #1d4ed8;
  --accent-orange: #ea580c;
  --accent-orange-dark: #dc2626;
  --text-primary: #111827;
  --text-secondary: #4b5563;
  --bg-white: #ffffff;
  --bg-gray: #f9fafb;
  --success-green: #059669;
  --warning-yellow: #d97706;
}
```

**Key CSS Classes:**
- `.btn-cta` - Orange CTA buttons with hover effects
- `.card` - White cards with shadow and hover animations
- `.price` - Green styling for pricing
- `.container-custom` - Main container with proper spacing

### Landing Page Components Architecture

**Conversion-Optimized Structure:**
1. **Sticky Header** - Navigation with phone and CTA
2. **Hero Section** - Main value proposition with primary CTA
3. **Equipment Cards** - Secondary CTAs for printer/MFU/plotter categories
4. **Brand Marquee** - Trust building through brand logos
5. **Issues Grid** - Problem-solution CTAs with pricing
6. **Discount Timer** - Urgency-driven CTA with countdown
7. **Service Tabs** - Detailed pricing by equipment category
8. **Guarantee Block** - Trust building content
9. **Coverage Map** - Service area information
10. **Contract Section** - Legal trust building

### JavaScript Architecture

**Core Modules:**
- **Navigation** - Smooth scroll, sticky header behavior
- **Tab System** - Service category switching
- **Countdown Timer** - Discount urgency functionality
- **CTA Handlers** - External modal triggers for `#forma`
- **UI Animations** - Hover effects and micro-interactions

**Key Functions:**
- `startCountdown()` - 24-hour countdown timer
- `switchTab(tabName)` - Service tab switching
- Smooth scroll navigation for menu items

### Data Integration Strategy

The project uses static HTML files in the `data/` directory as data sources:
- **Brand data:** Parse `data/Бренды.html` for brand logo list
- **Issues data:** Parse `data/Неисправности.html` for problems with pricing
- **Services data:** Parse `data/Услуги.html` for three-tier service structure

### Mobile-First Responsive Design

**Breakpoints:**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px  
- Desktop: 1024px - 1920px

**Key Responsive Patterns:**
- Touch-optimized buttons (minimum 44px)
- Vertical layouts for mobile
- Grid systems that collapse from 3-column → 2-column → 1-column
- Simplified navigation for mobile

### Development Workflow

**Creating New Sections:**
1. Follow the component structure in ARCHITECTURE.md
2. Use established CSS classes and color variables
3. Ensure all CTAs link to `#forma`
4. Test responsive behavior across all breakpoints
5. Maintain Tilda compatibility (no reserved classes)

**Performance Considerations:**
- Inline critical CSS for above-the-fold content
- Lazy load non-critical images
- Defer non-essential JavaScript
- Optimize placeholder images

### External Dependencies

- **Tailwind CSS:** Latest version via CDN
- **Google Fonts:** Inter font family
- **Remix Icons:** For UI icons (https://remixicon.com/)
- **Tilda Modal System:** External `#forma` modal integration
- **Tilda Footer:** External footer component integration

### Important Notes

- **All text content is in Russian** as this is for the Russian market
- **Claude Code responses must always be in Russian** - communicate with developers in Russian
- **No package.json or build process** - this is pure static HTML/CSS/JS
- **All CTA buttons must link to `#forma`** for Tilda modal integration
- **Styles must be inlined in HTML** using `<style>` tags for Tilda compatibility
- **JavaScript goes in separate file** for head injection in Tilda settings

### Development Process

**File Creation Order:**
1. Create `index.html` with basic structure and inlined CSS
2. Create `script.js` with JavaScript functionality
3. Create `data/` directory with HTML data files as needed

**Testing Workflow:**
- Open `index.html` directly in browser for local testing
- Test all breakpoints: 320px, 768px, 1024px, 1920px
- Verify all CTA links point to `#forma`
- Check JavaScript console for errors

**Integration with Tilda:**
- Copy `index.html` content → Tilda T123 "HTML-код" block  
- Copy `script.js` content → Tilda Settings → "HTML-код для вставки внутрь head"
- Test modal integration with existing `#forma` system

### Critical Implementation Rules

**Data Integration Priority:**
When creating sections that require data (brands, issues, services), always check if corresponding HTML files exist in `data/` directory first. If they don't exist, create placeholder content and note that real data integration is pending.

**Conversion-First Development:**
- Every section must have clear conversion goal (CTA button)
- All interactive elements should guide user towards `#forma` modal
- Use psychological triggers: urgency (timers), social proof (brands), authority (guarantees)

**Code Organization:**
- Inline all CSS within `<style>` tags in `index.html` for Tilda compatibility
- Keep JavaScript modular and well-commented in `script.js`
- Follow naming convention: descriptive classes without `t-` or `tn-` prefixes
- Test each component individually before integration