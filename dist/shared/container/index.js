"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

require("./providers");

var _AppoitnmentsRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppoitnmentsRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _NotificationsRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/NotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('AppointmentsRepository', _AppoitnmentsRepository.default);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.default);

_tsyringe.container.registerSingleton('NotificationsRepository', _NotificationsRepository.default);