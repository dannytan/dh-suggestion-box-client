import React from 'react';
import styled from 'styled-components';

const Nav = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #f2f2f2;
  position: ${props => (props.fixed ? 'fixed' : 'relative')};
`;

const Title = styled.h1`
  margin: 0;
  color: #000;
  font-weight: 600;
`;

const Header = () => {
  return (
    <Nav>
      <Title>DH Suggestion Box</Title>
    </Nav>
  );
};

export default Header;
