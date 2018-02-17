
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDW2TQCRWdfe6pcW_9RkOy3PYwOoozhAW0",
    authDomain: "trivia-2146e.firebaseapp.com",
    databaseURL: "https://trivia-2146e.firebaseio.com",
    projectId: "trivia-2146e",
    storageBucket: "",
    messagingSenderId: "889129880038"
  };

//Iniciar con google.
  firebase.initializeApp(config);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE) //esto es para que se borre el usuario activo cada vez que inicio sesion
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().GoogleAuthProvider();
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

 var provider = new firebase.auth.GoogleAuthProvider();

 function signIn(){
 firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user.displayName);
   $('.image').append('<p>Welcome '+ user.displayName +'<p>');
 

  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("existe usuario activo");
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    $('#google-sign').addClass('hidden');
    $('#play').removeClass('hidden');
    $('#play2').removeClass('hidden');
   

  } else {
    // User is signed out.
    // ...
    //
    console.log("No existe usuario activo");
  }
});

}

observador();
    


fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple')
.then((response)=>{
return response.json();
})
.then((data) =>{
  console.log(data);
let correct = 0;
let count = 0; //para ir avanzando a traves del array results a cada click.
$('.game').empty();
$('#play').on('click', function(){
$('.message').empty();
$('#play').addClass('hidden');
$('#play2').addClass('hidden');
$('.principal').addClass('hidden');
let results = data.results;
let allQuestion =[];

//creando el array con alternativa correcta e incorrectas.
allQuestion.push(results[count].correct_answer);
allQuestion.push(results[count].incorrect_answers[0]);
allQuestion.push(results[count].incorrect_answers[1]);
allQuestion.push(results[count].incorrect_answers[2]);
console.log(allQuestion);

//llamando a la función que escoge una alternativa random.
var chooser = randomNoRepeats(allQuestion);
 
$('.game').append(`<div class="row">
    <div class = "col-xs-12 myQuestion text-center">

      <h1 id='question'>${results[count].question}</h1> 
        <div>
          <button class="choice"  id="textChoice1">${chooser()}</button>
        </div>
        <div>
          <button class="choice" id="textChoice2">${chooser()}</button>
        </div>
        <div>
          <button class="choice" id="textChoice3">${chooser()}</button>
        </div>
        <div>
          <button class="choice" id="textChoice4">${chooser()}</button>
        </div>
    </div>
  </div>
</div>`);

$('.choice').on('click',function(){
//si la respuesta escogida es igual a la respuesta correcta
 if($(this).text() === results[count].correct_answer && count !== 10){
 $('.game').empty();
 $('#play').text('Next Question');
 $('#play').removeClass('hidden');
$('.game').append('<h1 class="message">Correct Answer!!</h1>');

correct ++; console.log(correct);
 }
if($(this).text() !== results[count].correct_answer && count !== 10){
  $('.game').empty();
  $('.game').append(`<h1 class="message">Aww wrong answer!</h1><span class="message">The correct answer is ${results[count].correct_answer}<span>`);

  $('#play').removeClass('hidden');
  

 }count++; console.log(count);
 if(count === 10){
$('.game').empty();
$('.game').append(`<h1>You got ${correct} out of 15</h1>`);
$('.game').append('<button class="playAgain" >Play Again</button>');
$('#play').addClass('hidden');
 }

$('.playAgain').on('click', function(){
location.reload();

})
})

});

});
// Llamada para usar trivia en versión True/False
fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean')
.then((response)=>{

  return response.json();
}).then((data)=>{
  console.log(data);
  let correct =0;
  let count = 0;
  $('.game').empty();
$('#play2').on('click', function(){
$('.message').empty();
$('#play').addClass('hidden');
$('#play2').addClass('hidden');
$('.principal').addClass('hidden');
let results = data.results;
let allQuestion =[];

//creando el array con alternativa correcta e incorrectas.
allQuestion.push(results[count].correct_answer);
allQuestion.push(results[count].incorrect_answers[0]);

console.log(allQuestion);

//llamando a la función que escoge una alternativa random.
var chooser = randomNoRepeats(allQuestion);
 
$('.game').append(`<div class="row">
    <div class = "col-xs-12 myQuestion text-center">

      <h1 id='question'>${results[count].question}</h1> 
        <div>
          <button class="choice"  id="textChoice1">${chooser()}</button>
        </div>
        <div>
          <button class="choice" id="textChoice2">${chooser()}</button>
        </div>
    </div>
  </div>
</div>`);

$('.choice').on('click',function(){
//si la respuesta escogida es igual a la respuesta correcta
 if($(this).text() === results[count].correct_answer && count !== 10){
 $('.game').empty();
$('.game').append('<h1 class="message">Correct answer!!</h1>');
$('#play2').text('Next Question');
 $('#play2').removeClass('hidden');
 $('.icon').show();
 correct++; console.log(correct);
 }
if($(this).text() !== results[count].correct_answer && count !== 10){
  $('.game').empty();
  $('.game').append(`<h1 class="message">Aww wrong answer!</h1>`);
  $('#play2').text('Next Question');
 $('#play2').removeClass('hidden');


 }count++; 
 if(count === 10){
$('.game').empty();
$('.game').append(`<h1>You got ${correct} out of 15</h1>`);
$('.game').append('<button class="playAgain" >Play Again</button>');
$('#play2').addClass('hidden');

 }
 $('.playAgain').on('click', function(){
location.reload();

})
})

});

});

//función para el orden random de las alternativas, sin repetir.

function randomNoRepeats(array) {
  let copy = array.slice(0);
  return function() {
    if (copy.length < 1) { copy = array.slice(0); }
    let index = Math.floor(Math.random() * copy.length);
    let item = copy[index];
    copy.splice(index, 1);
    return item;
  };
}

