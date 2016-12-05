export function footerBarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/footer/footer.html',
    controller: FooterController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class FooterController {
  constructor($state, $location) {
    'ngInject';

    this.$state = $state;
    this.$location = $location;
    this.activeStyle = {
        color : 'yellow'
    };
    this.items = [
      {name: 'Worldclock', icon: 'place', state: 'clock'},
      {name: 'Alarm', icon: 'alarm', state: 'alarm'},
      {name: 'Bedtime', icon: 'hotel', state: 'sleep'},
      {name: 'Stopwatch', icon: 'watch', state: 'watch'},
      {name: 'Timer', icon: 'hourglass_full', state: 'timer'}
    ];
  }

  navigate(state) {
    this.$state.go(state);
  }

  isActive(state) {
    let path = this.$location.url().split('/')[1] || 'clock';
    return state === path;
  }
}
