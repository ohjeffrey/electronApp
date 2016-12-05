export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('clock', {
      url: '/',
      templateUrl: 'app/clock/clock.html',
      controller: 'ClockController',
      controllerAs: 'ctrl'
    })
    .state('alarm', {
      url: '/alarm',
      templateUrl: 'app/alarm/alarm.html',
      controller: 'AlarmController',
      controllerAs: 'ctrl'
    })
    .state('sleep', {
      url: '/sleep',
      templateUrl: 'app/sleep/sleep.html',
      controller: 'SleepController',
      controllerAs: 'ctrl'
    })
    .state('watch', {
      url: '/watch',
      templateUrl: 'app/watch/watch.html',
      controller: 'WatchController',
      controllerAs: 'ctrl'
    })
    .state('timer', {
      url: '/timer',
      templateUrl: 'app/timer/timer.html',
      controller: 'TimerController',
      controllerAs: 'ctrl'
    });

  $urlRouterProvider.otherwise('/');
}
