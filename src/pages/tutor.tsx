import Head from 'next/head';
import { GetStaticProps } from 'next';
import Navbar from '../components/PublicUI/Navbar';
import ScrollToTopButton from "../components/PublicUI/ScrollToTopButton";
import HomeIntroOverlay from '../components/BackgroundComponents/HomeIntroOverlay';
import Contact from '../components/PublicUI/Contact';
import Footer from '../components/BackgroundComponents/Footer';
import DeepSeaBackground from '../components/BackgroundComponents/DeepSeaBackground';
import { useSessionIntro } from '../hooks/useSessionIntro';

// 引入新架構的型態與組件
import { TutorProfileData } from '../types/tutor';
import ProfileCard from '../components/Tutor/LeftSidebar/ProfileCard';
import TeachingStatus from '../components/Tutor/LeftSidebar/TeachingStatus';
import Navigation from '../components/Tutor/LeftSidebar/Navigation';

import TeachingJourney from '../components/Tutor/MainContent/TeachingJourney';
import TeachingPhilosophy from '../components/Tutor/MainContent/TeachingPhilosophy';
import TeachingApproach from '../components/Tutor/MainContent/TeachingApproach';
import Subjects from '../components/Tutor/MainContent/Subjects';
import StudentGrowthStories from '../components/Tutor/MainContent/StudentGrowthStories';
import FeaturedTeachingCases from '../components/Tutor/MainContent/FeaturedTeachingCases';

import TeachingHours from '../components/Tutor/RightSidebar/TeachingHours';
import CurrentNextLesson from '../components/Tutor/RightSidebar/CurrentNextLesson';
import CasesSummary from '../components/Tutor/RightSidebar/CasesSummary';

// 定義 Page 組件接收的 Props 型態
interface TutorPageProps {
  data: TutorProfileData;
}

// 修正：將組件改回同步 React 元件，資料透過 Props 由 Next.js 注入
export default function Tutor({ data }: TutorPageProps) {
  const { mode, phase, isIntroPlaying, finishIntro } = useSessionIntro();

  return (
    <>
      <Head>
        <title>潮汐知音 - Rongcean</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>

      <div className="relative min-h-screen text-slate-800 antialiased">
        {/* 完美保留你原有的深海背景與導覽列 */}
        <Navbar />
        

        {/* 網頁主體內容：套用 20% / 60% / 20% 黃金比例佈局 */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 左側欄位 20% (lg:col-span-3) */}
          <aside className="md:sticky top-24 h-fit lg:col-span-3">
            <div className="space-y-6">
              <ProfileCard name={data.name} avatarUrl={data.avatarUrl} tags={data.tags} />
              <TeachingStatus status={data.status} currentFocus={data.currentFocus} />
              <Navigation />
            </div>
          </aside>

          {/* 中央主內容 60% (lg:col-span-6) */}
          <main className="lg:col-span-6 space-y-12">
            <TeachingJourney journey={data.journey} />
            <TeachingPhilosophy philosophies={data.philosophies} />
            <TeachingApproach />
            <Subjects steps={data.subjects} />
            <StudentGrowthStories stories={data.growthStories} />
            <FeaturedTeachingCases cases={data.featuredCases} />
            
            {/* 保留原本的聯絡區塊 */}
            <Contact tutorMode={true} />
          </main>

          {/* 右側欄位 20% (lg:col-span-3) */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <TeachingHours totalHours={data.totalHours} />
              <CurrentNextLesson schedule={data.lessonSchedule} />
              <CasesSummary totalCases={data.featuredCases.length} />
            </div>
          </aside>
          <DeepSeaBackground />
        </main>

        {/* 頁尾與功能型按鈕 */}
        <Footer />
        <ScrollToTopButton />
        
        <HomeIntroOverlay mode={mode} active={isIntroPlaying} onComplete={finishIntro} />
      </div>
    </>
  );
}

// 💡 預留接口：Next.js Pages Router 專用的伺服器/靜態資料獲取機制
export const getStaticProps: GetStaticProps<TutorPageProps> = async () => {
  // 未來可以直接在這裡下 Await 連線資料庫撈資料
  const mockData: TutorProfileData = {
    name: "吳榮傑",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    tags: ["升學輔導教師", "統測專業科目家教", "會考輔導教師"],
    status: "Available",
    currentFocus: ["統測專業科目", "會考衝刺"],
    journey: {
      whyStart: "大二時接觸到第一個技職學生，看到他眼中的迷茫，開啟了我的教學之路...",
      whyExamPrep: "升學考試不只是考智商，更是考系統性複習的策略與心態調適。",
      growthProcess: "歷經多年的統測與會考輔導，不斷優化教法，陪伴學生戰勝大考。"
    },
    philosophies: ["重視理解而非死背", "找出學生真正弱點", "建立學習習慣", "培養自主思考能力"],
    subjects: {
      juniorHigh: ["國中會考數學", "國中會考理化"],
      vocational: ["基本電學", "電子學", "程式設計", "數位邏輯", "微處理機"]
    },
    growthStories: [
      { id: "s1", startProblem: "公式死背、題目變型就不會", process: "帶領學生重構電學與基礎圖形邏輯", finalChange: "不只分數提升，更能主動向同學講解題目" }
    ],
    featuredCases: [
      { id: "c1", subjectType: "統測資訊科", grade: "高三", year: 2026, focus: "統測專業科目突破" },
      { id: "c2", subjectType: "會考數學", grade: "國三", year: 2026, focus: "幾何圖形破題特訓" }
    ],
    totalHours: 1286,
    lessonSchedule: {
      subjectName: "統測專業科目（一）",
      timeSlot: "19:00 - 21:00",
      isCurrent: true
    }
  };

  return {
    props: {
      data: mockData,
    },
    // 預留重新生成時間 (ISR 機制)，若資料庫有改，每 60 秒會自動在背景更新畫面
    revalidate: 60, 
  };
};