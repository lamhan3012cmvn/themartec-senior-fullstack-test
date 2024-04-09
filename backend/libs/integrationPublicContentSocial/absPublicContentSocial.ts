export abstract class ABSPublicContentSocial {
  public abstract getAuthorization(meta: any);
  public abstract getAccessToken<T>(meta: T);
  public abstract publicContent<T>(meta: T);
}
