import { CheckAuthLinkedinHandler } from './checkAuthLinkedin.handler';
import { CheckAuthLinkedinQuery } from './checkAuthLinkedin.query';
import { ReturnModelType } from '@typegoose/typegoose';
import { LinkedInPublicContent } from 'libs/integrationPublicContentSocial';
import { TokenLinkedEntity } from 'src/infrastructure/entities';
import { mock, instance, when, anything } from 'ts-mockito';

describe('CheckAuthLinkedinHandler', () => {
  let handler: CheckAuthLinkedinHandler;
  let tokenLinkedEntityMock: ReturnModelType<typeof TokenLinkedEntity>;
  let linkedInPublicContentMock: LinkedInPublicContent;

  beforeEach(() => {
    tokenLinkedEntityMock = mock<ReturnModelType<typeof TokenLinkedEntity>>();
    linkedInPublicContentMock = mock<LinkedInPublicContent>();

    handler = new CheckAuthLinkedinHandler(instance(linkedInPublicContentMock));
    handler['tokenLinkedEntity'] = instance(tokenLinkedEntityMock);
  });

  it('should return isAuthenticated true and no url if user is authenticated', async () => {
    const query: CheckAuthLinkedinQuery = { userId: 'user1' };

    // Mock findOne() to return a mock object with lean() function
    when(tokenLinkedEntityMock.findOne(anything())).thenReturn({
      lean: jest.fn().mockResolvedValue({}),
    } as any);

    const result = await handler.execute(query);

    expect(result.isAuthenticated).toBe(true);
    expect(result.url).toBeNull();
  });

  it('should return isAuthenticated false and a url if user is not authenticated', async () => {
    const query: CheckAuthLinkedinQuery = { userId: 'user1' };

    // Mock findOne() to return null
    when(tokenLinkedEntityMock.findOne(anything())).thenReturn({
      lean: jest.fn().mockResolvedValue(null),
    } as any);

    // Mock getAuthorization() to return an object with url property
    when(linkedInPublicContentMock.getAuthorization(anything())).thenReturn({
      url: 'http://example.com/auth',
    });

    const result = await handler.execute(query);

    expect(result.isAuthenticated).toBe(false);
    expect(result.url).toBe('http://example.com/auth');
  });
});
