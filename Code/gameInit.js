let numShips = 3; //default ship number
let Player1Ships;
let Player2Ships;
let specCountP1 = 2
let specCountP2 = 2
let difficulty = "Easy"; //The difficulty of the AI
let AIactivated = false; //bool representing whether the AI is activated
let gameSetup = false; 
let gameShownForP1 = false;
let gameShownForP2 = false;
let firstTurn = false;

let enemyShips = []; //used in hardAttack with all of player 1's ship locations
let hitship = false; //bool representing whether a ship is hit in mediumAttack
let hitCoordinates = []; //the coordinates of ships hit in mediumAttack
let differentShips = false; //represents whether there are different ships in the hit coordinate array
let hitShipNum = 0;//Number of the ship being attack by the medium ai


var p1ShipLoc = matrix(); 
var p2ShipLoc = matrix();
var p1sFireLoc = matrix();
var p2sFireLoc = matrix();

//These two contains the location of all ships for each ship
//Each variable contains two arrays
//The first array contains these locations 
//The second contains whether that ship is hit or not, which is either 0 or 1
//0 for not hit
//1 for sunk
var p1ShipLocArr;
var p2ShipLocArr;

let p1Ship1Sunk = false, p1Ship2Sunk = false, p1Ship3Sunk = false, p1Ship4Sunk = false, p1Ship5Sunk = false;
let p2Ship1Sunk = false, p2Ship2Sunk = false, p2Ship3Sunk = false, p2Ship4Sunk = false, p2Ship5Sunk = false;

function matrix(){

  var arr = [];

  // Creates all lines:
  for(var i=0; i < 10; i++){

      // Creates an empty line
      arr.push([]);

      // Adds cols to the empty line:
      arr[i].push( new Array(10));

      for(var j=0; j < 10; j++){
        // Initializes:
        arr[i][j] = 0;
      }
  }

return arr;
}

function p1ShipHealth(shipNum) {
  let health = shipNum; // by default, a ship's health equals its size
  let row, col;

  if (shipNum == 1 && !p1Ship1Sunk) { // if ship 1 is the one we're checking, and it's not sunk,
    col = p1ShipLocArr[0][0].toLowerCase().charCodeAt(0) - 97; // extracts the column appropriately from the ships' location array
    row = Number(p1ShipLocArr[0][0].toLowerCase().substring(1, p1ShipLocArr[0][0].length)) - 1; // extracts the row

    if (p2sFireLoc[row][col] == 1) // 1 signifies that the ship at that index was attacked
      health--;

    if (health == 0) {
      alert("Ship 1 has sunk!")
      p1Ship1Sunk = true;
      return 0;
    }
  }

  else if (shipNum == 2 && !p1Ship2Sunk) {
    for (let i = 1; i <= 2; i++) {
      col = p1ShipLocArr[0][i].toLowerCase().charCodeAt(0) - 97;
      row = Number(p1ShipLocArr[0][i].toLowerCase().substring(1, p1ShipLocArr[0][i].length)) - 1;

      if (p2sFireLoc[row][col] == 1)
        health--;

      if (health == 0) {
        alert("Ship 2 has sunk!")
        p1Ship2Sunk = true;
        return 0;
      }
    }
  }

  else if (shipNum == 3 && !p1Ship3Sunk) {
    for (let i = 3; i <= 5; i++) {
      col = p1ShipLocArr[0][i].toLowerCase().charCodeAt(0) - 97;
      row = Number(p1ShipLocArr[0][i].toLowerCase().substring(1, p1ShipLocArr[0][i].length)) - 1;

      if (p2sFireLoc[row][col] == 1)
        health--;

      if (health == 0) {
        alert("Ship 3 has sunk!")
        p1Ship3Sunk = true;
        return 0;
      }
    }
  }

  else if (shipNum == 4 && !p1Ship4Sunk) {
    for (let i = 6; i <= 9; i++) {
      col = p1ShipLocArr[0][i].toLowerCase().charCodeAt(0) - 97;
      row = Number(p1ShipLocArr[0][i].toLowerCase().substring(1, p1ShipLocArr[0][i].length)) - 1;

      if (p2sFireLoc[row][col] == 1)
        health--;

      if (health == 0) {
        alert("Ship 4 has sunk!")
        p1Ship4Sunk = true;
        return 0;
      }
    }
  }

  else if (shipNum == 5 && !p1Ship5Sunk) {
    for (let i = 10; i <= 14; i++) {
      col = p1ShipLocArr[0][i].toLowerCase().charCodeAt(0) - 97;
      row = Number(p1ShipLocArr[0][i].toLowerCase().substring(1, p1ShipLocArr[0][i].length)) - 1;

      if (p2sFireLoc[row][col] == 1)
        health--;

      if (health == 0) {
        alert("Ship 5 has sunk!")
        p1Ship5Sunk = true;
        return 0;
      }
    }
  }

  else return 0; // if the ship had already sunk in a previous call

  return health; // otherwise, return the ship's health
}

function p2ShipHealth(shipNum) { // same as p1ShipHealth but for Player 2
  let health = shipNum;
  let row, col;

  if (shipNum == 1 && !p2Ship1Sunk) {
    col = p2ShipLocArr[0][0].toLowerCase().charCodeAt(0) - 97;
    row = Number(p2ShipLocArr[0][0].toLowerCase().substring(1, p2ShipLocArr[0][0].length)) - 1;

    if (p1sFireLoc[row][col] == 1)
      health--;

    if (health == 0) {
      alert("Ship 1 has sunk!")
      p2Ship1Sunk = true;
      return 0;
    }
  }

  else if (shipNum == 2 && !p2Ship2Sunk) {
    for (let i = 1; i <= 2; i++) {
      col = p2ShipLocArr[0][i].toLowerCase().charCodeAt(0) - 97;
      row = Number(p2ShipLocArr[0][i].toLowerCase().substring(1, p2ShipLocArr[0][i].length)) - 1;

      if (p1sFireLoc[row][col] == 1)
        health--;

      if (health == 0) {
        alert("Ship 2 has sunk!")
        p2Ship2Sunk = true;
        return 0;
      }
    }
  }

  else if (shipNum == 3 && !p2Ship3Sunk) {
    for (let i = 3; i <= 5; i++) {
      col = p2ShipLocArr[0][i].toLowerCase().charCodeAt(0) - 97;
      row = Number(p2ShipLocArr[0][i].toLowerCase().substring(1, p2ShipLocArr[0][i].length)) - 1;

      if (p1sFireLoc[row][col] == 1)
        health--;

      if (health == 0) {
        alert("Ship 3 has sunk!")
        p2Ship3Sunk = true;
        return 0;
      }
    }
  }

  else if (shipNum == 4 && !p2Ship4Sunk) {
    for (let i = 6; i <= 9; i++) {
      col = p2ShipLocArr[0][i].toLowerCase().charCodeAt(0) - 97;
      row = Number(p2ShipLocArr[0][i].toLowerCase().substring(1, p2ShipLocArr[0][i].length)) - 1;

      if (p1sFireLoc[row][col] == 1)
        health--;

      if (health == 0) {
        alert("Ship 4 has sunk!")
        p2Ship4Sunk = true;
        return 0;
      }
    }
  }

  else if (shipNum == 5 && !p2Ship5Sunk) {
    for (let i = 10; i <= 14; i++) {
      col = p2ShipLocArr[0][i].toLowerCase().charCodeAt(0) - 97;
      row = Number(p2ShipLocArr[0][i].toLowerCase().substring(1, p2ShipLocArr[0][i].length)) - 1;

      if (p1sFireLoc[row][col] == 1)
        health--;

      if (health == 0) {
        alert("Ship 5 has sunk!")
        p2Ship5Sunk = true;
        return 0;
      }
    }
  }

  else return 0; // if the ship had already sunk in a previous call

  return health;
}

function p1ShipHealthAll() { // calls p1ShipHealth for all the ships and returns an array of these individual healths
  let arr = [];
  for (let i = 1; i <= numShips; i++)
    arr.push(p1ShipHealth(i));

  return arr;
}

function p2ShipHealthAll() { // same as p1ShipHealthAll but for Player 2
  let arr = [];
  for (let i = 1; i <= numShips; i++)
    arr.push(p2ShipHealth(i));

  return arr;
}


function humanBtn(){ //Changes the board for a human match

  document.getElementById("getShipsForP2Btn").style.removeProperty("display");
  document.getElementById("humanBtn").disabled = true;
  document.getElementById("AIbtn").disabled = true;
  document.getElementById("getNoOfShipsBtn").disabled = false;
  changeVisibility(); //changes the visibility of buttons and text
  document.getElementById("P2Ships").style.removeProperty("display");
  document.getElementById("showShipsForP2Btn").style.removeProperty("display");
  document.getElementById("Opponent").innerHTML = "Select Player 2's ships location in grid  of 10X10.{ex. [C4,E3,E4] for 2 ships.}";
  document.getElementById("showShipsForP2Btn").innerHTML = "Show ships for P2";
}

function AIbtn() { //changes the board for a AI match
  difficulty = prompt("What difficulty would you like to play? (Easy, Medium, or Hard)", difficulty);
  difficulty = difficulty.toLowerCase();

  if(difficulty == "easy" || difficulty == "medium" || difficulty == "hard") { //only accepts easy, medium, hard otherwise rejected
    document.getElementById("difficulty").innerHTML = "The AI's difficulty is set to " + difficulty + " .";
    document.getElementById("AIbtn").disabled = true;
    document.getElementById("humanBtn").disabled = true;
    document.getElementById("getNoOfShipsBtn").disabled = false;
    changeVisibility();
    document.getElementById("showShipsForP2Btn").innerHTML = "Show ships for AI";
    AIactivated = true;
  }
  else window.alert("Invalid difficulty option. Try again.");
}

