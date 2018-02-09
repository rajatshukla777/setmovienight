angular.module('SetMovieNight').controller('KeywordSearchController',[ '$scope','SelectCelebs','$q','$location',function($scope,SelectCelebs,$q,$location) {
    var pages= 0, tempArr=[],tempId=0;
    $scope.pageCounter=0;

    //circular loading
    $scope.mode = 'query';
    $scope.determinateValue = 10;

    //get movie trend list
    $scope.movieTrendList=[];

    $scope.onSelect=function($item, $model, $label){
        $location.path('/keywordMovieDetails/'+$item.id);
    };

    $scope.getKeywords = function(keyword) {
        return SelectCelebs.findKeywordByAjax(keyword);
    };

    //rating
    $scope.voteAverage = 7;
    $scope.max = 8;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    };
    $scope.rateFilter = function( voteAverage ) {
        return function( movie ) {
            return (movie.vote_average >= voteAverage && movie.vote_average < voteAverage+1 );
        };
    };

    /**
     * infinite scrolling
     */
    $scope.nextTrendMoviePage = function () {
        var tempArr=[],promiseObjectsForMoviesKeywords=[];
        if ($scope.busy) return;
        $scope.busy = true;
        //console.log("nextpage");
        $scope.isLoading = true;
        $scope.pageCounter++;
        SelectCelebs.nextTrendMoviePage($scope.pageCounter).success(function (data) {
            if (data.results) {
                for (var i = 0; i < data.results.length; i++) {
                    $scope.movieTrendList.push(data.results[i]);
                }
            }
            //console.log("$scope.pageCounter=" + $scope.pageCounter);
            //console.log("$scope.movieTrendList.length=" + $scope.movieTrendList.length);
            $scope.busy = false;
            $scope.isLoading = false;
        }).then(function(response){
            for (var i = 0; i < $scope.movieTrendList.length; i++) {
                tempArr.push(SelectCelebs.getKeyWords($scope.movieTrendList[i].id));
            }
            $q.all(tempArr).then(function(response) {
                for (var i = 0; i < response.length; i++) {
                    var keywords = response[i].data.keywords;
                    $scope.movieTrendList[i].keywords = keywords;
                }
                //SelectCelebs.setKeywordMoviesResult($scope.movieTrendList);
                tempArr = [];
            }).then(function(){
                for(var i=0; i< $scope.movieTrendList.length ; i++){
                    promiseObjectsForMoviesKeywords.push(SelectCelebs.getMovieDetails($scope.movieTrendList[i].id));
                }
                $q.all(promiseObjectsForMoviesKeywords).then(function (response) {
                    for (var i = 0; i < response.length; i++) {
                        /*$scope.movieTrendList[i].keywords = response[i].data.keywords;*/
                        if (response[i].data.keywords) {
                            $scope.movieTrendList[i].keywords = response[i].data.keywords.keywords;
                        }
                        if (response[i].data.vote_average) {
                            $scope.movieTrendList[i].vote_average = response[i].data.vote_average;
                        }
                        if (response[i].data.release_date) {
                            $scope.movieTrendList[i].release_date = response[i].data.release_date;
                        }else{
                            $scope.movieTrendList[i].release_date = null;
                        }
                        if (response[i].data.videos) {
                            if (response[i].data.videos.results.length > 0) {
                                $scope.movieTrendList[i].trailer = response[i].data.videos.results[0].key;
                            } else {
                                $scope.movieTrendList[i].trailer = null;
                            }
                        }
                        if (response[i].data.budget) {
                            $scope.movieTrendList[i].budget = response[i].data.budget;
                        }else{
                            $scope.movieTrendList[i].budget = 0;
                        }
                        if (response[i].data.revenue) {
                            $scope.movieTrendList[i].revenue = response[i].data.revenue;
                        }else{
                            $scope.movieTrendList[i].revenue = 0;
                        }
                    }
                });
            });
        });
    }

    //calling for first page
    $scope.nextTrendMoviePage();
}]);
