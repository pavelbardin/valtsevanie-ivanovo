export const METRIKA_ID = 106677645;

export const reachGoal = (goal, params) => {
  if (typeof window === "undefined") return;
  if (typeof window.ym !== "function") return;

  try {
    window.ym(METRIKA_ID, "reachGoal", goal, params);
  } catch {
    // Ignore goal tracking errors to avoid breaking UX.
  }
};
