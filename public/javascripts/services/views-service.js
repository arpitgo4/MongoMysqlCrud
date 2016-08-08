/**
 * Created by arpit on 8/8/16.
 */

"use strict";

var nodeApp  = nodeApp || angular.module('nodeApp', [])

nodeApp.factory('viewsService' , ['$rootScope', function($rootScope){

    return {
        "APIs" : (function(){
            return {
                register: '/register',
                userList: '/user-list',
                login: '/login',
                remove: '/remove-user',
                update: '/update-user'
            }
        })()
    }
}]);