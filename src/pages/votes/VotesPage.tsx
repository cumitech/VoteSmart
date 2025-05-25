// components/VotingPage.tsx

import ActiveElection from "../../components/ActiveElection";
import AppHeader from "../../components/header/app-header.component";
import AppFooter from "../../components/header/app-footer.component";

export default function VotingPage() {
  

  return (
    <>
      <AppHeader />

      <ActiveElection />

      <AppFooter />
    </>
  );
}
