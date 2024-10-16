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
import { useUserLoginStatus } from '@/api/hooks/useUserInfo';
import { useRouter } from 'next/navigation';
import { Check, X, BookmarkPlus, MessageSquarePlus } from 'lucide-react';
import { convertTime } from '@/lib/convertTime';
import ControlBar from './ControlBar';
import SubtitleOption from './SubtitleOption';
import { ReactScriptPlayer } from './ReactScriptPlayer';
import { LanguageCode } from '../types/Scripts';
import BookmarkMemoItem from './BookmarkMemoItem';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import Modal from './Modal';

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

  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data; // 로그인 상태 확인
  const router = useRouter(); // login페이지로 이동
  const [showLoginModal, setShowLoginModal] = useState(false); // 권한 없을때 로그인 모달

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

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
    // 로그인 권한 없으면 로그인 모달 띄우기
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }
    // 로그인 권한 있을때만 아래 실행
    if (currentSubtitleIndex !== null && currentSubtitleIndex !== undefined) {
      createBookmarkMutation.mutate({
        sentenceIndex: currentSubtitleIndex,
      });
    }
  };

  const handleMemo = () => {
    // 로그인 권한 없으면 로그인 모달 띄우기
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }
    // 로그인 권한 있을때만 아래 실행
    if (currentSubtitleIndex !== null && currentSubtitleIndex !== undefined) {
      setSelectedSentenceIndex(currentSubtitleIndex);
      setNewNoteText('');
      setIsAddingNote(true);
      setIsPlaying(false);
    }
  };

  const handleSaveNewNote = () => {
    if (selectedSentenceIndex !== null) {
      createBookmarkMutation.mutate({
        sentenceIndex: selectedSentenceIndex,
        description: newNoteText,
      });
      setIsAddingNote(false); // Close new note input
      setIsPlaying(true); // Resume video playback
    }
  };

  const handleCancelNewNote = () => {
    setIsAddingNote(false); // Close new note input
    setIsPlaying(true); // Resume video playback
  };

  // 클라이언트에서만 렌더링되도록 조건부 렌더링
  if (!mounted) return null;

  return (
    <div className="container mx-auto py-5 grid grid-cols-3 gap-4">
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

      {/* 로그인 모달 */}
      {showLoginModal && (
        <Modal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          title="로그인이 필요합니다."
          description="이 기능을 이용하려면 로그인이 필요해요! "
        >
          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant="default"
              className="hover:bg-violet-900 w-full"
              onClick={() => router.push('/login')}
            >
              로그인 하러 가기
            </Button>
          </div>
        </Modal>
      )}

      {/* 북마크 메모 패널 */}
      <div className="col-span-1">
        <Card className="h-full flex flex-col justify-between p-4">
          <CardHeader className="p-0">
            <CardTitle className="text-xl">Bookmarks & Notes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[560px] mb-4">
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
              {/* TODO(@smosco): 메모 컴포넌트랑 거의 동일 분리 해야함 */}
              {isAddingNote && selectedSentenceIndex !== null && (
                <div className="mb-4 p-2 bg-muted rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm text-muted-foreground">
                      {scriptsData?.[selectedSentenceIndex]?.enScript ||
                        '문장 없음'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {scriptsData?.[selectedSentenceIndex]
                        ?.startTimeInSecond &&
                        convertTime(
                          scriptsData[selectedSentenceIndex].startTimeInSecond,
                        )}
                    </div>
                  </div>
                  <Textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="mb-2"
                    placeholder="Enter your note here..."
                  />
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" onClick={handleCancelNewNote}>
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveNewNote}>
                      <Check className="h-4 w-4 mr-2" /> Save
                    </Button>
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <div className="flex gap-2 justify-between">
            <Button onClick={handleBookmark} className="w-28">
              <BookmarkPlus size={20} className="mr-2" />
              북마크
            </Button>
            <Button onClick={handleMemo} className="w-28">
              <MessageSquarePlus size={20} className="mr-2" />
              메모 추가
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default VideoPlayer;
