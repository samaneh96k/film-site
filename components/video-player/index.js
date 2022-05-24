import { Divider, Dropdown, Menu, Slider } from "antd";
import React, { useRef, useState } from "react";
import { Card, ProgressBar, Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import styles from "./video-player.module.css";
import classnames from "classnames";
import screenfull from "screenfull";
import { useRouter } from "next/router";

const VideoPlayer = () => {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeMenuItem, setActiveMenuItem] = useState(1);
  const [volume, setVolume] = useState(50);

  const ref = useRef();
  const fullscreenRef = useRef();

  const handlePlaying = (status) => {
    setPlaying(status);
  };
  const SpeedList = [
    { key: 2 },
    { key: 1.5 },
    { key: 1.25 },
    { key: 1 },
    { key: 0.75 },
    { key: 0.5 },
  ];

  const menu = (
    <Menu>
      {SpeedList.map((speed) => {
        return (
          <Menu.Item
            className={activeMenuItem === speed.key ? styles.active_menu : ""}
            onClick={() => {
              setActiveMenuItem(speed.key);
              setPlaybackRate(speed.key);
              setShow(false);
            }}
            key={speed.key}
          >
            {speed.key}×
          </Menu.Item>
        );
      })}
    </Menu>
  );
  const volumeSlider = (
    <Menu>
      <Menu.Item>
        <Slider
          vertical
          value={volume}
          className={styles.volume_slider}
          onChange={(volume) => {
            setVolume(volume);
          }}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <div ref={fullscreenRef}>
      <Button
        className={styles.return_btn}
        variant="dark"
        onClick={() => {
          router.back();
        }}
      >
        بازگشت به صفحه فیلم
      </Button>
      <ReactPlayer
        ref={ref}
        className={styles.player}
        url="/assets/player/film.mp4"
        width="100%"
        height="100vh"
        playing={playing}
        onProgress={({ played, playedSeconds, loaded, loadedSeconds }) => {
          console.log(played);
          setProgress(played * 100);
        }}
        playbackRate={playbackRate}
        volume={volume / 100}
      />
      <Card className={classnames(styles.controller, show && styles.show)}>
        <div className={classnames(styles.main_controll, "ml-2")}>
          {!playing ? (
            <img
              onClick={() => handlePlaying(true)}
              className={styles.play}
              width={32}
              src={"/play.svg"}
            />
          ) : (
            <img
              onClick={() => handlePlaying(false)}
              className={styles.play}
              width={32}
              src={"/pause.svg"}
            />
          )}
          <Slider
            onChange={(value) => {
              setProgress(value);
              ref.current.seekTo(value / 100);
            }}
            value={progress}
            className={styles.slider}
            tooltipVisible={false}
          />

          <Dropdown
            overlay={menu}
            trigger={["click"]}
            onClick={() => setShow(true)}
          >
            <img className="ml-3" width={32} src={"/speedrating.svg"} />
          </Dropdown>
          <Dropdown
            overlay={volumeSlider}
            trigger={["click"]}
            onClick={() => setShow(true)}
          >
            <img
              className="ml-3"
              width={32}
              src={volume !== 0 ? "/volume.svg" : "/mute.svg"}
            />
          </Dropdown>
          <img
            src={"/fullscreen.svg"}
            width={32}
            className="ml-3"
            onClick={() => {
              screenfull.toggle(fullscreenRef.current);
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default VideoPlayer;
