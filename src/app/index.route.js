export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/clock/clock.html',
      controller: 'ClockController',
      controllerAs: 'vma'
    })
    .state('alarm', {
      url: '/alarm',
      templateUrl: 'app/alarm/alarm.html',
      controller: 'AlarmController',
      controllerAs: 'vmb'
    })
    .state('sleep', {
      url: '/sleep',
      templateUrl: 'app/sleep/sleep.html',
      controller: 'SleepController',
      controllerAs: 'vmc'
    })
    .state('watch', {
      url: '/watch',
      templateUrl: 'app/watch/watch.html',
      controller: 'WatchController',
      controllerAs: 'vmd'
    })
    .state('timer', {
      url: '/',
      templateUrl: 'app/timer/timer.html',
      controller: 'TimerController',
      controllerAs: 'ctrl'
    });

  $urlRouterProvider.otherwise('/');
}
