import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primeicons/primeicons.css";
import {AppStyled} from "@/App.styled.tsx";
import {StyleSheetManager} from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <StyleSheetManager shouldForwardProp={isPropValid} >
                <AppStyled>
                    <App/>
                </AppStyled>
            </StyleSheetManager>
        </BrowserRouter>
    </React.StrictMode>,
)
