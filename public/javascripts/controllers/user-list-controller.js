/**
 * Created by arpit on 7/8/16.
 */

'use strict'

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('userListController', ['$scope', 'httpService', 'apisService',
    function ($scope, httpService, apisService) {

        $scope.init = function () {
            httpService({
                URI: apisService.APIs.userList,
                data: '',
                type: 'post',
                callback: function (response) {
                    $scope.users = response;
                }
            });
        };

        $scope.init();
    }]);