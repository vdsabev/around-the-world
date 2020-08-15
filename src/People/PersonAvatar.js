import styled from 'styled-components'

import { scaleIn } from '../animations'
import settings from '../settings'
import theme from '../theme'
import userUrl from './user.svg'

const PersonAvatar = styled.button`
  transform: scale(0);
  animation: ${scaleIn} ${theme.durations.long}ms forwards;
  animation-delay: ${(props) => props.delay * theme.durations.stagger}ms;
  animation-timing-function: ${theme.transitions.elastic};

  cursor: pointer;
  outline: 0;
  overflow: hidden;
  width: ${settings.person.size}px;
  height: ${settings.person.size}px;

  border-radius: 50%;
  border: 2px solid ${theme.neutral.main};

  background-color: ${theme.neutral.main};
  background-image: url('${(props) => getPictureUrl(props.person.pictureUrl)}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  padding: 0;

  filter: grayscale(100%) brightness(120%);
  transition: filter ${theme.durations.short}ms ${theme.transitions.easeInOut};

  &:hover {
    filter: grayscale(0);
  }
`

PersonAvatar.defaultProps = {
  delay: 0,
}

export default PersonAvatar

const getPictureUrl = (url) =>
  url
    ? `${url.replace('/open?', '/thumbnail?')}&sz=w${settings.person.size}`
    : userUrl
