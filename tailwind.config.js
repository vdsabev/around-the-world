module.exports = {
  future: {
    defaultLineHeights: true,
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
    standardFontWeights: true,
  },
  purge: {
    content: ['./public/**/*.html', './src/**/*.vue'],
  },
  darkMode: 'media',
  theme: {
    extend: {
      animation: {
        fade: 'fade 500ms',
        'scale-in': 'scale-in 500ms cubic-bezier(0.33, 3, 0.66, 0) forwards',
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'scale-in': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  variants: {
    backgroundPosition: ['hover', 'responsive'],
  },
}
