type TrendPoint = { date: string; averageScore: number; testsTaken: number };

// Dummy data for now
const dummyTrend: TrendPoint[] = [
  { date: "2026-11-03", averageScore: 40, testsTaken: 1 },
  { date: "2026-11-04", averageScore: 55, testsTaken: 2 },
  { date: "2026-11-05", averageScore: 45, testsTaken: 1 },
  { date: "2026-11-06", averageScore: 70, testsTaken: 3 },
  { date: "2026-11-07", averageScore: 85, testsTaken: 2 },
  { date: "2026-11-08", averageScore: 75, testsTaken: 1 },
  { date: "2026-11-09", averageScore: 100, testsTaken: 4 },
];

const getDayLabel = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }).toUpperCase();

const PerformanceTrendCard = ({ scoreTrend = dummyTrend }: { scoreTrend?: TrendPoint[] }) => {
  const lastIndex = Math.max(scoreTrend.length - 1, 1);

  return (
    <div className="rounded-card bg-white shadow-card p-6">
      <div className="flex items-center justify-between">
        <p className="font-manrope text-lg font-bold text-semi-black">Performance Trend</p>
        <span className="text-xs font-semibold text--foreground">Last 7 days</span>
      </div>

      <div className="mt-8 flex">
        {scoreTrend.map(({ date, averageScore }, i) => {
          const isLast = i === scoreTrend.length - 1;
          const opacity = 0.08 + (i / lastIndex) * 0.92;

          return (
            <div key={date} className="flex flex-1 flex-col">
              <div className="flex h-44 items-end">
                <div
                  className="w-full rounded-t-lg"
                  style={{
                    height: `${averageScore}%`,
                    background: isLast
                      ? "linear-gradient(to bottom, #006E2F, #22C55E)"
                      : `rgba(0, 110, 47, ${opacity})`,
                  }}
                />
              </div>
              <span className="mt-4 text-center text-[10px] font-bold text-foreground">
                {getDayLabel(date)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceTrendCard;
