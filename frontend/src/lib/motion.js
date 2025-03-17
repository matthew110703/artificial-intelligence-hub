/** Fade In */
export const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 1,
      ease: "easeInOut",
    },
  },
};

/** Fade In (Move Up) */
export const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

/** Fade In (Move Down) */
export const fadeInDown = {
  initial: {
    y: -60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

/** Fade Out */
export const fadeOut = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

/** TypeWriter Animation Effect */
export const typeWriter = {
  initial: {
    width: 0,
    borderRight: "0px solid #15F5BA",
  },
  animate: {
    width: "100%",
    borderRight: "5px solid #15F5BA",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  blinkBorder: {
    borderRight: ["5px solid #15F5BA", "5px solid transparent"],
    transition: {
      delay: 2,
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.3,
      ease: "easeInOut",
    },
  },
  revmoveBorder: {
    borderRight: "none",
    transition: {
      delay: 1,
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

/** Button Animations */
export const buttonAnimation = {
  initial: {
    opacity: 0,
    scale: 1,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.9,
  },
};

/** Feature Section Animation */
export const zoomInFade = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

/** Tool Card Animation (Border and Card) */
export const toolCardAnimation = {
  initial: {
    y: 60,
    opacity: 0,
    border: "0px solid #15F5BA",
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  whileHover: {
    scale: 1.05,
    border: "4px solid #15F5BA",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

/** Dropdown Animation */
export const dropdownAnim = {
  initial: {
    opacity: 0,
    y: -15,
    height: 0,
    width: 0,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    width: "auto",
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

/** Mini Loading Spinner */
export const miniSpinner = {
  initial: {
    width: "24px",
    height: "24px",
    borderTopWidth: "2px",
    borderTopColor: "var(--color-dark)",
  },
  animate: {
    rotate: [0, 360],
    borderTopWidth: ["2px", "6px", "2px"],
    borderRadius: ["50%", "50%", "50%"],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/** Slide to Right Animation */
export const slideToRight = {
  initial: {
    x: -50,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: "easeInOut",
    },
  },
};

/** Slide to Left Animation */
export const slideToLeft = {
  initial: {
    x: 50,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: "easeInOut",
    },
  },
};

/** Image Fullscreen Animation */
export const imageFullscreen = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

/** Text Animation (appear) */
export const textAnimation = {
  initial: {
    opacity: 0,
    y: -5,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    delay: 0.2,
    duration: 0.5,
    ease: "easeInOut",
  },
};

/** Modal form Animation */
export const modalAnimatioon = {
  initial: {
    opacity: 0,
    y: -15,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
