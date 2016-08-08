/**
 * Created by arpit on 7/8/16.
 */

'use strict';

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('loginController', ['$scope', 'httpService', 'apisService', 'cookieService', '$rootScope', function($scope
    , httpService, apisService, cookieService, $rootScope){

    $scope.login = function(){
        httpService({
            'URI' : $rootScope.whichDBFromPath() + apisService.APIs.login,
            'data' : $scope.user,
            'type' : 'post',
            'callback' : function(response) {
                $scope.response = response.message;

                if(response.result == 'success')
                    document.location = $rootScope.whichDBFromPath() + '/user-list';
            }
        })
    }
    
}]);
