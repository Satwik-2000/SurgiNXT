import React, { useState } from "react";
import { AIIcon, DummySurgery } from "../../../../assets";
import { useHistory } from "react-router-dom";
import { VideoPlayer } from "../../../../shared_components";
import Timeline from "../../../../shared_components/timeline/timeline";
import "./style.scss";

export default function AnnotateSegmentationView() {
  const [showTimeline, setShowTimeline] = useState(true);
  const [playing, setPlaying] = useState(false);
  const history = useHistory();

  return (
    <div className="annotate__seg__view">
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

      {/* <div className="surgery__dummy">
        <img src={DummySurgery} id="dummy__surgery" />
      </div> */}

      <div className="player__wrapper">
        <VideoPlayer
          video_url="https://player.ishandeveloper.com/assets/video.mp4"
          setPlaying={setPlaying}
          showControls={false}
        />
      </div>

      <button
        className="add__frame__btn"
        onClick={() => history.push("/segmentation/layers")}
      >
        <div className="wrapper">
          <div className="text">
            <i className="far fa-plus-square"></i>
            <span className="text">Add</span>
          </div>
          <div id="triangle"></div>
        </div>
      </button>

      {showTimeline && (
        <div className="player__timeline">
          <div className="video__controls__timeline">
            <div className="playback__controls">
              <i className="fas fa-play" id="play"></i>
              <i className="fas fa-pause" id="pause"></i>
            </div>

            <div className="playback__duration">00:00 / 5:20</div>

            <div className="timeline__controls">
              <div id="plus">+</div>
              <div id="minus">-</div>
              <div id="fullscreen">
                <i className="fas fa-expand"></i>
              </div>
              <div id="close" onClick={() => setShowTimeline(false)}>
                X
              </div>
            </div>
          </div>
          <Timeline videoLength={320} />
          <div className="video__thumbnails"></div>
        </div>
      )}
    </div>
  );
}
