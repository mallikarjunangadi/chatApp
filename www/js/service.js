 var sockt = io.connect('http://localhost:8080');
angular.module('chatApp.services', []).factory("myFactory", function($q) {
    var userDetails = {};
    // var deferred = $q.defer();

    function set(data) {
        userDetails = data;
        console.log('entered set factory')
        console.log(userDetails);
    }

    function get() {
        // deferred.resolve(userDetails);
        return userDetails;
        //  return deferred.promise; 
    }

    return {
        set: set,
        get: get
    }
}).factory("toServer", function($q) {
    var sockt = io.connect('http://localhost:8080');
    // var deferred = $q.defer();

    
    function on(eName, callback) {  

      sockt.on(eName, function(data) {
        console.log(data);
        callback(data);
      })
    }

    function emit(eName, data) {
        console.log(data);
        sockt.emit(eName, data)
    }

    return {
        emit: emit,
        on:on
    }
})

.factory('iosocket', function() {
    //Create socket and connect to http://chat.socket.io 
//    var myIoSocket = io.connect('http://localhost:8080');
/*    
    mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
*/

   var scket = io.connect('http://localhost:8080');

    function on(eventName, callback) {
      scket.on(eventName, function(event, data) {
         console.log(data);
         callback(data);
      });
    }

    function emit(eventName, data, callback) {
      scket.emit(eventName, data);  	  
    }

    
})
