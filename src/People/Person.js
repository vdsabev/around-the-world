import styled from 'styled-components';

import theme from '../theme';
import userUrl from './user.svg';

const picture = {
  size: 64, // in px
  scale: 1.25, // multiplier
};

const Person = styled.button`
  cursor: pointer;
  outline: 0;
  overflow: hidden;
  width: ${picture.size}px;
  height: ${picture.size}px;

  border-radius: 50%;
  border: 2px solid ${theme.primary.main};

  background-color: ${theme.neutral.main};
  background-image: url('${({ person }) => getPictureUrl(person.pictureUrl)}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  padding: 0;

  transition: ${theme.durations.short}ms ${theme.transitions.easeInOut};
  transition-property: filter, transform;

  &:hover {
    transform: scale(${picture.scale});
  }
`;

const getPictureUrl = (url) =>
  url
    ? `${url.replace('/open?', '/thumbnail?')}&sz=w${picture.size *
        picture.scale}`
    : userUrl;

export default Person;
