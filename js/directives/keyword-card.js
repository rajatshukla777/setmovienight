angular.module('SetMovieNight')
    .directive('keywordCard', function() {
        return {
            replace: true,
            restrict: "E",
            scope: {
                header: "=",
                image: "@",
                id: "=",
                celebId: "=",
                celebProfilePath: "@",
                celebName: "=",
                detailsToggle: "=",
                togetherFlag: "=",
                trailer:"=",
                voteAverage:"=",
                budget:"=",
                revenue:"=",
                body:"=",
                releaseDate:"="
            },
            templateUrl: "templates/directives/keyword-card.html",
            controller:function($scope,$sce,$modal){
                $scope.elementGlow=false;
                $scope.data = {
                    cb1: true,
                    cb2: false
                };

                //circular loading
                $scope.mode = 'query';
                $scope.determinateValue = 10;
                $scope.isLoading=true;

                $scope.calGross=function(){
                    if ($scope.budget>0&&$scope.revenue>0) {
                        //graph for gross income
                        var diff = $scope.revenue - $scope.budget;
                        $scope.loss = false;
                        if (diff < 0) {
                            diff = -(diff);
                            $scope.loss = true;
                        }
                        $scope.gross = (diff / $scope.budget) * 100;
                        var result = format1(diff, "$");
                        if ($scope.loss) {
                            $scope.rp2 = radialProgress(document.getElementById($scope.id))
                                .label("Loss: "+result)
                                .diameter(150)
                                .value($scope.gross)
                                .loss($scope.loss)
                                .render();
                        } else {
                            $scope.rp2 = radialProgress(document.getElementById($scope.id))
                                .label("Profit: "+result)
                                .diameter(150)
                                .value($scope.gross)
                                .loss($scope.loss)
                                .render();
                        }
                    }
                }

                //trailer modal
                $scope.items=[];
                $scope.openTrailer = function () {
                    $scope.videoUrl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.trailer + "?autoplay=0");
                    if (!$scope.items.length) {
                        $scope.items.push($scope.videoUrl);
                    }
                    //console.log("inside open");
                    var modalInstance = $modal.open({
                        templateUrl: 'templates/pages/trailer-modal.html',
                        controller: 'TrailerModalController',
                        resolve: {
                            items: function () {
                                return $scope.items;
                            }
                        }
                    });
                };

                function format1(n, currency) {
                    return currency + " " + n.toFixed(2).replace(/./g, function(c, i, a) {
                            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
                        });
                }
            }
        };
    });

