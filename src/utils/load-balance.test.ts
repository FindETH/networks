import { mockRandomForEach } from 'jest-mock-random';
import { loadBalance } from './load-balance';

describe('loadBalance', () => {
  mockRandomForEach([0.1, 0.5, 0.9]);

  it('randomizes the first argument for a function call', async () => {
    const fn = jest.fn().mockImplementation(async () => 'bar');
    await expect(loadBalance(fn, [1, 2, 3])('foo')).resolves.toBe('bar');
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1, 'foo');
  });

  it('retries if the function call fails', async () => {
    const fn = jest.fn().mockImplementation(async () => {
      throw new Error();
    });
    await expect(loadBalance(fn, [1, 2, 3])()).rejects.toThrow();
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenNthCalledWith(1, 1);
    expect(fn).toHaveBeenNthCalledWith(2, 2);
    expect(fn).toHaveBeenNthCalledWith(3, 3);
  });
});
