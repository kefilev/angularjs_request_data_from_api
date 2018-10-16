var myApp = angular.module('myApp', ['ngRoute']);


myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/EmployeeDetails', {templateUrl:'employee_details.html'})
        .when('/Search', {templateUrl:'search.html'})
        .otherwise ({redirectTo: '/Search'}); 
}]);



myApp.controller('MyController', function($scope, $http) {

    $scope.employees = []
    $scope.employeeInfo = []


    // Get all employees from the API
    $http({
         method: 'GET',
         url: 'https://some-api.firebaseapp.com/employees',
         headers: {'Authorization': 'some-password'}
    })
    .then(function successCallback(response) {
        //alert("Succesfully connected to the API");
        $scope.employees = response.data;
    }, function errorCallback(response) {
        alert("Error connecting to API");
    }); 


    // Get a single employee from the API
    $scope.getEmployeeInfo = function(id) {

        $http({
            method: 'GET', url: 'https://some-api.firebaseapp.com/employees/' + id, headers: {'Authorization': 'some-password'}
        })
        .then(function successCallback(response) {
            //alert("Succesfully connected to the API");
            $scope.employeeInfo = response.data;
        }, function errorCallback(response) {
            alert("Error connecting to API");
        }); 

    }
    
    
    // Delete current employee details, so they don't appear before the next request is finished
    $scope.emptyEmployeeInfo = function() {
        $scope.employeeInfo = {};
    }

    
});

