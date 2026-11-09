import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const WelcomeHero = () => {
  return (
    <div className="bg-[#E8F7EF] p-8 rounded-[20px] flex flex-col gap-8 justify-between flex-1">
      <div className="flex flex-col gap-2">
        <h2 className="font-manrope font-extrabold text-3xl sm:text-4xl leading-11">
          Welcome back, Ebuka 👋
        </h2>
        <p className="text-foreground max-w-sm">
          Your intellectual journey is 68% complete for this semester. Ready to conquer your GS
          finals?
        </p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button
          size="lg"
          className="capitalize h-12 font-sans w-fit"
          icon={<Rocket className="size-5" />}
        >
          Start Test
        </Button>
        <Button
          size="lg"
          className="capitalize h-12 bg-white text-foreground font-sans hover:text-white w-fit"
        >
          Continue Reading
        </Button>
        <Button
          size="lg"
          className="capitalize h-12 bg-white text-foreground font-sans hover:text-white w-fit"
        >
          View Progress
        </Button>
      </div>
    </div>
  );
};

export default WelcomeHero;
