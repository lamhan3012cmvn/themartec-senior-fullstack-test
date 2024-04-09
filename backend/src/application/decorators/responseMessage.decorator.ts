import { applyDecorators, HttpStatus, SetMetadata } from '@nestjs/common';

export const ResponseMessage = (meta: {
  [key in HttpStatus]?: string;
}) => {
  return applyDecorators(SetMetadata('messageResponse', meta));
};
