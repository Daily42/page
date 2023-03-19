/* eslint-disable import/no-unresolved */
// React & libraries
import styled from "@emotion/styled";

// Enum & Interface
import Props from "../interface/props.interface";

// theme
import { DARK, LIGHT } from "../theme/theme";

// pre-made

// API
import { backendSite } from "../network/api/axios.instance";

// import { BuildingName } from "../component/building/buildingName"

const Contents = styled.div<Props>`
  height: calc(100% - 50px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  background-color: ${(props) => (props.darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND)};
  overflow-x: hidden;
  overflow-y: scroll;
  transition-duration: 1s;
  &::-webkit-scrollbar {
    background: none;
    width: 0.6rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    width: 0.4rem;
    right: 60px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TextContainer = styled.div`
  width: 100%;
`;

const Text = styled.pre<Props>`
  width: 100%;
  font-weight: 400;
  font-size: 24px;
  letter-spacing: -0.2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  margin-bottom: 5px;
  transition-duration: 0.5s;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: center;
  }

  &:hover {
    text-shadow: 0px 0px 10px ${(props) => (props.darkMode ? DARK.TEXT_SHADOW : LIGHT.TEXT_SHADOW)};
  }
`;

const LogoContainer = styled.div`
  transition-duration: 0.8s;
  width: 70%;
  @media (max-width: 768px) {
    
`;

const LogoText = styled.div<Props>`
  font-family: OAGothic;
  font-size: 5rem;
  font-weight: 800;
  transition-duration: 0.5s;

  &:hover {
    text-shadow: 0px 0px 20px ${(props) => (props.darkMode ? DARK.COLOR_SHADOW : "rgba(255,27,0,0.5)")};
  }

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const LogoB = styled.b<Props>`
  letter-spacing: -3px;
  font-size: 5.2rem;
`;

const LoginButton = styled.div`
  padding: 10px;
  border: 1px solid black;
  background: white;
  border-radius: 5px;
  cursor: pointer;
`;

export function ContainerContents(
  props: {
    darkMode: boolean,
    toggleDarkMode: Function
  }
) {
  const { darkMode, toggleDarkMode } = props;

  return (
    <Contents className="contents" darkMode={darkMode}>
      <Wrapper>
        <TextContainer>
          <Text darkMode={darkMode}>42에서의 시간을 더욱 가치있게</Text>
        </TextContainer>
        <LogoContainer>
          {/* <Logo src={`../../public/asset/logo/${imgSrc}.png`} /> */}
          <LogoText darkMode={darkMode}>
            Daily<LogoB>42</LogoB>
          </LogoText>
        </LogoContainer>
        <div style={{ width: "100%", height: "5%" }} />
        <LoginButton>
          <a href={`${backendSite}/auth/42?redirectUrl=http://localhost:3030`}>42 Login</a>
        </LoginButton>
      </Wrapper>
    </Contents>
  );
}
