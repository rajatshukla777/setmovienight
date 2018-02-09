angular.module('SetMovieNight').controller('KeywordMovieDetailsController', ['$scope','SelectCelebs','$q','$routeParams','$interval',function($scope,SelectCelebs,$q,$routeParams,$interval) {
    $scope.movies = [];
    var pages= 0, tempArr=[],promiseObjectsForMovies=[];
    $scope.keywordName=null;
    var tempId=$routeParams.id;
    $scope.keywordId=tempId;

    //circular proress
    $scope.mode = 'query';
    $scope.determinateValue = 10;
    $scope.isLoading=true;

    //infinite loading
    $scope.pages=0;
    $scope.pageCounter=0;
    $scope.busy = false;

    //rating
    $scope.data = {
        cb2: false
    };
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
     * infinite scrolling
     */
   SelectCelebs.getKeywordById(tempId).success(function (data) {
        $scope.keywordName=data.name;
        $scope.keywordId = tempId;
    });
  /* .then(function(result) {
        SelectCelebs.getKeywordMovieById(tempId).success(function (data) {
            $scope.pages = data.total_pages;
        }).then(function(result){
            $scope.keywordMovieNextPage();
        });
    });*/


    $scope.keywordMovieNextPage = function () {
        if ($scope.busy) return;
        $scope.busy = true;
        //console.log("nextpage");
        //if( $scope.pageCounter <= $scope.pages) {
        if($scope.keywordId) {
            $scope.isLoading = true;
            $scope.pageCounter++;
            SelectCelebs.nextPageKeywordMovieById($scope.keywordId, $scope.pageCounter).then(function (response) {

                for (var i = 0; i < response.data.results.length; i++) {
                    $scope.movies.push(response.data.results[i]);
                }
                for (var i = 0; i < $scope.movies.length; i++) {
                    promiseObjectsForMovies.push(SelectCelebs.getMovieDetails($scope.movies[i].id));
                }
                $q.all(promiseObjectsForMovies).then(function (response) {
                    for (var i = 0; i < response.length; i++) {
                        //$scope.movies[i].keywords = response[i].data.keywords.keywords;
                        if (response[i].data.keywords) {
                            if (response[i].data.keywords.keywords.length > 0) {
                                $scope.movies[i].keywords = response[i].data.keywords.keywords;
                            } else {
                                $scope.movies[i].keywords = [{name: 'none'}];
                            }
                        }
                        if (response[i].data.vote_average) {
                            $scope.movies[i].vote_average = response[i].data.vote_average;
                        }
                        if (response[i].data.release_date) {
                            $scope.movies[i].release_date = response[i].data.release_date;
                        }else{
                            $scope.movies[i].release_date = null;
                        }
                        if (response[i].data.videos) {
                            if (response[i].data.videos.results.length > 0) {
                                $scope.movies[i].trailer = response[i].data.videos.results[0].key;
                            } else {
                                $scope.movies[i].trailer = null;
                            }
                        }
                        if (response[i].data.budget) {
                            $scope.movies[i].budget = response[i].data.budget;
                        } else {
                            $scope.movies[i].budget = 0;
                        }
                        if (response[i].data.revenue) {
                            $scope.movies[i].revenue = response[i].data.revenue;
                        } else {
                            $scope.movies[i].revenue = 0;
                        }
                    }
                    $scope.isLoading = false;
                    $scope.busy = false;
                    //console.log("$scope.pageCounter=" + $scope.pageCounter);
                    promiseObjectsForMovies = [];
                    //console.log("$scope.celebTogetherMovies="+JSON.stringify($scope.celebTogetherMovies));
                });
            });
        }
    };
}]);