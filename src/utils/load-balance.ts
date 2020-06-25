/* eslint-disable @typescript-eslint/no-explicit-any */

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

/**
 * Loop through an array sequentially. This will create a generator that never completes.
 *
 * @template T
 * @param {T[]} array
 * @return {Generator<T, T>}
 */
export function* roundRobin<T>(array: T[]): Generator<T, T> {
  for (const item of array) {
    yield item;
  }
  return yield* roundRobin(array);
}

/**
 * Perform a function call with sequenced first argument, useful for load balancing node calls. This will retry up to
 * `retries` times if an error occurs.
 *
 * @template F
 * @param fn
 * @param values
 * @param retries
 * @return {Promise<Await<ReturnType<F>>>}
 */
export const loadBalance = <F extends (first: First, ...args: any[]) => Promise<any>, First>(
  fn: F,
  values: First[],
  retries = 3
): ((...args: Parameters<OmitFirstArg<F>>) => Promise<Await<ReturnType<F>>>) => {
  const iterator = roundRobin(values);

  const call = (retry: number, ...args: Parameters<OmitFirstArg<F>>): Promise<Await<ReturnType<F>>> => {
    if (retry >= retries) {
      throw new Error(`Function call failed after ${retries} retries.`);
    }

    const { value } = iterator.next();
    return fn(value, ...args).catch(() => call(retry + 1, ...args));
  };

  return (...args) => {
    return call(0, ...args);
  };
};
