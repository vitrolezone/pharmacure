# Motion System Documentation

This document outlines the animation and micro-interaction specifications for Pharmify.

## Principles

- **Micro-interactions**: 100–400ms for feedback (buttons, toggles, errors)
- **Page transitions**: 500–800ms for navigation
- **Easing**: Use cubic-bezier(.22, .9, .38, 1) for natural movement
- **Accessibility**: Respect `prefers-reduced-motion` media query

## Animation Specifications

### 1. Hero Split CTA (Nearby / Cheapest)

**Purpose**: Visually emphasize the two distinct flows

**Animation**:
- Smooth 3D card tilt on hover (rotateY: 5deg, rotateX: -2deg)
- Soft color glow on selected option
- Duration: 500ms
- Easing: cubic-bezier(.22, .9, .38, 1)

**Implementation**: See `packages/ui/src/motion.ts` → `animations.heroCardTilt`

---

### 2. Search Bar

**Purpose**: Expanding search input with smooth reveal

**Animation**:
- Expanding search input with gentle scale (1 → 1.02) + shadow increase
- Suggestion list fades + slides down
- Duration: 180–240ms
- Easing: cubic-bezier(.22, .9, .38, 1)

**Implementation**: See `packages/ui/src/motion.ts` → `animations.slideDown`

---

### 3. Typeahead Results

**Purpose**: Smooth appearance of search suggestions

**Animation**:
- Each suggestion appears with staggered fade + slide (20–30ms staggers)
- Highlight matched substring with animated background wipe
- Duration: 200ms per item
- Stagger: 30ms

**Implementation**: See `packages/ui/src/motion.ts` → `animations.searchSuggestion` + `staggerContainer`

---

### 4. Product Card

**Purpose**: Visual feedback for price changes and cart actions

**Animations**:
- **Price change badge**: Pops in with tiny bounce (scale: 0 → 1.2 → 1, rotate: -180 → 0)
- **Add to cart**: Product image flies into cart icon with parabolic curve path
- Duration: 280ms for add-to-cart, 500ms for price badge
- Easing: Spring for badge, cubic-bezier for fly

**Implementation**: 
- Price badge: `animations.priceBadge`
- Add to cart: `animations.addToCart` + custom fly path

---

### 5. Switch Between Nearby and Cheapest

**Purpose**: Smooth transition between ordering modes

**Animation**:
- Content cross-fades while comparing bar animates
- Icons for distance vs price swap with scale animation
- Microcopy morphs with small typewriter effect
- Duration: 500ms
- Easing: cubic-bezier(.22, .9, .38, 1)

**Implementation**: Use `pageTransitions.fade` + custom icon swap animation

---

### 6. Cart Drawer

**Purpose**: Slide-in cart with item animations

**Animation**:
- Slide in from right (x: 100% → 0)
- Items pop in via scale-up + fade (staggered)
- Updates show animated number counters for totals
- Duration: 300ms for drawer, 200ms per item (staggered)

**Implementation**: Framer Motion `AnimatePresence` + `staggerContainer`

---

### 7. Prescription Upload

**Purpose**: Visual feedback for file upload

**Animation**:
- Drag-and-drop area: Animated dotted border that reacts when file is dragged
- Successful upload: Small checkmark burst animation (Lottie)
- Duration: 500ms for success animation
- Easing: Spring bounce

**Implementation**: 
- Drag state: Border animation on drag enter
- Success: `animations.uploadSuccess` + Lottie checkmark

---

### 8. Order Timeline / Tracking

**Purpose**: Visual progress indication

**Animation**:
- Horizontal stepper with smoothly animating progress line (liquid-fill or sliding gradient)
- Pulsing active step
- Map pin animates (bounce + shadow swell) when courier moves
- Duration: 600ms for progress line, 1s infinite for pin bounce

**Implementation**: 
- Progress: `animations.progressLine`
- Pin: `animations.mapPinBounce`

---

### 9. Price Comparison Table

**Purpose**: Help users track price changes

**Animation**:
- Rows that re-order by price animate their movement (flip list animation)
- Users can track where items move to
- Duration: 400ms per row
- Easing: cubic-bezier(.22, .9, .38, 1)

**Implementation**: Framer Motion `layout` prop for automatic layout animations

---

### 10. Empty States & Success

**Purpose**: Friendly, engaging empty states

**Animation**:
- Friendly illustrations with subtle looping Lottie animations
  - Pharmacist waving (hero_lottie.json)
  - Pill bottle gently bobbing
- Success toast with confetti burst (small, tasteful)
- Duration: Infinite loop for illustrations, 400ms for toast

**Implementation**: Lottie files in `apps/web/lottie/` + `animations.successToast`

---

### 11. Loading States

**Purpose**: Perceived performance improvement

**Animation**:
- Skeleton UIs with shimmer for lists and product images
- Not spinner-only
- Shimmer: Gradient moving across skeleton (2s infinite)

**Implementation**: CSS gradient animation or Framer Motion

---

### 12. Microcopy Reveals

**Purpose**: Educate without clutter

**Animation**:
- Tooltip cards that slide from price or prescription icons
- Small fade (200ms)
- Easing: cubic-bezier(.22, .9, .38, 1)

**Implementation**: Framer Motion tooltip with `animations.slideDown`

---

## Lottie Assets

Place Lottie JSON files in `apps/web/lottie/`:

- `hero_lottie.json` - Pharmacist waving (hero section)
- `upload_success.json` - Prescription upload success checkmark
- `confetti.json` - Small confetti burst for success
- `pin_bounce.json` - Delivery tracking pin animation
- `checkmark_burst.json` - Generic success checkmark
- `empty_cart.json` - Empty cart illustration
- `empty_search.json` - Empty search results illustration

---

## Design Tokens Reference

See `packages/ui/src/design-tokens.ts` for:
- Colors
- Spacing
- Typography
- Shadows
- Z-index
- Border radius

---

## Motion Tokens Reference

See `packages/ui/src/motion.ts` for:
- Durations (fast: 120ms, normal: 240ms, slow: 480ms)
- Easings (standard, easeOut, easeIn, bounce)
- Animation presets for all components
- Page transition variants

---

## Accessibility

Always respect `prefers-reduced-motion`:

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

const animation = shouldReduceMotion
  ? { opacity: 1 } // Static fallback
  : animations.fadeIn; // Full animation
```

---

## Performance Tips

1. Use `will-change` sparingly and only for elements that will animate
2. Prefer `transform` and `opacity` for animations (GPU-accelerated)
3. Use `layout` prop in Framer Motion for automatic layout animations
4. Lazy-load Lottie animations
5. Debounce search animations to avoid jank

---

## Examples

See component implementations in `apps/web/components/` for real-world usage of these animations.

