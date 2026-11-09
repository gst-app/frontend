const ExamReadinessCard = () => {
  return (
    <div className="bg-white rounded-[20px] shadow-[0px_20px_40px_0px_#111E190F] p-6 flex flex-col gap-6 items-center w-full flex-1">
      <p className="text-sm font-bold font-manrope text-foreground uppercase tracking-widest">
        Exam Readiness
      </p>

      <div
        className="grid size-36 place-items-center rounded-full border-10 border-[#22C55E] sm:size-40"
        aria-label="Average score 68 percent"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="block text-3xl font-bold font-manrope text-[#111E19]">68%</span>
          <span className="block text-[0.65rem] font-semibold uppercase text-muted-foreground">
            Average score
          </span>
        </div>
      </div>

      <p className="text-sm font-medium text-foreground">Top 5% of Scholars</p>
    </div>
  );
};

export default ExamReadinessCard;
