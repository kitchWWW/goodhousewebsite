var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/home.html"
    })
    .when("/about", {
        templateUrl : "pages/about.html"
    })
    .when("/projects", {
        templateUrl : "pages/projects.html"
    })
    .when("/contact", {
        templateUrl : "pages/contact.html"
    })
    .when("/XOR", {
        templateUrl : "pages/XOR.html"
    })
    .when("/ensemble", {
        templateUrl : "pages/ensemble.html"
    });
});
