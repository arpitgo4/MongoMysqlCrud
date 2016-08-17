/**
 * Created by arpit on 17/8/16.
 */

'use strict'

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('userListController', ['$scope', 'httpService', 'apisService', '$rootScope',
    function ($scope, httpService, apisService, $rootScope) {

        $scope.init = function(){
                
        };
        
        $scope.onClick = function () {
            httpService({
                URI: $rootScope.whichDBFromPath() + apisService.APIs.userListWithFilter,
                data: '',
                type: 'post',
                callback: function (response) {
                    $scope.users = response;
                }
            });
        }; 

        $scope.init();
    }]);