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
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <StyleSheetManager shouldForwardProp={isPropValid}>
                <QueryClientProvider client={queryClient}>
                    <AppStyled>
                        <App/>
                    </AppStyled>
                </QueryClientProvider>
            </StyleSheetManager>
        </BrowserRouter>
    </React.StrictMode>,
)
