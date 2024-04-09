import { HttpService } from '@nestjs/axios';
import { EnvironmentConfigService } from 'libs/environment';
import { ABSPublicContentSocial } from '../absPublicContentSocial';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LinkedInPublicContent extends ABSPublicContentSocial {
  private readonly baseURLAPI: string;
  private readonly baseURLOAuth: string;

  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectURI: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {
    super();
    const linkedENV = this.environmentConfigService.linkedInENV;

    this.clientId = linkedENV.clientId;
    this.clientSecret = linkedENV.clientSecret;
    this.redirectURI = linkedENV.redirectURI;
    this.baseURLAPI = linkedENV.baseURLAPI;
    this.baseURLOAuth = linkedENV.baseOAUTH;
  }

  private get urlAuthorization() {
    return `${this.baseURLOAuth}/authorization`;
  }

  private get urlAccessToken() {
    return `${this.baseURLOAuth}/accessToken`;
  }

  public getAuthorization(meta: any) {
    const state = Buffer.from(
      Math.round(Math.random() * Date.now()).toString(),
    ).toString('hex');

    const scope = encodeURIComponent(
      'openid profile w_member_social r_ads_reporting',
    );

    // const queryParamsCallback = {
    //   userId: meta.userId,
    // };
    const linkedURL = `${this.urlAuthorization}?response_type=code&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(`${this.redirectURI}`)}&state=${state}&scope=${scope}&userId=${meta.userId}`;

    return {
      url: linkedURL,
    };
  }

  public async getInformationByToken<T>(meta: T) {
    const { token } = meta as any;
    const signalInfo = await lastValueFrom(
      this.httpService.get(`${this.baseURLAPI}/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );

    return signalInfo.data;
  }

  public async getAccessToken(meta: any) {
    try {
      const { code } = meta as any;
      const payload = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.redirectURI,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      };

      const form = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        form.append(key, value);
      });

      const value = await lastValueFrom(
        await this.httpService.post(this.urlAccessToken, payload, {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }),
      );

      return value.data;
    } catch (error) {
      return {};
    }
  }

  public async publicContent<T>(meta: T) {
    const { idAuthor, content, gallery, accessToken } = meta as any;
    const payload = {
      author: `urn:li:person:${idAuthor}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: 'ARTICLE',
          media:
            gallery?.map((media) => {
              return {
                status: 'READY',
                description: {
                  text: media.name,
                },
                originalUrl: `${this.environmentConfigService.staticBaseURL()}/${media.src}`,
                title: {
                  text: media.name,
                },
              };
            }) ?? [],
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    const signalCreateLinkedIn = await lastValueFrom(
      this.httpService.post(`${this.baseURLAPI}/ugcPosts`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    return signalCreateLinkedIn.data;
  }
}
