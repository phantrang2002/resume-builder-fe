import { useEffect, useMemo, useState } from "react";

const STAGE_MS = 650;

const SHORT_STATUS = [
  "Creating the record",
  "Adding sections",
  "Applying the template",
  "Opening the editor",
] as const;

export default function useCreatingProgress(templateName: string, onComplete: () => void) {
  const stages = useMemo(
    () => [
      "Creating the resume record",
      "Adding your nine sections",
      `Applying the ${templateName} template`,
      "Opening the editor",
    ],
    [templateName],
  );

  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timers: number[] = [];

    stages.forEach((_, index) => {
      if (index === 0) {
        return;
      }
      timers.push(
        window.setTimeout(() => {
          setActiveStage(index);
        }, STAGE_MS * index),
      );
    });

    timers.push(
      window.setTimeout(() => {
        onComplete();
      }, STAGE_MS * stages.length),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [onComplete, stages]);

  const progress = Math.min(Math.round(((activeStage + 0.7) / stages.length) * 100), 100);
  const shortStatus = SHORT_STATUS[activeStage] ?? SHORT_STATUS[0];

  return {
    stages,
    activeStage,
    progress,
    shortStatus,
  };
}
