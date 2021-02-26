'use strict';
let maxNumOfSelection=25;
let counter=maxNumOfSelection;
let selections=0;
let arrOfProducts=[]; //Need tracking
let arrOfNames=[];
let arrOfSelected=[];
let arrOfShown=[];

let container=document.getElementById('imgContainer1');

let firstImage=document.getElementById('firstImg');
let secondImage=document.getElementById('secondImg');
let thirdImage=document.getElementById('thirdImg');
let resultsButton=document.getElementById('btn');


let unOrderedList = document.getElementById('unList');

let index = generateRandomIndex();
let indexArr=[];

let barChart = document.getElementById('dataChart').getContext('2d');

///////////Constructor Function/////////
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


/////////Help function////////
function generateRandomIndex(){
  //The maximum and minimum are inclusive
  let randomIndex= Math.floor(Math.random() * arrOfProducts.length);
  return randomIndex;
}

/////Initializing indexArr with three random and unique indexes////////
indexArr[0]=generateRandomIndex();
indexArr[1]=generateRandomIndex();
indexArr[2]=generateRandomIndex();
while(indexArr[0]===indexArr[1]){
  indexArr[1]=generateRandomIndex();
}
while(indexArr[2]===indexArr[0] || indexArr[2]===indexArr[1]){
  indexArr[2]=generateRandomIndex();
}

///////Generating three random, unique, and not repeated Indexes////////
function irredundantIndexes(){
  for(let i=0;i<3;i++){
    index = generateRandomIndex();
    while(index===indexArr[0] || index===indexArr[1] || index===indexArr[2]){
      index = generateRandomIndex();
    }
    indexArr[i]=index;
  }
  console.log('irredundantIndexes: ' + indexArr);
  renderProducts();
}

//////Rendering Images for voting////////
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
  if(counter===1){
    h2.textContent='Thanks! You have done 25 votes. Click to show the results';
    resultsButton.hidden=false;
  }else{
    h2.textContent=`Select an item to vote. You have ${counter} votes left`;
    resultsButton.hidden=true;
  }
}
renderProducts();//START>>

///////////Chart Render////////
function chartRendering(){
  resultsButton.hidden=true;
  chart = new Chart(barChart, {
    type: 'bar',
    data: {
      labels: arrOfNames,
      datasets: [{
        label: 'Times Selected',
        backgroundColor: '#daa520',
        borderColor: '#daa520',
        data: arrOfSelected,
      },{
        label: 'Times Shown',
        backgroundColor: 'rgb(28, 158, 61)',
        borderColor:'rgb(28, 158, 61)',
        data:arrOfShown,
      }]
    },
    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            stepSize: 1
          }
        }]
      }
    }
  });
}

////////EventListeners/////////
container.addEventListener('click', handleClicking);
resultsButton.addEventListener('click', handleButtonClicking);

/////////Copying the products name from opjects to an array/////////
if(!arrOfProducts){
  getFromLocalStorage();
}
for(let i=0;i<arrOfProducts.length;i++){
  arrOfNames[i]=arrOfProducts[i].name;
}


//////////Button Click///////
function handleButtonClicking(event){
  //rendring results list
  if(!arrOfProducts){
    alert('Your voting data is safe. Click the Resulrs button to see the results');
    getFromLocalStorage();
  }else{
    setToLocalStorage();
    resultsButton.hidden=true;
    alert('You have contirbuted with 25 votes on our system. The following are your voting results.');
  }
  let li;
  for(let i = 0 ; i < arrOfProducts.length; i++){
    li = document.createElement('li');
    unOrderedList.appendChild(li);
    li.textContent = `${arrOfProducts[i].name} was shown ${arrOfProducts[i].shown} times, and was selected ${arrOfProducts[i].selected} times.`;
  }
  chartRendering();
  resultsButton.removeEventListener('click', handleButtonClicking);
}

///////////Image Click////////
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
    //save3
    setToLocalStorage();
    alert('Thanks for voting! Press OK to continue. Click the Button to show results.');
    resultsButton.hidden=false;
    container.removeEventListener('click', handleClicking);
  }

}

function setToLocalStorage(){
  let listIn =JSON.stringify(arrOfProducts);
  localStorage.setItem('trackedArrOfProducts',listIn);
}

function getFromLocalStorage(){
  let retrievedList = localStorage.getItem('trackedArrOfProducts');
  let listOut = JSON.parse(retrievedList);
  arrOfProducts=listOut; //update
}
