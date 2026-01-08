import React from 'react';
import { HeaderContainer, TopBar, Logo } from './styles';

const Header = () => {
  return (
    <HeaderContainer>
      <TopBar>
        <Logo src="/Logo.svg" alt="myauto.ge" />
      </TopBar>

    </HeaderContainer>
  );
};

export default Header;