function changeVisibility()
{
  document.getElementById("Opponent").style.removeProperty("display");
  document.getElementById("endingLine").style.removeProperty("display");
  document.getElementById("playGameBtn").style.removeProperty("display");
}

function loadStoredVars() //stores local json variables
{
  p1ShipLoc = JSON.parse(window.localStorage.getItem("p1ShipLoc")); // Retrieving
  p2ShipLoc = JSON.parse(window.localStorage.getItem("p2ShipLoc")); // Retrieving
  numShips = JSON.parse(window.localStorage.getItem("numShips")); // Retrieving
  p1ShipLocArr=JSON.parse(window.localStorage.getItem("p1ShipLocArr")); // Retrieving
  p2ShipLocArr=JSON.parse(window.localStorage.getItem("p2ShipLocArr")); // Retrieving
  AIactivated = JSON.parse(window.localStorage.getItem("AIactivated"));
  difficulty=JSON.parse(window.localStorage.getItem("difficulty"));
}

function getShipsLocArry(shipsLoc){
  shipsLoc = shipsLoc.substring(1, (shipsLoc.length-1));
  var strArry = shipsLoc.split(",");
  var arr1 = [];
  var rows=2;
  var cols=strArry.length;
  console.log("cols="+cols);
  // Creates all lines:
  for(var i=0; i < rows; i++){

    // Creates an empty line
    arr1.push([]);

    // Adds cols to the empty line:
    arr1[i].push( new Array(cols));

    for(var j=0; j < cols; j++){
      // Initializes:
      if(i==0){
        arr1[i][j] = strArry[j].toLowerCase();  
      }
      else
      {
        arr1[i][j] = "0".toString();
      }
      
    }
}
console.log("arr1="+arr1);
console.log("arr1.length="+arr1.length);
console.log(typeof arr1);
  return arr1;
}

function fillShipsLoc(arr,shipsLoc){
  shipsLoc = shipsLoc.substring(1, (shipsLoc.length-1));
  const strArry = shipsLoc.split(",");
  //console.log(strArry);
  //console.log(strArry[0].toLowerCase().charCodeAt(0) - 97);
  //console.log(strArry[0].toLowerCase()[1]);
  let col,row;
  let shipNo=1;
  for(var i=0;i<strArry.length;i++)
    {
      col=strArry[i].toLowerCase().charCodeAt(0) - 97;
      //row=Number(strArry[i].toLowerCase()[1])-1;
      row=Number(strArry[i].toLowerCase().substring(1,strArry[i].length))-1;
      

      console.log(row,col);
      if(i==1)shipNo=2;
      if(i==3)shipNo=3;
      if(i==6)shipNo=4;
      if(i==10)shipNo=5;
      arr[row][col]= shipNo;
      //console.log(shipNo);
      //console.log(arr[row][col]);
      
    }
    //console.log(arr);
   
}

//Gets ships for players
function getNoOfShips() {
  //Asks the player for the number of ships
  numShips = prompt("Please enter number of ships", numShips);

  //Next, check if noShips is valid
  //If the input was canceled
  if(numShips == null)
  {
    //Tell the user that the input was canceled
    alert("Input Canceled.");
  }
  //Otherwise, if noShips is an empty prompt
  //Which mean noShips has a length of 0
  else if(numShips.length == 0)
  {
    //Alert the user that the prompt is empty
    alert("Input is empty. Please try again.");
  }
  //Otherwise, if noShips contains whitespace, which includes
  //spaces and 
  //Does this check by uisng indexOf to see if there is an index of noShips
  //that contains a space
  else if(numShips.indexOf(' ') >= 0)
  {
      //Tell the user that the prompy has whitespace
      alert("Input has whitespace. Input must be a number. Please try again.");
  }
  //Otherwise, if noShips is not a number
  //Use isNaN, which returns true if noShips is not a number
  else if(isNaN(numShips) == true)
  {
      //Alert the user that the input is not a number
      alert("Input is not a number. Input must be a number. Please try again.");
  }
  //Otherwise, if the length of noShips does not equal to 1
  //Prevents inputs that are way too big or small for javascript to handle
  //It also prevent negative and decminal
  else if(numShips.length != 1)
  {
      //Alert the user that input have more that 1 digit
      alert("Input is not a 1-digit number. Input must can have only 1 digit. No negative signs, decimal symbols, and extra digits. Please try again.");
  }
  //Otherwise, if noShips is not in range of 1-5
  else if(numShips < 1 || numShips > 5)
  {
      //Alert the user that the input is invalid
      alert("Input is invalid. Input must be between 1 and 5. Please try again.")
  }
  //Otherwise, noShips is valid 
  else
  {
    //Enable the getShipsForP1Btn button for Player 1 to set up their board
    document.getElementById("getShipsForP1Btn").disabled = false;

    //Tell the user the number of ships being used
    //If the number of ships being use is only 1
    if(numShips == 1)
    {
        //Set the inner html of BShips to be "1 ship will be used!"
        document.getElementById("BShips").innerHTML = numShips  + " ship will be used!";
    }
    //Otherwise, if noShips is greater than 1
    else
    {
        //Set the inner html of BShips to be noShip + " ships will be used"
        document.getElementById("BShips").innerHTML = numShips  + " ships will be used!";
    }
    
    //Disable getNoOfShipsBtn to be prevented from being used again
    document.getElementById("getNoOfShipsBtn").disabled = true;

    //Finally, convert noShips to be a number
    numShips = parseInt(numShips);
  }
}

