import { FaUserCheck, FaUsers } from "react-icons/fa";
import { MdOutlineHowToVote } from "react-icons/md";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { ControlOutlined, DashboardOutlined } from "@ant-design/icons";

export const useMenu = () => {
  const menus = [
    {
      name: "Voting Dashboard",
      list: "/dashboard",
      meta: {
        canAccess: ["voter"],
      },
      icon: <DashboardOutlined />,
    },
    {
      name: "Your Vote",
      list: "/your-vote",
      meta: {
        canAccess: ["voter"],
      },
      icon: <ControlOutlined />,
    },
    {
      name: "candidates",
      list: "/dashboard/candidates",
      create: "/dashboard/candidates/create",
      edit: "/dashboard/candidates/edit/:id",
      show: "/dashboard/candidates/show/:id",
      meta: {
        // canDelete: true,
        canAccess: ["voter"],
      },
      icon: <FaUserCheck />,
    },
    {
      name: "faculties",
      list: "/dashboard/faculties",
      create: "/dashboard/faculties/create",
      edit: "/dashboard/faculties/edit/:id",
      show: "/dashboard/faculties/show/:id",
      meta: {
        // canDelete: true,
        canAccess: ["admin"],
      },
      icon: <HiOutlineBuildingLibrary />,
    },
    {
      name: "votes",
      list: "/dashboard/votes",
      create: "/dashboard/votes/create",
      edit: "/dashboard/votes/edit/:id",
      show: "/dashboard/votes/show/:id",
      meta: {
        // canDelete: true,
        canAccess: ["admin"],
      },
      icon: <MdOutlineHowToVote />,
    },
    {
      name: "elections",
      list: "/dashboard/elections",
      create: "/dashboard/elections/create",
      edit: "/dashboard/elections/edit/:id",
      show: "/dashboard/elections/show/:id",
      meta: {
        canAccess: ["admin"],
      },
      icon: <RiPoliceBadgeFill  />,
    },
    {
      name: "users",
      list: "/dashboard/users",
      create: "/dashboard/users/create",
      edit: "/dashboard/users/edit/:id",
      show: "/dashboard/users/show/:id",
      meta: {
        canAccess: ["admin"],
      },
      icon: <FaUsers />,
    },
  ];

  return { menus };
};
