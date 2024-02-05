import React, { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
top: 0;
width: 100%;
background-color: #214c5c;
color: white;
padding: 10px;
transition: transform 0.3s;
z-index: 1000;
`;


const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const headerWrapper = document.querySelector('#header-wrapper');
    if (headerWrapper) {
      const scrollTop = headerWrapper.scrollTop || document.documentElement.scrollTop;
      setScrollY(scrollTop);
    }
  };

  useEffect(() => {
    const headerWrapper = document.querySelector('#header-wrapper');
    
    if (headerWrapper) {
      headerWrapper.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (headerWrapper) {
        headerWrapper.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <HeaderWrapper>
      <img src="../../assets/images/logo.png"></img>
      <div>
      <Image src='../../assets/images/Adrien.png' avatar />
      <span>Bonjour, Adrien Verwaerde</span>
      </div>
      <button>Unwrap</button>
      <button>Skate</button>
      <button>Snow</button>
    </HeaderWrapper>
  );
};
export default Header;
