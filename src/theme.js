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
    contrast: 'white',
  },
  success: {
    main: '#c3db35',
    contrast: 'white',
  },
  warning: {
    main: '#ffa71a',
    contrast: 'white',
  },
  danger: {
    main: '#eb402d',
    contrast: 'white',
  },
  info: {
    main: '#27b9dd',
    contrast: 'white',
  },

  // Spacing
  space: '1rem',

  // Text
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,

  // Transitions
  durations: {
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
