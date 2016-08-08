/**
 * Created by arpit on 7/8/16.
 */

'use strict';

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('updateUserController', ['$scope', 'httpService', 'apisService', 'cookieService', '$rootScope', function($scope
    , httpService, apisService, cookieService, $rootScope){

    $scope.update = function(){

        if($scope.user.newPassword != $scope.confirmPassword){
            $scope.response = "Passwords does'nt match!";
            return;
        }

        httpService({
            'URI' : $rootScope.whichDBFromPath() + apisService.APIs.update,
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
