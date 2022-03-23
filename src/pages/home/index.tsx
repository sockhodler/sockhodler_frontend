import React from "react";
import { Layout } from "components";
import {
  AuthenticateTab,
  AuthenticateTabError,
  DashboardTab,
} from "./page-components";

export const Home: React.FunctionComponent = () => {
  console.log("process.env.REACT_APP_API_URL", process.env.REACT_APP_API_URL);
  return (
    <Layout
      tabs={[
        {
          label: "Authenticate",
          value: "authenticate",
        },
        {
          label: "Dashboard",
          value: "dashboard",
        },
      ]}
    >
      {/* <AuthenticateTab for="authenticate" /> */}
      <AuthenticateTabError for="authenticate" type="auth-code-not-valid" />
      <DashboardTab for="dashboard" />
    </Layout>
  );
};
