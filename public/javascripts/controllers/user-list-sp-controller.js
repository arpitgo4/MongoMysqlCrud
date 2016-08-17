/**
 * Created by arpit on 17/8/16.
 */

'use strict'

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('userListController', ['$scope', 'httpService', 'apisService', '$rootScope',
    function ($scope, httpService, apisService, $rootScope) {

        $scope.search = function(){
            searchUsers($scope.selectedCompany, $scope.selectedCountry);
        };

        $scope.init = function(){
            setOptionsInSelect();
        };

        function searchUsers(company, country){
            var data = {country: company, company: country};

            httpService({
                URI: $rootScope.whichDBFromPath() + apisService.APIs.userListWithFilter,
                data: data,
                type: 'post',
                callback: function (response) {
                    $scope.users = response.userList;
                }
            });
        }

        function setOptionsInSelect(){
            httpService({
                URI: $rootScope.whichDBFromPath() + apisService.APIs.allCompaniesAndCountries,
                data: '',
                type: 'post',
                callback: function (response) {
                    $scope.countries = response.countries;
                    $scope.companies = response.companies;
                }
            });
        };

        $scope.init();
    }]);