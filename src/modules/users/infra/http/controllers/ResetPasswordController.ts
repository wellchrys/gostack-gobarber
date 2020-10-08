import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ResetPasswordEmailService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordEmailService = container.resolve(
      ResetPasswordEmailService,
    );

    await resetPasswordEmailService.execute({
      token,
      password,
    });

    return response.status(204).send();
  }
}
