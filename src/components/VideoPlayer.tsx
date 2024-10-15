/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'next/navigation';
import { Script } from '@/types/ContentDetail';
import {
  useCreateBookmark,
  useFetchBookmarksByContendId,
} from '@/api/hooks/useBookmarks';
import ControlBar from './ControlBar';
import SubtitleOption from './SubtitleOption';
import { ReactScriptPlayer } from './ReactScriptPlayer';
import { LanguageCode } from '../types/Scripts';
import BookmarkMemoItem from './BookmarkMemoItem';
import { Button } from './ui/button';

type Mode = 'line' | 'block';

interface VideoPlayerProps {
  videoUrl: string;
  scriptsData: Script[] | undefined;
}

function VideoPlayer({ videoUrl, scriptsData }: VideoPlayerProps) {
  const params = useParams();
  const contentId = Number(params.id);

  const playerRef = useRef<ReactPlayer | null>(null);

  const [mode, setMode] = useState<Mode>('line');
  const availableLanguages: LanguageCode[] = ['enScript', 'koScript'];
  const [selectedLanguages, setSelectedLanguages] =
    useState<LanguageCode[]>(availableLanguages);
  const [currentTime, setCurrentTime] = useState(0);
  const [mounted, setMounted] = useState(false); // 추가: 마운트 상태 확인
  const [isVideoReadyButIsNotPlayingYet, setIsVideoReadyButIsNotPlayingYet] =
    useState(true); //  준비 메세지 상태 관리
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlayBackRate] = useState(1);

  //  북마크 메모
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<
    number | null
  >(null);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [memoText, setMemoText] = useState('');

  const { data: bookmarkData } = useFetchBookmarksByContendId(contentId);
  const createBookmarkMutation = useCreateBookmark(contentId);
  useEffect(() => {
    setMounted(true); // 컴포넌트가 클라이언트에서 마운트되었음을 표시
  }, []);

  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

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

  // Find the current subtitle index based on the current video time
  const currentSubtitleIndex = scriptsData?.findIndex(
    (subtitle) =>
      subtitle.startTimeInSecond <= currentTime &&
      subtitle.startTimeInSecond + subtitle.durationInSecond >= currentTime,
  );

  const handleBookmark = () => {
    if (currentSubtitleIndex !== null && currentSubtitleIndex !== undefined) {
      createBookmarkMutation.mutate({
        sentenceIndex: currentSubtitleIndex,
      });
    }
  };

  const handleMemo = () => {
    if (currentSubtitleIndex !== null && currentSubtitleIndex !== undefined) {
      setSelectedSentenceIndex(currentSubtitleIndex);
      setMemoText(''); // Reset memo text
      setIsMemoOpen(true);
      setIsPlaying(false); // Pause the video when memo is open
    }
  };

  const handleSaveMemo = () => {
    if (selectedSentenceIndex !== null) {
      createBookmarkMutation.mutate({
        sentenceIndex: selectedSentenceIndex,
        description: memoText,
      });
      setIsMemoOpen(false); // Close memo input
      setIsPlaying(true); // Resume video playback
    }
  };

  const handleCancelMemo = () => {
    setIsMemoOpen(false); // Close memo input
    setIsPlaying(true); // Resume video playback
  };

  // 클라이언트에서만 렌더링되도록 조건부 렌더링
  if (!mounted) return null;

  if (!bookmarkData || bookmarkData.data.bookmarkList.length === 0) {
    return <p className="mt-8">북마크가 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-4 rounded-[20px]">
      <div className="flex">
        {/* 비디오 플레이어 부분 */}
        <div className="relative overflow-hidden w-2/3 h-[400px] rounded-lg">
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            playing={isPlaying}
            width="100%"
            height="100%" // 비디오 플레이어의 높이 설정
            onReady={handleVideoReady}
            onPlay={() => {
              setIsPlaying(true);
              setIsVideoReadyButIsNotPlayingYet(false);
            }}
            onStart={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onProgress={handleProgress}
            volume={volume}
            controls={false}
            playbackRate={playbackRate}
            progressInterval={100}
          />
          <ControlBar
            playerRef={playerRef}
            BasicControlBarProps={BasicControlBarProps}
          />
        </div>

        {/* 북마크 및 메모 패널 */}
        <div className="max-w-2xl mx-auto p-4 space-y-6 h-[400px] overflow-y-scroll">
          {bookmarkData.data.bookmarkList.map((bookmark) => {
            const subtitle = scriptsData?.[bookmark.sentenceIndex];
            return (
              <BookmarkMemoItem
                key={bookmark.bookmarkId}
                bookmark={bookmark}
                subtitle={subtitle}
                seekTo={seekTo}
              />
            );
          })}
        </div>
      </div>

      <div className="w-full flex mt-4 gap-2">
        <Button type="button" onClick={handleBookmark}>
          북마크 추가
        </Button>
        <Button type="button" onClick={handleMemo}>
          메모 추가
        </Button>
      </div>

      {isMemoOpen && (
        <div className="mt-4 w-full">
          <textarea
            value={memoText}
            onChange={(e) => setMemoText(e.target.value)}
            className="w-full h-24 p-2 border"
            placeholder="메모 입력"
          />
          <div className="flex justify-end gap-4 mt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancelMemo}
              className="px-4 py-2"
            >
              취소
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={handleSaveMemo}
              className="bg-purple-400 px-4 py-2"
            >
              저장
            </Button>
          </div>
        </div>
      )}

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
          bookmarkedIndices={bookmarkData.data.bookmarkList.map(
            (bookmark) => bookmark.sentenceIndex,
          )}
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
