/**
 * Created by arpit on 17/8/16.
 */

'use strict'

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('userListController', ['$scope', 'httpService', 'apisService', '$rootScope',
    function ($scope, httpService, apisService, $rootScope) {

        $scope.search = function(){
            console.log($scope.selectedCompany, $scope.selectedCountry);
            searchUsers($scope.selectedCompany, $scope.selectedCountry);
        };

        $scope.init = function(){
            setOptionsInSelect();
            searchUsers(-1, -1);
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
                    $scope.countries.push({country_id: -1, countryName: 'All'});
                    $scope.companies.push({company_id: -1, companyName: 'All'});
                }
            });
        };

        $scope.init();
    }]);