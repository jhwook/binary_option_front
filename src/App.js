import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import EventListener from "./components/common/EventListener";
import GlobalStyle from "./components/common/globalStyle";
import Auth from "./routers/auth/Auth";
import Bet from "./routers/bet/Bet";
import Finance from "./routers/finance/Finance";
import Lending from "./routers/lending/Lending";
import Market from "./routers/market/Market";
import Position from "./routers/position/Position";
import Setting from "./routers/setting/Setting";

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
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap"
        rel="stylesheet"
      />

      <HashRouter>
        <GlobalStyle />
        <EventListener />

        <Routes>
          <Route path="/" element={<Lending />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/market/*" element={<Market />} />
          <Route path="/bet" element={<Bet />} />
          <Route path="/position/*" element={<Position />} />
          <Route path="/finance/*" element={<Finance />} />

          <Route path="/setting/*" element={<Setting />} />
        </Routes>
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  color: #2a2a2a;
`;
