import React from 'react'

const Emoji = ({ label = undefined, symbol, ...props }) => (
  <span role="img" aria-label={label} aria-hidden={!label} {...props}>
    {symbol}
  </span>
)

export default Emoji
