"use strict";

var _tsyringe = require("tsyringe");

var _HanldebarsMailTemplateProvider = _interopRequireDefault(require("./implementations/HanldebarsMailTemplateProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  handlebars: _HanldebarsMailTemplateProvider.default
};

_tsyringe.container.registerSingleton('MailTemplateProvider', providers.handlebars);