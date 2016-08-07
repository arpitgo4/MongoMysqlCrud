/**
 * Created by arpit on 7/8/16.
 */

'use strict';

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('loginController', ['$scope', 'httpService', 'apisService', 'cookieService', function($scope
    , httpService, apisService, cookieService){

    $scope.login = function(){
        httpService({
            'URI' : apisService.APIs.login,
            'data' : $scope.user,
            'type' : 'post',
            'callback' : function(response) {
                $scope.response = response.message;
            }
        })
    }
    
}]);
