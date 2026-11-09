import bulb from "@/assets/images/bulb.png";
import { Button } from "@/components/ui/button";

const AiChallengeBanner = () => {
  return (
    <div className="bg-secondary p-8 rounded-[20px] flex justify-between  items-center gap-8 shadow-[0px_20px_40px_0px_#111E190F] md:flex-row flex-col">
      <div className="flex gap-5 items-center">
        <img src={bulb} alt="bulb" />
        <div className="space-y-1">
          <h3 className="font-extrabold text-2xl font-manrope text-[#004B1E]">
            Ready for a Deep Focus session?
          </h3>
          <p className="text-[#004B1E]">
            Our AI tutor has prepared a custom quiz based on your recent activity.
          </p>
        </div>
      </div>
      <div>
        <Button
          size="default"
          className="rounded-[20px] bg-[#004B1E] font-sans h-13 px-8 font-bold w-fit"
        >
          Start AI Challenge
        </Button>
      </div>
    </div>
  );
};

export default AiChallengeBanner;
