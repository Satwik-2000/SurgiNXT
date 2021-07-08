import React, { Component } from "react";
import Plyr from "plyr";

import "./style.scss";
import {
  BackwardIcon,
  BackwardSecondaryIcon,
  ForwardIcon,
  ForwardSecondaryIcon,
  FullScreenIcon,
  PlayIcon,
  PauseIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "../../assets";

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      isFullScreen: false,
      play: false,
      currentTime: 0,
      duration: 0,
      //   controls: ["current-time", "progress", "play" ],
    };
    // this.startPlaying = this.startPlaying.bind(this);
  }

  componentDidMount() {
    const { video_url, setPlaying } = this.props;

    this.player = new Plyr(".floating__player", {
      controls: this.state.controls,
    });

    this.player.source = {
      type: "video",
      sources: [{ src: video_url }],
    };

    if (video_url !== null) {
      this.player.on("playing", () => setPlaying(true));
      this.player.on("seeking", () => setPlaying(false));
      this.player.on("seeked", () => setPlaying(true));
      this.player.on("pause", () => setPlaying(false));
      this.player.on("timeupdate", (e) => {
        //   setDuration()
        this.setState({
          ...this.state,
          duration: this.player.duration,
          currentTime: this.player.currentTime,
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.play !== this.state.play) {
      if (this.state.play) {
        this.player.play();
      } else {
        this.player.pause();
      }
    }
  }

  render() {
    return (
      <div className="surgi__player">
        <video className="floating__player"></video>

        {this.props.showControls && (
          <div className="player__controls">
            <div className="left__buttons">
              <div
                id="play"
                onClick={() => {
                  this.props.setPlaying(true);
                  this.player.play();
                }}
              >
                <img src={PlayIcon} alt="Play Icon" />
              </div>

              <div
                id="pause"
                onClick={() => {
                  this.props.setPlaying(false);
                  this.player.pause();
                }}
              >
                <img src={PauseIcon} alt="Pause Icon" />
              </div>

              <div
                id="backward"
                onClick={() => {
                  this.player.rewind(10);
                }}
              >
                <img src={BackwardIcon} alt="Backward Icon" />
              </div>

              <div
                id="backward-secondary"
                onClick={() => {
                  this.player.rewind(5);
                }}
              >
                <img
                  src={BackwardSecondaryIcon}
                  alt="Backward Secondary Icon"
                />
              </div>

              <div
                id="forward-secondary"
                onClick={() => {
                  this.player.forward(5);
                }}
              >
                <img src={ForwardSecondaryIcon} alt="Forward Icon" />
              </div>

              <div
                id="forward"
                onClick={() => {
                  this.player.forward(10);
                }}
              >
                <img src={ForwardIcon} alt="Forward Icon" />
              </div>
            </div>

            <div className="playback__duration">
              {this.state?.currentTime?.toFixed(0)} /{" "}
              {this.state?.duration?.toFixed(0)}
            </div>

            <div className="right__buttons">
              <div id="zoom-in">
                <img src={ZoomInIcon} alt="ZoomIn icon" />
              </div>

              <div id="zoom-out">
                <img src={ZoomOutIcon} alt="ZoomOut Icon" />
              </div>

              <div id="fullscreen">
                <img src={FullScreenIcon} alt="Full Screen" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
