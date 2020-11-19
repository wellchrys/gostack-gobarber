"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_PROVIDER || 'ethereal',
  defaults: {
    from: {
      email: 'contact@wellchrys.dev',
      name: 'Contato Wellchrys'
    }
  }
};
exports.default = _default;