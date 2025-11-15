/**
 * Motion System for Pharmify
 * Centralized animation configurations for consistent micro-interactions
 */

export const durations = {
  fast: 120,
  normal: 240,
  slow: 480,
  pageTransition: 500,
} as const;

export const easings = {
  standard: [0.22, 0.9, 0.38, 1] as [number, number, number, number], // cubic-bezier(.22, .9, .38, 1)
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
} as const;

/**
 * Animation presets for common interactions
 */
export const animations = {
  // Button hover
  buttonHover: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: durations.fast / 1000,
      ease: easings.standard,
    },
  },

  // Button active
  buttonActive: {
    scale: 0.98,
    transition: {
      duration: durations.fast / 1000,
      ease: easings.standard,
    },
  },

  // Add to cart fly animation
  addToCart: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 0.98, 1.04, 1],
      transition: {
        duration: 0.28,
        ease: easings.bounce,
      },
    },
  },

  // Card hover
  cardHover: {
    y: -6,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    transition: {
      duration: durations.normal / 1000,
      ease: easings.standard,
    },
  },

  // Fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.standard,
      },
    },
  },

  // Slide down
  slideDown: {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.standard,
      },
    },
  },

  // Stagger children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  },

  // Search suggestions
  searchSuggestion: {
    initial: { opacity: 0, y: -5 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: easings.standard,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.15,
      },
    },
  },

  // Price change badge
  priceBadge: {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25,
      },
    },
  },

  // Success toast
  successToast: {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: easings.bounce,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  },

  // Hero card tilt
  heroCardTilt: {
    initial: { rotateY: 0, rotateX: 0 },
    whileHover: {
      rotateY: 5,
      rotateX: -2,
      scale: 1.02,
      transition: {
        duration: 0.5,
        ease: easings.standard,
      },
    },
  },

  // Progress timeline
  progressLine: {
    initial: { scaleX: 0 },
    animate: {
      scaleX: 1,
      transition: {
        duration: 0.6,
        ease: easings.standard,
      },
    },
  },

  // Map pin bounce
  mapPinBounce: {
    animate: {
      y: [0, -10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: easings.easeOut,
      },
    },
  },

  // Prescription upload success
  uploadSuccess: {
    initial: { scale: 0 },
    animate: {
      scale: [0, 1.2, 1],
      transition: {
        duration: 0.5,
        ease: easings.bounce,
      },
    },
  },
} as const;

/**
 * Page transition variants
 */
export const pageTransitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: durations.pageTransition / 1000,
      ease: easings.standard,
    },
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: {
      duration: durations.pageTransition / 1000,
      ease: easings.standard,
    },
  },
} as const;

