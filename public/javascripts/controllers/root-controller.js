/**
 * Created by arpit on 7/8/16.
 */

'use strict';

var nodeApp = nodeApp || angular.module('nodeApp', []);

nodeApp.run(function($rootScope, viewsService){
    $rootScope.findArrayIndex = function(arr , elem){
        var i=0;
        if(typeof arr=="string"){
            var elemLength = elem.length;
            while(i<arr.length){
                var subs = arr.substr(i,elemLength);
                if(subs==elem){
                    return i;
                }
                i++;
            }
            return -1;
        }
        i=0;
        while(i<arr.length){
            if(arr[i]===elem){
                return i;
            }
            i++;
        }
        return -1;
    };

    $rootScope.whichDBFromPath = function(){
        var path = document.location.pathname;
        return path.substring(0, path.lastIndexOf('/'));
    };

    $rootScope.redirectToUpdate = function(){
        document.location = $rootScope.whichDBFromPath() + viewsService.APIs.update;
    };

    $rootScope.redirectToRemove = function(){
        document.location = $rootScope.whichDBFromPath() + viewsService.APIs.remove;
    };

    $rootScope.redirectToRegister = function(){
        document.location = $rootScope.whichDBFromPath() + viewsService.APIs.register;
    };

});