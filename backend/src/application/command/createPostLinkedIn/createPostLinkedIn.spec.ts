import { CreatePostLinkedInHandler } from './createPostLinkedIn.handler';
import {
  CreatePostLinkedInCommand,
  CreatePostLinkedInCommandPayload,
} from './createPostLinkedIn.command';
import { TokenLinkedEntity, PostEntity } from 'src/infrastructure/entities';
import { instance, mock, when, anything, verify } from 'ts-mockito';
import { ReturnModelType } from '@typegoose/typegoose';
import { LinkedInPublicContent } from 'libs/integrationPublicContentSocial';

describe('CreatePostLinkedInHandler', () => {
  let handler: CreatePostLinkedInHandler;
  let tokenLinkedEntityMock: ReturnModelType<typeof TokenLinkedEntity>;
  let postEntityMock: ReturnModelType<typeof PostEntity>;
  let linkedInPublicContentMock: LinkedInPublicContent;

  beforeEach(() => {
    tokenLinkedEntityMock = mock<ReturnModelType<typeof TokenLinkedEntity>>();
    postEntityMock = mock<ReturnModelType<typeof PostEntity>>();
    linkedInPublicContentMock = mock<LinkedInPublicContent>();

    handler = new CreatePostLinkedInHandler(
      instance(linkedInPublicContentMock),
    );
    handler['tokenLinkedEntity'] = instance(tokenLinkedEntityMock);
    handler['postEntity'] = instance(postEntityMock);
  });

  it('should create a post on LinkedIn and update the database accordingly', async () => {
    // Mock data
    const commandPayload: CreatePostLinkedInCommandPayload = {
      metaPost: {
        title: 'Title',
        content: 'Content',
        gallery: '',
      },
      gallery: [],
      author: 'user1',
    };
    const command: CreatePostLinkedInCommand = { payload: commandPayload };

    // Mock getTokenLinkedIn() to return a token
    when(tokenLinkedEntityMock.findOne(anything())).thenReturn({
      lean: jest.fn().mockResolvedValue({
        accessToken: 'accessToken',
        linkedInId: 'linkedInId',
      }),
    } as any);

    // Mock publicContent() to return a signal
    when(linkedInPublicContentMock.publicContent(anything())).thenResolve({
      id: 'urn',
    });

    // Mock postEntity.create() to return a signalCreate
    const signalCreate: any = { _id: 'postId' };
    when(postEntityMock.create(anything())).thenResolve(signalCreate);

    // Execute the command
    const result = await handler.execute(command);

    // Verify the result
    expect(result).toEqual({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });

    verify(postEntityMock.create(anything())).called(); // Ensure create method called
    verify(postEntityMock.updateOne(anything(), anything())).called();
  });

  it('should throw an error if token is not found', async () => {
    // Mock data
    const commandPayload: CreatePostLinkedInCommandPayload = {
      metaPost: {
        title: 'Title',
        content: 'Content',
        gallery: '',
      },
      gallery: [],
      author: 'user1',
    };
    const command: CreatePostLinkedInCommand = { payload: commandPayload };

    // Mock getTokenLinkedIn() to return null
    when(tokenLinkedEntityMock.findOne(anything())).thenReturn({
      lean: jest.fn().mockResolvedValue(null),
    } as any);

    // Execute the command and expect it to throw an error
    await expect(handler.execute(command)).rejects.toThrow('Token not found');

    // Ensure no interaction with postEntity methods
    verify(postEntityMock.create(anything())).called(); // Ensure create method called
    verify(postEntityMock.updateOne(anything(), anything())).never(); // Ensure updateOne method never called
  });
});
