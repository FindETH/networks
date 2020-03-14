import { BigNumber } from '@ethersproject/bignumber';
import { objectToNativeBigInt, toNativeBigInt } from './bigint';

describe('toNativeBigInt', () => {
  it('returns a native bigint from a BigNumber', () => {
    expect(toNativeBigInt(BigNumber.from(10))).toBe(10n);
    expect(toNativeBigInt(BigNumber.from(0))).toBe(0n);
    expect(toNativeBigInt(BigNumber.from(-10))).toBe(-10n);
    expect(toNativeBigInt(BigNumber.from('1234567891011121314151617181920'))).toBe(1234567891011121314151617181920n);
  });
});

describe('objectToNativeBigInt', () => {
  it('maps an object with BigNumbers to an object with bigints', () => {
    const object = {
      foo: BigNumber.from(10),
      bar: BigNumber.from(0),
      baz: BigNumber.from(-10)
    };

    expect(objectToNativeBigInt(object)).toMatchSnapshot();
  });
});
