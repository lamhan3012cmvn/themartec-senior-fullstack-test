import { ReturnModelType } from '@typegoose/typegoose';
import { FindListPostByUserHandler } from './findListPostByUser.handler';
import { FindListPostByUserQuery } from './findListPostByUser.query';
import { PostEntity } from 'src/infrastructure/entities';
import { mock, when, anything, instance } from 'ts-mockito';

describe('FindListPostByUserHandler', () => {
  let handler: FindListPostByUserHandler;
  let postEntityMock: ReturnModelType<typeof PostEntity>;

  beforeEach(() => {
    postEntityMock = mock<ReturnModelType<typeof PostEntity>>();

    handler = new FindListPostByUserHandler();
    handler['postEntity'] = instance(postEntityMock);
  });

  it('should return a list of posts for a given user ID', async () => {
    const userId = 'user1';
    const query: FindListPostByUserQuery = { userId };

    // Mock the find() method of the postEntity to return some dummy data
    const dummyPosts = [{ title: 'Post 1' }, { title: 'Post 2' }];
    when(postEntityMock.find(anything())).thenReturn({
      populate: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue(dummyPosts),
    } as any);

    const result = await handler.execute(query);

    expect(result.list).toEqual(dummyPosts);
  });

  it('should return an empty list if no posts are found for the given user ID', async () => {
    const userId = 'user1';
    const query: FindListPostByUserQuery = { userId };

    // Mock the find() method of the postEntity to return an empty array
    when(postEntityMock.find(anything())).thenReturn({
      populate: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue([]),
    } as any);

    const result = await handler.execute(query);

    expect(result.list).toEqual([]);
  });
});
