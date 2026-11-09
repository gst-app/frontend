import { BookOpen, BookOpenText, CircleCheck } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "@/config/routes";

import type { ANALYTICS_ACTIVITY_TYPES } from "@/config/analytics";

type ActivityType = (typeof ANALYTICS_ACTIVITY_TYPES)[number];

type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  summaryId: string;
  summaryCode: string;
  scorePercent: number;
  progressPercent: number;
  occurredAt: string;
};

// Icon and tone depend only on the type
const typeConfig: Record<ActivityType, { icon: typeof BookOpen; tone: string }> = {
  assessment: { icon: CircleCheck, tone: "border-secondary text-primary" },
  reading: { icon: BookOpenText, tone: "border-primary text-primary" },
};

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const timeAgo = (iso: string) => {
  const mins = Math.round((new Date(iso).getTime() - Date.now()) / 60000);
  if (Math.abs(mins) < 60) return rtf.format(mins, "minute");
  const hours = Math.round(mins / 60);
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  return rtf.format(Math.round(hours / 24), "day");
};

const getDetail = (a: Activity) => {
  const result =
    a.type === "assessment" ? `Scored ${a.scorePercent}%` : `${a.progressPercent}% complete`;
  return `${result} • ${timeAgo(a.occurredAt)}`;
};

// Dummy data for now
const ago = (ms: number) => new Date(Date.now() - ms).toISOString();
const HOUR = 3_600_000;

const dummyActivities: Activity[] = [
  {
    id: "1",
    type: "assessment",
    title: "GS 100 Mock Exam",
    summaryId: "s1",
    summaryCode: "GS 100",
    scorePercent: 88,
    progressPercent: 0,
    occurredAt: ago(2 * HOUR),
  },
  {
    id: "2",
    type: "reading",
    title: "Reading session: Philosophy",
    summaryId: "s2",
    summaryCode: "GS 105",
    scorePercent: 0,
    progressPercent: 45,
    occurredAt: ago(24 * HOUR),
  },
  {
    id: "3",
    type: "assessment",
    title: "GS 101 Practice Quiz",
    summaryId: "s3",
    summaryCode: "GS 101",
    scorePercent: 62,
    progressPercent: 0,
    occurredAt: ago(48 * HOUR),
  },
];

const RecentActivityCard = ({ activities = dummyActivities }: { activities?: Activity[] }) => {
  return (
    <div className="rounded-card bg-white shadow-card p-6">
      <p className="font-manrope text-lg font-bold text-semi-black">Recent Activity</p>

      <ul className="mt-6">
        {activities.map((activity) => {
          const { icon: Icon, tone } = typeConfig[activity.type];

          return (
            <li key={activity.id} className="group relative flex gap-3 pb-6">
              <span className="absolute left-4 top-8 bottom-0 w-px -translate-x-1/2 bg-border group-last:hidden" />

              <span
                className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 bg-white ${tone}`}
              >
                <Icon className="size-4" />
              </span>

              <div>
                <p className="text-sm font-bold text-semi-black">{activity.title}</p>
                <p className="mt-0.5 text-xs text-foreground">{getDetail(activity)}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <Link to={ROUTES.STUDENT.PROGRESS} className="text-xs font-bold text-primary hover:underline">
        View all sessions
      </Link>
    </div>
  );
};

export default RecentActivityCard;
