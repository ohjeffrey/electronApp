// import {remote, ipcRenderer} from 'electron';

export class ClockController {
  constructor($log) {
    'ngInject';

    this.$log = $log;
    this.name = 'World Clock';
    this.isEditing = false;
    this.messages = [{
      city: 'New York',
      difference: '+3hrs',
      time: '1:51am'
    },
      {
        city: 'Accra, Ghana',
        difference: '+3hrs',
        time: '1:51am'
      },
      {
        city: 'Dallas, Texas',
        difference: '+3hrs',
        time: '1:51am'
      }];
  }

  edit() {
    this.isEditing = !this.isEditing;
  }

  add() {
    this.$log.debug('add new clock');
  }

  getAction() {
    return this.isEditing ? 'Done' : 'Edit';
  }

  deleteClock(item) {
    let index = this.messages.findIndex(message => message === item);
    this.messages.splice(index, 1);
  }
}

