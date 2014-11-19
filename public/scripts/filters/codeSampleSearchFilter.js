'use strict';

var app = angular.module('npmStartApp');

app.filter('codeSampleSearchFilter', function () {
        return function (items, searchString) {
            var filtered = [];
            var letterMatch = new RegExp(searchString, 'i');
            if(items){
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (letterMatch.test(item.name.substring(0, item.name.length))) {
                        filtered.push(item);
                    }
                }
            }
            return filtered;
        };
    });
