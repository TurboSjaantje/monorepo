import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface Token {
    username: string,
}

export const InjectToken = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const response = ctx.switchToHttp().getResponse();
        return response.locals.token;
    },
);