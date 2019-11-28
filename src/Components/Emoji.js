import React from 'react';

const Emoji = ({ label, symbol, ...props }) => (
  <span role="img" aria-label={label} aria-hidden={!label} {...props}>
    {symbol}
  </span>
);

export default Emoji;