//Checks if the input for Player's Ships is valid or not
//Return true if the input is valid and false if not
function validPlayerShips(playerShips)
{
  let shipArray = Player1Ships.replace(/[\[\]']+/g,'').split(',')
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
  if (findDuplicates(shipArray).length != 0) {
    alert("Duplicate detected!")
    return false;
  }
  //First, we need to check if playerShips is valid
  if(playerShips == null)
  {
    //Tell the user that input was canceled
    alert("Input Canceled.")

    //Return false
    return false;
  }
  //Otherwise, if the input is empty
   //Which means Player1Shps has a length of 0
   else if(playerShips.length == 0)
   {
     //Alert the user that the prompt is empty
     alert("Input is empty. Please try again.");

     //Return false
     return false;
   }
   //Otherwise, if Player1Ships contains whitespace, which includes
   //spaces and tabs
   //Does this check by uisng indexOf to see if there is an index of Player1Ships
   //that contains a space
   else if(playerShips.indexOf(' ') >= 0)
   {
       //Tell the user that the input has whitespace
       alert("Input has whitespace. Please try again.");

       //Return false
       return false;
   }
   //Otherwise, check if the input is a list
   //If the input is not a list
   else if(playerShips.charAt(0) != '[' || playerShips.charAt(playerShips.length-1) != ']')
   {
      //Tell the user that the input is not a list
      alert("Input is not a list. Must be in the format [], Please try again")

      //Return false
      return false;
   }

   //Otherwise, convert playerShips to be an array
   //Remove the brackets the surround the list
   //Store it in a new array that will store the position of the ships
   let shipPositions = playerShips.substring(1, (playerShips.length-1));

   //Split shipPosition for each comma used to create a new array of strings
   //Each element of the new array should contain a position of the ship
   shipPositions = shipPositions.split(",");

   //Next, check shipPositions if it is valid
   //If the length of shipPositions does not equal to the total number of positions 
   //the total number of postion is noShip(noShips+1)/2
   if(shipPositions.length != (numShips*(numShips+1))/2)
   {
     //Tell the user that the size of the list does not equal to the total number of positions the user can have
     alert("The size of the list does not equal to the total number of ship positions. The size of the list must be " + ((numShips*(numShips+1))/2) +".");

     //Return false
     return false;
   }

   //Next, go through each position in shipPositions to check if it is valid or not
   for(const position of shipPositions)
   {  
      //Firstly, check the size of position
      //If the size of position is not 2 or 3
      if(position.length != 2 && position.length != 3)
      {
        //Tell the user that position is not the correct length
        alert(position + " is not the correct length. Length must be either 2 or 3. Please try again.");

        //Return false
        return false;
      }
      //Otherwise if not
      else
      {
        //Get the column by getting the first character and subtract 65 from it
        let col = position.charCodeAt(0) - 65;
      
        //Next, get the row by converting the substring after index 0 into a number
        let row = Number(position.substring(1, position.length));

        //Next, check that that row and col are valid
        //If col is less 0 or greater than 9
        if(col < 0 || col > 9)
        {
           //Tell the user that column is invalid
           alert("In " + position + ", column is invalid. Must be from A to J. Please try again.");

           //Return false
           return false;
        }
        //Otherwise, if row is not a number
        else if(isNaN(row))
        {
          //Tell the user that row is not a number
          alert("In " + position + ", row is not a number. Row must be a number. Please try again.");

          //Return false
          return false;
        }
        //Otherwise, if row is out of obunds
        else if(row < 1 || row > 10)
        {
          //Tell the user that row is out of bounds
          alert("In " + position + ", row is out of bounds. Row must be between 1 and 10. Please try again.");

          //Return false
          return false;
        }
      }
   }

   //Return true if input is valid
   //Duplicates and Correct Ship Placement will be checked later
   return true;
}


//gets plalyer one's ships, shows the player 1 grid, adds a disabled button
function getShipsForP1() {
  Player1Ships = prompt("Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
  let shipArray = Player1Ships.replace(/[\[\]']+/g,'').split(',')
  
  while (!validPlayerShips(Player1Ships)) { // check for duplicates
    return
  }
  let isValid = true;

  do {
    
    let isRowSame = [true, true, true, true, true]
    let isColSame = [true, true, true, true, true]
    console.log("hello", shipArray.length)
    for (let i = 0; i < shipArray.length; i++) {
      if (i == 1) {
        for (let j = i; j < 2; j++) {
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) {
            isRowSame[0] = false
            shipArray[j+1].charAt(0)
          }
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) {
            isColSame[0] = false
          }
          if (Math.abs(shipArray[j].charAt(0).charCodeAt(0) - shipArray[j+1].charAt(0).charCodeAt(0)) > 1 || (Math.abs(shipArray[j].substring(1) - shipArray[j+1].substring(1))) > 1) {
            isValid = false;
      
          }
        
        }
      }
      if (i == 3) {
        for (let j = i; j < 5; j++) {
          
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[1] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[1] = false
          if (Math.abs(shipArray[j].charAt(0).charCodeAt(0) - shipArray[j+1].charAt(0).charCodeAt(0)) > 1 || (Math.abs(shipArray[j].substring(1) - shipArray[j+1].substring(1)) > 1)) {
            isValid = false
          }
        }
      }
      if (i == 6) {
        for (let j = i; j < 9; j++) {
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[2] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[2] = false
          if (Math.abs(shipArray[j].charAt(0).charCodeAt(0) - shipArray[j+1].charAt(0).charCodeAt(0)) > 1 || (Math.abs(shipArray[j].substring(1) - shipArray[j+1].substring(1)) > 1)) {
            isValid = false
          }
        }
      }
      if (i == 10) {
        for (let j = i; j < 14; j++) {
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[3] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[3] = false
          if (Math.abs(shipArray[j].charAt(0).charCodeAt(0) - shipArray[j+1].charAt(0).charCodeAt(0)) > 1 || (Math.abs(shipArray[j].substring(1) - shipArray[j+1].substring(1)) > 1)) {
            isValid = false
          }
        }
      }
    } 
    console.log(shipArray)
    
    for (let i = 0; i < isRowSame.length; i++) {
      if (isRowSame[i] == false && isColSame[i] == false) {
        isValid = false;
      }
      console.log("Row: ", isRowSame[i], "Col: ", isColSame[i])
    }
    
    
    if (!isValid) {
      alert("Wrong input! Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
      return
    }
  }while (!isValid)
  
  if (isValid) {
    fillShipsLoc(p1ShipLoc,Player1Ships);
    p1ShipLocArr= getShipsLocArry(Player1Ships);
    document.getElementById("getShipsForP2Btn").disabled = false;
    document.getElementById("showShipsForP1Btn").disabled = false;
    //In the paragraph with id P1Ships, tell the user that Player 1's Board is set up
    document.getElementById("P1Ships").innerHTML = "Player 1 has set their board";
    document.getElementById("getShipsForP1Btn").disabled = true;

    if(AIactivated) AIsetup();
  }
}

function AIsetup() { //regardless of difficulty, it setups a randomized board for the AI
  let AIships = "[";
  let row = 0, col = 0;
  let temp;
  let adjuster = true; 
  let checker = true;

  for(let i=0; i<numShips; i++) 
  {
    adjuster = Math.random() < .5; //determines whether it will be a horizontal or vertical ship

    do{
      temp = "";

      do{
        row = Math.floor(Math.random() * 10); 
        col = Math.floor(Math.random() * 10);
      }while(row == 9-i && col == 9-i);

      for(let j=0; j < i+1; j++) //repeats placement process until all ship spots for that ship can be placed
      {

        if(!checker){ //new starting spot if the old one fails

          do{
            row = Math.floor(Math.random() * 10); 
            col = Math.floor(Math.random() * 10);
          }while(row == 9-i && col == 9-i);
        }


        if(adjuster) //the if statements below verify that it is in the grid post adjustment
        {
          if(row+j < 9){ 
            temp = String.fromCharCode(col+65) + String.fromCharCode(row+j+49);
            checker = (AIships.search(temp) == -1); //checks to see if that spot is already placed
          }
          else if(row+j == 9){
            temp = String.fromCharCode(col+65) + "10";
            checker = AIships.search(temp) == -1; //checks to see if that spot is already placed

          }
          else checker = false;
        }
        else{
          if(col+j <= 9){
            temp = String.fromCharCode(col+j+65);
            if(row < 9) temp +=String.fromCharCode(row+49);
            else temp += "10";

            checker = (AIships.search(temp) == -1);
          }
          else checker = false;
        }

        if(!checker) j=-1;
      }
    }while(!checker); //if it fails a boundary check or repeat of location restart

    for(let j=0; j< i+1; j++) //actually sets the ships to the array
    {
      if(adjuster)
      {
        if(row+j == 9) AIships += String.fromCharCode(col+65) + "10";
        else AIships += String.fromCharCode(col+65) + String.fromCharCode(row+j+49);
      }
      else
      {
        AIships += String.fromCharCode(col+j+65);
        if(row < 9) AIships +=String.fromCharCode(row+49);
        else AIships += "10";
      }

      if(((j*(j+1))/2) < ((numShips*(numShips-1))/2)) AIships += ",";
    }
  }
  AIships += "]";

  console.log(AIships);

  window.localStorage.setItem("AIactivated", JSON.stringify(AIactivated)); //saving
  window.localStorage.setItem("difficulty", JSON.stringify(difficulty));

  document.getElementById("Opponent").innerHTML = "The AI has set their board.";
  document.getElementById("P2Ships").disabled = false;
  document.getElementById("showShipsForP2Btn").disabled = false;
  document.getElementById("playGameBtn").disabled = false;
  fillShipsLoc(p2ShipLoc, AIships); //marks the board
  p2ShipLocArr = getShipsLocArry(AIships);
  window.localStorage.setItem("p1ShipLoc", JSON.stringify(p1ShipLoc)); //saving
  window.localStorage.setItem("p1ShipLocArr", JSON.stringify(p1ShipLocArr));
  window.localStorage.setItem("p2ShipLoc", JSON.stringify(p2ShipLoc));
  window.localStorage.setItem("p2ShipLocArr", JSON.stringify(p2ShipLocArr));
  window.localStorage.setItem("numShips", JSON.stringify(numShips));
}

//same as above, but with added local storage to transfer pages
function getShipsForP2() {
  Player2Ships = prompt("Enter ships location in grid for Player 2", "[J10,E3,E4,F1,F2,F3]");
  let shipArray = Player2Ships.replace(/[\[\]']+/g,'').split(',')
  while (!validPlayerShips(Player2Ships)) { // check for duplicates
    return
  }
  let isValid = true
  do {
    let isRowSame = [true, true, true, true, true]
    let isColSame = [true, true, true, true, true]
    console.log("hello", shipArray.length)
    for (let i = 0; i < shipArray.length; i++) {
      if (i == 1) {
        for (let j = i; j < 2; j++) {
          
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) {
            isRowSame[0] = false
          }
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) {
            isColSame[0] = false
          }
          if (Math.abs(shipArray[j].charAt(0).charCodeAt(0) - shipArray[j+1].charAt(0).charCodeAt(0)) > 1 || (Math.abs(shipArray[j].substring(1) - shipArray[j+1].substring(1)) > 1)) {
            isValid = false
          }
        }
      }
      if (i == 3) {
        for (let j = i; j < 5; j++) {
          
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[1] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[1] = false
          if (Math.abs(shipArray[j].charAt(0).charCodeAt(0) - shipArray[j+1].charAt(0).charCodeAt(0)) > 1 || (Math.abs(shipArray[j].substring(1) - shipArray[j+1].substring(1)) > 1)) {
            isValid = false
          }
        }
      }
      if (i == 6) {
        for (let j = i; j < 9; j++) {
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[2] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[2] = false
          if (Math.abs(shipArray[j].charAt(0).charCodeAt(0) - shipArray[j+1].charAt(0).charCodeAt(0)) > 1 || (Math.abs(shipArray[j].substring(1) - shipArray[j+1].substring(1)) > 1)) {
            isValid = false
          }
        }
      }
      if (i == 10) {
        for (let j = i; j < 14; j++) {
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[3] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[3] = false
          if (Math.abs(shipArray[j].charAt(0).charCodeAt(0) - shipArray[j+1].charAt(0).charCodeAt(0)) > 1 || (Math.abs(shipArray[j].charAt(1) - shipArray[j+1].charAt(1)) > 1)) {
            isValid = false
          }
        }
      }
    } 
    
    for (let i = 0; i < isRowSame.length; i++) {
      if (isRowSame[i] == false && isColSame[i] == false) isValid = false;
      console.log("isrowsame: ", isRowSame[i], " isColSame: ", isColSame[i])
    }
    
    
    if (!isValid) {
      alert("Wrong input!");
      return
    }
  }while (!isValid)
  
  if (isValid) {
    fillShipsLoc(p2ShipLoc,Player2Ships);
    p2ShipLocArr= getShipsLocArry(Player2Ships);
    document.getElementById("showShipsForP1Btn").disabled = true;
    document.getElementById("showShipsForP2Btn").disabled = false;
    //Tells Player 2 that their board is set up
    document.getElementById("P2Ships").innerHTML = "Player 2 has set their board";
    document.getElementById("getShipsForP2Btn").disabled = true;
    document.getElementById("playGameBtn").disabled = false;
    window.localStorage.setItem("p1ShipLoc", JSON.stringify(p1ShipLoc)); // Saving
    window.localStorage.setItem("p2ShipLoc", JSON.stringify(p2ShipLoc)); // Saving
    window.localStorage.setItem("numShips", JSON.stringify(numShips)); // Saving
    //console.log("saveP1="+p1ShipLocArr);
    window.localStorage.setItem("p1ShipLocArr", JSON.stringify(p1ShipLocArr)); // Saving
    //console.log("saveP2="+p2ShipLocArr);
    window.localStorage.setItem("p2ShipLocArr", JSON.stringify(p2ShipLocArr)); // Saving
    window.localStorage.setItem("AIactivated", JSON.stringify(AIactivated));
  }
  
}

//the code and buttons to show the board for each player

function showShips(plyrNo) {
  let plyrShipsLocaArry;

  if(plyrNo=="P1")
  {
    var btnId="showShipsFor"+ plyrNo +"Btn";
    var tblId="tlbShipsFor"+ plyrNo;
    plyrShipsLocaArry=p1ShipLoc;
  }
  else
  {
    var btnId="showShipsFor"+ plyrNo +"Btn";
    var tblId="tlbShipsFor"+ plyrNo;
    plyrShipsLocaArry=p2ShipLoc;
  }
  
  if(plyrNo == "P2" && !gameShownForP2)
  {
    let arrElm=0;
    let elmId="";
    for(var i=0;i<10;i++)
    {
      for(var j=0;j<10;j++)
      {
        arrElm=plyrShipsLocaArry[i][j];
        if(arrElm!=0)
        {
          elmId=plyrNo.toString()+i.toString()+j.toString();
          console.log(elmId);
          document.getElementById(elmId).innerHTML = "S"+arrElm.toString();
        }
      }   
    }
    
    if(AIactivated){
      document.getElementById(btnId).innerHTML = "Hide Ships of AI";
      document.getElementById(tblId).style.removeProperty("display");
    }
    else{
      document.getElementById(btnId).innerHTML = "Hide Ships of P2";
      document.getElementById(tblId).style.removeProperty("display");
    }
    
    gameShownForP2 = true;
  }
  else if(!gameShownForP1)
  {
    //console.log(plyrShipsLocaArry.length);
    let arrElm=0;
    let elmId="";
    for(var i=0;i<10;i++)
    {
      for(var j=0;j<10;j++)
      {
        arrElm=plyrShipsLocaArry[i][j];
        if(arrElm!=0)
        {
          elmId=plyrNo.toString()+i.toString()+j.toString();
          console.log(elmId);
          document.getElementById(elmId).innerHTML = "S"+arrElm.toString();
        }
      }
        
    }
    document.getElementById(btnId).innerHTML = "Hide Ships of " + plyrNo;
    document.getElementById(tblId).style.removeProperty("display");
    gameShownForP1 = true;
  }
  else
  {
    if(AIactivated && plyrNo == "P2") document.getElementById(btnId).innerHTML = "Show Ships of AI";
    else document.getElementById(btnId).innerHTML = "Show Ships of " + plyrNo;
    document.getElementById(btnId).disabled = true;
    document.getElementById(tblId).style.setProperty("display","none");
  }
  
}

function askForSpecial() {
  if (!specCountP1) {
    document.getElementById("specAttack").style.setProperty("display","none");
    return
  }
  let nShipsDn=0;
  let frCell = prompt("Pick a space on the opponent's board to 'fire' at.", "[J10]");

  //Check if frCell is valid
  //If frCell is not valid
  if(frCellValid(frCell) == false)
  {
    //Return to end function
    return;
  }
  
  let row, col;
  col = frCell.toUpperCase().charCodeAt(1)-65;
 
  if(frCell.length == 4)
  { row = frCell.substring(2,3)-1;}
  else if(frCell.length == 5)
  { row = frCell.substring(2,4)-1;}

  if(row < 0 || row > 9 || col < 0 || col > 9)
  {
    window.alert("Attack coordinate out of bounds. Try again.");

    //Return to end function
    return;
  }

  if (p1sFireLoc[row][col] == 0) { // check if sunk
    specialAttack(p1sFireLoc,frCell);

    document.getElementById("P1FrCell").innerHTML = frCell  + " Fire at locations!";
    showFireLocations('P1');
    nShipsDn=Gameover('P1');
    document.getElementById("P1FrHitStatus").innerHTML = nShipsDn  + " ship down! "+(numShips-nShipsDn) + " to go";
    specCountP1--
    document.getElementById("specAttack").innerHTML = "Use Special attack Count: " + specCountP1;
    if((numShips-nShipsDn)==0)
    {
      document.getElementById("gameStatus").innerHTML = " Congratulations! game won by player 1.";
      document.getElementById("turnByP2Btn").disabled = true;
      document.getElementById("frCellByP1Btn").disabled = true;
    } else
    {
      document.getElementById("turnByP2Btn").disabled = false;
      document.getElementById("specAttack").disabled = true;
      document.getElementById("frCellByP1Btn").disabled = true;
    }
  }
  else{
    window.alert("Invalid attack coordinate. Try again.");
  }

  
}

function askForSpecialP2() {
  if (!specCountP2) {
    document.getElementById("specAttackP2").style.setProperty("display","none");
    return
  }
  let nShipsDn=0;
  let frCell = prompt("Pick a space on the opponent's board to 'fire' at.", "[J10]");

  //Check if frCell is valid
  //If frCell is not valid
  if(frCellValid(frCell) == false)
  {
    //Return to end function
    return;
  }
  
  let row, col;
  col = frCell.toUpperCase().charCodeAt(1)-65;
 
  if(frCell.length == 4)
  { row = frCell.substring(2,3)-1;}
  else if(frCell.length == 5)
  { row = frCell.substring(2,4)-1;}

  if(row < 0 || row > 9 || col < 0 || col > 9)
  {
    window.alert("Attack coordinate out of bounds. Try again.");

    //Return to end function
    return;
  }

  if (p2sFireLoc[row][col] == 0) { // check if sunk
    specialAttack(p2sFireLoc,frCell);

    document.getElementById("P2FrCell").innerHTML = frCell  + " Fire at locations!";
    showFireLocations('P2');
    nShipsDn=Gameover('P2');
    document.getElementById("P2FrHitStatus").innerHTML = nShipsDn  + " ship down! "+(numShips-nShipsDn) + " to go";
    specCountP2--
    document.getElementById("specAttackP2").innerHTML = "Use Special attack Count: " + specCountP2;
    if((numShips-nShipsDn)==0)
    {
      document.getElementById("gameStatus").innerHTML = " Congratulations! game won by player 1.";
      document.getElementById("turnByP1Btn").disabled = true;
      document.getElementById("frCellByP1Btn").disabled = true;
    } else
    {
      document.getElementById("turnByP1Btn").disabled = false;
      document.getElementById("specAttackP2").disabled = true;
      document.getElementById("frCellByP2Btn").disabled = true;
    }
  }
  else{
    window.alert("Invalid attack coordinate. Try again.");
  }

}

function attack(shipArr,attackLocation){
  attackLocation = attackLocation.substring(1, (attackLocation.length-1));
  //const strArry = attackLocation.split(",");
  //console.log(strArry);
  console.log(attackLocation.toLowerCase().charCodeAt(0) - 97);
  console.log(attackLocation.toLowerCase().substring(1,attackLocation.length));
  let col,row;
  col=attackLocation.toLowerCase().charCodeAt(0) - 97;
  row=Number(attackLocation.toLowerCase().substring(1,attackLocation.length))-1;
  shipArr[row][col]= 1;

  //Update the healthbars for Player 1 and Player2/AI
  updateShipHealthBar(1);
  updateShipHealthBar(2);
   
}

function specialAttack(shipArr, attackLocation) {
    attackLocation = attackLocation.substring(1, (attackLocation.length-1)); // remove the '[' at the start
    let col = attackLocation.toLowerCase().charCodeAt(0) - 97; // extract the column appropriately
    let row = Number(attackLocation.toLowerCase().substring(1, attackLocation.length)) - 1; // extract the row appropriately

    if (shipArr[row][col] != 0) { // if the parameter array (to be attacked) at that location has already been attacked
        alert("Invalid attack position.");
        return;
    }

    let originalCol = attackLocation.toLowerCase().charCodeAt(0) - 97;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (row - 1 < 0 || col - 1 < 0) { // if the position to attack is less than the bounds
              // pass
            } else {
              if (row > 10 || col > 10) break // if more than the bounds, break
              shipArr[row - 1][col - 1] = 1; // otherwise, attack the position by marking the array with 1
            }
            col++ // to proceed to the right
        }
        row++; // to advance to the next row
        col = originalCol; // the column has to be reverted because it was incremented 3 times, but we want to attack the new row at the same original column
    }

  //Update the healthbars of Player 1 and Player 2
  updateShipHealthBar(1);
  updateShipHealthBar(2);
}

//Shows the player's view of their opponent
//Takes in plyrNo, which is the player's number
function showFireLocations(plyrNo) {
  //Represent the player's view of their opponent's board
  let fireLocationArr;

  //Represent the opponent's board
  let enemyShipLocArr;

  //Represent the location of all ships the opponent's has
  let enemyShipLocString;

  //If the number of the player is P1
  if(plyrNo=="P1")
  {
    //Set fireLocationArr to be p1sFireLoc
    fireLocationArr=p1sFireLoc;

    //Set enemyShipLocArr to be p2ShipLoc
    enemyShipLocArr=p2ShipLoc;

    //Set enemyShipLocString to be p2ShipLocArr
    enemyShipLocString=p2ShipLocArr;

  }
  //Otherwise if plyrNo is P2
  else
  {
    //Set fireLocationArr to be p2sFireLoc
    fireLocationArr=p2sFireLoc;

    //Set enemyShipLocArr to be p1ShipLoc
    enemyShipLocArr=p1ShipLoc;

    //Set enemyShipLocString to be p1ShipLocArr
    enemyShipLocString=p1ShipLocArr;
  }
    //Represent an element of the plyrFireAtLocaArry
    let arrElm=0;

    //Represent an element of OpnplyrShipsLocaArry
    let arrElmShip=0;

    //The id of the element td at row i and column j
    let elmId="";

    //Represent the row of the opponent's ship
    let opnShipsLocRow=0;

    //Represent the column of the opponent's ships
    let opnShipsLocCol=0;

    //Represent the location of the  opponent's ship
    let opnShipsLocStr="";

    //Represenst the number of ship positions 
    let noShipsArrLen=0;

    //Loop starting 1 and until numShips
    //The loop is used to set noShipsArrLen
    for(var a=1;a<=numShips;a++)
    {
      //Add a to noShipsArrLen 
      noShipsArrLen=noShipsArrLen+a;
    }

    //Next, go through each row and column of fireLocationArr
    for(var i=0;i<fireLocationArr.length;i++)
    {
      for(var j=0;j<fireLocationArr.length;j++)
      {
        //Set arrElm to the be element of fireLocationArr at row i and column j
        arrElm=fireLocationArr[i][j];

        //Set arrElmShip to be the element of enemyShipLocArr at row i and column j
        arrElmShip=enemyShipLocArr[i][j]; 
  
        //Go through each ship location in =enemyShipLocString
        for(var k=0;k<noShipsArrLen;k++)
        {
          //Set the location of the oponent ships to be the kth index of the ith array of
          //enemyShipLocString
          opnShipsLocStr=enemyShipLocString[0][k];
          
          //Get ASCII code of the first character of opnShpsLocStr
          //Then, subtract it by 97 to get the column of the ship location
          opnShipsLocCol=opnShipsLocStr.charCodeAt(0) - 97;


          //Next, set the row of the ship location to the rest of opnShipsLocCol, except the first character
          //Convert the substring to a number
          opnShipsLocRow=Number(opnShipsLocStr.substring(1,opnShipsLocStr.length))-1;
          
          //Next, check the following conditions are all true
          //1. opnShipsLocRow is equal to i, which is the current row 
          //2. opnShipsLocCol is equal to j, which is the current column
          //3. The ship at that location is not sunk
          //4. There is an opponent's ship at at location
          //5. The player attack at that location
          //If all these conditions are true
          if(opnShipsLocRow==i && opnShipsLocCol==j && enemyShipLocString[1][k]=='0' && arrElmShip>0 && arrElm!=0)
          {
            //The ship is hit
            //So, set enemyShipLocString to be 1 
            enemyShipLocString[1][k]='1';
          }
        }

        //If there is an attack at the location
        if(arrElm!=0) //check if hit or not
        {
          //Set elmId to be FrAt plus plyrNo plus row i plus j
          elmId="FrAt"+ plyrNo.toString()+i.toString()+j.toString();
          
          //If arrElmShip is 0
          if(arrElmShip==0)
          {
            //Set the inner html of id to be Miss
            document.getElementById(elmId).innerHTML = "Miss";
          }
          //Otherwise, if arrElmShip is 1
          else 
          {
            //Set the innter html of id to be Hit S+arrElmShip
            document.getElementById(elmId).innerHTML = "Hit S"+arrElmShip.toString();
          }
        }
      }
        
    }
}

//calculates the number of ships down a player has to detect win
function Gameover(plyrNo) {
  let nShipsDn=0;
  let noShipsArrLen=0;
  let shipNo=1;
  let enemyShipLocString;
    for(var a=1;a<=numShips;a++)
    {
      noShipsArrLen=noShipsArrLen+a;
    }
    if(plyrNo=="P1")
    {
      enemyShipLocString=p2ShipLocArr;
    }
    else
    {
      enemyShipLocString=p1ShipLocArr;
    }
      
  for(var i=0;i<noShipsArrLen;i++)
    {
      if(i==1)shipNo=2;
      if(i==3)shipNo=3;
      if(i==6)shipNo=4;
      if(i==10)shipNo=5;
      if(enemyShipLocString[1][i]==1)
      {
        shipNo=shipNo-1;
        if(shipNo==0)
        {
          nShipsDn=nShipsDn+1;
        }
      }
      
    }
  return nShipsDn;
}

//A function that is used to check if an input is valid or not
//Returns true if frCell is valid or false if not
function frCellValid(frCell)
{
  //Firstly, check that frCell is an input
  //If frCell is null
  if(frCell == null)
  {
    //Tell the user that the input is canelded
    alert("Input canceled");

    //Return false
    return false;
  }

  //Otherwise, if frCell is an empty string
  if(frCell.length == 0)
  {
    //Tell the user that the input is empty
    alert("The input is empty. Please try again");

    //Return false
    return false;
  }
  
  //Otherwise, if frCell has spaces/whitespace
  if(frCell.indexOf(' ') >= 0)
  {
    //Tell the user that the input has whitespace
    alert("The input has whitespace. Please try again");

    //Return false
    return false;
  }

  //Otherwise, if the length of frCell is not 4 or 5
  if(frCell.length < 4 || frCell.length > 5)
  {
    //Tell the user that the length of the input must be 4 or 5
    alert("The length of input is incorrect. Must be 4 or 5 characters long. Please try again");

    //Return false
    return false;
  }

  //Otherwise, if frCell is not surrounded by brackets
  if(frCell.charAt(0) != '[' || frCell.charAt(frCell.length-1) != ']')
  {
    //Tell the user that the input is not surround by brackets
    alert("The input is not surrounded by brackets. Please try again");

    //Return false
    return false;
  }

  //Next, check if row is valid number
  let row = Number(frCell.substring(2, frCell.length-1));

  //If row is not a number
  if(isNaN(row))
  {
    //Tell the user that the row is not a number
    alert("The row is not a number. Please try again.");

    //Return false
    return false;
  }

  //Otherwise, frCell is valid and return true
  return true;
}
function frCellByP1() {
  let nShipsDn=0;
  let frCell = prompt("Pick a space on the opponent's board to 'fire' at.", "[J10]");

  //If the frCell is not a valid input
  if(frCellValid(frCell) == false)
  {
    //Return to end function
    return;
  }

  let row, col;
  col = frCell.toUpperCase().charCodeAt(1)-65;
 
  if(frCell.length == 4)
  { row = frCell.substring(2,3)-1;}
  else if(frCell.length == 5)
  { row = frCell.substring(2,4)-1;}

  if(row < 0 || row > 9 || col < 0 || col > 9)
  {
    window.alert("Attack coordinate out of bounds. Try again.");

    //Return to end function
    return;
  }

  if (p1sFireLoc[row][col] == 0) { // check if sunk
    attack(p1sFireLoc,frCell);

    document.getElementById("P1FrCell").innerHTML = frCell  + " Fire at locations!";
    showFireLocations('P1');
    nShipsDn=Gameover('P1');
    document.getElementById("P1FrHitStatus").innerHTML = nShipsDn  + " ship down! "+(numShips-nShipsDn) + " to go";
    if((numShips-nShipsDn)==0)
    {
      document.getElementById("gameStatus").innerHTML = " Congratulations! game won by player 1.";
      document.getElementById("turnByP2Btn").disabled = true;
      document.getElementById("frCellByP1Btn").disabled = true;
      document.getElementById("specAttack").disabled = true;
    } else
    {
      document.getElementById("turnByP2Btn").disabled = false;
      document.getElementById("frCellByP1Btn").disabled = true;
      document.getElementById("specAttack").disabled = true;
    }
  }
  else{
    window.alert("Invalid attack coordinate. Try again.");
  }
}

function frCellByP2() {
  let nShipsDn=0;
  frCell = prompt("Pick a space on the opponent's board to 'fire' at.", "[A10]");

  //Check if frCell is valid
  //If the frCell is not a valid input
  if(frCellValid(frCell) == false)
  {
    //Return to end function
    return;
  }

  let row, col;
  col = frCell.toUpperCase().charCodeAt(1)-65;
 
  if(frCell.length == 4)
  { row = frCell.substring(2,3)-1;}
  else if(frCell.length == 5)
  { row = frCell.substring(2,4)-1;}

  if(row < 0 || row > 9 || col < 0 || col > 9)
  {
    window.alert("Attack coordinate out of bounds. Try again.");

    //Return to end function
    return;
  }

  if (p2sFireLoc[row][col] == 0) {
    attack(p2sFireLoc,frCell);
    document.getElementById("P2FrCell").innerHTML = frCell  + " Fire at locations!";
    showFireLocations('P2');
    nShipsDn=Gameover('P2');
    document.getElementById("P2FrHitStatus").innerHTML = nShipsDn  + " ship down! "+(numShips-nShipsDn) + " to go";
    if((numShips-nShipsDn)==0)
    {
      document.getElementById("gameStatus").innerHTML = " Congratulations! game won by player 2.";
      document.getElementById("turnByP2Btn").disabled = true;
      document.getElementById("frCellByP2Btn").disabled = true;
      document.getElementById("specAttackP2").disabled = true;
    } else
    {
      document.getElementById("turnByP1Btn").disabled = false;
      document.getElementById("frCellByP2Btn").disabled = true;
      document.getElementById("specAttackP2").disabled = true;
    }
  }
  else{
    window.alert("Invalid attack coordinate. Try again.");
  }
}

//Update both boards for player's 1 turn
//Only activates if turnByP1btn button is pressed
function frCellTurnOfP1()
{
  //If the game is not setup
  if(!gameSetup)
  {
    //Name all buttons use in the game
    opponentNaming();

    //Set gameSetup to be ture
    gameSetup = true;
  }

  //Disable turnByP1Btn button
  document.getElementById("turnByP1Btn").disabled = true;

  //Enable frCellByP1Btn 
  document.getElementById("frCellByP1Btn").disabled = false;

  //Show Player's 1 Ships on Player's 1 Board
  showOrHidePlayerShips(1, true);

  //Show all attacks on Player's 1 Board
  document.getElementById("specAttack").disabled = false;
  document.getElementById("specAttack").innerHTML = "Use Special attack Count: " + specCountP1;
  // document.getElementById("tlbCellFrAtByP2").style.setProperty("display","none");
  document.getElementById("tlbCellFrAtByP1").style.removeProperty("display");
  showFireLocations('P1');

  //Hide Player 2's/AI's Ships
  showOrHidePlayerShips(2, false);
  
}

//Updates both boards during Player's 2 Turn
//Can only be used when turnByP2Btn is press
function frCellTurnOfP2()
{
  //Disable turnByP2Btn button
  document.getElementById("turnByP2Btn").disabled = true;

  //Enable frCellByP2Btn button
  document.getElementById("frCellByP2Btn").disabled = false;
  if(!AIactivated) document.getElementById("specAttackP2").disabled = false;
  if(!AIactivated)document.getElementById("specAttackP2").innerHTML = "Use Special attack Count: " + specCountP2;
  document.getElementById("tlbCellFrAtByP2").style.removeProperty("display");
  showFireLocations('P2');

  //Next, determine whether to hide or show player 1's and player's ships
  //depending on whether the AI is activated or not
  //If the AI is not activated
  if(AIactivated == false)
  {
    //Hide Player's 1 Ships
    showOrHidePlayerShips(1, false);

    //Shows Player's 2 Ships
    showOrHidePlayerShips(2, true);
  }
  //Otherwise, if the AI is activated
  //There is no need to show Player's 2 ships 
  //or hide Player's 1 Ships
}

function opponentNaming() { //names the game.html section with the appropriate player (human or AI)
  document.getElementById("turnByP2Btn").style.removeProperty("display");
  document.getElementById("frCellByP2Btn").style.removeProperty("display");
  document.getElementById("specAttackP2").style.removeProperty("display");
  if(AIactivated) 
  {
    document.getElementById("turnByP2Btn").innerHTML = "Start AI's turn";
    document.getElementById("frCellByP2Btn").innerHTML = "Launch AI attack";
    document.getElementById('specAttackP2').style.setProperty("display","none") //wont show AI ships
    document.getElementById('specAttackP2').id = 'null'
  }
  else
  {
    document.getElementById("turnByP2Btn").innerHTML = "Start P2's turn";
    document.getElementById("frCellByP2Btn").innerHTML = "Choose Cell to Fire at P2";
  }
}

function secondAttacker(){ //helper function that passes off control to the correct attack for the second player
  if(AIactivated)
  {
    if(difficulty == "easy") easyAttack();
    else if(difficulty == "medium") mediumAttack();
    else hardAttack();
  }
  else
  {
    frCellByP2();
  }
}

function easyAttack() {
  let row = 0, col = 0;
  let attackCoordinate = "[";

  do{ //randomized attack
    row = Math.floor(Math.random() * 10); 
    col = Math.floor(Math.random() * 10);
  }while(p2sFireLoc[row][col] != 0); //checks to make sure it hasn't already been fired on

  if(row == 9) attackCoordinate += String.fromCharCode(col+65) + "10";
  else attackCoordinate += String.fromCharCode(col+65) + String.fromCharCode(row+49);
  attackCoordinate += "]";

  markAIAttack(attackCoordinate); //calls helper function to actually mark the board and change buttons etc.
}

function mediumAttack() {
  let row = 0, col = 0;
  let temp = "";
  let sunkCheck = Gameover('P2');
  let alreadyAdjusted = false;
  let verticalShip = false, horizontalShip = false;
  let firstHit; let lastHit;
  let index = 0;
  let specBoolHit = false;


  if(hitship) { //when a random attack hits a ship, we enter this if statement
    index = hitCoordinates.length;
    temp = String(hitCoordinates[index-1]);
    col = temp.charCodeAt(0)-65; //establishes col value
    if(temp.length == 3) row = 10; //establishes row value
    else row = temp.charCodeAt(1)-49;

    if(index > 1){ //when there is more than one ship, we can determine if it's a vertical or horizontal ship and attack according

      firstHit = String(hitCoordinates.slice(index-2, index-1)); //second to last entry of hitCoordinates
      lastHit = String(hitCoordinates.slice(index-1)); //last array entry of hitCoordinates

      if(firstHit.charCodeAt(0) == lastHit.charCodeAt(0)) verticalShip = true; //if the col is the same between the two entries then the ship was placed vertically
      else horizontalShip = true; //if it wasn't placed vertically then it was horizontally placed

      //Get the ships Number of firstHit and lastHit
      //Get the column for firstCol and LastCol
      let firstCol = firstHit.charCodeAt(0) - 65;
      let lastCol = lastHit.charCodeAt(0) - 65;

      //Get the row for firstRow and lastRow
      let firstRow = Number(firstHit.substring(1, firstHit.length))-1;
      let lastRow = Number(lastHit.substring(1, lastHit.length))-1;


      //If both the first and last hit are not the same ship, 
      if(p1ShipLoc[firstRow][firstCol] != p1ShipLoc[lastRow][lastCol])
      {
        //Set verticalShip and horizontalShip to be false
        verticalShip = false;
        horizontalShip = false;
      }
    }
    if(horizontalShip) {
      if(firstHit.charCodeAt(0) < lastHit.charCodeAt(0) && col < 9) { //tries to fire to the right until it can't anymore
        if(p2sFireLoc[row][col+1] == 0) {
          col += 1;
          alreadyAdjusted = true;
        }
      }

      if(!alreadyAdjusted) { //when it can't, it goes back to the starting hit coordinate and goes left
        temp = hitCoordinates[0];
        col = temp.charCodeAt(0)-65;
        if(temp.length == 3) row = 10;
        else row = temp.charCodeAt(1)-49;

        col -= 1;
        alreadyAdjusted = true;
      }
    }
    else if(verticalShip) { //same thing but vertically
      if(firstHit.length == 3) firstHit = 9;
      else firstHit = firstHit.charCodeAt(1)-49;

      if(firstHit < lastHit.charCodeAt(1)-49 && row < 9) { //tries down
        if(p2sFireLoc[row+1][col] == 0) {
          row += 1;
          alreadyAdjusted = true;
        }
      }
      if(!alreadyAdjusted) { //resets and goes up
        temp = hitCoordinates[0];
        col = temp.charCodeAt(0)-65;
        if(temp.length == 3) row = 10;
        else row = temp.charCodeAt(1)-49;
        
        row -= 1;
        while(p2sFireLoc[row][col] != 0) {
          if (row != 0) row += Math.round(Math.random()) * 2 - 1 
        }
        alreadyAdjusted = true;
      }
    }
    if(row+1 < 10 && !alreadyAdjusted){ //before there are two hits, it will first try to attack below the initial hit
      if(p2sFireLoc[row+1][col] == 0) {
        row += 1;
        alreadyAdjusted = true;
      }
    }
    if(col+1 < 10 && !alreadyAdjusted){ //if that fails, then right
      if(p2sFireLoc[row][col+1] == 0) {
        col += 1;
        alreadyAdjusted = true;
      }
    }
    if(row-1 >= 0 && !alreadyAdjusted){ //then down
      if(p2sFireLoc[row-1][col] == 0) {
        row -= 1;
        alreadyAdjusted = true;
      }
    }
    if(col-1 >= 0 && !alreadyAdjusted){ //then to the left
      if(p2sFireLoc[row][col-1] == 0) {
        col -= 1;
        alreadyAdjusted = true;
      }
    }
  }
  else { //with no hits in the hit coordinates array, it will just fire random attacks
    do{
      row = Math.floor(Math.random() * 10); 
      col = Math.floor(Math.random() * 10);
    }while(p2sFireLoc[row][col] != 0); //has to be a place where it hasn't fired already at
  }

  temp = "";
  if(row == 9) temp += String.fromCharCode(col+65) + "10";
  else temp += String.fromCharCode(col+65) + String.fromCharCode(row+49);

  hitCoordinates.push(temp); //adds value to the hit coordinates array
  temp = "[" + temp + "]";

  console.log(hitCoordinates);
  if(specCountP2 > 0){ //special action to handle the first two special attacks to make sure that all possible hits are accounted for
    if(p1ShipLoc[row][col]==0) hitCoordinates.pop();

    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++) {
        if((row-1+i >= 0 && row-1+i < 10) && (col-1+j >=0 && col-1+j < 10)) {
          if(p1ShipLoc[row-1+i][col-1+j] != 0 && p2sFireLoc[row-1+i][col-1+j] == 0) {
            if(i==1 && j==1) continue; //so that hit won't be added to the hit coordinates twice
            let specAttackHit ="";
            if(row-1+i==9) specAttackHit += String.fromCharCode(col+64+j) + "10";
            else specAttackHit += String.fromCharCode(col+64+j) + String.fromCharCode(row+48+i);
            hitCoordinates.push(specAttackHit);
            hitship = true;
            specBoolHit = true;
            hitCoordinates.sort();
          }
        }
      }
    }
  }
  markAIAttack(temp);
  if(p1ShipLoc[row][col] != 0 || specBoolHit) { //checks to see if there was a ship present and will sort the array
    hitship = true; 
    if(col < 9) if(p2sFireLoc[row][col+1] == 1 && horizontalShip) hitCoordinates.sort();
    else if(col == 9 && horizontalShip) hitCoordinates.sort();
    if(row > 0) if(p2sFireLoc[row-1][col] == 1 && verticalShip) hitCoordinates.sort();
    else if(row == 0 && verticalShip) hitCoordinates.sort();
  }
  else {
    hitCoordinates.pop(); //no hit, then it will pop off the most recent "hit" entry that wasn't actually a hit
    if(hitship && index>1) hitCoordinates.sort();
  }

  index = hitCoordinates.length; //updates the length of array

  if(hitship && index>1){ //checks to see if there are different ships in the hit coordinates array
    let tempValue = "";
    let tempRow = 0; tempCol = 0;

    if(specBoolHit) {
      for(let i=1; i<index; i++)
      {
        let compare = "";
        let compareRow=0, compareCol=0;
        compare = hitCoordinates[index-i];
        tempValue = hitCoordinates[index-i-1];

        compareCol = compare.charCodeAt(0)-65;
        if(compare == 3) compareRow = 10;
        else compareRow = compare.charCodeAt(1)-49;

        tempCol = tempValue.charCodeAt(0)-65;
        if(tempValue == 3) tempRow = 10;
        else tempRow = tempValue.charCodeAt(1)-49;

        if(p1ShipLoc[compareRow][compareCol] != p1ShipLoc[tempRow][tempCol]) differentShips = true;
      }
    }
    else {
      tempValue = hitCoordinates[index-2];
      tempCol = tempValue.charCodeAt(0)-65;
      if(tempValue == 3) tempRow = 10;
      else tempRow = tempValue.charCodeAt(1)-49;

      if((p1ShipLoc[row][col] != p1ShipLoc[tempRow][tempCol]) && (p1ShipLoc[row][col] !=0 && p1ShipLoc[tempRow][tempCol] !=0)) {
        differentShips = true;
      }
    }

  }

  if(sunkCheck != Gameover('P2')) { //when the number of sunk ships changes, it will activate
    if(differentShips) { //only removes the ship spots where the ship was sunk assuming there were two ships in the hit coordinates
      //Firstly, get the array of all ships that are sunk
      let shipsHealth = p1ShipHealthAll();

      //Next, go through each health of shipsHealth
      for(let j = 0; j < shipsHealth.length; j++)
      {
        //Next, get the shipNumber
        let shipNumber = j + 1;

        //If the health of ship is not 0
        if(shipsHealth[j] == 0)
        {
          //Remove all cordinates that equal to shipsHealth
          //Next, filter through the array 
          hitCoordinates = hitCoordinates.filter(callback); //removes each hitCoordinate with that shipNumber sunk
        
          //Callback will go through each item in hitCoordiantes
          function callback(currentHit) 
          {
            //The row and col of currentHit
            let currentRow=0, currentCol=0;

            //Set currentCol and currentRow
            currentCol = currentHit.charCodeAt(0)-65;
            if(currentHit == 3) currentRow = 10;
            else currentRow = currentHit.charCodeAt(1)-49;

            return (p1ShipLoc[currentRow][currentCol] != shipNumber);
          }
        }
      }

      differentShips = false;
    }
    else{ //only one ship activate, then it will clear out the array and set hitship false again
      hitCoordinates = [];
      hitship = false;
    }
  }
}

