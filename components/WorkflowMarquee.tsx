export function WorkflowMarquee({ steps, ariaLabel }: { steps: readonly string[]; ariaLabel: string }) {
  const repeatedSteps = [...steps, ...steps];

  function row(reverse: boolean) {
    return (
      <ol className={`ar-workflow ar-workflow-marquee-row${reverse ? " is-reverse" : ""}`}>
        {repeatedSteps.map((step, index) => (
          <li key={`${reverse ? "reverse" : "forward"}-${step}-${index}`} aria-hidden={index >= steps.length ? true : undefined}>
            <span>{String((index % steps.length) + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    );
  }

  return <div className="ar-workflow-marquee" role="region" aria-label={ariaLabel}>{row(false)}{row(true)}</div>;
}
