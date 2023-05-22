import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const globalStyles = createGlobalStyle`
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

        @font-face {
         font-family: 'Cafe24Oneprettynight';
         src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Oneprettynight.woff') format('woff');
         font-weight: normal;
         font-style: normal;
        }

        @font-face {
        font-family: 'Cafe24SsurroundAir';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24SsurroundAir.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        }    

        /* font-family: 'Cafe24SsurroundAir';         */
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 300;
        font-size: 14px;
        padding: 110px 20px 60px 20px;
        
        background-color: #150F0A;
        background-image: url('/bg-pattern.png');
        background-size: cover;
        
        color: ${(props) => props.theme.fontColor};        
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

export default globalStyles;
