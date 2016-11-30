import {remote, ipcRenderer} from 'electron';
import * as os from 'os';

export class MainController {
  constructor($timeout, $log, webDevTec, toastr) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1479701674992;
    this.toastr = toastr;
    this.$log = $log;
    this.platform = os.platform();
    this.version = remote.app.getVersion();
    this.activate($timeout, webDevTec);
  }

  createWindow() {
    ipcRenderer.send('dialog');
  }

  activate($timeout, webDevTec) {
    this.getWebDevTec(webDevTec);
    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
  }

  getWebDevTec(webDevTec) {
    this.awesomeThings = webDevTec.getTec();

    angular.forEach(this.awesomeThings, (awesomeThing) => {
      awesomeThing.rank = Math.random();
    });
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
