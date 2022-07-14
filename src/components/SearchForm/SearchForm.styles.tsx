import styled from "styled-components";

export const SearchFormWrapper = styled.div`
  padding: 24px;
`;

export const SearchFormPopoverContentWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    background: #00a991;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #007f6d;
  }
`;
