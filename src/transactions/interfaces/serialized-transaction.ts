/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { JsonValue } from 'type-fest';

export interface SerializedTransaction {
  id: number;
  hash: string;
  fee: string;
  size: number;
  timestamp: string;
  block_id: number;
  notes: JsonValue;
  spends: JsonValue;
  object: 'transaction';
}