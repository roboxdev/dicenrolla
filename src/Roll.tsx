import format from 'date-fns/format';
import styled from 'styled-components';
import { Die } from './Die';
import type { RollI } from './models/dice';

interface Props {
  dice: RollI['dice'];
  diceResult?: RollI['diceResult'];
  sum?: RollI['sum'];
  datetime?: RollI['datetime'];
}

export const Roll = styled.li.attrs<Props>(({
  dice,
  diceResult,
  sum,
  datetime,
}) => {
  const timestamp = datetime ? format(new Date(datetime), 'HH:mm:ss') : '';
  return ({
    children: <>
      <RollDice>
        {dice.map((v, index) => (
          <RollDie key={`${index}-${v}`}>
            <Die
              // key={animationKey}
              rolling={false}
              name={v}
              label={diceResult ? String(diceResult[index]) : ''}
            />
          </RollDie>
        ))}
      </RollDice>
      <RollInfo>
        <RollSum>{typeof sum === 'number' ? sum : "_"}</RollSum>
        <RollTimestamp>{timestamp}</RollTimestamp>
      </RollInfo>
    </>,
  });
})<Props>`
  list-style: none;
  display: flex;
  gap: 16px;
  align-items: baseline;
  padding: 0 8px;
  min-height: 48px;
`;

const RollDice = styled.div`
  flex: 1;
  display: flex;
  gap: 0;
  flex-wrap: wrap;
`;

const RollDie = styled.div`
  scale: 0.8
`;

const RollInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

const RollSum = styled.div`
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  font-weight: bold;
  background: #626262;
  color: white;
  text-shadow: 
     -1px -1px 0 hsl(0, 0%, 25%),
      1px -1px 0 hsl(0, 0%, 25%),
      -1px 1px 0 hsl(0, 0%, 25%),
       1px 1px 0 hsl(0, 0%, 25%);
  
  visibility: ${p => p.children === "_" && 'hidden'};

  scale: 0.8
`;

const RollTimestamp = styled.div`
  font-size: 10px;
  opacity: 0.7;
  align-self: flex-start;
`;
