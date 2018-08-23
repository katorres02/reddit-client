(function(){
  var module = angular.module('TopEntries', []).filter('moment', function () {
	  return function (input, momentFn /*, param1, param2, ...param n */) {
	    var args = Array.prototype.slice.call(arguments, 2),
	      momentObj = moment(input);
	    return momentObj[momentFn].apply(momentObj, args);
	  };
	});;
  
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
    topEntries.readPost = function(post){
    	
    }

    // dimiss from list
    topEntries.dismiss = function(post, index){
    	if(topEntries.current_post == post){
    		topEntries.current_post = null;
    	}
    	topEntries.entries.splice(index, 1);
    }

    // open post
    topEntries.openPost = function(post){
    	post.data.read = true;
    	topEntries.current_post = post;
    	topEntries.readPost(post)
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
