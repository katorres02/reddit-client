(function(){
  var module = angular.module('TopEntries', []);
  
  module.controller('TopController', ["$scope", "$http", topController]);

  function topController($scope, $http) {
    var topEntries = this;

    // variables section
    topEntries.entries = []; 
    topEntries.current_post = null;

    topEntries.init = function(){
    	topEntries.loadData();
    }

    // get data from reddit
    topEntries.loadData = function(){
    	var params = {};
      $http.get('https://www.reddit.com/top.json', {params: params}).then(
        function(res, status){
          topEntries.entries = res.data.data.children;
          console.log(res.data.data.children);
        },
        function(res, status){
          console.log("Error fetching from reddit.");
        }
      );	
    }

    // store locally with rails, for 'reading state'
    topEntries.storeLocal = function(){
    	
    }

    // mark post as read
    topEntries.readPost = function(){
    	
    }

    // dimiss from list
    topEntries.dismiss = function(post){

    }

    // dismiss all
    topEntries.dismissAll = function(){
    	
    }

    // filter by read and unread
    topEntries.filter = function(readState){

    }

    // paginate
    topEntries.paginate = function(next){

    }

  }
})();
