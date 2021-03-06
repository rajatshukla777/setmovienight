angular
    .module('SetMovieNight')
    .controller('CelebKeywordMovieDetailsController',['$q', '$scope','SelectCelebs','$routeParams', function($q, $scope, SelectCelebs, $routeParams) {
        var tempArr = $routeParams.id.split(",");
        $scope.selectedCelebs = tempArr;
        $scope.selectedCelebsDetails=[];
        $scope.celebKeyWordMovies = [];
        $scope.keywordToggle = 0;
        $scope.togetherFlag=false;

        if(tempArr.length>1){
            $scope.togetherFlag=true;
        }
        $scope.data = {
            cb1: false,
            cb2: false
        };

        //circular loading
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
         * Keyword Movie search for celebs
         */
        (function(){
            var celebMovieIds = [], promiseObjectsForKeywords=[],promiseObjectsForMovies=[],promiseObjectsForCelebs=[];
            for(var i=0; i< $scope.selectedCelebs.length ; i++){
                promiseObjectsForCelebs.push(SelectCelebs.getCelebById($scope.selectedCelebs[i]));
            }
            $q.all(promiseObjectsForCelebs).then(function (response) {
                for (var i = 0; i < response.length; i++) {
                    $scope.selectedCelebsDetails.push(response[i].data);
                }
            }).then(function(result){
                for(var i=0; i< $scope.selectedCelebs.length ; i++){
                    promiseObjectsForMovies.push(SelectCelebs.getCelebMovieById($scope.selectedCelebsDetails[i].id));
                }
                $q.all(promiseObjectsForMovies).then(function (response) {
                    for (var i = 0; i < response.length; i++) {
                        for (var j = 0; j < response[i].data.cast.length; j++) {
                            //inserting the celb id
                            response[i].data.cast[j].celebId = $scope.selectedCelebsDetails[i].id;
                            response[i].data.cast[j].celebName = $scope.selectedCelebsDetails[i].name;
                            response[i].data.cast[j].celebProfilePath = $scope.selectedCelebsDetails[i].profile_path;
                            $scope.celebKeyWordMovies.push(response[i].data.cast[j]);
                        }
                    }
                }).then(function(response){
                    for(var i=0; i< $scope.celebKeyWordMovies.length ; i++){
                        /*promiseObjectsForKeywords.push(SelectCelebs.getKeyWords($scope.celebKeyWordMovies[i].id));*/
                        promiseObjectsForKeywords.push(SelectCelebs.getMovieDetails($scope.celebKeyWordMovies[i].id));
                    }
                    $q.all(promiseObjectsForKeywords).then(function (response) {
                        for (var i = 0; i < response.length; i++) {
                            //$scope.celebKeyWordMovies[i].keywords = response[i].data.keywords.keywords;
                            if (response[i].data.keywords) {
                                if (response[i].data.keywords.keywords.length > 0) {
                                    $scope.celebKeyWordMovies[i].keywords = response[i].data.keywords.keywords;
                                } else {
                                    $scope.celebKeyWordMovies[i].keywords = [{name: 'none'}];
                                }
                            }
                            if (response[i].data.vote_average) {
                                $scope.celebKeyWordMovies[i].vote_average = response[i].data.vote_average;
                            }
                            if (response[i].data.release_date) {
                                $scope.celebKeyWordMovies[i].release_date = response[i].data.release_date;
                            }else{
                                $scope.celebKeyWordMovies[i].release_date = null;
                            }
                            if (response[i].data.videos) {
                                if (response[i].data.videos.results.length > 0) {
                                    $scope.celebKeyWordMovies[i].trailer = response[i].data.videos.results[0].key;
                                } else {
                                    $scope.celebKeyWordMovies[i].trailer = null;
                                }
                            }
                            if (response[i].data.budget) {
                                $scope.celebKeyWordMovies[i].budget = response[i].data.budget;
                            }else{
                                $scope.celebKeyWordMovies[i].budget = 0;
                            }
                            if (response[i].data.revenue) {
                                $scope.celebKeyWordMovies[i].revenue = response[i].data.revenue;
                            }else{
                                $scope.celebKeyWordMovies[i].revenue = 0;
                            }

                        }
                        $scope.isLoading=false;
                        //console.log("$scope.celebKeyWordMovies="+JSON.stringify($scope.celebKeyWordMovies));
                    });
                });
            });
        })();
    }]);

