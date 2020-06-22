type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

/**
 * Perform a function call with randomized first argument, useful for load balancing node calls. This will retry up to
 * `retries` times if an error occurs.
 *
 * @template F
 * @param run
 * @param values
 * @param retries
 * @return {Promise<Await<ReturnType<F>>>}
 */
export const loadBalance = <F extends (first: First, ...args: any[]) => Promise<any>, First>(
  run: F,
  values: First[],
  retries = 3
): ((...args: Parameters<OmitFirstArg<F>>) => Promise<Await<ReturnType<F>>>) => {
  const call = (retry: number, ...args: Parameters<OmitFirstArg<F>>): Promise<Await<ReturnType<F>>> => {
    if (retry >= retries) {
      throw new Error(`Function call failed after ${retries} retries.`);
    }

    const randomValue = values[(values.length * Math.random()) | 0];

    return run(randomValue, ...args).catch(() => call(retry + 1, ...args));
  };

  return (...args) => {
    return call(0, ...args);
  };
};
