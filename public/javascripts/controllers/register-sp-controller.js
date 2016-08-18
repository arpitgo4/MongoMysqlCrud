/**
 * Created by arpit on 17/8/16.
 */

'use strict';

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('registerController', ['$scope', 'httpService', 'apisService', 'cookieService', '$rootScope', function($scope
    , httpService, apisService, cookieService, $rootScope){

    function findName(id, list, key){
        var result = null;
        angular.forEach(list, function(item){
            if(item[key+'_id'] == id) result = item[key+'Name'];
        });
        return result;
    }

    $scope.register = function(){

        if($scope.confirmPassword != $scope.user.password){
            $scope.response = "Passwords does'nt match!";
            return;
        }

        if($rootScope.whichDBFromPath().contains('mongo')){
            $scope.user.company = findName($scope.user.company, $scope.companies, 'company')
            $scope.user.country = findName($scope.user.country, $scope.countries, 'country')
        }
        else {
            $scope.user.company = parseInt($scope.user.company);
            $scope.user.country = parseInt($scope.user.country);
        }

        httpService({
            'URI' : $rootScope.whichDBFromPath() + apisService.APIs.createUserWithSP,
            'data' : $scope.user,
            'type' : 'post',
            'callback' : function(response) {
                $scope.response = response.message;

                if(response.result == 'success')
                    document.location = $rootScope.whichDBFromPath() + '/allUserWithFilter';
            }
        })
    };

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

    $scope.init = function(){
        setOptionsInSelect();
    };

    $scope.init();
}]);