
fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple')
.then((response)=>{
return response.json();
})
.then((data) =>{
  console.log(data);
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
 $('#play').text('Next');
 $('#play').removeClass('hidden');
$('.game').append('<h1 class="message">Correct Answer!!</h1>');

 }
if($(this).text() !== results[count].correct_answer && count !== 10){
  $('.game').empty();
  $('.game').append(`<h1 class="message">Aww wrong answer!</h1><span>The correct answer is ${results[count].correct_answer}<span>`);

  $('#play').removeClass('hidden');
  

 }count++; console.log(count);
 if(count === 10){
$('.game').empty();
$('.game').append('<h1>final !!!</h1>')
 }
})

});

});
// Llamada para usar trivia en versión True/False
fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean')
.then((response)=>{

  return response.json();
}).then((data)=>{
  console.log(data);

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

 }
if($(this).text() !== results[count].correct_answer && count !== 10){
  $('.game').empty();
  $('.game').append(`<h1 class="message">Aww wrong answer!</h1>`);
  $('#play2').text('Next Question');
 $('#play2').removeClass('hidden');


 }count++; 
 if(count === 10){
$('.game').empty();
$('.game').append('<h1>final !!!</h1>')
 }
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

