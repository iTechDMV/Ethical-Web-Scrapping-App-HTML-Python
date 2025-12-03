# Property Records Scraper - Design System

## Design Philosophy

### Visual Language
- **Professional SaaS Aesthetic**: Clean, modern interface that conveys trust and reliability
- **Data-First Design**: Information hierarchy that prioritizes clarity and usability
- **Subtle Sophistication**: Refined details without overwhelming complexity
- **Accessibility Focus**: High contrast ratios and clear visual indicators

### Color Palette
- **Primary**: Deep Navy (#1e293b) - Professional, trustworthy foundation
- **Secondary**: Warm Copper (#d97706) - Accent color for interactive elements
- **Success**: Forest Green (#059669) - Positive actions and confirmations
- **Warning**: Amber (#f59e0b) - Caution and important notices
- **Error**: Crimson (#dc2626) - Error states and critical alerts
- **Neutral Base**: Cool Gray (#f8fafc) - Background and subtle elements
- **Text**: Charcoal (#374151) - High contrast readable text

### Typography
- **Display Font**: Inter Bold - Modern, clean headings
- **Body Font**: Inter Regular - Excellent readability for data-heavy interfaces
- **Monospace**: JetBrains Mono - Code and technical data display
- **Font Sizes**: 
  - H1: 2.5rem (40px) - Main page titles
  - H2: 2rem (32px) - Section headers
  - H3: 1.5rem (24px) - Subsection titles
  - Body: 1rem (16px) - Standard text
  - Small: 0.875rem (14px) - Secondary information

## Visual Effects & Styling

### Background Treatment
- **Primary Background**: Subtle gradient from cool gray to white
- **Card Backgrounds**: Pure white with soft shadows
- **Interactive Areas**: Light gray hover states
- **Data Tables**: Alternating row colors for improved readability

### Animation Library Usage
- **Anime.js**: Smooth transitions for UI state changes and data loading
- **ECharts.js**: Interactive data visualizations with hover effects
- **Splitting.js**: Text reveal animations for headings
- **Matter.js**: Subtle physics-based interactions for drag-and-drop

### Header Effects
- **Gradient Text**: Animated color cycling for main headings
- **Particle Background**: Subtle animated dots using p5.js
- **Parallax Scrolling**: Gentle depth effect on hero sections

### Interactive Elements
- **Button Hover**: 3D lift effect with shadow expansion
- **Card Hover**: Subtle scale transform with shadow enhancement
- **Loading States**: Skeleton screens with shimmer effects
- **Data Updates**: Smooth number counting animations

### Data Visualization Styling
- **Chart Colors**: Muted tones with saturation below 50%
- **Hover States**: Bright accent colors for interaction feedback
- **Grid Lines**: Subtle gray lines for structure without distraction
- **Data Points**: Clear markers with hover tooltips

### Responsive Design
- **Mobile First**: Progressive enhancement for larger screens
- **Breakpoints**: 
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+
- **Touch Targets**: Minimum 44px for mobile interactions
- **Typography Scale**: Responsive font sizing

### Component Styling
- **Cards**: White background, 8px border radius, subtle shadow
- **Forms**: Clean input fields with focus states
- **Tables**: Zebra striping, sortable headers, responsive overflow
- **Modals**: Backdrop blur, centered content, smooth transitions

### Accessibility Features
- **Color Contrast**: Minimum 4.5:1 ratio for all text
- **Focus Indicators**: Clear visual focus states for keyboard navigation
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Motion**: Respects prefers-reduced-motion settings