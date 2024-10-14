'use client';

import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Script } from '@/types/ContentDetail';
import ControlBar from './ControlBar';
import SubtitleOption from './SubtitleOption';
import { ReactScriptPlayer } from './ReactScriptPlayer';
import { LanguageCode } from '../types/Scripts';

type Mode = 'line' | 'block';

interface VideoPlayerProps {
  videoUrl: string;
  scriptsData: Script[] | undefined;
}

function VideoPlayer({ videoUrl, scriptsData }: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer | null>(null);

  const [mode, setMode] = useState<Mode>('line');
  const availableLanguages: LanguageCode[] = ['enScript', 'koScript'];
  const [selectedLanguages, setSelectedLanguages] =
    useState<LanguageCode[]>(availableLanguages);
  const [currentTime, setCurrentTime] = useState(0);
  const [mounted, setMounted] = useState(false); // 추가: 마운트 상태 확인
  const [isVideoReadyButIsNotPlayingYet, setIsVideoReadyButIsNotPlayingYet] =
    useState(true); //  준비 메세지 상태 관리

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

  const handleVideoReady = () => {
    // 처음 비디오가 준비되었을 때만 true로 설정
    setIsVideoReadyButIsNotPlayingYet(true);
  };
  // 클라이언트에서만 렌더링되도록 조건부 렌더링
  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-4 rounded-[20px] items-center px-10 min">
      <div className="relative overflow-hidden w-full rounded-[20px]">
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          playing={isPlaying}
          width="100%"
          onReady={handleVideoReady}
          onPlay={() => {
            setIsPlaying(true);
            setIsVideoReadyButIsNotPlayingYet(false);
          }}
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
      <div className="w-full">
        <SubtitleOption
          mode={mode}
          selectedLanguages={selectedLanguages}
          setMode={setMode}
          setSelectedLanguages={setSelectedLanguages}
          availableLanguages={availableLanguages}
        />
      </div>
      <div className="w-full">
        <ReactScriptPlayer
          mode={mode}
          subtitles={scriptsData || []}
          selectedLanguages={selectedLanguages}
          seekTo={seekTo}
          currentTime={currentTime}
          onClickSubtitle={(subtitle, index) => {
            console.log(subtitle, index);
          }}
          onSelectWord={(word, subtitle, index) => {
            console.log(word, subtitle, index);
          }}
          isVideoReadyButIsNotPlayingYet={isVideoReadyButIsNotPlayingYet} // video첫로딩후재생버튼누르기전에는 영상을 재생해주세요 메시지 보여줌
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
