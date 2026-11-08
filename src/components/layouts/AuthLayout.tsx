import { Link } from "react-router";
import illustration from "@/assets/images/work-about-us-about-our-team-01-6.png";
import ellipse from "@/assets/images/ellipse_12.png";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/button";

export default function AuthLayout() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-background lg:flex-row lg:items-center">
      <div className="relative z-10 flex flex-1 items-end justify-center px-6 pt-16 lg:items-center lg:px-12">
        <img
          src={illustration}
          alt="Two students celebrating with a high five"
          className="w-full max-w-sm lg:max-w-2xl"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute top-[-25%] left-1/2 -translate-x-1/2 md:-top-1/5 lg:left-[-10%] lg:translate-x-0 max-lg:h-[62%] max-lg:w-[160%]"
      >
        <img src={ellipse} alt="" className="h-full w-full object-cover max-lg:object-fill" />
      </div>

      <section className="flex flex-col items-center gap-10 px-6 pt-10 pb-16 text-center lg:flex-1 lg:px-12 lg:pt-0 lg:pb-0">
        <h1 className="max-w-xs font-heading text-4xl leading-tight lg:max-w-xl lg:text-5xl">
          General Studies Made Easy
        </h1>

        <div className="flex w-full max-w-md flex-col gap-6">
          <Link to={ROUTES.SIGNUP} className="block w-full">
            <Button
              size="lg"
              className="w-full shadow-button-primary active:translate-y-0.5 active:shadow-none"
            >
              Get started
            </Button>
          </Link>

          <Link to={ROUTES.LOGIN} className="block w-full">
            <Button
              size="lg"
              className="w-full bg-accent text-accent-foreground shadow-button-secondary hover:bg-accent active:translate-y-0.5 active:shadow-none"
            >
              I already have an account
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
