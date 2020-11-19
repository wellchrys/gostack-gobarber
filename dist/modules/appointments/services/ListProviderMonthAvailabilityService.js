"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _IAppointmentsRepositories = _interopRequireDefault(require("../repositories/IAppointmentsRepositories"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProvidersMonthAvailabilityService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepositories.default === "undefined" ? Object : _IAppointmentsRepositories.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProvidersMonthAvailabilityService {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({
    provider_id,
    month,
    year
  }) {
    const appintments = await this.appointmentsRepository.findAllInMOnthFromProviders({
      provider_id,
      year,
      month
    });
    const numberOfDaysInMonth = (0, _dateFns.getDaysInMonth)(new Date(year, month - 1));
    const eachDayArray = Array.from({
      length: numberOfDaysInMonth
    }, (_, index) => index + 1);
    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appintments.filter(appointment => {
        return (0, _dateFns.getDate)(appointment.date) === day;
      });
      return {
        day,
        available: appointmentsInDay.length < 10
      };
    });
    return availability;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListProvidersMonthAvailabilityService;
exports.default = _default;