/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { DARK, LIGHT } from "../theme/theme";
import Props from "../interface/props.interface";

const Container = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.darkMode ? DARK.HEADER_BACKGROUND : LIGHT.HEADER_BACKGROUND)};
  height: 40px;
  padding: 0 10px;
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  text-shadow: 0.5px 0.5px 2px ${(props) => (props.darkMode ? DARK.SHADOW : LIGHT.SHADOW)};
  transition-duration: 0.5s;
`;

interface ButtonProps {
  color?: string;
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Button = styled.button<ButtonProps>`
  border: none;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
  outline: none;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0;

  &:hover {
    & > img {
      display: block;
    }
  }
`;

const ImgIcon = styled.img`
  width: 16px;
  height: 16px;
  display: none;
  opacity: 0.5;
`;

const Title = styled.div<Props>`
  font-family: OAGothic;
  font-weight: 500;
  margin-left: 20px;
  font-size: 1.1rem;
  cursor: pointer;
  transition-duration: 0.5s;
  &:hover {
    font-weight: 500;
    text-shadow: 0.5px 0.5px 20px ${(props) => (props.darkMode ? DARK.TEXT_SHADOW : LIGHT.TEXT_SHADOW)};
  }
`;

const DarkModeButtonContainer = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  background: linear-gradient(145deg, #23282c, #1e2125);
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

const DarkModeButton = styled.div<Props>`
  background-color: var(--bs-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  & > img {
    width: 20px;
    height: 20px;
    transition: 0.5s;
  }
`;

export function ContainerNavMenu(
  props: {
    title: string,
    darkMode: boolean,
    toggleDarkMode: Function
  }
) {
  const { title, darkMode, toggleDarkMode } = props;
  const navigate = useNavigate();
  const assetLink = "https://raw.githubusercontent.com/Daily42/page/master";

  function navigateTo(str: string) {
    navigate(str);
  }

  function toggleTheme() {
    toggleDarkMode();
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
      themeIcon.classList.add("change");
      setTimeout(() => {
        themeIcon.classList.remove("change");
      }, 1000);
    }
  }

  return (
    <Container darkMode={darkMode}>
      <ButtonContainer>
        <Button color="#FF605C">
          <ImgIcon
            src={`${assetLink}/public/asset/icon/exit.svg`}
            alt="Exit Icon"
          />
        </Button>
        <Button color="#FFBD2E">
          <ImgIcon
            src={`${assetLink}/public/asset/icon/minimize.svg`}
            alt="Minimize Icon"
          />
        </Button>
        <Button color="#4CD964">
          <ImgIcon
            src={`${assetLink}/public/asset/icon/maximize.svg`}
            alt="Maximize Icon"
          />
        </Button>
        <Title onClick={() => { navigateTo("/") }} darkMode={darkMode}>{title}</Title>
      </ButtonContainer>
      <DarkModeButton darkMode={darkMode} onClick={() => { toggleTheme() }}>
        <div className="theme-container shadow-dark">
          <img id="theme-icon" src={darkMode ? "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg" : "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg"} alt="Theme Icon" />
        </div>
      </DarkModeButton>
    </Container>
  );
}