function hardAttack() {
  let attackCoordinate = "";
  let length;
  let index;
  let temp = "";

  if(!firstTurn) //creates the enemy ships array from player one's ship locations
  {
    temp += p1ShipLocArr[0];
    enemyShips = temp.split(',');
    firstTurn = true;
  }

  length = enemyShips.length;
  index = Math.floor(Math.random() * length); //randomizes an index of the enemy ships
  attackCoordinate += enemyShips[index]; //sets that spot as the attack location

  //Create and set specAttackCoordinate to attackCoordinate
  //Only used for special attack
  let specAttackCoordinate = String(attackCoordinate);

  enemyShips = enemyShips.filter((value, temp) => value != attackCoordinate); //removes that spot from the array
  attackCoordinate = "[" + attackCoordinate.toUpperCase() + "]";
  console.log(enemyShips);

  if(specCountP2 > 0) //handling the special case of the special attack
  {
    let row=0, col=0;

    //Set col to the first character of specAttackCoordainte by 97
    col = specAttackCoordinate.charCodeAt(0)-97;

    //If specAttackCoordinate length is 3, set row to 9
    //Otherwise, let it bet the first carhacter of specAttackCoordiante - 49
    if(specAttackCoordinate.length == 3) row = 9;
    else row = specAttackCoordinate.charCodeAt(1)-49;
    console.log("col:" + String.fromCharCode(col+65));
    if (row == 9) console.log("row: 10");
    else console.log("row: " + String.fromCharCode(row+49));

    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++) {
        //Changed || to && so that only when both row and col is valid can they be accepted
        if((row-1+i >= 0 && row-1+i < 10) && (col-1+j >= 0 && col-1+j < 10)) {
          if(p1ShipLoc[row-1+i][col-1+j] != 0){
            let specAttackHit = "";

            console.log("specAtttackHit: " + specAttackHit)

            //For each specAttackHit, change the first character to be col + 99 + j
            if(row == 9) specAttackHit = String.fromCharCode(col+96+j) + "10";
            else specAttackHit = String.fromCharCode(col+96+j) + String.fromCharCode(row+48+i);

            console.log(specAttackHit);
            enemyShips = enemyShips.filter((value, temp) => value != specAttackHit);
            console.log("EnemyShips: " + enemyShips);
          }
        }
      }
    }
  }
  console.log("Temp: " + temp);

  console.log(enemyShips);
  markAIAttack(attackCoordinate);
}

