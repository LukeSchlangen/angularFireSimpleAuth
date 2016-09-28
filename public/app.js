var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function($scope, $firebaseArray, $firebaseAuth) {
  var auth = $firebaseAuth();

  console.log(auth);

  $scope.logIn = function login(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  };

  auth.$onAuthStateChanged(function(){
    var ref = firebase.database().ref().child("messages");
    // create a synchronized array
    $scope.messages = $firebaseArray(ref);
    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.addMessage = function() {
      $scope.messages.$add({
        text: $scope.newMessageText
      });
    };
    // click on `index.html` above to see $remove() and $save() in action
  });

  $scope.logOut = function(){
    auth.$signOut(function(){
      console.log('Logged out!');
    })
  };
});
