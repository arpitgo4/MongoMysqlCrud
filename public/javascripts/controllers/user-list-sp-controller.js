/**
 * Created by arpit on 17/8/16.
 */

'use strict'

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('userListController', ['$scope', 'httpService', 'apisService', '$rootScope',
    function ($scope, httpService, apisService, $rootScope) {

        function findName(id, list, key){
            var result = null;
            angular.forEach(list, function(item){
                if(item[key+'_id'] == id) result = item[key+'Name'];
            });
            return result;
        }

        $scope.search = function(){
            console.log($scope.selectedCompany, $scope.selectedCountry);
            if($rootScope.whichDBFromPath().contains('mongo')){
                searchUsers(findName($scope.selectedCompany, $scope.companies, 'company'),
                    findName($scope.selectedCountry, $scope.countries, 'country'));
            }
            else searchUsers($scope.selectedCompany, $scope.selectedCountry);
        };

        $scope.init = function(){
            setOptionsInSelect();
            searchUsers(-1, -1);
        };

        function searchUsers(company, country){
            if($rootScope.whichDBFromPath().contains('mongo')) {
                if (company == -1) company = 'All';
                if (country == -1) country = 'All';
            }

            var data = {country: country, company: company};

            httpService({
                URI: $rootScope.whichDBFromPath() + apisService.APIs.userListWithFilter,
                data: data,
                type: 'post',
                callback: function (response) {
                    if($rootScope.whichDBFromPath().contains('mongo')) {
                        changeCountryAndCompanyParam(response.userList)
                    }
                    $scope.users = response.userList;
                }
            });
        }

        function changeCountryAndCompanyParam(userList){
            angular.forEach(userList, function(user){
                var company = user.company;
                delete user.company;
                user.companyName = company;

                var country = user.country;
                delete user.country;
                user.countryName = country;
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