function markAIAttack(attackCoordinate) {//adjusts the boards and buttons for the game

  let sunkShips = 0;

  if(specCountP2 > 0) { //automatically calls special attack on its first two turns
    specialAttack(p2sFireLoc, attackCoordinate);
    specCountP2--;
  }
  else attack(p2sFireLoc,attackCoordinate);

  document.getElementById("P2FrCell").innerHTML = attackCoordinate  + " Fire at locations!";
  showFireLocations('P2');
  sunkShips = Gameover('P2')
  document.getElementById("P2FrHitStatus").innerHTML = sunkShips  + " ship down! "+(numShips-sunkShips) + " to go";

  if((numShips-sunkShips)==0)
  {
    document.getElementById("gameStatus").innerHTML = " Gameover. You lost to the " + difficulty + " AI.";
    document.getElementById("turnByP2Btn").disabled = true;
    document.getElementById("frCellByP2Btn").disabled = true;
  } 
  else
  {
    document.getElementById("turnByP1Btn").disabled = false;
    document.getElementById("frCellByP2Btn").disabled = true;
  }
}

//Create a new board by taking in a node, rowId, and tableId
function createBoard(node, rowId, tableId)
{
  //Firstly, create a new table that will store the board
  let table = document.createElement("table");

  //Next, set the border of table to be 1
  table.setAttribute("border", "1");

  //Next, set the cellpadding to be 3
  table.setAttribute("cellpadding", "3");

  //Finally, set the id of table to be tableId
  table.setAttribute("id", tableId);

  //Set the table's margin from from to be 10 pixels
  table.style.marginTop = "10px";

  //Next, add create a new element that will store the tbody tag
  let tableBody = document.createElement("tbody");

  //Next, create a row that will store all the columns names
  let columnsNames = document.createElement("tr");

  //Set the class of columnsNames to be bold
  columnsNames.setAttribute("class", "bold");

  //Next, create a column that is empty
  let emptyColumn = document.createElement("td");

  //Set the innerhtml of emptyColumn to be space
  emptyColumn.innerHTML = " ";

  //Add it to columnsNames
  columnsNames.appendChild(emptyColumn);

  //Next, loop 10 times
  for(let i = 0; i < 10; i++)
  {
    //Create a new column
    let column = document.createElement("td");

    //Next, set the innerhtml of column to be the ascii character from i+65
    column.innerHTML = String.fromCharCode(i+65);

    //Add column to columnsNames
    columnsNames.appendChild(column);
  }

  //Next, add columnsNames to tableBody
  tableBody.appendChild(columnsNames)

  //Next, loop for ten times
  for(let i = 0; i < 10; i++)
  {
    //Create a new row
    let row = document.createElement("tr");

    //Create a new column that contains the number of row
    let columnNumber = document.createElement("td");

    //Next, set the class of columnNumber to be bold
    columnNumber.setAttribute("class", "bold");

    //Set the innerhtml to be i+1
    columnNumber.innerHTML = (i+1).toString();

    //Add columnNumber to row
    row.appendChild(columnNumber);

    //Next loop for ten times
    for(let j = 0; j < 10; j++)
    {
      //Create a new column
      let column = document.createElement("td");

      //Next, create the id for column to be rowID + i + j
      let elementId = rowId + i.toString() + j.toString();

      //Set the id of column to be elementId
      column.setAttribute("id", elementId);

      //Add column to to row
      row.appendChild(column);
    }

    //Next, add row to to tableBody
    tableBody.appendChild(row);
  }
  
  //Next, add tableBody to table
  table.appendChild(tableBody);

  
  //Finally, append table to  node
  node.appendChild(table);
}

