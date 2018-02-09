angular.module('SetMovieNight')
    .directive('celebsCard', function() {
        return {
            replace: true,
            restrict: "E",
            scope: {
                celeb:"=",
                header: "=",
                body: "=",
                image: "@",
                id: "=",
                selectedCelebs: "=",
                noOfMoviesTogether: "=",
                togetherCheckToggle: "=",
                isLoadingCheckTogetherForAll: "="
            },
            templateUrl: "templates/directives/celebs-card.html",
            controller: function($scope,$modal, $log,SelectCelebs){
                /*$scope.$on("selectedCelebsChange",function () {
                    console.log('my event occurred')
                    $scope.selectedCelebsChange = $scope.selectedCelebs.map(function(e) { return e.id; }).indexOf($scope.celeb.id);
                });*/

                $scope.items = [];
                for (var i=0; i<$scope.celeb.known_for.length; i++) {
                    $scope.items.push($scope.celeb.known_for[i]);
                }
                $scope.noOfMovies = null;
                $scope.isCelebAdded=false;

                /*$rootScope.$watch('selectedCelebs', function(newNames, oldNames) {
                    if (newNames) {
                    }
                });*/

                $scope.open = function () {
                    //console.log("inside open");
                    var modalInstance = $modal.open({
                        templateUrl: 'templates/pages/myModalContent.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            items: function () {
                                return $scope.items;
                            }
                        }
                    });
                };

                $scope.addCeleb= function(){
                    //var celebList = SelectCelebs.getCelebList();
                    var pos = $scope.selectedCelebs.map(function(e) { return e.id; }).indexOf($scope.celeb.id);
                    if(!(pos>-1)){
                        //celebList.push($scope.celeb);
                        $scope.selectedCelebs.push($scope.celeb);
                    }
                    //SelectCelebs.setCelebList(celebList);
                    SelectCelebs.setCelebList($scope.selectedCelebs);
                }
            }
        };
    });

