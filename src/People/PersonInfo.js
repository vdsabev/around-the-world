import React from 'react';
import styled from 'styled-components';

import BaseEmoji from '../Emoji';

const PersonInfo = ({ person }) => {
  return (
    <>
      <p>
        <Emoji label="Name" symbol="👋" />
        <b>{person.name}</b>
      </p>

      {person.location && (
        <p>
          <Emoji label="Location" symbol="🏡" />
          <b>{person.location}</b>
        </p>
      )}

      {person.about && (
        <p>
          <Emoji label="About" symbol="💭" />
          {person.about}
        </p>
      )}
    </>
  );
};

export default PersonInfo;

const Emoji = styled(BaseEmoji)`
  display: inline-block;
  margin-right: 0.4em;
`;
