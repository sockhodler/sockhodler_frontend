import React, { useEffect } from "react";
import { Layout } from "components";
import { useQuery } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { asyncAuthenticateData } from "redux/tags/tags-slice";
import { RootState } from "redux/rootReducer";
import {
  AuthenticateTab,
  AuthenticateTabError,
  DashboardTab,
} from "./page-components";

export const Home: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { authStatus, authenticatedTag } = useSelector(
    (state: RootState) => state.tags
  );
  const query = useQuery();
  const pl = query.get("pl");
  useEffect(() => {
    if (pl) {
      dispatch(
        asyncAuthenticateData({
          pl,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pl]);
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
      {authStatus.statusType === "Authenticated" && (
        <AuthenticateTab
          for="authenticate"
          tagData={authenticatedTag?.tag ?? null}
        />
      )}
      {authStatus.statusType === "Error" && (
        <AuthenticateTabError for="authenticate" type="error" />
      )}
      {authStatus.statusType === "Tag Not Active" && (
        <AuthenticateTabError for="authenticate" type="not-active" />
      )}
      {authStatus.statusType === "Authentication Token Expired" && (
        <AuthenticateTabError for="authenticate" type="expired" />
      )}
      {authStatus.statusType === "Authenticated and Unsealed" && (
        <AuthenticateTabError for="authenticate" type="auth-code-not-valid" />
      )}
      {authStatus.statusType === "scan" && (
        <AuthenticateTabError for="authenticate" type="scan" />
      )}
      <DashboardTab for="dashboard" />
    </Layout>
  );
};
