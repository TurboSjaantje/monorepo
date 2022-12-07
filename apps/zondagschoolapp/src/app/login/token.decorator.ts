import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface Token {
    emailaddress: string,
    token: string,
    roles: string[]
}

export const InjectToken = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const response = ctx.switchToHttp().getResponse();
        return response.locals.token;
    },
);