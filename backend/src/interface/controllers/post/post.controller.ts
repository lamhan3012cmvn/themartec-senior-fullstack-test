import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { LoggerService } from 'libs/logger';
import { diskStorage } from 'multer';
import { parse } from 'path';
import { CreatePostLinkedInCommand } from 'src/application/command';
import {
  CreateStaticImageCommand,
  CreateStaticImageResult,
} from 'src/application/command/createStaticImage';
import { ResponseMessage } from 'src/application/decorators';
import { FindListPostByUserQuery } from 'src/application/query/findListPostByUser';
import { JwtAuthGuard } from 'src/infrastructure/strategies';
import { CreatePostLinkedInRequestDto } from 'src/interface/dto';

@Controller('post')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly logger: LoggerService,
  ) {}

  @Post('linked')
  @ResponseMessage({
    [HttpStatus.CREATED]: 'Create post linkedin success',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          const path = `./public/uploads/${randomName}`;

          const parseFile = parse(file.originalname);
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
          }
          cb(null, `${randomName}/${parseFile.name}${parseFile.ext}`);
        },
      }),
    }),
  )
  async createPostLinked(
    @Request() req: any,
    @Body() payload: CreatePostLinkedInRequestDto,
    @UploadedFiles() files: Array<any>,
  ) {
    this.logger.info('Create post linkedin');
    const commandCreateImage = new CreateStaticImageCommand({
      files: files,
    });

    this.logger.log(JSON.stringify(commandCreateImage));

    const signalCreateImage = await this.commandBus.execute<
      CreateStaticImageCommand,
      CreateStaticImageResult
    >(commandCreateImage);

    const command = new CreatePostLinkedInCommand({
      metaPost: payload,
      gallery: signalCreateImage.images,
      author: req.user.userId,
    });
    return this.commandBus.execute(command);
  }

  @Get('linked/list')
  @ResponseMessage({
    [HttpStatus.OK]: 'Get create link request linkedin success',
  })
  @UseGuards(JwtAuthGuard)
  async getListPost(@Request() req: any) {
    const query = new FindListPostByUserQuery(req.user.userId);
    return this.queryBus.execute(query);
  }
}
