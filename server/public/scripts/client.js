/**
 * Created by ericanderson on 1/11/16.
 */
var app = angular.module('app', []);

app.controller("MainController", function($scope, $http){
   $scope.helloworld = 'Twitter Handle Generator';

   //get both the adjectives and nouns from the server
   $scope.getWords = function(){
      $http.get('/adjectives').then(function(adjResponse) {
         if (adjResponse.status !== 200) {
            throw new Error('Failed to get adjectives');
         }

         $http.get('/nouns').then(function(nounResponse) {
            if (nounResponse.status !== 200){
               throw new Error('Failed to get nouns');
            }

            //if both adjectives and nouns have been received, then generate the Twitter array and send it to $scope
            $scope.data = {
               twitterArray: generateTwitterArray(adjResponse.data.adjectives, nounResponse.data.nouns),
            };

         });
      });
   };

   //create initial set of twitter handles. this will be run again on button click
   $scope.getWords();

});

//function combine two arrays. position 0 and position 0 added together as a new string, repeat for position 1 and position 1, etc
function generateTwitterArray(adjArray, nounArray) {
   var twitterArray = [];

   adjArray = randomizeArray(adjArray);
   nounArray = randomizeArray(nounArray);

   for (var i = 0; i < adjArray.length; i++){
      twitterArray.push(adjArray[i] + nounArray[i]);
   }

   return twitterArray;
}

//takes in an array, shuffles it, exports new array
function randomizeArray(array) {
   var newArray = [];
   var element = 0;
   var length = array.length;

   for (var i = 0; i < length; i++){
      element = randomNumber(0, array.length -1);
      newArray.push(array[element]);
      array.splice(element, 1);
   }

   return newArray;
}

//generates a random number
function randomNumber(min, max) {
   return Math.floor(Math.random() * (1 + max - min) + min);
}