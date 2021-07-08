import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FileIcon, UserIcon } from "../../assets";

import {
  DefaultSegmentationView,
  AnnotateSegmentationView,
  LayersSegmentationView,
} from "./local_views";

import "./style.scss";

export default function SegmentationViewWrapper() {
  const { type } = useParams();

  const getViewFromType = (type) => {
    switch (type) {
      case "annotate":
        return <AnnotateSegmentationView />;

      case "layers":
        return <LayersSegmentationView />;
      default:
        return <DefaultSegmentationView />;
    }
  };

  return (
    <>
      <div className="segmentation__view">
        {/* TOP NAV */}
        <div className="top__nav">
          <div className="nav__icon">
            <img src={FileIcon} id="file__icon" />
          </div>
          <div className="file__name">File Name.mp4</div>

          <div className="nav__user">
            <div id="user__greet">Hello, Username</div>
            <img src={UserIcon} id="user__icon" />
          </div>
        </div>

        <div className="frame">{getViewFromType(type)}</div>
      </div>
    </>
  );
}
