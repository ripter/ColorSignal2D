import { FLAG } from '../consts/flag.mjs';

const EOS = '*#FF851B04'; // East Orange Signal
const NSET = `*#FFFFFF${(FLAG.NORTH | FLAG.SET).toString(16)}`; // North Set Signal

export default [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [EOS, null, EOS, null, 'ʃ', null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, NSET, null, null],
  [null, null, null, null, null, null, null],
];
