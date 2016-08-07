"use strict";

var nodeApp  = nodeApp || angular.module('nodeApp', [])

nodeApp.factory('cookieService' , function($http,$rootScope){
	
	//return function(obj){
		/* function for setting the cookie*/
		var  fact= new Object;
		fact.setCookie = function(cookieObj){
			cookieObj.key 		= cookieObj.key || null;
			cookieObj.value		= cookieObj.value || null;
			cookieObj.expiry	= cookieObj.expiry || null;
			cookieObj.path		= cookieObj.path || null;
			document.cookie		= cookieObj.key+"="+ cookieObj.value+ (cookieObj.expiry==null ? '' : (";expires="+ cookieObj.expiry))+";path="+cookieObj.path;
		}
		
		/* function for getting the cookie*/
		fact.getCookie = function(cookieKey){
			var cookieArray = document.cookie.split(";");
			var key = cookieKey.key+"=";
			var i;
			var value = undefined;
			for(i = 0; i<cookieArray.length; i++){
				var thisCookie = cookieArray[i];
				if(thisCookie.charAt(0)==" "){
					thisCookie = thisCookie.substring(1);
				}
				if($rootScope.findArrayIndex(thisCookie , key) == 0){
					value = thisCookie.substring(key.length,thisCookie.length);
				}
			}
			return value;
		}
		
		/* function for deleting the cookie*/
		fact.deleteCookie = function(key){
			document.cookie	=	key+"=;expires=";
		}
		return fact;
	//}
});