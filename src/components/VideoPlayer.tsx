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
import { BookmarkPlus, MessageSquarePlus } from 'lucide-react';
import ControlBar from './ControlBar';
import SubtitleOption from './SubtitleOption';
import { ReactScriptPlayer } from './ReactScriptPlayer';
import { LanguageCode } from '../types/Scripts';
import BookmarkMemoItem from './BookmarkMemoItem';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

type Mode = 'line' | 'block';

interface VideoPlayerProps {
  videoUrl: string;
  scriptsData: Script[] | undefined;
}

function VideoPlayer({ videoUrl, scriptsData }: VideoPlayerProps) {
  const params = useParams();
  const contentId = Number(params.id);

  const playerRef = useRef<ReactPlayer | null>(null);
  console.log(contentId);

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

  console.log(selectedSentenceIndex, isMemoOpen, memoText, mounted);

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

  // const handleSaveMemo = () => {
  //   if (selectedSentenceIndex !== null) {
  //     createBookmarkMutation.mutate({
  //       sentenceIndex: selectedSentenceIndex,
  //       description: memoText,
  //     });
  //     setIsMemoOpen(false); // Close memo input
  //     setIsPlaying(true); // Resume video playback
  //   }
  // };

  // const handleCancelMemo = () => {
  //   setIsMemoOpen(false); // Close memo input
  //   setIsPlaying(true); // Resume video playback
  // };

  // 클라이언트에서만 렌더링되도록 조건부 렌더링
  if (!mounted) return null;

  return (
    <div className="container mx-auto p-4 grid grid-cols-3 gap-4">
      {/* 비디오 플레이어 */}
      <div className="col-span-2 space-y-4">
        <Card>
          <CardContent className="p-0 h-[400px] relative rounded-xl overflow-hidden">
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              playing={isPlaying}
              width="100%"
              height="100%"
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
          </CardContent>
        </Card>

        {/* 보기모드, 언어 옵션 */}
        <SubtitleOption
          mode={mode}
          selectedLanguages={selectedLanguages}
          setMode={setMode}
          setSelectedLanguages={setSelectedLanguages}
        />

        {/* 자막 컨테이너 */}
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
          bookmarkedIndices={
            bookmarkData && bookmarkData?.data.bookmarkList.length > 0
              ? bookmarkData.data.bookmarkList.map(
                  (bookmark) => bookmark.sentenceIndex,
                )
              : []
          }
        />
      </div>
      {/* 북마크 메모 패널 */}
      <div className="col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Bookmarks & Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[580px] mb-4">
              {bookmarkData && bookmarkData.data.bookmarkList.length > 0 ? (
                bookmarkData.data.bookmarkList.map((bookmark) => {
                  const subtitle = scriptsData?.[bookmark.sentenceIndex];
                  return (
                    <BookmarkMemoItem
                      key={bookmark.bookmarkId}
                      bookmark={bookmark}
                      subtitle={subtitle}
                      seekTo={seekTo}
                    />
                  );
                })
              ) : (
                <p className="mt-8">북마크가 없습니다.</p>
              )}
            </ScrollArea>
            <div className="flex justify-between">
              <Button onClick={handleBookmark}>
                <BookmarkPlus className="mr-2 h-4 w-4" /> Bookmark
              </Button>
              <Button onClick={handleMemo}>
                <MessageSquarePlus className="mr-2 h-4 w-4" /> Add Note
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default VideoPlayer;
