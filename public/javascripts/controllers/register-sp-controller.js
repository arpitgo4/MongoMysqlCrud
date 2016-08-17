/**
 * Created by arpit on 17/8/16.
 */

'use strict';

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.controller('registerController', ['$scope', 'httpService', 'apisService', 'cookieService', '$rootScope', function($scope
    , httpService, apisService, cookieService, $rootScope){

    $scope.register = function(){

        if($scope.confirmPassword != $scope.user.password){
            $scope.response = "Passwords does'nt match!";
            return;
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