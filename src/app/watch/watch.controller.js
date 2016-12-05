export class WatchController {
  constructor($log, $interval) {
    'ngInject';

    this.$log = $log;
    this.$interval = $interval;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.microSecond = 0;
    this.isCountingDown = false;
    this.laps = [];
  }

  startTimer() {
    this.isCountingDown = true;
    this.countDownInterval = this.$interval(() => {
      if (this.isCountingDown) {
        this.microSecond++;
        if (this.microSecond === 99) {
          this.microSecond = 0;
          this.second++;
        }
        if (this.second === 60) {
          this.second = 0;
          this.minute++;
        }
        if (this.minute === 60) {
          this.minute = 0;
          this.hour++;
        }
      }
    }, 10);
  }

  stopTimer() {
    this.isCountingDown = false;
    this.countDownInterval ? this.$interval.cancel(this.countDownInterval) : angular.noop();
  }

  resetTimer() {
    this.laps = [];
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.microSecond = 0;
    this.isCountingDown = false;
    this.countDownInterval ? this.$interval.cancel(this.countDownInterval) : angular.noop();
  }

  saveLap() {
    this.laps.unshift({
      name: `Lap ${this.laps.length + 1}`,
      time: `${this.minute}:${this.second}:${this.microSecond}`
    });
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.microSecond = 0;
  }
}