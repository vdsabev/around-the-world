import React from 'react';
import styled from 'styled-components';

import BaseEmoji from '../Emoji';

const infoColumns = JSON.parse(process.env.REACT_APP_INFO_COLUMNS);

const PersonInfo = ({ person }) => {
  return infoColumns
    .filter((column) => person[column.field])
    .map((column) => (
      <p key={column.field}>
        <Emoji label={column.label} symbol={column.symbol} />
        {person[column.field]}
      </p>
    ));
};

export default PersonInfo;

const Emoji = styled(BaseEmoji)`
  display: inline-block;
  margin-right: 0.4em;
`;
