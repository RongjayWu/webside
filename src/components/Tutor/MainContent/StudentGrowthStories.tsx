import { GrowthStory } from '../../../types/tutor';

interface StoriesProps {
  stories: GrowthStory[];
}

export default function StudentGrowthStories({ stories }: StoriesProps) {
  return (
    <section id="StudentGrowthStories" className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">學生培育成果</h3>
      <p className="text-sm text-slate-500 mb-6">著重於能力與自主學習習慣的建立過程</p>

      <div className="space-y-6">
        {stories.map((story) => (
          <div key={story.id} className="border border-slate-100 rounded-2xl p-6 bg-slate-50/30 space-y-4">
            
            {/* 1. 起始問題 */}
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-500 text-xs font-bold flex items-center justify-center mt-0.5">問</span>
              <div>
                <h5 className="text-sm font-bold text-slate-800">起始問題</h5>
                <p className="text-sm text-slate-600 mt-1">{story.startProblem}</p>
              </div>
            </div>

            {/* 2. 學習過程 */}
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-50 text-orange-500 text-xs font-bold flex items-center justify-center mt-0.5">過</span>
              <div>
                <h5 className="text-sm font-bold text-slate-800">輔導與學習過程</h5>
                <p className="text-sm text-slate-600 mt-1">{story.process}</p>
              </div>
            </div>

            {/* 3. 最終改變 */}
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-50 text-green-500 text-xs font-bold flex items-center justify-center mt-0.5">變</span>
              <div>
                <h5 className="text-sm font-bold text-slate-800">思維與習慣的最終改變</h5>
                <p className="text-sm text-green-700 font-medium mt-1">{story.finalChange}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}