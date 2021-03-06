angular.module('SetMovieNight')
    .controller('moviesDetailsController',[ '$scope', '$routeParams', 'SelectCelebs', '$sce', '$timeout', '$animate' ,function($scope, $routeParams, SelectCelebs, $sce, $timeout, $animate){
        //console.log("inside movie-details-controller");
        $scope.movie = null;
        var results=null,locationDetailsStr="";
        $scope.locationDetails=[];
        $scope.movieLocationsMap=null;
        $scope.movieLocationMapDetailed=null;
        $scope.videoUrl=null;

        //circular progress
        $scope.isLoading=true;

        //carousel
        $scope.interval = 3000;
        $timeout(function() {
            return $animate.enabled(false, angular.element(".carousel"));
        });

        //show profit or loss of movies
        SelectCelebs.getMovieDetails($routeParams.id).then(function(response){
            $scope.movie= response.data;

            //setting trailer
            if ($scope.movie.videos.results.length>0) {
                $scope.videoUrl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.movie.videos.results[0].key + "?autoplay=0");
            }

            if ($scope.movie.budget>0&&$scope.movie.revenue>0) {
                //graph for gross income
                $scope.div2 = d3.select(document.getElementById('gross'));
                var budget = $scope.movie.budget;
                var revenue = $scope.movie.revenue;
                var diff = revenue - budget;
                $scope.loss = false;
                if (diff < 0) {
                    diff = -(diff);
                    $scope.loss = true;
                }
                var gross = (diff / budget) * 100;
                var result = format1(diff, "$");
                if ($scope.loss) {
                    $scope.rp2 = radialProgress(document.getElementById('gross'))
                        .label("Loss: "+result)
                        .diameter(150)
                        .value(gross)
                        .loss($scope.loss)
                        .render();
                } else {
                    $scope.rp2 = radialProgress(document.getElementById('gross'))
                        .label("Profit: "+result)
                        .diameter(150)
                        .value(gross)
                        .loss($scope.loss)
                        .render();
                }
            }

            //rating
            if ($scope.movie.vote_average>0) {
                //graph for gross income
                $scope.div3 = d3.select(document.getElementById('rating'));
                var rating = $scope.movie.vote_average;
                var rating = rating * 10;
                if (rating>50) {
                    $scope.good=true;
                    $scope.rp2 = radialProgress(document.getElementById('rating'))
                        .diameter(150)
                        .value(rating)
                        .loss(false)
                        .render();
                } else {
                    $scope.good=false;
                    $scope.rp2 = radialProgress(document.getElementById('rating'))
                        .diameter(150)
                        .value(rating)
                        .loss(true)
                        .render();
                }
            }

            $scope.isLoading=false;
        });

        function format1(n, currency) {
            return currency + " " + n.toFixed(2).replace(/./g, function(c, i, a) {
                    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
                });
        }

    }]);
