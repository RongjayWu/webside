export default function TeachingApproach() {
  const steps = [
    { title: '學習診斷', desc: '透過前測與對談，摸清學生的真實學習起點。' },
    { title: '弱點分析', desc: '精準抓出盲點，是觀念不清還是題型缺乏練習？' },
    { title: '觀念建立', desc: '拒絕死背！用邏輯與脈絡重新建構學科核心。' },
    { title: '題型訓練', desc: '精選歷屆與模擬試題，鍛鍊解題手感與破題速度。' },
    { title: '考前策略', desc: '時間管理、配分心法與應考心理建設全方位輔導。' },
  ];

  return (
    <section id="TeachingApproach" className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">3. Teaching Approach</h3>
      <div className="relative border-l-2 border-blue-100 ml-4 space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-6">
            <div className="absolute -left-[7px] top-1.5 bg-blue-500 w-3 h-3 rounded-full border-2 border-white" />
            <h4 className="text-md font-bold text-slate-800 mb-1">{step.title}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}