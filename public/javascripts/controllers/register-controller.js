/**
 * Created by arpit on 7/8/16.
 */

'use strict';

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('registerController', ['$scope', 'httpService', 'apisService', 'cookieService', '$rootScope', function($scope
                            , httpService, apisService, cookieService, $rootScope){

    $scope.register = function(){
        console.log("Registering : ", $scope.user);
        httpService({
            'URI' : $rootScope.whichDBFromPath() + apisService.APIs.register,
            'data' : $scope.user,
            'type' : 'post',
            'callback' : function(response) {
                $scope.response = response;
            }
        })
    }


}]);