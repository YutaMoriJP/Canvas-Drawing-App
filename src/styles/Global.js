import { createGlobalStyle } from "styled-components";
//theme tokens
import { SIZES } from "./themeTokens";

const Global = createGlobalStyle`
    :root {
        background: #edf2ff;
        box-sizing: border-box;
        margin:0;
        padding:0;
        font-size: ${SIZES[0]}px;
         @media screen and (min-width: 500px) and (max-width:600px) {
            font-size: ${SIZES[1]}px;
         }
        @media screen and (min-width: 601px) and (max-width: 900) {
            font-size: ${SIZES[2]}px;
         }
        @media screen and (min-width:901px) and (max-width: 1300px) {
            font-size: ${SIZES[3]}px;
         }
        @media screen and (min-width:1301px) {
            font-size: ${SIZES[4]}px;
         }
    }
    body {
        background: #edf2ff;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
    }
`;

export default Global;
