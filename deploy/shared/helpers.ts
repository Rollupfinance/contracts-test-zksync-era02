import {existsSync, readFileSync, writeFileSync} from 'fs';
import * as path from 'path';
import BigNumber from "bignumber.js";

export function n2Str(value: number) {
  const bn = new BigNumber(value)
  return bn.toString(10)
}

export function price8ToPrice30(value: string) {
  const bn = new BigNumber(value)
  const result = bn.multipliedBy(Math.pow(10, 22));
  return result.toString(10);
}

export function tmpAddressesFilepath(network: string) {
  return path.join(__dirname, '..', '..', `.tmp-addresses-${network}.json`);
}

export function readTmpAddresses(network: string) {
  const pathFile = tmpAddressesFilepath(network);

  if (existsSync(pathFile)) {
    const content = readFileSync(pathFile).toString();
    return JSON.parse(content)
  }
  return {}
}

export function writeTmpAddresses(network: string, json: any) {
  const pathFile = tmpAddressesFilepath(network);

  const tmpAddresses = Object.assign(readTmpAddresses(network), json)
  writeFileSync(pathFile, JSON.stringify(tmpAddresses))
}

export function toUsd(value: number) {
  const bn = new BigNumber(value * Math.pow(10, 30));
  return bn.toString(10);
}
