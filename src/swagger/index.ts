import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as swaggerConstants from './constants/swagger.constants';

export const initSwagger = (app: INestApplication, appPrefix: string) => {
  const options = new DocumentBuilder()
    .setTitle(swaggerConstants.TITLE)
    .setDescription(swaggerConstants.DESCRIPTION)
    .setVersion(swaggerConstants.VERSION)
    .setSchemes(...swaggerConstants.SCHEMES)
    .setBasePath(appPrefix)
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerConstants.ROOT, app, document);
};
