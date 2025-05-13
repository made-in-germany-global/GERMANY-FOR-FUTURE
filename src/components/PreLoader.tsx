import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe animations
const float = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(10px);
  }
`;

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
`;

// Styled components
const LoaderContainer = styled.div`
  position: fixed;
  top: -100px;
  left: 0;
  width: 100%;
  height: 120%;
  background-color: #343A40;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Ensure grid doesn't cause scrollbars */
`;

const LoaderDiv = styled.div`
  position: relative;
  width: 800px;
  height: 120px;
  background: linear-gradient(to right, #343A40, #243775);
  background-size: 200% 100%;
  border-radius: 5px;
  box-shadow: 0 0 3px;
  -webkit-box-reflect: below 1px linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4));
  animation: ${float} 0.5s ease-in-out infinite alternate,
             ${gradient} 10s linear infinite reverse;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 500px;
  }
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3; /* Adjusted for subtlety to match the ManufacturersSection style */
  z-index: 0; /* Ensure grid is behind the text */
`;

const LoaderText = styled.p`
  color: white;
  text-align: center;
  margin: 0;
  font-size: 50px;
  line-height: 130px;
  font-family: 'AscenderSerifW05-Bold', Arial, sans-serif;
  text-shadow: 0 0 3px;
  padding: 0;
  letter-spacing: 5px;
  position: relative;
  z-index: 1; /* Ensure text is above the grid */

  @media (max-width: 768px) {
    font-size: 30px;
    line-height: 120px;
  }
`;

// Font face can be added in your global styles or a separate CSS file
const GlobalStyle = styled.createGlobalStyle`
  @font-face {
    font-family: 'AscenderSerifW05-Bold';
    src: url('assets/fonts/AscenderSerifW05-Bold.eot');
    src: url('assets/fonts/AscenderSerifW05-Bold.eot?#iefix') format('embedded-opentype'),
         url('assets/fonts/AscenderSerifW05-Bold.woff2') format('woff2'),
         url('assets/fonts/AscenderSerifW05-Bold.woff') format('woff'),
         url('assets/fonts/AscenderSerifW05-Bold.ttf') format('truetype'),
         url('assets/fonts/AscenderSerifW05-Bold.svg#AscenderSerifW05-Bold') format('svg');
  }
`;

const Preloader: React.FC = () => {
  const [year, setYear] = useState<string>('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <>
      <GlobalStyle />
      <LoaderContainer>
        <LoaderDiv>
          <GridOverlay />
          <LoaderText>
            made-in-GERMANY © <span>{year}</span>
          </LoaderText>
        </LoaderDiv>
      </LoaderContainer>
    </>
  );
};

export default Preloader;