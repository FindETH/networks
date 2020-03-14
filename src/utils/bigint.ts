import { BigNumber } from '@ethersproject/bignumber';

/**
 * Get a native bigint from an Ethers.js BigNumber.
 *
 * @param {BigNumber} bigNumber
 * @return {bigint}
 */
export const toNativeBigInt = (bigNumber: BigNumber): bigint => {
  return BigInt(bigNumber.toString());
};

export const objectToNativeBigInt = <T extends Record<K, V>, K extends string, V extends BigNumber>(
  object: T
): Record<K, bigint> => {
  return (Object.fromEntries<bigint>(
    Object.entries<V>(object).map(([key, value]) => [key, toNativeBigInt(value)])
  ) as unknown) as Record<K, bigint>;
};
