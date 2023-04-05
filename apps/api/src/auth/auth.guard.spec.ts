import { ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { AdminGuard } from "./admin.guard";
import { TeacherGuard } from "./teacher.guard";
import { JwtPayload, verify, sign } from "jsonwebtoken";

describe('Auth Guard', () => {

    let teacherGuard: TeacherGuard;
    let adminGuard: AdminGuard;

    beforeEach(async () => {
        teacherGuard = new TeacherGuard();
        adminGuard = new AdminGuard();
    });

    describe('Teacher Guard', () => {
        it('should be defined', () => {
            expect(teacherGuard).toBeDefined();
        });

        it('should not allow access for user without required role', async () => {
            const identity = { roles: [""] };
            const token = await sign(identity, "Secret", { expiresIn: 3600 }, (token: string) => { return token; });

            const mockRequest = { headers: { authorization: token } };

            const mockExecutionContext: ExecutionContext = {
                switchToHttp: () => ({
                    getRequest: () => mockRequest
                })
            } as ExecutionContext;

            expect(() => teacherGuard.canActivate(mockExecutionContext)).toThrow(HttpException);
            expect(() => teacherGuard.canActivate(mockExecutionContext)).toThrowError(new HttpException('User is not logged in', HttpStatus.FORBIDDEN));
        });
    });

    describe('Admin Guard', () => {
        it('should be defined', () => {
            expect(adminGuard).toBeDefined();
        });

        it('should not allow access for user without required role', async () => {
            const identity = { roles: [""] };
            const token = await sign(identity, "Secret", { expiresIn: 3600 }, (token: string) => { return token; });

            const mockRequest = { headers: { authorization: token } };

            const mockExecutionContext: ExecutionContext = {
                switchToHttp: () => ({
                    getRequest: () => mockRequest
                })
            } as ExecutionContext;

            expect(() => adminGuard.canActivate(mockExecutionContext)).toThrow(HttpException);
            expect(() => adminGuard.canActivate(mockExecutionContext)).toThrowError(new HttpException('User is not logged in', HttpStatus.FORBIDDEN));
        });

    });

});