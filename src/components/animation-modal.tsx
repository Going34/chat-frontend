import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import CloseButton from '../svg/close-button';
import ArrowIcon from '../svg/arrow-icon';

interface IStyle {
  isOpen: boolean;
}
const ModalContainer = styled(Box)<IStyle>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #151f35db;
  z-index: 99;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.1s ease-in-out,
    visibility 0.1s linear ${(props) => (props.isOpen ? '0s' : '0.1s')}; // add transition for opacity and visibility
  @media (max-width: 600px) {
    background-color: ${(props) => (props.isOpen ? '#151f35db' : 'white')};
    transition: 0.5s;
  }
`;

const ModalContent = styled(Box)<IStyle>`
  position: fixed;
  top: 50%;
  padding: 20px;
  overflow-x: auto;
  bottom: ${(props) => (props.isOpen ? '-100%' : '-150%')};
  left: 50%;
  border-radius: 6px;
  max-width: 750px;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  height: ${(props) => (props.isOpen ? '80%' : '50%')};
  width: ${(props) => (props.isOpen ? '60%' : '40%')};
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, visibility 0.1s;
  background-color: white;
  @media (max-width: 600px) {
    bottom: ${(props) => (props.isOpen ? '-50%' : '-100%')};
    top: initial;
    height: ${(props) => (props.isOpen ? '80%' : '0%')};
    width: 100%;
    border-radius: none;
    background-color: white;
    transition: 0.7s;
  }
`;
const OuterBox = styled(Box)`
@media (max-width:600px) {
  height: 100%;
  width: 100%;
}
`;

const ModalClose = styled(CloseButton)`
  position: absolute;
  left: 93%;
  top: 0px;
  margin-top: 10px;
  border: none;
  color: white;
  @media (max-width: 600px) {
    display: none;
  }
  `

;
const ModalCloseMobile = styled(ArrowIcon)`
  display: none;
  margin: 20px;
  margin-left: 0px;
  @media (max-width: 600px) {
    display: block;
  }
`;
interface IModal {
  isOpen: boolean;
  children?: React.ReactNode;
  close: () => void;
}

const ModalAnimation = (props: IModal) => {
  const { isOpen, children, close } = props;

  return (
    <ModalContainer isOpen={isOpen}>
      <OuterBox onClick={() => close()} />
      <ModalContent isOpen={isOpen}>
        <Box>
          <ModalCloseMobile onClick={() => close()} />
          <ModalClose onClick={() => close()} />
          {children}
        </Box>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalAnimation;