//Create the players board when the game starts
//Can only be used in game.html not index.html
function createPlayerBoards()
{
  //First, set the Player's 1 Board label at the beginning of the game
  //Look for the div in game.html that have the id P1
  //Then, set the inner html of P1 to be Player's 1 Board
  window.document.querySelector("#P1").innerHTML = "Player 1's Board";

  //Next, set Player's 2/AI's Board lable at the beginning of the game
  //Check if the ai is activated or not
  //If the AI is not activated 
  if(AIactivated == false)
  {
    //Look for the div in game.hmtl that has the id P2
    //Then, set the inner html of P2 to be Player's 2 Board
    window.document.querySelector("#P2").innerHTML = "Player 2's Board";
  }
  //Otherwise, if the AI is activated
  else
  {
    //Look for the div in game.hmtl that has the id P2
    //Then, set the inner html of P2 to be Player's 2 Board
    window.document.querySelector("#P2").innerHTML = "AI's Board";
  }

  //Next, create a new table for Player 1
  //Look for the div that have the id P1
  //Next, use createBoard to add a new table to P1, with the rowId being FrAtP2 and 
  //the tableId to be tlbCellFrAtByP2
  createBoard(window.document.querySelector("#P1"), "FrAtP2", "tlbCellFrAtByP2");

  //Next, create a new table for Player 2 or AI 
  //Look for the div that have the id P2
  //Next, use createBoard to add a new table to P2, with the rowId being FrAtP1 and
  //the tableId to be tlbCellFrAtByP1
  createBoard(window.document.querySelector("#P2"), "FrAtP1", "tlbCellFrAtByP1");

  //Note, FrAtP1 and FrAtP2 rerpresent the board where the player's going to attack
  //So FrAtP1 is where the Player 2 will attack and FrAtP2 is where Player 1 will attack
  //That is why Player 1's Board is FrAtP2 and Player 2's Board/AI's is FrAtP1
}

