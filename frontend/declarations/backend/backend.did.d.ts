import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : TaxPayer } |
  { 'err' : string };
export type Result_2 = { 'ok' : bigint } |
  { 'err' : string };
export interface TaxPayer {
  'tid' : bigint,
  'address' : [] | [string],
  'lastName' : string,
  'firstName' : string,
}
export interface _SERVICE {
  'createTaxPayer' : ActorMethod<[string, string, [] | [string]], Result_2>,
  'deleteTaxPayer' : ActorMethod<[bigint], Result>,
  'getAllTaxPayers' : ActorMethod<[], Array<TaxPayer>>,
  'getTaxPayerByTID' : ActorMethod<[bigint], Result_1>,
  'updateTaxPayer' : ActorMethod<
    [bigint, string, string, [] | [string]],
    Result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
