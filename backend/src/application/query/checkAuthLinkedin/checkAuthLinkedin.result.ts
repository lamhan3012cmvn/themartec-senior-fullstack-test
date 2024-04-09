export class CheckAuthLinkedinResult {
  constructor(
    readonly isAuthenticated: boolean,
    readonly url: string | null,
  ) {}
}
