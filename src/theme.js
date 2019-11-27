const theme = {
  // Colors
  neutral: {
    lightest: '#ffffff',
    lighter: '#fafafb',
    light: '#f4f2f5',
    main: '#eeebf0',
    dark: '#e4ddee',
    darker: '#bfb7c8',
    darkest: '#392b48',
  },
  primary: {
    main: '#2d3436',
    contrast: '#ffffff',
  },
  success: {
    main: '#c3db35',
    contrast: '#ffffff',
  },
  warning: {
    main: '#ffa71a',
    contrast: '#ffffff',
  },
  danger: {
    main: '#eb402d',
    contrast: '#ffffff',
  },
  info: {
    main: '#27b9dd',
    contrast: '#ffffff',
  },

  // Spacing
  space: '1rem',

  // Text
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,

  // Transitions
  durations: {
    stagger: 100,
    short: 200,
    medium: 400,
    long: 600,
  },
  transitions: {
    easeInOut: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    elastic: 'cubic-bezier(0.33, 3, 0.66, 0)',
  },
};

export default theme;
