/*
  Configure routes used with ngRoute. We chose not to use $locationProvider.html5Mode(true);
  because using HTML5 pushstate requires that server routes are setup to mirror the routes
  in this file. Since this isn't a node course we're going to skip it. For all intensive
  purposes, html5 mode and url hash mode perform the same when within an angular app.
*/
angular.module('SetMovieNight').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      // redirect to the movies index
      redirectTo: '/selectCelebs'
    })

    .when('/selectCelebs', {
      templateUrl: 'templates/pages/celebs-index.html',
      controller: 'CelebsController'
    })

    .when('/moviesDetails/:id', {
      templateUrl: 'templates/pages/movies-details.html',
      controller: 'moviesDetailsController'
    })

    .when('/keyword', {
          templateUrl: 'templates/pages/keyword-search-index.html',
          controller: 'KeywordSearchController'
      })

    .when('/movie', {
      templateUrl: 'templates/pages/movie-search-index.html',
      controller: 'MovieSearchController'
    })

    .when('/keywordMovieDetails/:id', {
      templateUrl: 'templates/pages/keyword-movie-details.html',
      controller: 'KeywordMovieDetailsController'
    })

    .when('/CelebKeywordMovieDetails/:id', {
      templateUrl: 'templates/pages/celeb-keyword-movie-details.html',
      controller: 'CelebKeywordMovieDetailsController'
    })

    .when('/CelebTogetherMovieDetails/:id', {
      templateUrl: 'templates/pages/celeb-together-movie-details.html',
      controller: 'CelebTogetherMovieDetailsController'
    })

    .otherwise({redirectTo: '/'});
}]);
