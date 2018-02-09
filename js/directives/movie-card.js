angular.module('SetMovieNight')
    .directive('movieCard', function() {
        return {
            replace: true,
            restrict: "E",
            scope: {
                header: "=",
                body: "=",
                image: "@",
                id: "="
            },
            templateUrl: "templates/directives/movie-card.html"
        };
    });

