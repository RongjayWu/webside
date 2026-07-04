import { StatusType } from '../../../types/tutor';
import Card from '../UI/Card';

interface StatusProps {
  status: StatusType;
  currentFocus: string[];
}

export default function TeachingStatus({ status, currentFocus }: StatusProps) {
  const statusConfig = {
    Available: { text: '目前可接案 Available', color: 'bg-green-500' },
    Busy: { text: '課滿/特定時段可拆 Busy', color: 'bg-yellow-500' },
    Full: { text: '目前滿堂 Full', color: 'bg-red-500' }
  };

  return (
    <Card className="space-y-4">
      <div>
        <h4 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-2">接案狀態</h4>
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${statusConfig[status].color}`} />
          <span className="font-medium text-slate-700 text-sm">{statusConfig[status].text}</span>
        </div>
      </div>
      <hr className="border-slate-100" />
      <div>
        <h4 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-2">目前教學重心</h4>
        <ul className="space-y-1.5 text-sm text-slate-600">
          {currentFocus.map((focus, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-blue-500 text-xs">🎯</span> {focus}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}