/**
 * Created by arpit on 7/8/16.
 */

'use strict';

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('registerController', ['$scope', 'httpService', 'apisService', 'cookieService', function($scope
                            , httpService, apisService, cookieService){

    $scope.register = function(){
        console.log("Registering : ", $scope.user);
        httpService({
            'URI' : apisService.APIs.register,
            'data' : $scope.user,
            'type' : 'post',
            'callback' : function(response) {
                    
            }
        })
    }


}]);