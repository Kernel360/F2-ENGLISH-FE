/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useRef } from 'react';
import {
  useUpdateBookmark,
  useFetchAllBookmarks,
} from '@/api/hooks/useBookmarks';
import { BookmarkByContentId } from '@/types/Bookmark';
import { Subtitle } from '@/types/Scripts';
import { convertTime } from '@/lib/convertTime';
import { useParams } from 'next/navigation';
import { Button } from './ui/button';

interface BookmarkMemoItemProps {
  bookmark: BookmarkByContentId;
  subtitle: Subtitle | undefined;
  seekTo: (timeInSeconds: number) => void;
}

export default function BookmarkMemoItem({
  bookmark,
  subtitle,
  seekTo,
}: BookmarkMemoItemProps) {
  const params = useParams();
  const contentId = Number(params.id);

  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState<string | null>(bookmark.description);
  const memoRef = useRef<HTMLDivElement>(null);

  const updateBookmarkMutation = useUpdateBookmark(contentId);
  const { refetch: refetchAllBookmarks } = useFetchAllBookmarks();

  const handleSaveMemo = () => {
    if (memo !== null && memo.trim() !== '') {
      updateBookmarkMutation.mutate(
        { bookmarkId: bookmark.bookmarkId, description: memo },
        {
          onSuccess: () => {
            refetchAllBookmarks();
            setIsEditing(false);
          },
          onError: (error) => {
            console.error('메모 수정 실패', error);
          },
        },
      );
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (memoRef.current && !memoRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [memoRef]);

  return (
    <div key={bookmark.bookmarkId} className="bg-white p-4 border-b">
      <div className="flex">
        <Button
          variant="secondary"
          onClick={() => {
            seekTo(subtitle?.startTimeInSecond as number);
          }}
        >
          {convertTime(subtitle?.startTimeInSecond as number)}
        </Button>
        <h2 className="text-lg font-semibold mb-1 ml-4">
          {subtitle ? subtitle.enScript : '자막을 찾을 수 없습니다.'}
        </h2>
      </div>
      <div ref={memoRef} onClick={() => setIsEditing(true)}>
        <textarea
          value={memo || ''}
          onChange={(e) => setMemo(e.target.value)}
          className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-purple-500 min-h-10 resize-none"
        />
        {isEditing && (
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                console.log('click');
                setIsEditing(false);
              }}
            >
              취소
            </Button>
            <Button onClick={handleSaveMemo}>저장</Button>
          </div>
        )}
      </div>
    </div>
  );
}
