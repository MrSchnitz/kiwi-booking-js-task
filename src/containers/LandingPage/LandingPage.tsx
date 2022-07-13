import React from "react";
import { LandingPageSearchForm, LandingPageWrapper } from "./LandingPage.styles";
import { Layout, LayoutColumn } from "@kiwicom/orbit-components";

export default React.memo(function HomePage() {
    return (
        <LandingPageWrapper>
            <Layout type="MMB">
                <LayoutColumn>
                    <LandingPageSearchForm>
                        <h1>Landing Page</h1>
                    </LandingPageSearchForm>
                </LayoutColumn>
            </Layout>
        </LandingPageWrapper>
    );
});
