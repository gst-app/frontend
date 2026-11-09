import AiChallengeBanner from "@/features/dashboard/student/components/AiChallengeBanner";
import ExamReadinessCard from "@/features/dashboard/student/components/ExamReadinessCard";
import PerformanceTrendCard from "@/features/dashboard/student/components/PerformanceTrendCard";
import RecentActivityCard from "@/features/dashboard/student/components/RecentActivityCard";
import WeakTopicsCard from "@/features/dashboard/student/components/WeakTopicsCard";
import WelcomeHero from "@/features/dashboard/student/components/WelcomeHero";

const StudentDashboardPage = () => {
  return (
    <div className="flex flex-col gap-10 md:mt-0 mt-4">
      <div className="flex lg:flex-row flex-col gap-6 gap-y-8 w-full">
        <div className="lg:w-8/12 w-full flex">
          <WelcomeHero />
        </div>
        <div className="lg:w-4/12 w-full flex">
          <ExamReadinessCard />
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-6 gap-y-8 w-full">
        <PerformanceTrendCard />
        <WeakTopicsCard />
        <RecentActivityCard />
      </div>

      <AiChallengeBanner />
    </div>
  );
};

export default StudentDashboardPage;
