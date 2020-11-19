"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderAppointmentsService = _interopRequireDefault(require("../../../services/ListProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderAppointmentsController {
  async index(request, response) {
    const provider_id = request.user.id;
    const {
      day,
      month,
      year
    } = request.body;

    const listProviders = _tsyringe.container.resolve(_ListProviderAppointmentsService.default);

    const appointments = await listProviders.execute({
      provider_id,
      day,
      month,
      year
    });
    return response.json(appointments);
  }

}

exports.default = ProviderAppointmentsController;