import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

export default function ResponsiveSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* 사이드바 */}
      <div
        className={`fixed top-20 right-0 h-[30%] transform transition-transform duration-300 ease-in-out z-40  bg-gray-200  rounded-lg
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
       xl:w-[300px] `}
      >
        {/* todo : drag & drop으로 위치 변경 가능하게 만들기 */}
        {/* 모바일 화면이면 30%민 보이도록 */}
        {/* 사이드바 콘텐츠 */}
        <div className="p-4">
          <h2>Sidebar Content</h2>
          {/* 추가 콘텐츠 */}
        </div>
      </div>

      {/* 화면이 작을 때만 버튼이 보임 */}
      <div className="fixed top-16 right-0 z-50">
        <Button
          onClick={toggleSidebar}
          className={`p-2 rounded-full shadow-lg ${isSidebarOpen ? 'bg-purple-500 hover:bg-purple-500' : ''}`}
        >
          {isSidebarOpen ? (
            <PanelRightOpen className="w-5 h-5" />
          ) : (
            <PanelRightClose className="w-5 h-5" />
          )}
        </Button>
      </div>
    </>
  );
}
