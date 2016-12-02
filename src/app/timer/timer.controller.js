export class TimerController {
  constructor($mdDialog, $interval) {
    'ngInject';

    let hours = [];
    let minutes = [];
    for (let i = 0; i < 60; i++) {
      minutes.push(i);
    }
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    this.$mdDialog = $mdDialog;
    this.$interval = $interval;
    this.hours = hours;
    this.minutes = minutes;
    this.currentHour = 0;
    this.currentMinute = 0;
    this.currentSecond = 0;
    this.isTimerPaused = false;
    this.isCountingDown = false;
    this.countDownInterval = null;
    this.tones = [
      {name: 'beep-03.wav'},
      {name: 'beep-02.wav'},
      {name: 'beep-01.wav'}
    ];
    this.tone = this.tones[0].name;
  }

  startTimer() {
    let delay = (((this.currentHour * 60) + this.currentMinute) * 60) - 1;
    if (delay <= 0) {
      return;
    }
    this.isCountingDown = true;
    this.countDownInterval = this.$interval(() => {
      if (!this.isTimerPaused) {
        this.currentHour =  Math.floor(delay / 3600);
        this.currentMinute = Math.floor(delay / 60) % 60;
        this.currentSecond = delay % 60;

        if (delay === 0) {
          let activeTone = new Audio(`assets/sounds/${this.tone}`);
          activeTone.loop = true;
          activeTone.play();
          this.cancelTimer();

          this.$mdDialog
            .show(this.$mdDialog
              .alert()
              .parent(angular.element(document.querySelector('.timerPage')))
              .clickOutsideToClose(true)
              .textContent('Timer Done')
              .ariaLabel('Timer Done')
              .ok('Stop'))
            .then(() => {
              activeTone.pause();
            });
        }
        delay -= 1;
      }
    }, 1000);
  }

  pauseTimer() {
    this.isTimerPaused = true;
  }

  resumeTimer() {
    this.isTimerPaused = false;
  }

  cancelTimer() {
    this.currentHour = 0;
    this.currentMinute = 0;
    this.currentSecond = 0;
    this.isCountingDown = false;
    this.countDownInterval ? this.$interval.cancel(this.countDownInterval) : angular.noop();
  }
}