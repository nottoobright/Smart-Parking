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

var db = firebase.database();

var id = hiddenId.value || Date.now();

db
    .ref("users/" + id)
    .set({
        name: "Yash Puthran",
        license: "MH041408",
        properly_parked: false
    });

parkingRef = db.ref('/users/');

parkingRef.on("child_added", data => {
    parkStatus = reviewStatus(data.val());
});

console.log(parkStatus);

   
if(!parkStatus) {
    document.getElementById('toggle-status').classList.remove("parkingStatusOk");
    document.getElementById('toggle-status').classList.remove("glyphicon-ok");
    document.getElementById('toggle-status').classList.add("parkingStatusWrong");
    document.getElementById('toggle-status').classList.add("glyphicon-remove");
};



function reviewStatus({name, liicense, properly_parked}) {
    return `${properly_parked}`;
};

console.log("This works")
