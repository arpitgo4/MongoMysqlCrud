"use strict";

var nodeApp  = nodeApp || angular.module('nodeApp', []);

nodeApp.factory('httpService' , function($http,$rootScope, $q, $sce){
	
	return function(obj){
		
		try{
			console.log("Entered into HTTP Service with following object : "+ JSON.stringify(obj));
			console.log("HTTP service data : "+obj.data);
			return $http[obj.type](obj.URI, obj.data)
			.then(function(response){
				var consoleCSS = "color: green;";
				console.log("%c HTTP service response for URI : '" +obj.URI +"' is "+ JSON.stringify(response.data),consoleCSS)
				obj.callback(response.data);
			});
		}catch(e){
			console.log("Exception in HTTP Service : "+e);
		}
	}
});