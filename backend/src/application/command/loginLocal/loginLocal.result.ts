export class LoginLocalResult {
  constructor(
    readonly token: string,
    readonly refreshToken: string,
  ) {}
}
