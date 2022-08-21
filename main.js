var firebaseConfig = {
  apiKey: "AIzaSyCSxsngJCCTsHhh9DaWga8UMD9oi1iYfJw",
  authDomain: "formtrial-277d1.firebaseapp.com",
  projectId: "formtrial-277d1",
  storageBucket: "formtrial-277d1.appspot.com",
  messagingSenderId: "263530102538",
  appId: "1:263530102538:web:f42ef1eab99ebd978b84f3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var database = firebase.database();

function save(){
  var name = document.getElementById('name').value
  var pickuplocation = document.getElementById('pickuplocation').value
  var email = document.getElementById('email').value
  var phone = document.getElementById('phone').value

  database.ref('users/'+name).set({

    name:name,
    email : email,
    pickuplocation : pickuplocation,
    phone : phone,
  })

  
 
}
//alert
document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();


  function mail(params){
  var tempParams={
    from_name: document.getElementById('name').value,
    to_name: document.getElementById('email').value,
    message:document.getElementById('phone').value,
 }
 emailjs.send('service_16seg29','template_h4sfj4u',tempParams)
 .then(function(res){
   console.log('success',res.status);
   alert("success")
 })
 
};


//function sendMail(params){
//  var tempParams={
//     from_name: document.getElementById('username').value,
//     to_name: document.getElementById('email').value,
//     message:document.getElementById('text').value,
//  }
//  emailjs.send('service_16seg29','template_h4sfj4u',tempParams)
//  .then(function(res){
//    console.log('success',res.status);
//    alert("success")
//  })
//  
//};
//refrence ontactinfo
//let contactInfo = firebase.databse().ref("infos");
//
////listen for a submit
//document.querySelector(".contact-form").addEventListener("submit",submitForm);
//
//function submitForm(e) {
//  e.preventDefault();
//  
//  // get input Values
//  let user = document.querySelector(".user").value;
//  let email = document.querySelector(".email").value;
//  let message = document.querySelector(".message").value;
//  console.log (user,email,message);
//
//  saveContactInfo(user,email,message);
//}
//
////save infos to firebase
//function saveContactInfo(name,email, message)
//  
//  firebase.database().ref('trial/' ).set({
//    user:user,
//    email:email,
//    message:message,
//  }, (error) => {
//    if (error) {
//      // The write failed...
//      console.log(error)
//    } else {
//      // Data saved successfully!
//      console.log('Datata saved ...................')
//    }
//  });