import styled from 'styled-components';

import settings from '../settings';
import theme from '../theme';
import userUrl from './user.svg';

const Person = styled.button`
  cursor: pointer;
  outline: 0;
  overflow: hidden;
  width: ${settings.person.size}px;
  height: ${settings.person.size}px;

  border-radius: 50%;
  border: 2px solid ${theme.primary.main};

  background-color: ${theme.neutral.main};
  background-image: url('${({ person }) => getPictureUrl(person.pictureUrl)}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  padding: 0;

  filter: grayscale(100%) brightness(120%);
  transition: filter ${theme.durations.short}ms ${theme.transitions.easeInOut};

  &:hover {
    filter: grayscale(0);
  }
`;

const getPictureUrl = (url) =>
  url
    ? `${url.replace('/open?', '/thumbnail?')}&sz=w${settings.person.size}`
    : userUrl;

export default Person;
