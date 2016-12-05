export class AlarmController {
  constructor($log) {
    'ngInject';

    this.$log = $log;
    this.name = "Alarm clock";
    this.alarms = [
      {
        name: 'wake up',
        time: '7 : 30 am',
        repetition: 'Weekly',
        enabled: false
      },
      {
        name: 'Morning meds',
        time: '9 : 30 am',
        repetition: 'Daily',
        enabled: true
      },
      {
        name: 'Comedy show',
        time: '8 : 30 pm',
        repetition: 'Mon, Wed, Fri',
        enabled: false
      }
    ];
  }

  add() {
    this.$log.debug('add alarm');
  }

  edit() {
    this.$log.debug('edit alarm');

  }
}