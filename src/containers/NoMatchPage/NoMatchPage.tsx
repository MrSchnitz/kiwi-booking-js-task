import React from "react";
import { NoMatchPageWrapper } from "./NoMatchPage.styles";
import {
  Button,
  Heading,
  Illustration,
  Stack,
} from "@kiwicom/orbit-components";
import { Link } from "react-router-dom";

export default function NoMatchPage() {
  return (
    <NoMatchPageWrapper>
      <Stack flex={true} direction="column" justify="center" align="center">
        <Heading type="display">Sorry, nothing to see here!</Heading>
        <Illustration name="Error404" />
        <Link to="/">
          <Button>Return to homepage</Button>
        </Link>
      </Stack>
    </NoMatchPageWrapper>
  );
}
