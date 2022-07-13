import React from "react";
import {
  ButtonLink,
  Heading,
  NavigationBar,
  Stack,
} from "@kiwicom/orbit-components";
import { Link } from "react-router-dom";

const Navigation = React.memo(() => {
  return (
    <NavigationBar>
      <Stack direction="row" align="center" justify="start">
        <Link to="/">
          <ButtonLink>
            <img
              src="https://images.kiwi.com/common/kiwicom-logo.svg"
              alt="Kiwi.com logo"
            />
          </ButtonLink>
        </Link>
        <Heading type={"title1"}>Kiwi search</Heading>
      </Stack>
    </NavigationBar>
  );
});

export default Navigation;
