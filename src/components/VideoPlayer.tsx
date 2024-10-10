'use client';

import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import scriptsMockData from '@/mock/subtitleMockData';
import { mockUrl } from '../mock/mockUrl';
import ControlBar from './ControlBar';
import SubtitleOption from './SubtitleOption';
import { ReactScriptPlayer } from './ReactScriptPlayer';
import { LanguageCode } from '../types/Scripts';

type Mode = 'line' | 'block';

function VideoPlayer() {
  const playerRef = useRef<ReactPlayer | null>(null);

  const [mode, setMode] = useState<Mode>('line');
  const availableLanguages: LanguageCode[] = ['en', 'ko', 'fr'];
  const [selectedLanguages, setSelectedLanguages] =
    useState<LanguageCode[]>(availableLanguages);
  const [currentTime, setCurrentTime] = useState(0);
  const [mounted, setMounted] = useState(false); // 추가: 마운트 상태 확인

  useEffect(() => {
    setMounted(true); // 컴포넌트가 클라이언트에서 마운트되었음을 표시
  }, []);

  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  // TODO(@godhyzaang):ControlBar에서만 쓰이는 속성 ControlBar로 내부로 이동
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlayBackRate] = useState(1);
  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleSeek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        (playerRef.current.getCurrentTime() || 0) + seconds,
        'seconds',
      );
    }
  };

  const seekTo = (timeInSeconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(timeInSeconds, 'seconds');
    }
  };

  const BasicControlBarProps = {
    handlePlayPause,
    handleVolumeChange,
    handleSeekForward: () => handleSeek(10),
    handleSeekBackward: () => handleSeek(-10),
    isPlaying,
    volume,
    setPlayBackRate,
  };

  // 클라이언트에서만 렌더링되도록 조건부 렌더링
  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-4 w-full h-full max-w-[640px] rounded-[20px] ">
      <div className="relative overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url={mockUrl}
          playing={isPlaying}
          width="100%"
          onPlay={() => setIsPlaying(true)}
          onStart={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onProgress={handleProgress}
          volume={volume}
          controls={false} // 유튜브 자체 컨트롤러 제거
          playbackRate={playbackRate}
          progressInterval={100} // 기존 progress 업데이트 1초에서 0.1초로 변경 -> controlBar 클릭반응 느린문제 개선
        />
        <ControlBar
          playerRef={playerRef}
          BasicControlBarProps={BasicControlBarProps}
        />
      </div>

      <SubtitleOption
        mode={mode}
        selectedLanguages={selectedLanguages}
        setMode={setMode}
        setSelectedLanguages={setSelectedLanguages}
        availableLanguages={availableLanguages}
      />

      <ReactScriptPlayer
        mode={mode}
        subtitles={scriptsMockData}
        selectedLanguages={selectedLanguages}
        seekTo={seekTo}
        currentTime={currentTime}
        onClickSubtitle={(subtitle, index) => {
          console.log(subtitle, index);
        }}
        onSelectWord={(word, subtitle, index) => {
          console.log(word, subtitle, index);
        }}
      />
    </div>
  );
}

export default VideoPlayer;
