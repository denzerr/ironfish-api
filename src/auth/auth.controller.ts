/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { MagicLinkService } from '../magic-link/magic-link.service';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {
  constructor(
    private readonly magicLinkService: MagicLinkService,
    private readonly usersService: UsersService,
  ) {}

  @ApiExcludeEndpoint()
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    let email;
    let errorBody = {};

    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedException();
    }

    try {
      email = await this.magicLinkService.getEmailFromHeader(authorization);
    } catch {
      throw new UnauthorizedException();
    }

    if (email) {
      const user = await this.usersService.findConfirmedByEmail(email);
      if (user) {
        await this.usersService.updateLastLoginAt(user);
      } else {
        const unconfirmedUsers = await this.usersService.listByEmail(email);
        if (unconfirmedUsers.length > 0) {
          errorBody = { error: 'user_unconfirmed' };
        } else {
          errorBody = { error: 'user_invalid' };
        }

        throw new UnauthorizedException(errorBody);
      }
    }

    res.sendStatus(HttpStatus.OK);
  }
}
