import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import styled from 'styled-components';
import Sidebar from './Sidebar';

storiesOf('Sidebar', module)
  .addDecorator(StoryRouter())
  .add('Sidebar', () => <Sidebar />);
