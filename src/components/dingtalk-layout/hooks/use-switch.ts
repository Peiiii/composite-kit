/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";

export interface SwitchRule<T = any, C = any> {
  matchCondition: ((context: C) => boolean) | string | number | boolean;
  getData: (context: C) => T;
}

export function matchRule<T = any, C = any>(
  context: C,
  rules: SwitchRule<T, C>[]
): T | undefined {
  const matchedRule = rules.find(rule => {
    if (typeof rule.matchCondition === 'function') {
      return rule.matchCondition(context);
    }
    return rule.matchCondition === context;
  });

  return matchedRule?.getData(context);
}

export function useSwitch<T = any, C = any>(
  context: C,
  rules: SwitchRule<T, C>[]
): T | undefined {
  return useMemo(() => matchRule(context, rules), [context, rules]);
}
