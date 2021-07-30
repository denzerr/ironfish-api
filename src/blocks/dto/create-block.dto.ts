/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { BlockOperation } from '../enums/block-operation';

export class CreateBlockDto {
  @IsString()
  readonly hash!: string;

  @IsInt()
  @Type(() => Number)
  readonly sequence!: number;

  @IsInt()
  @Type(() => Number)
  readonly difficulty!: number;

  @IsEnum(BlockOperation)
  readonly type!: BlockOperation;

  @IsDate()
  @Type(() => Date)
  readonly timestamp!: Date;

  @IsInt()
  @Type(() => Number)
  readonly transactions_count!: number;

  @IsString()
  readonly graffiti!: string;

  @IsOptional()
  @IsString()
  readonly previous_block_hash?: string;
}
