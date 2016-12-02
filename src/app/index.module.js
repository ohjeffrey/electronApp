/* global moment:false */

import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock} from './index.run';
import {AlarmController} from './alarm/alarm.controller';
import {ClockController} from './clock/clock.controller';
import {SleepController} from './sleep/sleep.controller';
import {TimerController} from './timer/timer.controller';
import {WatchController} from './watch/watch.controller';
import {footerBarDirective} from '../app/components/footer/footer.directive';
import {GithubContributorService} from '../app/components/githubContributor/githubContributor.service';

angular.module('app', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ngMaterial', 'ngMdIcons', 'toastr'])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .controller('AlarmController', AlarmController)
  .controller('ClockController', ClockController)
  .controller('SleepController', SleepController)
  .controller('TimerController', TimerController)
  .controller('WatchController', WatchController)
  .directive('footerBar', footerBarDirective);
