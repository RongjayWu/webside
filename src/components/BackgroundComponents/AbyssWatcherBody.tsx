interface AbyssWatcherBodyProps {
  active: boolean;
}

export default function AbyssWatcherBody({ active }: AbyssWatcherBodyProps) {
  return (
    <div className={`absolute inset-0 transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-80'}`}>
      <div className="absolute left-1/2 top-[10%] h-[70vh] w-[72vw] max-w-[980px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_50%_34%,rgba(173,255,255,0.08),rgba(8,18,29,0.94)_50%,rgba(0,0,0,0.99)_100%)] shadow-[0_0_150px_rgba(63,197,255,0.08)] blur-[0.4px]" />

      <div className="absolute left-1/2 top-[17%] h-[56vh] w-[54vw] max-w-[720px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_50%_40%,rgba(145,244,255,0.08),rgba(4,12,20,0.9)_72%,rgba(0,0,0,0)_100%)] blur-3xl" />

      <div className="absolute left-1/2 top-[23%] h-[46vh] w-[44vw] max-w-[590px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.9),rgba(0,0,0,0.97)_60%,rgba(0,0,0,0.99)_100%)] shadow-[0_0_0_1px_rgba(124,240,255,0.04),0_0_90px_rgba(0,0,0,0.72)]" />

      <div className="absolute left-1/2 top-[28%] h-[33vh] w-[32vw] max-w-[410px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_50%_44%,rgba(9,12,14,0.98),rgba(2,3,4,0.995)_60%,rgba(0,0,0,0.99)_100%)] shadow-[0_0_0_2px_rgba(255,255,255,0.015),0_0_34px_rgba(0,0,0,0.92)]" />

      <div className="absolute left-1/2 top-[30%] h-[28vh] w-[27vw] max-w-[350px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_50%_40%,rgba(42,68,92,0.42),rgba(7,13,20,0.96)_58%,rgba(0,0,0,0.99)_100%)] blur-[1px]" />

      <div className="absolute left-1/2 top-[35.2%] h-[20vh] w-[18vw] max-w-[240px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_50%_40%,rgba(24,28,30,0.98),rgba(10,13,16,0.95)_68%,rgba(0,0,0,0.99)_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.015),0_0_20px_rgba(0,0,0,0.96)]" />

      <div className="absolute left-1/2 top-[19%] h-[18vh] w-[58vw] max-w-[760px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.06),transparent_54%)] opacity-65 blur-3xl" />

      <div className="absolute left-1/2 top-[68%] h-[12vh] w-[58vw] max-w-[720px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_70%)] opacity-45 blur-3xl" />
    </div>
  );
}