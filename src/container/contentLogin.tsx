/* eslint-disable import/no-unresolved */
// React & libraries
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

// Enum & Interface
import Ilocation from "../interface/location.interface";
import Props from "../interface/props.interface";

// theme
import { DARK, LIGHT } from "../theme/theme";

// pre-made

// API
import { getLocations } from "../network/api/axios.custom"
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
  padding: 3vh;
  overflow-x: hidden;
  overflow-y: scroll;
  transition-duration: 1.5s;
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

  font-weight: 300;
  font-size: 40px;
  text-shadow: 6px 6px 5px ${(props) => (props.darkMode ? DARK.TEXT_SHADOW : LIGHT.TEXT_SHADOW)};

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const LogoContainer = styled.div`
  transition-duration: 1.5s;
  width: 70%;
`;

const Logo = styled.img`
  transition-duration: 1.5s;
  width: 70%;
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
  const [location, setLocation] = useState<Ilocation[]>([]);
  let imgSrc;

  if (darkMode === true) {
    imgSrc = "dark"
  } else {
    imgSrc = "light"
  }

  useEffect(() => {
    getLocations().then((response: any) => {
      console.log("response: ", response);
      setLocation(response);
    });
  }, []);

  return (
    <Contents className="contents" darkMode={darkMode}>
      <Wrapper>
        <TextContainer>
          <Text darkMode={darkMode}>
            42에서의 시간을   더욱 가치있게.
          </Text>
        </TextContainer>
        <LogoContainer>
          <Logo src={`../../public/asset/logo/${imgSrc}.svg`} />
        </LogoContainer>
        <div style={{ width: "100%", height: "10%" }} />
        <LoginButton>
          <a href={`${backendSite}/auth/42?redirectUrl=http://localhost:3030`}>42 Login</a>
        </LoginButton>
      </Wrapper>
    </Contents>
  );
}
