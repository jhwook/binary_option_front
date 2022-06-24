import styled from "styled-components";
import B_loadingBar from "../../img/bg/loadingBar/B_loadingBar.svg";

export default function LoadingBar() {
  return (
    <LoadingBarBox>
      <img src={B_loadingBar} alt="" />
    </LoadingBarBox>
  );
}

const LoadingBarBox = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0a0e17;
`;
