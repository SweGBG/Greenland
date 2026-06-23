import clsx from "clsx";

export default function SignTag({
  children,
  className,
  tilt = "left",
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: "left" | "right";
}) {
  return (
    <span
      className={clsx(
        "sign-tag inline-flex items-center px-4 py-1.5 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.18em] text-cream-50",
        tilt === "left" ? "-rotate-2" : "rotate-2",
        className
      )}
    >
      {children}
    </span>
  );
}
