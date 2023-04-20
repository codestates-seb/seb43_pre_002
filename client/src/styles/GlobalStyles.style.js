import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 

    :root {
        --main-color: #508CC3;
        --line-color: #D9D9D9;
        --base-color:#F1F2F3;
        --main-color-lighten: #D9E9F7;
        --modal-color: #E5F3FF;
        --button-hover-color: #3B6FA0;
        
        --font-title-large: 27px;
        --font-title-small: 17px;
        --font-large: 15px;
        --font-base: 13px;
        --font-small: 11px;
    }

    ${reset}
    *{
        box-sizing: border-box;
        
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    html, body, #root {
        height: 100%;
    }
    html,
    body,
    body > div { /* the react root */
        margin: 0;
        padding: 0;
        height: 100%;
    }
    body {
        font-family: 'Noto Sans KR', sans-serif;
    }
    #root {
        display: flex;
    }
    h2 {
        margin: 0;
        font-size: 16px;
    }
    ul {
        margin: 0;
        padding: 0 0 0 1.5em;
    }
    li {
        padding: 0;
    }
    b { 
        margin-right: 3px;
    }
`;

export default GlobalStyles;
