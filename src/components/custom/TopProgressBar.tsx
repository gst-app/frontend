export default function TopProgressBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden">
      <div className="h-full w-1/3 animate-progress bg-primary" />
    </div>
  );
}
