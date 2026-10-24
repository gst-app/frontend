import { Link } from "react-router";
import illustration from "@/assets/images/work-about-us-about-our-team-01-6.png";
import ellipse from "@/assets/images/ellipse_12.png";
import { ROUTES } from "@/config/routes";

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-background lg:flex-row lg:items-center">
      {/* Illustration */}
      <div className="flex flex-1 items-end justify-center px-6 pt-16 lg:items-center lg:px-12">
        <img
          src={illustration}
          alt="Two students celebrating with a high five"
          className="w-full max-w-sm lg:max-w-2xl"
        />
      </div>

      {/* Ellipse: after the image */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-25%] left-1/2 -translate-x-1/2 md:-top-1/5 lg:left-[-10%] lg:translate-x-0 max-lg:h-[62%] max-lg:w-[160%]"
      >
        <img src={ellipse} alt="" className="h-full w-full object-cover max-lg:object-fill" />
      </div>

      {/* Content */}
      <section className="flex flex-col items-center gap-10 px-6 pt-10 pb-16 text-center lg:flex-1 lg:px-12 lg:pt-0 lg:pb-0">
        <h1 className="max-w-xs font-heading text-4xl leading-tight lg:max-w-xl lg:text-5xl">
          General Studies Made Easy
        </h1>

        <div className="flex w-full max-w-md flex-col gap-6">
          <Link
            to={ROUTES.SIGNUP}
            className="rounded-full bg-primary px-6 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase shadow-button-primary transition active:translate-y-0.5 active:shadow-none font-heading"
          >
            Get started
          </Link>

          <Link
            to={ROUTES.LOGIN}
            className="rounded-full bg-accent px-6 py-4 text-sm font-medium font-heading tracking-wide text-accent-foreground uppercase shadow-button-secondary transition active:translate-y-0.5 active:shadow-none"
          >
            I already have an account
          </Link>
        </div>
      </section>
    </main>
  );
}
