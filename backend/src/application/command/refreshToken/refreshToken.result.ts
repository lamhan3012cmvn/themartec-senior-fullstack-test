export class RefreshTokenResult {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {}
}
