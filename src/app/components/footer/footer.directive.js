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
  constructor($state) {
    'ngInject';

    this.$state = $state;
    this.items = [
      {name: 'World clock', icon: 'clock', state: 'home'},
      {name: 'Alarm', icon: 'alarm', state: 'alarm'},
      {name: 'Bed time', icon: 'hotel', state: 'sleep'},
      {name: 'Stop watch', icon: 'watch', state: 'watch'},
      {name: 'Timer', icon: 'hourglass_full', state: 'timer'}
    ];
  }

  navigate(state) {
    this.$state.go(state);
  }
}
