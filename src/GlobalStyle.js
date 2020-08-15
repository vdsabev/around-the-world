import { createGlobalStyle } from 'styled-components'
import theme from './theme'

// Source: https://github.com/cmless/seed/blob/master/src/style.css
const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  html {
    /* 0.625 of 16px is 10px: https://engageinteractive.co.uk/blog/em-vs-rem-vs-px */
    font-size: 62.5%;
    font-family: ${theme.fontFamily};
    color: ${theme.primary.main};
  }

  body {
    font-size: 1.4rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  a {
    display: inline-block;
    color: inherit;
    text-decoration: none;
  }

  /* https://stackoverflow.com/questions/11243337/a-taller-than-its-img-child */
  a > img {
    display: block;
  }

  img {
    max-width: 100%;
  }

  svg {
    fill: currentColor;
  }
`

export default GlobalStyle
