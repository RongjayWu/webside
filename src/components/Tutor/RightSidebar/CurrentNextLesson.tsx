import { LessonSchedule } from '../../../types/tutor';
import Card from '../UI/Card';

export default function CurrentNextLesson({ schedule }: { schedule: LessonSchedule | null }) {
  if (!schedule) return <Card className="text-center text-xs text-slate-400">目前無排定課程</Card>;

  return (
    <Card className="space-y-3">
      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${schedule.isCurrent ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
        {schedule.isCurrent ? '● Current Lesson' : 'Next Lesson'}
      </span>
      <div>
        <h4 className="text-md font-bold text-slate-800">{schedule.subjectName}</h4>
        <p className="text-xs text-slate-400 mt-1">📅 {schedule.date ? `${schedule.date} ` : ''}{schedule.timeSlot}</p>
      </div>
      <button className="w-full text-center text-xs text-blue-600 font-semibold py-2 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">View Schedule →</button>
    </Card>
  );
}