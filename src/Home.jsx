import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import OverviewLanding from "./components/landing/Overview";

function Home() {
  const { authState } = useOktaAuth();

  if (authState.isAuthenticated) {
    return <OverviewLanding/>;
  }

  return <div>Loading...</div>;
}

export default Home;
