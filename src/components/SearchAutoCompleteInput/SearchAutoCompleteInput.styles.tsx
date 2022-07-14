import styled from "styled-components";

export const AutoCompleteWrapper = styled.div`
  position: relative;
`;

export const AutoCompletePopover = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 10;

  border: 1px solid darkgray;
  border-radius: 5px;
  width: 100%;

  background-color: white;

  overflow: hidden;
`;
