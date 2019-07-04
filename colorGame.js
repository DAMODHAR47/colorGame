var num=6;
var colors =[];
var pickedColor;

var header = document.getElementsByTagName("h1");
var squares = document.getElementsByClassName("square");
var displayColor = document.getElementById("displayColor");
var middlelayer = document.querySelector("#middlelayer span");
var resetButton = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".mode");

init();

function init(){
	btnListeners();
	squareListeners()
	reset();
}

resetButton.addEventListener("click",function(){
	reset();
});

function btnListeners(){
	for(var i=0;i<modeBtn.length;i++){
		modeBtn[i].addEventListener("click",function(){
			modeBtn[0].classList.remove("selectedMode");
			modeBtn[1].classList.remove("selectedMode");
			this.classList.add("selectedMode");
			num =(this.textContent ==="Easy")?3:6;
			reset();
		});
	}
}

function reset(){
		colors =generateRandomColor(num);
		pickedColor = pickColor(num);
		displayColor.textContent=pickedColor;
		for(var i=0; i<squares.length ;i++){
			if(colors[i]){
				squares[i].style.display="block";
				squares[i].style.background = colors[i];
			}else{
				squares[i].style.display="none";
			}
		}
		header[0].style.background="steelblue";
		resetButton.textContent="New Colors";
		middlelayer.textContent="";
}

function squareListeners(){
	for(var i=0; i<squares.length ;i++){
		squares[i].style.background = colors[i];
		squares[i].addEventListener("click",function () {
			var clickedColor =this.style.background
			if(clickedColor === pickedColor){
				makeAllColorsSame();
				middlelayer.textContent="correct";
				header[0].style.background=pickedColor;    //tagName always returns list
				resetButton.textContent="Play Again?"
			}else{
				// this.style.display="none"; this removes the block and next one moves to its place
				this.style.background = "#232323";
				middlelayer.textContent="try again";
			}
		})
	}
}

function pickColor(number){
	var randomNumber = Math.floor(Math.random()*number);
	return colors[randomNumber];
}

function generateRandomColor(num){
	var arr =[];
	for(var i=0;i<num;i++){
		var string="rgb("+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+")";
		arr.push(string); //arr[i]=string; same
	}
	return arr;
}

var  makeAllColorsSame=function(){
	for(var i=0;i<squares.length;i++){
		squares[i].style.background= pickedColor;
	}
}