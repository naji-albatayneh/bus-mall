'use strict';
let maxNumOfSelection=25;
let counter=maxNumOfSelection;
let selections=0;
let arrOfProducts=[];

let container=document.getElementsByClassName('imgContainer');

let firstImage=document.getElementById('firstImg');
let secondImage=document.getElementById('secondImg');
let thirdImage=document.getElementById('thirdImg');
let resultsButton=document.getElementById('btn');

resultsButton.hidden=true;

let unOrderedList = document.getElementById('unList');

let firstIndex;
let secondIndex;
let thirdIndex;

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
new Product('water-can', 'images/water-can.jpg');

//console.log(arrOfProducts);


//Help function
function GenerateRandomIndex(){
  //The maximum and minimum are inclusive
  let randomIndex= Math.floor(Math.random() * arrOfProducts.length);
  return randomIndex;
}

function renderProducts(){
  //generating Three random indexes
  firstIndex=GenerateRandomIndex();
  secondIndex=GenerateRandomIndex();
  thirdIndex=GenerateRandomIndex();

  while(firstIndex===secondIndex){
    secondIndex=GenerateRandomIndex();
  }
  while(thirdIndex===firstIndex || thirdIndex===secondIndex){
    thirdIndex=GenerateRandomIndex();
  }

  //rendering
  firstImage.setAttribute('src', arrOfProducts[firstIndex].path);
  arrOfProducts[firstIndex].shown++;

  secondImage.setAttribute('src', arrOfProducts[secondIndex].path);
  arrOfProducts[secondIndex].shown++;

  thirdImage.setAttribute('src', arrOfProducts[thirdIndex].path);
  arrOfProducts[thirdIndex].shown++;

  let h2=document.getElementById('headerTwo');
  if(counter===0){
    h2.textContent=`Thanks! You have done 25 votes. Click to show the results`;
  }else{
    h2.textContent=`Select an item to vote. You have ${counter} votes left`;
  }

  console.log(arrOfProducts);
}

renderProducts();

firstImage.addEventListener('click', handleClicking);
secondImage.addEventListener('click', handleClicking);
thirdImage.addEventListener('click', handleClicking);
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

  resultsButton.removeEventListener('click', handleButtonClicking);
}



function handleClicking(event){
  selections++;
  counter--;
  if(selections <= maxNumOfSelection){
    console.log(event.target.id);
    if(event.target.id === 'firstImg'){
      arrOfProducts[firstIndex].selected++;
      // console.log(arrOfObjects[leftImageIndex].votes);
    }else if(event.target.id === 'secondImg'){
      arrOfProducts[secondIndex].selected++;
      // console.log(arrOfObjects[rightImageIndex].votes);
    }else if(event.target.id === 'thirdImg'){
      arrOfProducts[thirdIndex].selected++;
    }

    renderProducts();

  }else{
    alert('Thanks for voting! Press OK to continue. Click the Button to show results.');
    resultsButton.hidden=false;

    firstImage.removeEventListener('click', handleClicking);
    secondImage.removeEventListener('click', handleClicking);
    thirdImage.removeEventListener('click', handleClicking);
  }
}