//Show a Player's Ships on their board
//It takes in playerNum, either 1 or 2, which represent Player 1 and Plyaer 2
//It also take a boolean value, showShips, to either to show or hide the ship
//true to show ships or false to hide ships
function showOrHidePlayerShips(playerNum, showShips)
{
  //Firstly, create a new variable, which will contain the location of the ships for the player
  let playerShips;

  //Create another variable which will contian the player's board
  let playerBoard;

  //Check, check playerNum to determine which ships to show
  //If playerNum is 1
  if(playerNum == 1)
  {
    //Set playerShips to be p1ShipLocArr
    playerShips = p1ShipLocArr;

    //Set playerBoard to be p1ShipLoc
    playerBoard = p1ShipLoc;

    //Change playerNum to 2
    playerNum = 2;
  }
  //Otherwise, if playerNum is 2
  else
  {
    //Set playerShips to be p2ShipLocArr
    playerShips = p2ShipLocArr;

    //Set playerBoard to be p2ShipLoc
    playerBoard = p2ShipLoc;

    //Change playerNum to 1
    playerNum = 1;
  }

  //Note: playerNum is changed to its opposite value
  //So that it is easier to display the ships on the correct board

  //Next, go through each position in playerShips[0]
  for(let i = 0; i < playerShips[0].length; i++)
  {
    //First, check if the player's ship position in playerShips is not sunked
    //If the player's ship position is not sunk
    if(playerShips[1][i] == '0')
    {
      //Get the row and column of the playerShips
      //Let column be the ASCII code of the first character of the ship position minus 97
      let shipCol = playerShips[0][i].charCodeAt(0) - 97;

      //Let row be the rest of the ship's position, which only include numbers, minus 1
      let shipRow = Number(playerShips[0][i].substring(1,playerShips[0][i].length))-1

      //Next, create the id that is the id of the tag where the ship is on the player's board
      //Set it to be FrAtP + playerNum + shipRow + shipCol
      let shipPositionId = "#FrAtP" + playerNum.toString() + shipRow.toString() + shipCol.toString();

      //Next, set the inner html of shipPositionId depending on whether we are showing the ships or hiding the ships
      //If showShips is true
      if(showShips == true)
      {
        //Show the ship by setting the inner html of shipPositionId to be S + playerBoard[shipRow][shipCol]
        window.document.querySelector(shipPositionId).innerHTML = "S" + playerBoard[shipRow][shipCol].toString();
      }
      else
      //Otherwise, if show ships is false
      {
        //Hide the ship by setting the inner html of shipPositionId to be nothing
        window.document.querySelector(shipPositionId).innerHTML = "";
      }
    }
    //Otherwise, the ship is sunk and do not display the ship
  }
}

