"use strict";

var nodeApp  = nodeApp || angular.module('nodeApp', [])

nodeApp.factory('apisService' , ['$rootScope', function($rootScope){
	
	return {
			"APIs" : (function(){				
						return {
							register: '/register',
							userList: '/userList',
							login: '/login',
							remove: '/removeUser'
						}
			})()
	}
}]);
