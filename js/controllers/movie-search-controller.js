angular.module('SetMovieNight').controller('MovieSearchController',[ '$scope','$location','SelectCelebs','$timeout',function($scope,$location,SelectCelebs,$timeout) {
    $scope.movies= SelectCelebs.getMoviesResult();
    /*$scope.movie = SelectCelebs.getMoviesResult();*/
    /*$scope.findMovies=function(){
        $scope.movie = $scope.movieSelected;
        SelectCelebs.setMoviesResult($scope.movie);
    };*/

    $scope.onSelect=function($item, $model, $label){
        /*$scope.movie = $item;
        SelectCelebs.setMoviesResult($scope.movie);*/
        $location.path('/moviesDetails/'+$item.id);
    };

    $scope.getMovieList = function(title) {
        //return SelectCelebs.findMovieByAjax(title);
        SelectCelebs.findMovieByAjax(title).then(function(response) {
            $scope.movies = response.data.results;
            SelectCelebs.setMoviesResult($scope.movies );
            $scope.isLoading=false;
        });
    }

    $scope.$watch('movieSelected', function(newNames, oldNames) {
        if (newNames) {
            //console.log("keyword Selected="+newNames);
            //$scope.getMovieList($scope.movieSelected);
            $timeout(function(){
                $scope.getMovieList($scope.movieSelected);
                $scope.isLoading=true;
            },2000);
        }
    });
}]);
