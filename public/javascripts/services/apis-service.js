"use strict";

var nodeApp  = nodeApp || angular.module('nodeApp', [])

nodeApp.factory('apisService' , function(){
	
	return {
			"APIs" : (function(obj){				
						return {
							register: '/register',
							userList: '/userList',
							login: '/login'
						}
			})()
	}
});
