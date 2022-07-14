import React from "react";
import { PageLoaderWrapper } from "./PageLoader.styles";
import { Loading } from "@kiwicom/orbit-components";

const PageLoader = React.memo(() => {
  return (
    <PageLoaderWrapper>
      <Loading type="pageLoader" />
    </PageLoaderWrapper>
  );
});

export default PageLoader;
