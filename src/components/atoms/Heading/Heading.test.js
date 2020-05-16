import React from 'react';
import {render} from 'react-testing-library';
import {ThemeProvider} from 'styled-components';
import Heading from './Heading';
import {theme} from '../../../theme/mainTheme';

describe('Heading Component', ()=>{
    it('Renders children text', ()=>{
        const {getByText}=render(
            <ThemeProvider theme={theme}>
                <Heading>Hello World</Heading>
            </ThemeProvider>
        );

        getByText('Hello World')
    })
})