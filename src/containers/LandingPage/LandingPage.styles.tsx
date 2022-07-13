import styled from "styled-components";

export const LandingPageWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  padding-top: 52px;
  width: 100%;
  min-height: 100vh;

  background-image: url("https://images.skypicker.com/?image=https%3A%2F%2Fwww.kiwi.com%2Fimages%2Fhero%2Fhero-xxLargeDesktop-ua2%402x.webp&width=2560&height=400&quality=75&dpr=2");
  background-size: cover;
  background-position: top;
`;

export const LandingPageSearchForm = styled.div`
  border-radius: 8px;
  padding: 24px;

  background: rgb(255, 255, 255);

  box-shadow: rgb(37 42 49 / 30%) 0 4px 12px 0;
`;
