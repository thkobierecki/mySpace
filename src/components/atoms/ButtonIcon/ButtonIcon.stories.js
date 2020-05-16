import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import bulbIcon from '../../../assest/icons/bulb.svg';
import logIcon from '../../../assest/icons/logout.svg';
import penIcon from '../../../assest/icons/pen.svg';
import plusIcon from '../../../assest/icons/plus.svg';
import twitterIcon from '../../../assest/icons/twitter.svg';

const YellowBg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: ${({ theme }) => theme.note};
`;

storiesOf('ButtonIcon', module)
  .addDecorator(story => <YellowBg>{story()}</YellowBg>)
  .add('Bulb', () => <ButtonIcon icon={bulbIcon} />)
  .add('Pen', () => <ButtonIcon icon={penIcon} />)
  .add('Log', () => <ButtonIcon icon={logIcon} />)
  .add('Plus', () => <ButtonIcon icon={plusIcon} />)
  .add('Twitter', () => <ButtonIcon icon={twitterIcon} />);
