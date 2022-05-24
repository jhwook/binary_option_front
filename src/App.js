import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import EventListener from "./components/common/EventListener";
import GlobalStyle from "./components/common/globalStyle";
import Auth from "./routers/auth/Auth";
import Bet from "./routers/bet/Bet";
import Market from "./routers/market/Market";

export default function App() {
  return (
    <AppBox className="appBox">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap"
        rel="stylesheet"
      />

      <HashRouter>
        <GlobalStyle />
        <EventListener />

        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/bet" element={<Bet />} />
          <Route path="/market/*" element={<Market />} />
        </Routes>
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  color: #2a2a2a;
`;
