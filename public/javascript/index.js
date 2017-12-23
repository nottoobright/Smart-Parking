// Initialize Firebase
var config = {
  apiKey: "AIzaSyCOkSZJCw6sdPLsH2SLgRSv_4jP31JYGBQ",
  authDomain: "sih-web.firebaseapp.com",
  databaseURL: "https://sih-web.firebaseio.com",
  projectId: "sih-web",
  storageBucket: "sih-web.appspot.com",
  messagingSenderId: "1037990012805"
};
firebase.initializeApp(config);
var parkStatus;
var db = firebase.database();

var id = hiddenId.value || Date.now();

/*db
    .ref("users/" + id)
    .set({
        name: "Yash Puthran",
        license: "MH041408",
        properly_parked: false
    });*/

parkingRef = db.ref('users/2017');

   
$(document).ready(function(){

  parkingRef.on('value', data => {
    parkStatus = reviewStatus(data.val());
          if(!parkStatus) {
        document.getElementById('toggle-status').classList.remove("parkingStatusOk");
        document.getElementById('toggle-status').classList.remove("glyphicon-ok");
        document.getElementById('toggle-status').classList.add("parkingStatusWrong");
        document.getElementById('toggle-status').classList.add("glyphicon-remove");
    };
    if(parkStatus) {
        document.getElementById('toggle-status').classList.add("parkingStatusOk");
        document.getElementById('toggle-status').classList.add("glyphicon-ok");
        document.getElementById('toggle-status').classList.remove("parkingStatusWrong");
        document.getElementById('toggle-status').classList.remove("glyphicon-remove");
    };
    console.log("Value");
    const message = reviewMessage(data.val());
    responsiveVoice.speak(message);
  });


});

function reviewStatus({name, license, properly_parked, message}) {
    return properly_parked;
};

function reviewMessage({name, license, properly_parked, message}) {
    return message;
};

