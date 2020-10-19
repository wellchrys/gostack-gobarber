import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';

import HanldebarsMailTemplateProvider from './implementations/HanldebarsMailTemplateProvider';

const providers = {
  handlebars: HanldebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
