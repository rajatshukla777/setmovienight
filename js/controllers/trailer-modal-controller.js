angular.module('SetMovieNight').controller('TrailerModalController',[ '$scope', '$modalInstance', 'items',function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.ok = function () {
        $modalInstance.close();
    };
}]);