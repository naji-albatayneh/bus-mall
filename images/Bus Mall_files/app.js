'use strict';
let maxNumOfSelection=25;
let counter=maxNumOfSelection;
let selections=0;
let arrOfProducts=[];
let arrOfNames=[];
let arrOfSelected=[];
let arrOfShown=[];

let container=document.getElementById('imgContainer1');

let firstImage=document.getElementById('firstImg');
let secondImage=document.getElementById('secondImg');
let thirdImage=document.getElementById('thirdImg');
let resultsButton=document.getElementById('btn');

resultsButton.hidden=true;

let unOrderedList = document.getElementById('unList');

let index = generateRandomIndex();
let indexArr=[];

let barChart = document.getElementById('dataChart').getContext('2d');

///////////////////

function Product(productName, productPath){
  this.name=productName;
  this.path=productPath;
  this.shown=0;
  this.selected=0;
  arrOfProducts.push(this);
}

//Objects
new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.png');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('usb', 'images/usb.gif');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');

//Copying the products name from opjects to an array
for(let i=0;i<arrOfProducts.length;i++){
  arrOfNames[i]=arrOfProducts[i].name;
}

//Help function
function generateRandomIndex(){
  //The maximum and minimum are inclusive
  let randomIndex= Math.floor(Math.random() * arrOfProducts.length);
  return randomIndex;
}

/////Initializing indexArr with three random and unique indexes
indexArr[0]=generateRandomIndex();
indexArr[1]=generateRandomIndex();
indexArr[2]=generateRandomIndex();
while(indexArr[0]===indexArr[1]){
  indexArr[1]=generateRandomIndex();
}
while(indexArr[2]===indexArr[0] || indexArr[2]===indexArr[1]){
  indexArr[2]=generateRandomIndex();
}
console.log('initizlizing 3 indexes: ' + indexArr);

///////Generating three random, unique, and not repeated Indexes
function irredundantIndexes(){
  for(let i=0;i<3;i++){
    index = generateRandomIndex();
    while(index===indexArr[0] || index===indexArr[1] || index===indexArr[2]){
      index = generateRandomIndex();
    }
    indexArr[i]=index;
    //console.log(indexArr[i]);
  }
  console.log('irredundantIndexes: ' + indexArr);
  renderProducts();
}

//////Rendering Images for voting
function renderProducts(){
  firstImage.setAttribute('src', arrOfProducts[indexArr[0]].path);
  arrOfProducts[indexArr[0]].shown++;
  arrOfShown[indexArr[0]]=arrOfProducts[indexArr[0]].shown;

  secondImage.setAttribute('src', arrOfProducts[indexArr[1]].path);
  arrOfProducts[indexArr[1]].shown++;
  arrOfShown[indexArr[1]]=arrOfProducts[indexArr[1]].shown;

  thirdImage.setAttribute('src', arrOfProducts[indexArr[2]].path);
  arrOfProducts[indexArr[2]].shown++;
  arrOfShown[indexArr[2]]=arrOfProducts[indexArr[2]].shown;

  let h2=document.getElementById('headerTwo');
  if(counter===0){
    h2.textContent='Thanks! You have done 25 votes. Click to show the results';
  }else{
    h2.textContent=`Select an item to vote. You have ${counter} votes left`;
  }

}

renderProducts();

///////////Chart Render////////
function chartRendering(){
  barChart = new Chart(barChart, {

    type: 'bar',
    ticks: {min: 0},
    data: {
      labels: arrOfNames,
      datasets: [{
        label: 'Selected Products',
        backgroundColor: '#daa520',
        borderColor: '#daa520',
        data: arrOfSelected,
      },{
        label: 'Shown Products',
        backgroundColor: 'rgb(28, 158, 61)',
        borderColor:'rgb(28, 158, 61)',
        data:arrOfShown,

      }]
    },

    // Configuration options go here
    options: {}
  });


}
console.log(barChart);
container.addEventListener('click', handleClicking);
resultsButton.addEventListener('click', handleButtonClicking);

function handleButtonClicking(event){
  //rendring results
  alert('You have contirbuted with 25 votes on our system. The following are your voting results.');
  resultsButton.hidden=true;

  let li;
  for(let i = 0 ; i < arrOfProducts.length; i++){
    li = document.createElement('li');
    unOrderedList.appendChild(li);
    li.textContent = `${arrOfProducts[i].name} was shown ${arrOfProducts[i].shown} times, and was selected ${arrOfProducts[i].selected} times.`;
  }
  chartRendering();
  resultsButton.removeEventListener('click', handleButtonClicking);
}


function handleClicking(event){
  selections++;
  counter--;
  if(selections <= maxNumOfSelection){
    if(event.target.id === 'firstImg'){
      arrOfProducts[indexArr[0]].selected++;
      arrOfSelected[indexArr[0]]=arrOfProducts[indexArr[0]].selected;
    }else if(event.target.id === 'secondImg'){
      arrOfProducts[indexArr[1]].selected++;
      arrOfSelected[indexArr[1]]=arrOfProducts[indexArr[1]].selected;
    }else if(event.target.id === 'thirdImg'){
      arrOfProducts[indexArr[2]].selected++;
      arrOfSelected[indexArr[2]]=arrOfProducts[indexArr[2]].selected;
    }

    irredundantIndexes();

  }else{
    alert('Thanks for voting! Press OK to continue. Click the Button to show results.');
    resultsButton.hidden=false;

    // firstImage.removeEventListener('click', handleClicking);
    // secondImage.removeEventListener('click', handleClicking);
    // thirdImage.removeEventListener('click', handleClicking);
    container.removeEventListener('click', handleClicking);
  }
}
