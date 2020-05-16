import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
     @import url('https://fonts.googleapis.com/css?family=Montserrat:300,600&display=swap');
     
     *,*::after,*::before{
         box-sizing:border-box;
         -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
     }
    html{
        font-size: 65.5%; //happy rems
    }
     body{
        margin: 0;
    padding: 0;
    font-size: 1.6rem;
    font-family: "Montserrat", sans-serif;
     }
`;

export default GlobalStyle;
