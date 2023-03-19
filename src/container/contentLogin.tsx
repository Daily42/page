/* eslint-disable import/no-unresolved */
// React & libraries
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

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
  
  &:hover {
    text-shadow: 0px 0px 10px ${(props) => (props.darkMode ? DARK.TEXT_SHADOW : LIGHT.TEXT_SHADOW)};
  }

  @media (max-width: 768px) {
    font-size: 18px;

    &:hover {
      text-shadow: 0px 0px 7px ${(props) => (props.darkMode ? DARK.TEXT_SHADOW : LIGHT.TEXT_SHADOW)};
    }
  }

  @media (min-width: 1200px) {
    font-size: 30px;

    &:hover {
      text-shadow: 0px 0px 15px ${(props) => (props.darkMode ? DARK.TEXT_SHADOW : LIGHT.TEXT_SHADOW)};
    }
  }

`;

const LogoContainer = styled.div`
  transition-duration: 0.8s;
  width: 70%;
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

    &:hover {
      text-shadow: 0px 0px 17px ${(props) => (props.darkMode ? DARK.COLOR_SHADOW : "rgba(255,27,0,0.5)")};
    }
  }

  @media (min-width: 1200px) {
    font-size: 6.5rem;

    &:hover {
      text-shadow: 0px 0px 25px ${(props) => (props.darkMode ? DARK.COLOR_SHADOW : "rgba(255,27,0,0.5)")};
    }
  }
`;

const LogoB = styled.b<Props>`
  letter-spacing: -3px;
  font-size: 5.2rem;

  @media (max-width: 768px) {
    font-size: 4.3rem;
  }

  @media (min-width: 1200px) {
    font-size: 7rem;
  }
`;

const LoginButton = styled.a<Props>`
  opacity: 0.75;

  font-family: OAGothic;
  font-weight: 500;

  padding: 10px;
  padding-left: 13px;
  padding-right: 13px;
  background: ${(props) => (props.darkMode ? LIGHT.BACKGROUND : DARK.BACKGROUND)};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: ${(props) => (props.darkMode ? LIGHT.TEXT : DARK.TEXT)};
  text-decoration: none;
  transition: all 0.5s;

  &:hover {
    opacity: 0.9;
    font-size: 1.05rem;
  }

  @media (max-width: 768px) {
    padding: 8px;
    padding-left: 11px;
    padding-right: 11px;
    font-size: 0.8rem;

    &:hover {
      opacity: 0.9;
      font-size: 0.87rem;
    }
  }
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
        <div style={{ width: "100%", height: "5%" }} />
        <TextContainer>
          <Text darkMode={darkMode}>42에서의 시간을 더욱 가치있게</Text>
        </TextContainer>
        <LogoContainer>
          {/* <Logo src={`../../public/asset/logo/${imgSrc}.png`} /> */}
          <LogoText darkMode={darkMode}>
            Daily<LogoB>42</LogoB>
          </LogoText>
        </LogoContainer>
        <div style={{ width: "100%", height: "10%" }} />
        <LoginButton
          darkMode={darkMode}
          href={`${backendSite}/auth/42?redirectUrl=http://localhost:3030`}
        >
          Login with 42 account
        </LoginButton>
      </Wrapper>
    </Contents>
  );
}
