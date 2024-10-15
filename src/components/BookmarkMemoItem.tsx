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
// import { convertTime } from '@/lib/convertTime';
import { useParams } from 'next/navigation';
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

  console.log(bookmark, subtitle, seekTo);

  return (
    <div key={bookmark.bookmarkId} className="mb-4 p-2 bg-muted rounded-md">
      <div className="flex justify-between items-start mb-2">
        <div className="text-xs text-muted-foreground">북마크된 자막</div>
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
        <p className="text-sm">{memo || 'Bookmarked sentence'}</p>
      )}
    </div>
  );
}
