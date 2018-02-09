angular.module("SetMovieNight")
    .factory("SelectCelebs",['$http',function($http){
        var celebList=[],moviesResult=[];
        return{
            checkWorkedTogether:function(celebIds){
                //console.log("celebIds in checkWorkedTogether="+celebIds);
                //return $http({method: 'GET', url:"checkWorkedTogether/"+celebIds.toString(), cache: true});
                return $http({method: 'GET', url:"https://setmovienight.com/checkWorkedTogether/"+celebIds.toString(), cache: true});
            },
            findCelebByAjax: function(celebName){
                return $http({method: 'GET', url:"https://setmovienight.com/findCelebByAjax/"+celebName, cache: true})
                    .then(function(response){
                        var resultMap = response.data.results.map(function(item){
                            return item;
                        });
                        return resultMap;
                    });
            },
            setCelebList:function(list){
                celebList=list;
            },
            getCelebList:function(){
                return celebList;
            },
            nextPage:function(pageCounter) {
                //console.log("new request");
                //return $http.get("nextPage/"+pageCounter,{cache:true});
                return $http.get("https://setmovienight.com/nextPage/"+pageCounter,{cache:true});
            },
            getCelebMovieById: function(celebId){
                //console.log("celebId in getCelebMovieById()="+celebId);
                //return $http({method: 'GET', url: "getCelebMovieById/"+celebId, cache: true});
                return $http({method: 'GET', url: "https://setmovienight.com/getCelebMovieById/"+celebId, cache: true});
            },
            getKeyWords:function(movieId) {
                //console.log("movieId in getKeyWords()="+movieId);
                //return $http.get("getKeyWords/"+movieId,{cache:true});
                return $http.get("https://setmovienight.com/getKeyWords/"+movieId,{cache:true});
            },
            getMovieDetails:function(movieId){
                //console.log("movieId in getMovieDetails()="+movieId);
                //return $http.get("getMovieDetails/"+movieId,{cache:true});
                return $http.get("https://setmovienight.com/getMovieDetails/"+movieId,{cache:true});
            },
            getKeywordMovieById: function(keywordId){
                //console.log("keywordId in getKeywordMovieById()="+keywordId);
                //return $http({method: 'GET', url: "getKeywordMovieById/"+keywordId, cache: true});
                return $http({method: 'GET', url: "https://setmovienight.com/getKeywordMovieById/"+keywordId, cache: true});
            },
            nextPageKeywordMovieById:function(keywordId,pageCounter) {
                //return $http.get("nextPageKeywordMovieById/"+keywordId+","+pageCounter, {cache: true});
                return $http.get("https://setmovienight.com/nextPageKeywordMovieById/"+keywordId+","+pageCounter, {cache: true});
            },
            findKeywordByAjax: function(keyword){
                //return $http.get("findKeywordByAjax/"+keyword, {cache: true}).then(function(response){
                return $http.get("https://setmovienight.com/findKeywordByAjax/"+keyword, {cache: true}).then(function(response){
                    return response.data.results.map(function(item){
                        return item;
                    });
                });
            },
            getKeywordById:function(keywordId){
                //console.log("keywordId in getKeywordMovieById()="+keywordId);
                //return $http({method: 'GET', url: "getKeywordById/"+keywordId, cache: true});
                return $http({method: 'GET', url: "https://setmovienight.com/getKeywordById/"+keywordId, cache: true});
            },
            findMovieByAjax: function(title){
                //return $http.get("findMovieByAjax/"+title, {cache: true});
                return $http.get("https://setmovienight.com/findMovieByAjax/"+title, {cache: true});
            },
            setMoviesResult: function(result){
                moviesResult = result;
            },
            getMoviesResult: function(){
                return moviesResult;
            },
            nextTrendMoviePage:function(pageCounter) {
                //return $http.get("nextTrendMoviePage/"+pageCounter, {cache: true});
                return $http.get("https://setmovienight.com/nextTrendMoviePage/"+pageCounter, {cache: true});
            },
            getCelebById: function(celebId){
                //console.log("celebId in getCelebById()="+celebId);
                //return $http({method: 'GET', url: "getCelebById/"+celebId, cache: true});
                return $http({method: 'GET', url: "https://setmovienight.com/getCelebById/"+celebId, cache: true});
            }
        }
    }]);
