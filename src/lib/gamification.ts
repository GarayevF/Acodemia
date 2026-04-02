import { LEVEL_THRESHOLDS, XP_REWARDS } from "@/types";

export function getLevelForXP(xp: number) {
  let current: (typeof LEVEL_THRESHOLDS)[number] = LEVEL_THRESHOLDS[0];
  for (const threshold of LEVEL_THRESHOLDS) {
    if (xp >= threshold.xp) {
      current = threshold;
    } else {
      break;
    }
  }
  return current;
}

export function getNextLevel(xp: number) {
  const current = getLevelForXP(xp);
  const nextIndex = LEVEL_THRESHOLDS.findIndex(
    (t) => t.level === current.level
  );
  if (nextIndex < LEVEL_THRESHOLDS.length - 1) {
    return LEVEL_THRESHOLDS[nextIndex + 1];
  }
  return null;
}

export function getLevelProgress(xp: number): number {
  const current = getLevelForXP(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const range = next.xp - current.xp;
  const progress = xp - current.xp;
  return Math.round((progress / range) * 100);
}

export function calculateQuizXP(score: number, total: number): number {
  if (score === total) return XP_REWARDS.QUIZ_PERFECT;
  const ratio = score / total;
  return Math.round(XP_REWARDS.QUIZ_BASE + ratio * 80);
}
