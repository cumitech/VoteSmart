import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";
import { Authenticated } from "@refinedev/core";

import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router";
import { Outlet, Route, Routes } from "react-router";
import LandingPage from "../pages/home";
import VotingPage from "../pages/votes/VotesPage";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";
import { ForgotPassword } from "../pages/forgotPassword";
import { TitleComponent } from "../components/header/title";
import VotersPage from "../pages/dashbpard/votes/votersPage";
import { Header } from "../components";
import PostVoteScreen from "../pages/dashbpard/votes/PostVoteScreen";
import VotingDashboard from "../pages/dashbpard/dashboard";
import {
  CandidateCreate,
  CandidateEdit,
  CandidateList,
  CandidateShow,
} from "../pages/dashbpard/candidates";
import ElectionsPage from "../pages/elections/ElectionsPage";

const RouteFiles = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}

      <Route path="/" element={<LandingPage />} />
      <Route path="/votes" element={<VotingPage />} />
      <Route path="/elections" element={<ElectionsPage />} />
      <Route
        element={
          <Authenticated key="authenticated-outer" fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* PRIVATE ROUTES */}
      <Route
        element={
          <Authenticated
            key="authenticated-inner"
            fallback={<CatchAllNavigate to="/login" />}
          >
            <ThemedLayoutV2
              Header={Header}
              Sider={(props) => <ThemedSiderV2 {...props} fixed />}
              Title={TitleComponent}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route
          // index
          path="/dashboard"
          element={<NavigateToResource resource="/dashboard" />}
        />
        <Route index path="/dashboard" element={<VotingDashboard />} />
        <Route index path="/cast-your-vote" element={<VotersPage />} />
        <Route index path="/your-vote" element={<PostVoteScreen />} />
        <Route path="/dashboard/candidates">
          <Route index element={<CandidateList />} />
          <Route path="create" element={<CandidateCreate />} />
          <Route path="edit/:id" element={<CandidateEdit />} />
          <Route path="show/:id" element={<CandidateShow />} />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      </Route>
    </Routes>
  );
};

export default RouteFiles;
