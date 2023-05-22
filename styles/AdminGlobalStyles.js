import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const adminGlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body{
        @font-face {
         font-family: 'S-CoreDream-3Light';
         src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
         font-weight: normal;
         font-style: normal;
        }

        @font-face {
         font-family: 'S-CoreDream-4Regular';
         src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
         font-weight: normal;
         font-style: normal;
        }

        @font-face {
         font-family: 'S-CoreDream-5Medium';
         src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
         font-weight: normal;
         font-style: normal;
        }

        @font-face {
         font-family: 'S-CoreDream-6Bold';
         src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff');
         font-weight: normal;
         font-style: normal;
        }

        @media only screen and (max-width: 768px) {
         padding-left: 0;
        }
        font-family: 'S-CoreDream-4Regular';        
        font-size: 14px;
        padding-top: ${(props) => props.theme.adminHeaderHeight};
        padding-left: ${(props) => props.theme.adminSideBarWidth};
        background-color: ${(props) => props.theme.adminBgColor};        
        color: ${(props) => props.theme.adminFontColor};
        overflow-x: hidden;               
        border-radius: 0;
        margin: 0;
    }
    input{
        -webkit-tap-highlight-color: transparent;
        -webkit-appearance: none;
        -webkit-border-radius: 0;
        border-radius: 0;
    }    
`;

export default adminGlobalStyles;
