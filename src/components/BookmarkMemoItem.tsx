/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useRef } from 'react';
import {
  useUpdateBookmark,
  useFetchAllBookmarks,
} from '@/api/hooks/useBookmarks';
import { Edit2, Check, X } from 'lucide-react';
import { BookmarkByContentId } from '@/types/Bookmark';
import { Subtitle } from '@/types/Scripts';
import { useParams } from 'next/navigation';
import { convertTime } from '@/lib/convertTime';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

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
    <div key={bookmark.bookmarkId} className="mb-4 p-2 bg-muted rounded-md">
      <div className="flex justify-between items-start mb-2">
        <div className="text-xs text-muted-foreground">
          <Button
            variant="secondary"
            className="rounded-full h-6 px-3"
            onClick={() =>
              // TODO(@smosco): 북마크 메모 싱크
              // 자막 시작시간으로 이동했을 때 이전 자막을 보여주는 문제 해결을 위해 0.1초 보정
              seekTo((subtitle?.startTimeInSecond as number) + 0.1)
            }
          >
            {convertTime(subtitle?.startTimeInSecond as number)}
          </Button>
          <p className="mt-2">{subtitle?.enScript}</p>
        </div>
        {/* TODO(@smosco): 삭제 버튼 추가 */}
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>
      {isEditing ? (
        <div>
          <Textarea
            value={memo || ''}
            onChange={(e) => setMemo(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-end space-x-2">
            <Button size="sm" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSaveMemo}>
              <Check className="h-4 w-4 mr-2" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm min-h-10 border-l-purple-400">{memo || ''}</p>
      )}
    </div>
  );
}
