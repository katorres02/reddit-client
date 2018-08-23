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
    topEntries.after = null;
    topEntries.before = null;

    topEntries.init = function(){
    	topEntries.loadData();
    }

    // get data from reddit
    topEntries.loadData = function(){
    	var params = {
    		limit: 25,
    		after: topEntries.after,
    	};
      $http.get('https://www.reddit.com/top.json', {params: params}).then(
        function(res, status){
          topEntries.entries = res.data.data.children;
          topEntries.after   = res.data.data.after;

          //console.log(topEntries.after)
          //console.log(res.data.data.children);
        },
        function(res, status){
          console.log("Error fetching from reddit.");
        }
      );
    }

    // store locally with rails, for 'reading state'
    topEntries.storeLocal = function(post){

    }

    // mark post as read
    topEntries.readPost = function(post){
			var params = {
    		post: {
    			name_id: post.data.name,
    			read: true
    		}
    	};
      $http.post('/api/v1/posts/read.json', params).then(
        function(res, status){
        	console.log(res.data);
        },
        function(res, status){
          console.log("Error. "+res.data.message);
        }
      );    	
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
    	topEntries.entries = [];
    }

    // filter by read and unread
    topEntries.filter = function(readState){

    }

    // paginate
    topEntries.paginate = function(next){

    }

  }
})();
