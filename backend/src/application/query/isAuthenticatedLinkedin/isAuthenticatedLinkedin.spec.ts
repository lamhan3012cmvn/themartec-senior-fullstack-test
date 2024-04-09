import { ReturnModelType } from '@typegoose/typegoose';
import { IsAuthenticatedLinkedinHandler } from './isAuthenticatedLinkedin.handler';
import { IsAuthenticatedLinkedinQuery } from './isAuthenticatedLinkedin.query';
import { TokenLinkedEntity } from 'src/infrastructure/entities';
import { instance, mock, when, anything } from 'ts-mockito';

describe('IsAuthenticatedLinkedinHandler', () => {
  let handler: IsAuthenticatedLinkedinHandler;
  let tokenLinkedEntityMock: ReturnModelType<typeof TokenLinkedEntity>;

  beforeEach(() => {
    tokenLinkedEntityMock = mock<ReturnModelType<typeof TokenLinkedEntity>>();

    handler = new IsAuthenticatedLinkedinHandler();
    handler['tokenLinkedEntity'] = instance(tokenLinkedEntityMock);
  });

  it('should return isAuthenticated true if a token exists for the given user ID', async () => {
    const userId = 'user1';
    const query: IsAuthenticatedLinkedinQuery = { userId };

    // Mock the findOne() method of tokenLinkedEntity to return some dummy data
    when(tokenLinkedEntityMock.findOne(anything())).thenReturn({
      lean: jest.fn().mockResolvedValue({}),
    } as any);

    const result = await handler.execute(query);

    expect(result.isAuthenticated).toBe(true);
  });

  it('should return isAuthenticated false if no token exists for the given user ID', async () => {
    const userId = 'user1';
    const query: IsAuthenticatedLinkedinQuery = { userId };

    // Mock the findOne() method of tokenLinkedEntity to return null
    when(tokenLinkedEntityMock.findOne(anything())).thenReturn({
      lean: jest.fn().mockResolvedValue(null),
    } as any);

    const result = await handler.execute(query);

    expect(result.isAuthenticated).toBe(false);
  });
});
