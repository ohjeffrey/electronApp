export class AlarmController {
  constructor($log) {
    'ngInject';

    this.$log = $log;
    this.name = "Alarm clock";
  }

  add() {
    this.$log.debug('add alarm');
  }

  edit() {
    this.$log.debug('edit alarm');

  }
}