//Creates the health bar for each ship of the player
//Takes in a node, the html tag where the healthbar will attached to
//id, the id of the healthbar, and name, the name of the healthbar
function createShipHealthBar(node, id, name)
{
  //Firstly, create a new div tag that will store the health bar for the player
  let player = document.createElement("div");

  //Next, set the id of player to be id
  player.setAttribute("id", id);

  //Next, set the innerhtml of player to be name + 's  Ships:
  player.innerHTML = name + '\'s Ships\' Health:';

  //Next, create a new table that will store the healthbar of the ships
  let healthbar = document.createElement("table");

  //Create a new tbody for healthbar
  let tbody = document.createElement("tbody");
  
  //Next, create a new row that will contain the health of each ship
  let health = document.createElement("tr");

  //Next, loop for numShips of times and add the helath of each ship to healthbar
  for(let i = 1; i <= numShips; i++)
  {
    //Create a new column that will contain a new ship
    let ship = document.createElement("td")

    //Next, set the value of ship, which represents the health of the ship
    ship.setAttribute("value", i);

    //Set the innerhtml of ship to be Ship i: value
    ship.innerHTML = "Ship " + i.toString() + ": " + ship.getAttribute("value");

    //If i does not equal to 1
    if(i != 1)
    {
      //Set the padding-left of ship to be 100 px
      ship.style = "padding-left: 75px";
    }

    //Finally, add ship to health
    health.appendChild(ship);
  }
  
  //Next, append health to tbody
  tbody.appendChild(health);

  //Next append tbody to healthbar
  healthbar.appendChild(tbody);

  //Next, append healthbar to player
  player.appendChild(healthbar);

  //Finally, append player to node
  node.appendChild(player);
}

//Used to create the health bar for each player
//Takes nothing
//Can only be used in game.html
function createPlayerShipHealthBars()
{
  //Firstly, use the querySelector to find shipHealth 
  //and store it in shipHealth
  let shipHealth = window.document.querySelector('#shipHealth');

  //Next, add a table for player 1 to shipHealth
  //using createShipHealthBar
  //pass shipHealth as the node, P1ShipHealthBar as id, and Player 1 as name
  createShipHealthBar(shipHealth, "P1ShipHealthBar", "Player 1");

  //Next, add another table for player 2, but its name depend on whether the AI is activated or not
  //Thus, create a varible that will store the name of player 2
  let name = "";

  //If the AI is not activated
  if(AIactivated == false)
  {
    //Set the name to be Player 2
    name = "Player 2";
  }
  //Otherwise, if AI is activated
  else
  {
    //Set the name to be AI
    name = "AI";
  }

  //Next, add another for player 2 using createShipHealthBar
  //Pass shipHealth to as node, name as name, and P2ShipHealthBar as id
  createShipHealthBar(shipHealth, "P2ShipHealthBar", name);

  //Next, get P1ShipHealthBar from game.html
  let P1ShipHealthBar = window.document.querySelector("#P1ShipHealthBar");

  //Next, set the padding-bottom of P1ShipHealthBar to be 30 px
  P1ShipHealthBar.style = "padding-bottom:20px";

  //Next, set the padding-top of shipHealth to be 125 px
  shipHealth.style = "padding-top: 125px"
}

//This functions updates the health of ship by getting number of the player
function updateShipHealthBar(playerNum)
{
  //Firstly, create two varaibles
  //id which the id of the player's health bar
  //and shipsHealth, an array that the stores the health of each ship
  let id;
  let shipsHealth;

  //Next, use playerNum to determine the value of id and shipHealth
  //If playerNum is 1
  if(playerNum == 1)
  {
    //Set id to be P1ShipHealthBar
    id = "P1ShipHealthBar";

    //Set shipsHealth to be the arrary return by p1ShipHealthAll
    //p1ShipHealthAll will also check if a ship for Player 1 is sunk or not
    shipsHealth = p1ShipHealthAll();
  }
  //Otherwise, if playerNum is 2
  else
  {
    //Set the id to be P2ShipHealthBar
    id = "P2ShipHealthBar";

    //Set shipsHealth to be the arrary return by p2ShipHealthAll
    shipsHealth = p2ShipHealthAll()
  }

  //Next, get the div tag that has a player's health bar using id
  let player = window.document.querySelector("#" + id);

  //Next, get the table of the player, which should be the last child of player
  let table = player.lastChild;

  //Next, get the tbody of table, which is the first child of table
  let tbody = table.firstChild;

  //Next, get the row of table, which contains each ship of the shiphelath bar
  //Called this row health bar
  let healthBar = tbody.firstChild;

  //Next, get the children of healthBar, which represents the ships the player has
  //and the health of each ship
  let ships = healthBar.childNodes;

  //Loop through each ship in ships
  for(let i = 0; i < ships.length; i++)
  {
    //Set the value of ships[i] to be the ith value of shipsHealth
    ships[i].setAttribute("value", shipsHealth[i]);

    //Set the innerHTMLto be Ship + i + ships[i]'s value
    ships[i].innerHTML = "Ship " + (i+1).toString() + ": " + ships[i].getAttribute("value")
  }
}

//This eventListener create two boards and two ship health bars in game.html
//Adds an event listener to window when game.html loads
window.addEventListener("load", () => {
  //Use a try and catch block to catch an error if createPlayerBoards and createPlayerShipHealthBars
  //is used in index.html rather than in game.html
  try {
    //Create both player's board in game.html
    createPlayerBoards();

    //Create both player's ship healthbar in game.html
    createPlayerShipHealthBars();
  } catch (error) {
  }
});
