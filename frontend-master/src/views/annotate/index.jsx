import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  UploadDashboardBackground,
  HamburgerDarkIcon,
  UserDarkIcon,
} from "../../assets";
import {AnnotateDefaultView, AnnotatePartialView} from "./local_views";

import "./style.scss";

export default function AnnotateViewWrapper() {
  const { type } = useParams();

  return (
    <div className="upload__view">
      <div className="dashboard__bg">
        <img src={UploadDashboardBackground} alt="SurgiNXT" />
        <div className="dash__overlay"></div>
      </div>

      <div className="dashboard__main">
      {getMainView(type)}
      </div>

      <div className="top__wrapper">
      
        <div className="menu__icon">
          <Link to="/dashboard/upload">
            <img src={HamburgerDarkIcon} alt="Hamburger Icon" />
          </Link>
        </div>

        <div className="username__wrapper">
          <Link to="/login">
            Hello,  Username
            <img src={UserDarkIcon} alt="User Icon" /> 
          </Link>
        </div>
      </div>
    </div>
  );
}

const getMainView = (type) => {
  switch (type) {
    case "partial":
      return <AnnotatePartialView />;

    default:
      return <AnnotateDefaultView />;
  }
};
