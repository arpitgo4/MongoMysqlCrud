"use strict";

var nodeApp  = nodeApp || angular.module('nodeApp', [])

nodeApp.factory('apisService' , function(){
	
	return {
			"APIs" : (function(obj){				
						return {
							/*"login": {
								"applicantLogin": "js/JSON/login/applicant-login.json",
								"officialLogin": "js/JSON/login/official-login.json"
							},
							"accessor": {
								"getApplicants": "js/JSON/accessor/get-applicants.json"
							},
							"applicant": {
								"getQuestions": "js/JSON/question/get-questions-for-applicant.js"
							},*/
							'register': '/register'
						}
			})()
	}
});
