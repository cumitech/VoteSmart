"use client";
import { useRouterContext, useRouterType, useLink } from "@refinedev/core";
import { Typography } from "antd";

export const TitleComponent: any = ({ collapsed }: { collapsed: boolean }) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const { Title } = Typography;

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink to="/">
      {collapsed ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title level={2} style={{ color: "#2f54eb", marginBottom: 0 }}>
            VS
          </Title>
        </div>
      ) : (
        <Title level={2} style={{ color: "#2f54eb", marginBottom: 0 }}>
          VoterSmart
        </Title>
      )}
    </ActiveLink>
  );
};
