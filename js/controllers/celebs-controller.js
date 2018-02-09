angular
    .module('SetMovieNight')
    .controller('CelebsController',['$q', '$scope','$http','SelectCelebs','$location', function($q, $scope, $http, SelectCelebs, $location) {
        $scope.selectedItem = null;
        $scope.searchText = null;
        $scope.celebList = [];
        $scope.pageCounter = 0;
        $scope.celebTrendList = [];
        $scope.movies = [];
        $scope.moviesTogether=[];
        $scope.busy = false;

        //loading
        $scope.mode = 'query';
        $scope.determinateValue = 10;
        $scope.isLoading=true;
        $scope.isLoadingCheckTogetherForAll = false;

        //toggle button
        $scope.data={
            cb1:false
        }

        //check if celebs are selected
        $scope.selectedCelebs = SelectCelebs.getCelebList();

        /*$scope.broadcastChange=function(){
            $rootScope.$broadcast("selectedCelebsChange");
        }*/

        /**
         * Get movies worked together.
         */
        var celebIds = [];
        $scope.checkWorkedTogether = function () {
            var temp = "";
            for(var i=0;i<$scope.selectedCelebs.length;i++){
                if (i!==$scope.selectedCelebs.length-1) {
                    temp += $scope.selectedCelebs[i].id.toString() + ",";
                }else{
                    temp += $scope.selectedCelebs[i].id.toString();
                }
            }
            $location.path("/CelebTogetherMovieDetails/"+temp);
        }

        /**
         * Celeb AJAX search.
         */
        $scope.querySearch = function (query) {
            $scope.celebList = SelectCelebs.findCelebByAjax(query);
            return $scope.celebList;
        }

        /**
         * Add selected celebs to the list
         */
        SelectCelebs.setCelebList($scope.selectedCelebs);

        /**
         * infinite scrolling
         */
        $scope.nextPage = function () {
            if(!$scope.isLoadingCheckTogetherForAll){
                if ($scope.busy) return;
                $scope.busy = true;
                //console.log("nextpage");
                $scope.isLoading = true;
                $scope.pageCounter++;
                SelectCelebs.nextPage($scope.pageCounter).success(function (data) {
                    var items = data.results;
                    if (items) {
                        for (var i = 0; i < items.length; i++) {
                            $scope.celebTrendList.push(items[i]);
                            $scope.celebTrendList[i].selectedCelebids = [];
                            $scope.celebTrendList[i].noOfMoviesTogether = null;
                        }
                    }
                    //console.log("$scope.pageCounter=" + $scope.pageCounter);
                    $scope.busy = false;
                    $scope.isLoading = false;
                    if($scope.data.cb1){
                        $scope.checkMoviesTogetherForAll();
                    }
                });
            }
        }

        /**
         * Quick check movies together for all
         */
        $scope.checkMoviesTogetherForAll=function(){
            if($scope.data.cb1){
                $scope.isLoadingCheckTogetherForAll = true;
            }
            var selectedCelebsIds = [], trendingCelebsId=[], checkCelebIds=[], tempArr=[];
            //console.dir("$scope.selectedCelebs="+$scope.selectedCelebs);
            for(var i=0; i< $scope.selectedCelebs.length ; i++){
                selectedCelebsIds.push($scope.selectedCelebs[i].id);
            }
            for(var i=0; i< $scope.celebTrendList.length ; i++){
                trendingCelebsId.push($scope.celebTrendList[i].id);
            }
            for(var i=0; i< trendingCelebsId.length ; i++){
                checkCelebIds.push(trendingCelebsId[i]);
                for(var j=0; j< selectedCelebsIds.length ; j++){
                    checkCelebIds.push(selectedCelebsIds[j]);
                }
                tempArr.push(SelectCelebs.checkWorkedTogether(checkCelebIds));
                checkCelebIds = [];
            }
            $q.all(tempArr).then(function (response) {
                for (var i = 0; i < response.length; i++) {
                    $scope.celebTrendList[i].selectedCelebids = selectedCelebsIds;
                    if (response[i].data.results && response[i].data.results.length) {
                        $scope.celebTrendList[i].noOfMoviesTogether = response[i].data.results.length;
                    }else{
                        $scope.celebTrendList[i].noOfMoviesTogether = 0;
                    }
                    if ($scope.celebTrendList[i].noOfMoviesTogether === 0) {
                        $scope.celebTrendList[i].noOfMoviesTogether = "None";
                    }
                }
                for(var i=0; i<$scope.celebTrendList.length; i++){
                    var pos=$scope.selectedCelebs.map(function(e) { return e.id; }).indexOf($scope.celebTrendList[i].id);
                    if(pos>-1){
                        $scope.celebTrendList[i].noOfMoviesTogether = "None";
                    }
                }
                $scope.isLoadingCheckTogetherForAll = false;
            });
        }
        /**
         * Keyword search for celebs
         */
        $scope.getCelebMovies=function(){
            var temp = "";
            for(var i=0;i<$scope.selectedCelebs.length;i++){
                if (i!==$scope.selectedCelebs.length-1) {
                    temp += $scope.selectedCelebs[i].id.toString() + ",";
                }else{
                    temp += $scope.selectedCelebs[i].id.toString();
                }
            }
            $location.path("/CelebKeywordMovieDetails/"+temp);
        }

        $scope.$watch('selectedCelebs.length', function(newNames, oldNames) {
            if (newNames) {
                $scope.data.cb1=false;
            }
            if ($scope.selectedCelebs.length===0) {
                $scope.data.cb1=false;
            }
        });

    }]);

