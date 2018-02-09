angular
    .module('SetMovieNight')
    .controller('CelebTogetherMovieDetailsController',['$q', '$scope','SelectCelebs','$routeParams', function($q, $scope, SelectCelebs, $routeParams) {
        var tempArr = $routeParams.id.split(",");
        $scope.celebsTogetherIds=$routeParams.id;
        $scope.selectedCelebs = tempArr;
        $scope.selectedCelebsDetails=[];
        $scope.celebTogetherMovies = [];
        $scope.celebTogetherMoviesEmpty=false;
        $scope.togetherFlag=false;
        $scope.data = {
            cb1: false,
            cb2: false
        };
        $scope.isLoading=true;

        //rating
        $scope.voteAverage = 7;
        $scope.max = 10;
        $scope.isReadonly = false;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };
        $scope.rateFilter = function( voteAverage ) {
            if($scope.data.cb2){
                return function( movie ) {
                    return (movie.vote_average >= voteAverage && movie.vote_average < voteAverage+1 );
                };
            }
        };

        /**
         * Celebs Movies together
         */
        (function(){
            var promiseObjectsForCelebs=[],promiseObjectsForMoviesTogether=[],promiseObjectsForMovies=[];
            for(var i=0; i< $scope.selectedCelebs.length ; i++){
                promiseObjectsForCelebs.push(SelectCelebs.getCelebById($scope.selectedCelebs[i]));
            }
            $q.all(promiseObjectsForCelebs).then(function (response) {
                for (var i = 0; i < response.length; i++) {
                    $scope.selectedCelebsDetails.push(response[i].data);
                }
            }).then(function(){
                promiseObjectsForMovies.push(SelectCelebs.checkWorkedTogether($scope.celebsTogetherIds));
                $q.all(promiseObjectsForMovies).then(function (response) {
                    for (var i = 0; i < response.length; i++) {
                        for (var j=0; j<response[i].data.results.length; j++) {
                            $scope.celebTogetherMovies.push(response[i].data.results[j]);
                        }
                    }
                }).then(function(){
                    for(var i=0; i< $scope.celebTogetherMovies.length ; i++){
                        promiseObjectsForMoviesTogether.push(SelectCelebs.getMovieDetails($scope.celebTogetherMovies[i].id));
                    }
                    $q.all(promiseObjectsForMoviesTogether).then(function (response) {
                        for (var i = 0; i < response.length; i++) {
                            /*$scope.celebTogetherMovies[i].keywords = response[i].data.keywords;*/
                            if (response[i].data.keywords) {
                                if (response[i].data.keywords.keywords.length > 0) {
                                    $scope.celebTogetherMovies[i].keywords = response[i].data.keywords.keywords;
                                } else {
                                    $scope.celebTogetherMovies[i].keywords = [{name: 'none'}];
                                }
                            }
                            if (response[i].data.vote_average) {
                                $scope.celebTogetherMovies[i].vote_average = response[i].data.vote_average;
                            }
                            if (response[i].data.release_date) {
                                $scope.celebTogetherMovies[i].release_date = response[i].data.release_date;
                            }else{
                                $scope.celebTogetherMovies[i].release_date = null;
                            }
                            if (response[i].data.videos) {
                                if (response[i].data.videos.results.length > 0) {
                                    $scope.celebTogetherMovies[i].trailer = response[i].data.videos.results[0].key;
                                } else {
                                    $scope.celebTogetherMovies[i].trailer = null;
                                }
                            }
                            if (response[i].data.budget) {
                                $scope.celebTogetherMovies[i].budget = response[i].data.budget;
                            }else{
                                $scope.celebTogetherMovies[i].budget = 0;
                            }
                            if (response[i].data.revenue) {
                                $scope.celebTogetherMovies[i].revenue = response[i].data.revenue;
                            }else{
                                $scope.celebTogetherMovies[i].revenue = 0;
                            }
                        }
                        if($scope.celebTogetherMovies.length===0){
                            $scope.celebTogetherMoviesEmpty=true;
                        }
                        $scope.isLoading=false;
                        //console.log("$scope.celebTogetherMovies="+JSON.stringify($scope.celebTogetherMovies));
                    });
                });
            });
        })();
    }]);

