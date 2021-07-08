import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardBackground, HamburgerIcon, UserIcon } from "../../assets";
import { AuthContext } from "../../contexts";
import {
  DashboardDemoButton,
  DashboardAnnotateButton,
  DashboardStatsButton,
  DashboardAnnotationsButton,
  DashboardDownloadButton,
  DashboardUploadButton,
} from "./buttons";

import "./style.scss";

const getButtonFromType = (type) => {
  switch (type) {
    case "demo":
      return <DashboardDemoButton />;

    case "annotate":
      return <DashboardAnnotateButton />;

    case "download":
      return <DashboardDownloadButton />;

    case "upload":
      return <DashboardUploadButton />;

    case "stats":
      return <DashboardStatsButton />;

    case "annotations":
      return <DashboardAnnotationsButton />;

    default:
      return <DashboardDemoButton />;
  }
};

export default function DashboardViewWrapper() {
  const { type } = useParams();
  const [pathName, setPathName] = useState("demo");
  const currentUser = useContext(AuthContext).currentUser;

  useEffect(() => {
    setPathName(type);
  }, [type]);

  // useEffect(() => {
  //   if (pathName === null || typeof pathName === "undefined") {
  //     if (currentUser !== null) {
  //       console.log("USER : ", currentUser?.UserDetails?.group);

  //       switch (currentUser?.UserDetails?.group) {
  //         case 1:
  //           history.push("/dashboard/stats");
  //           break;

  //         case 2:
  //           history.push("/dashboard/annotations");
  //           break;

  //         case 7:
  //           history.push("/dashboard/annotate");
  //           break;

  //         case 4:
  //           history.push("/dashboard/download");
  //           break;

  //         case 6:
  //           history.push("/dashboard/upload");
  //           break;

  //         default:
  //           history.push("/dashboard/demo");
  //           break;
  //       }
  //     }
  //   }
  // }, [pathName]);

  return (
    <div className="dashboard__wrapper">
      <div className="dashboard__bg">
        <img src={DashboardBackground} alt="SurgiNXT" />
        <div className="dash__overlay"></div>
      </div>

      <div className="dashboard__main">
        <div className="dashboard__button">{getButtonFromType(pathName)}</div>
      </div>

      <div className="top__wrapper">
        <div className="menu__icon">
          <img src={HamburgerIcon} alt="Hamburger Icon" />
        </div>

        <div className="username__wrapper">
          <Link to="/login">
            <img src={UserIcon} alt="User Icon" />
            Hey user!
          </Link>
        </div>
      </div>
    </div>
  );
}
