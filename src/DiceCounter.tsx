import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { useStore } from 'effector-react';

import { $rollingDiceCount } from './models/dice';

export const DiceCounter = () => {
  const rollingDiceCount = useStore($rollingDiceCount);
  const showDiceCount = rollingDiceCount >= 5;
  const headerText = showDiceCount ? rollingDiceCount : '0';
  const Component = (
    <Overlay>
      <DiceCounterStyled key={`rolling-dice-count-${headerText}`}>
        {rollingDiceCount}
      </DiceCounterStyled>
    </Overlay>
  );
  const portalDomNode = document.getElementById('dice-counter');
  if (portalDomNode && showDiceCount) {
    return createPortal(Component, portalDomNode);
  }
  return null;
}

const slideDown = keyframes`
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
`;


const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  content: '';
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const DiceCounterStyled = styled.div`
  padding: 8px 0;
  font-size: 48px;
  font-weight: bold;
  text-shadow:
   -1px -1px 0 var(--background-color),  
    1px -1px 0 var(--background-color),
    -1px 1px 0 var(--background-color),
     1px 1px 0 var(--background-color);
  animation: ${slideDown} 100ms linear;
`;
