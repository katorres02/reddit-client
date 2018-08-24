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
        limit: 50,
        //after: topEntries.after,
        raw_json: 1
      };
      $http.get('https://www.reddit.com/top.json', {params: params}).then(
        function(res, status){
          topEntries.after   = res.data.data.after;

          topEntries.reads(res.data.data.children);
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
        topEntries.current_post = null;
        topEntries.entries = [];
    }

    // filter by read and unread
    topEntries.reads = function(posts_array){
      var arr = [];
      var len = posts_array.length;
      for (var i = 0; i < len; i++) {
        arr.push( posts_array[i].data.name );
      }

      var params = {
        'posts[]': arr
      };
      $http.get('/api/v1/posts/check_reads.json', {params: params}).then(
        function(res, status){
          var reads = res.data;
          
          for (var i = 0; i < len; i++) {
            if(reads.includes(posts_array[i].data.name)){
              posts_array[i].data.read = true;
            }
          }
          topEntries.entries = posts_array;
        },
        function(res, status){
          console.log("Error marking as read.");
        }
      );
      
    }

    // filter by read and unread
    topEntries.filter = function(readState){

    }

    // paginate
    topEntries.paginate = function(next){

    }

  }
})();
