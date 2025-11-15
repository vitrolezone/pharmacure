# Design Tokens

This document describes the design system tokens used across Pharmify.

## Colors

### Primary (Blue)
Used for primary actions, links, and brand elements.

- `primary-50` through `primary-900`: Shades from lightest to darkest

### Secondary (Gray)
Used for text, borders, and neutral elements.

- `secondary-50` through `secondary-900`: Shades from lightest to darkest

### Success (Green)
Used for success states, confirmations, and positive feedback.

- `success-50` through `success-900`

### Warning (Yellow/Orange)
Used for warnings and cautionary messages.

- `warning-50` through `warning-900`

### Error (Red)
Used for errors, destructive actions, and critical alerts.

- `error-50` through `error-900`

### Prescription (Purple)
Used for prescription-related UI elements and badges.

- `prescription-50` through `prescription-900`

## Spacing

Spacing scale uses rem units:
- `0` - 0
- `1` - 0.25rem (4px)
- `2` - 0.5rem (8px)
- `3` - 0.75rem (12px)
- `4` - 1rem (16px)
- `5` - 1.25rem (20px)
- `6` - 1.5rem (24px)
- `8` - 2rem (32px)
- `10` - 2.5rem (40px)
- `12` - 3rem (48px)
- `16` - 4rem (64px)
- `20` - 5rem (80px)
- `24` - 6rem (96px)
- `32` - 8rem (128px)

## Typography

### Font Families
- **Sans**: Inter, system-ui, sans-serif (primary)
- **Mono**: Fira Code, monospace (code)

### Font Sizes
- `xs` - 0.75rem (12px)
- `sm` - 0.875rem (14px)
- `base` - 1rem (16px)
- `lg` - 1.125rem (18px)
- `xl` - 1.25rem (20px)
- `2xl` - 1.5rem (24px)
- `3xl` - 1.875rem (30px)
- `4xl` - 2.25rem (36px)
- `5xl` - 3rem (48px)

### Font Weights
- `normal` - 400
- `medium` - 500
- `semibold` - 600
- `bold` - 700

### Line Heights
- `tight` - 1.25
- `normal` - 1.5
- `relaxed` - 1.75

## Shadows

- `sm` - Small shadow for subtle elevation
- `base` - Default shadow
- `md` - Medium shadow
- `lg` - Large shadow
- `xl` - Extra large shadow
- `2xl` - 2x extra large shadow
- `inner` - Inner shadow

## Z-Index Scale

- `base` - 0
- `dropdown` - 1000
- `sticky` - 1020
- `fixed` - 1030
- `modalBackdrop` - 1040
- `modal` - 1050
- `popover` - 1060
- `tooltip` - 1070

## Border Radius

- `none` - 0
- `sm` - 0.125rem (2px)
- `base` - 0.25rem (4px)
- `md` - 0.375rem (6px)
- `lg` - 0.5rem (8px)
- `xl` - 0.75rem (12px)
- `2xl` - 1rem (16px)
- `full` - 9999px (fully rounded)

## Usage

Import design tokens in your components:

```typescript
import { colors, spacing, typography, shadows } from '@pharmify/ui';
```

Or use Tailwind classes (recommended for most cases):

```tsx
<div className="bg-primary-500 text-white p-4 rounded-lg shadow-md">
  Primary Button
</div>
```

