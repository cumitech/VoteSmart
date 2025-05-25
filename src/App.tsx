import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import {
  BrowserRouter,
} from "react-router";
import { useAuthProvider } from "./providers/auth-provider/authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { accessControlProvider } from "./providers/access-control-provider/auth-provider";
import { dataProvider } from "./providers/data-provider/data-provider";
import { useMenu } from "./utils/menu";
import RouteFiles from "./routes/routes";

function App() {
  const { authProvider } = useAuthProvider();
  const { menus } = useMenu();
  const { user } = getData();



  const filteredMenus = menus.filter((menu) =>
    menu.meta?.canAccess?.includes(user?.role)
  );
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              accessControlProvider={{
                can: async ({
                  resource,
                  action,
                }: {
                  resource: any;
                  action: any;
                }) => {
                  const role = authProvider.getPermissions
                    ? await authProvider.getPermissions(action)
                    : null;
                  return accessControlProvider.can({
                    resource,
                    action,
                    params: { role },
                  });
                },
                options: {
                  buttons: {
                    enableAccessControl: true,
                    hideIfUnauthorized: true,
                  },
                },
              }}
              resources={filteredMenus}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "VbGg9I-ksHS9v-ISX0S3",
              }}
            >
              <RouteFiles />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
function getData() {
  const { authProvider } = useAuthProvider();
  const user = fetchUserIdentity(authProvider);
  return {
    user,
  };
}
function fetchUserIdentity(authProvider: any) {
  if (authProvider && typeof authProvider.getIdentity === "function") {
    try {
      const userIdentity = authProvider.getIdentity();
      if (userIdentity) {
        return userIdentity;
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  } else {
    return null;
  }
}
