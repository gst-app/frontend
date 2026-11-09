import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const topics = [
  { topic: "GS 100: Use of English", masteryPercent: 42 },
  { topic: "GS 101: History of Science", masteryPercent: 58 },
  { topic: "GS 105: Logic & Philosophy", masteryPercent: 75 },
];

const getColor = (percent: number) => {
  if (percent < 50) return "#BA1A1A";
  if (percent < 65) return "#9E4036";
  return "#006E2F";
};

const WeakTopicsCard = () => {
  return (
    <div className="w-full bg-bg-white border-t-4 border-secondary rounded-card shadow-card p-6 space-y-6">
      <div className="flex gap-2 items-center">
        <Zap className="text-primary" />
        <p className="font-manrope text-lg font-bold text-[#111E19]">Weak Topics</p>
      </div>

      {/* Topics */}
      <div className="space-y-5">
        {topics.map(({ topic, masteryPercent }) => (
          <div key={topic}>
            <div className="flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="font-bold text-semi-black">{topic}</span>
              <span style={{ color: getColor(masteryPercent) }}>{masteryPercent}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full"
                style={{ width: `${masteryPercent}%`, backgroundColor: getColor(masteryPercent) }}
              />
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full mt-3 bg-[#22C55E1A] rounded-card! h-12 text-primary font-bold hover:text-white">
        Practice Weak Topics
      </Button>
    </div>
  );
};

export default WeakTopicsCard;
