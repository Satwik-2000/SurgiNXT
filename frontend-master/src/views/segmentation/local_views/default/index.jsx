import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AIIcon, DummyPlayer, DummySurgery } from "../../../../assets";
import {VideoPlayer} from '../../../../shared_components'
import Timeline from "../../../../shared_components/timeline/timeline";
import VideoThumbnails from "./thumb.png"
import "./style.scss";

export default function DefaultSegmentationView() {
  const [showTimeline, setShowTimeline] = useState(false);
  // Handles the state whether the current player is playing or not
  const [playing, setPlaying] = useState(false);
  const history = useHistory();

  return (
    <div className="default__seg__view">
      <div className="secondary__nav">
        <img src={AIIcon} id="ai__icon" />

        <div className="frame__number">
          <span>Frame Number</span>
          <input type="text" id="frame__no" value={0} readOnly={true} />
        </div>

        <button
          className="annotate__btn"
          onClick={() => history.push("/segmentation/annotate")}
        >
          Annotate
        </button>
      </div>

      {/* <div className="player__dummy">
        <img src={showTimeline ? DummySurgery : DummyPlayer} id="dummy__plyr" />
      </div> */}

      <div className="player__wrapper">
        <VideoPlayer 
        showControls={true}
        video_url="https://player.ishandeveloper.com/assets/video.mp4" setPlaying={setPlaying} />
      </div>

      <div
        className="show__timeline__btn"
        onClick={() => setShowTimeline(!showTimeline)}
      >
        <div className="wrapper">
          <div className="text">Open Timeline</div>
          <div id="triangle"></div>
        </div>
      </div>

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
          <div className="video__thumbnails">
            <img src={VideoThumbnails} />
          </div>
        </div>
      )}
    </div>
  );
}
