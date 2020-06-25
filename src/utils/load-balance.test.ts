import { loadBalance } from './load-balance';

describe('loadBalance', () => {
  it('loops through the first argument for a function call', async () => {
    const fn = jest.fn().mockImplementation(async () => 'bar');
    const call = loadBalance(fn, [1, 2, 3]);

    await expect(call('foo')).resolves.toBe('bar');
    await expect(call('baz')).resolves.toBe('bar');

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith(1, 'foo');
    expect(fn).toHaveBeenCalledWith(2, 'baz');
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
