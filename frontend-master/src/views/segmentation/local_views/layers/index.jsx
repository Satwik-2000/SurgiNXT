import React, { useState } from "react";
import { AIIcon, DummySurgery } from "../../../../assets";
import { useHistory } from "react-router-dom";
import { SketchPicker } from "react-color";
import {VideoPlayer} from "../../../../shared_components"
import Dropdown from "react-multilevel-dropdown";
import "./style.scss";

export default function LayersSegmentationView() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTool, setCurrentTool] = useState("Select Object");
  const [selectedColor, setSelectedColor] = useState("#00ff00");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [showMaskPanel, setShowMaskPanel] = useState(false);
  const history = useHistory();

  const dropDownData = [
    {
      title: currentTool,
      items: [
        {
          title: "Organs",
          items: [
            { title: "Abdominal Wall", items: [] },
            { title: "Gastrointestinal Tract", items: [] },
            { title: "Liver", items: [] },
            { title: "Gall bladder", items: [] },
          ],
        },

        {
          title: "Tools",
          items: [
            { title: "Grasper", items: [] },
            { title: "Bipolar", items: [] },
            { title: "Liver", items: [] },
            { title: "Gall bladder", items: [] },
          ],
        },

        {
          title: "Liquids",
          items: [
            { title: "Grasper", items: [] },
            { title: "Bipolar", items: [] },
            { title: "Liver", items: [] },
            { title: "Gall bladder", items: [] },
          ],
        },

        {
          title: "Views",
          items: [
            { title: "Grasper", items: [] },
            { title: "Bipolar", items: [] },
            { title: "Liver", items: [] },
            { title: "Gall bladder", items: [] },
          ],
        },

        {
          title: "Ports",
          items: [
            { title: "Grasper", items: [] },
            { title: "Bipolar", items: [] },
            { title: "Liver", items: [] },
            { title: "Gall bladder", items: [] },
          ],
        },
      ],
    },
  ];

  const getSubmenus = (data) => {
    if (data.items.length === 0) return null;

    return (
      <>
        {data.items.map((item, index) => (
          <Dropdown.Item
            position="right"
            key={index}
            onClick={() => {
              if (item.items.length === 0) {
                setCurrentTool(item.title);
              }
            }}
          >
            {item.title}
            {item.items?.length !== 0 && (
              <Dropdown.Submenu position="right">
                {getSubmenus(item)}
              </Dropdown.Submenu>
            )}
          </Dropdown.Item>
        ))}
      </>
    );
  };

  const dropDownGenerator = () => {
    return (
      <div className="dropdown__wrapper">
        {dropDownData.map((data, index) => {
          return (
            <Dropdown position="right" key={index} title={`${data.title} ▼`}>
              {getSubmenus(data)}
            </Dropdown>
          );
        })}
      </div>
    );
  };

  return (
    <div className="layers__seg__view">
      <div className="secondary__nav">
        <img src={AIIcon} id="ai__icon" />

        <div className="nav__inputs">
          <div className="frame__number">
            <span>Case Number</span>
            <input type="text" id="case__no" value={0} readOnly={true} />
          </div>

          <div className="frame__number">
            <span>Frame Number</span>
            <input type="text" id="frame__no" value={0} readOnly={true} />
          </div>
        </div>

        <button className="dummy__btn"></button>
      </div>

      {/* <div className={showMaskPanel ? "surgery__dummy half" : "surgery__dummy"}>
        <img src={DummySurgery} id="dummy__surgery" />
      </div> */}

      <div
        className={showMaskPanel ? "player__wrapper half" : "player__wrapper"}
      >
        <VideoPlayer
          video_url="https://player.ishandeveloper.com/assets/video.mp4"
          setPlaying={setPlaying}
          showControls={false}
        />
      </div>

      {showMaskPanel && <div className="mask__panel"></div>}

      <div className="dropdown__bar">
        <div className="dropdown__item">{dropDownGenerator()}</div>
        <div className="dropdown__item">
          <div
            id="label__color"
            onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
          >
            Label Color{" "}
            <div id="color__box" style={{ background: selectedColor }}></div>
          </div>
          {isColorPickerOpen && (
            <SketchPicker
              color={selectedColor}
              onChange={(e) => setSelectedColor(e.hex)}
            />
          )}
        </div>
        <div
          className="dropdown__item"
          id="select__mask"
          onClick={() => setShowMaskPanel(!showMaskPanel)}
        >
          Select Mask ▼
        </div>
      </div>

      {/* <div className="add__frame__btn">
        <div className="wrapper">
          <div className="text">
            <i className="far fa-plus-square"></i>
            <span
              className="text"
              // onClick={() => history.push("/segmentation/layers")}
            >
              Add
            </span>
          </div>
          <div id="triangle"></div>
        </div>
      </div> */}

      <div className="player__timeline">
        <div className="video__controls__timeline"></div>
      </div>
    </div>
  );
}
