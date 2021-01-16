import { get } from 'lodash'
import React from 'react'
import styled from 'styled-components'

import BaseEmoji from '../Components/Emoji'
import settings from '../settings'

const PersonInfo = ({ person }) => {
  return settings.infoColumns
    .filter((column) => get(person, column.field))
    .map((column) => (
      <p key={column.field}>
        <Emoji label={column.label} symbol={column.symbol} />
        {person[column.field]}
      </p>
    ))
}

export default PersonInfo

const Emoji = styled(BaseEmoji)`
  display: inline-block;
  margin-right: 0.4em;
`
