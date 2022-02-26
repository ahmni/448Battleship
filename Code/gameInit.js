let numShips = 3; //default ship number
let Player1Ships;
let Player2Ships;
let difficulty = "Easy";
let AIactivated = false;
let gameSetup = false;
let gameShownForP1 = false;
let gameShownForP2 = false;
let firstTurn = false;
let enemyShips = [];

var p1ShipLoc = matrix();// 
var p2ShipLoc = matrix();// 
var p1sFireLoc = matrix();// 
var p2sFireLoc = matrix();// 
var p1ShipLocArr;
var p2ShipLocArr;

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

function humanBtn(){
  document.getElementById("getShipsForP2Btn").style.removeProperty("display");
  document.getElementById("humanBtn").disabled = true;
  document.getElementById("AIbtn").disabled = true;
  document.getElementById("getNoOfShipsBtn").disabled = false;
  changeVisibility();
  document.getElementById("Opponent").innerHTML = "Select Player 2's ships location in grid  of 10X10.{ex. [C4,E3,E4] for 2 ships.}";
  document.getElementById("showShipsForP2Btn").innerHTML = "Show ships for P2";
}

function AIbtn() {
  difficulty = prompt("What difficulty would you like to play? (Easy, Medium, or Hard)", difficulty);
  difficulty = difficulty.toLowerCase();

  if(difficulty == "easy" || difficulty == "medium" || difficulty == "hard") {
    document.getElementById("difficulty").innerHTML = "The AI's difficulty is set to " + difficulty + " .";
    document.getElementById("AIbtn").disabled = true;
    document.getElementById("humanBtn").disabled = true;
    document.getElementById("getNoOfShipsBtn").disabled = false;
    changeVisibility();
    document.getElementById("showShipsForP2Btn").innerHTML = "Show ships for AI";
    AIactivated = true;
  }
  else
  {
    window.alert("Invalid difficulty option. Try again.");
  }
}

function changeVisibility()
{
  document.getElementById("Opponent").style.removeProperty("display");
  document.getElementById("endingLine").style.removeProperty("display");
  document.getElementById("playGameBtn").style.removeProperty("display");
  document.getElementById("P2Ships").style.removeProperty("display");
  document.getElementById("showShipsForP2Btn").style.removeProperty("display");
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

//gets ships for players
function getNoOfShips() {
  numShips = prompt("Please enter number of ships", numShips);
  if (numShips > 0 && numShips <= 5) {
    document.getElementById("getShipsForP1Btn").disabled = false;
    document.getElementById("BShips").innerHTML = numShips  + " ships will be used!";
    document.getElementById("getNoOfShipsBtn").disabled = true;
  }
  else
  {
    window.alert("Invalid number of ships. Try again.")
  }
}

//gets plalyer one's ships, shows the player 1 grid, adds a disabled button
function getShipsForP1() {
  Player1Ships = prompt("Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
  let shipArray = Player1Ships.replace(/[\[\]']+/g,'').split(',')
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
  
  while (findDuplicates(shipArray).length != 0) {
    Player1Ships = prompt("Wrong input! Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
    shipArray = Player1Ships.split(',')
  }
  let isValid = true;
  
  while (Player1Ships == null) {
    Player1Ships = prompt("Wrong input! Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
    shipArray = Player1Ships.split(',')
  }
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
        }
      }
      if (i == 3) {
        for (let j = i; j < 5; j++) {
          
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[1] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[1] = false
        }
      }
      if (i == 6) {
        for (let j = i; j < 9; j++) {
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[2] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[2] = false
        }
      }
      if (i == 10) {
        for (let j = i; j < 14; j++) {
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[3] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[3] = false
        }
      }
    } 
    
    for (let i = 0; i < isRowSame.length; i++) {
      if (isRowSame[i] == false && isColSame[i] == false) isValid = false;
    }
    
    
    if (!isValid) {
      Player1Ships = prompt("Wrong input! Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
      shipArray = Player1Ships.split(',')
    }
  }while (!isValid)
  
  if (isValid) {
    fillShipsLoc(p1ShipLoc,Player1Ships);
    p1ShipLocArr= getShipsLocArry(Player1Ships);
    document.getElementById("getShipsForP2Btn").disabled = false;
    document.getElementById("showShipsForP1Btn").disabled = false;
    document.getElementById("P1Ships").innerHTML = Player1Ships  + " ships locations!";
    document.getElementById("getShipsForP1Btn").disabled = true;

    if(AIactivated) AIsetup();
  }
}

function AIsetup() { 
  let AIships = "[";
  let row = 0, col = 0;
  let temp;
  let adjuster = true; 
  let checker = true;

  for(let i=0; i<numShips; i++)
  {
    adjuster = Math.random() < .5;

    do{
      temp = "";

      do{
        row = Math.floor(Math.random() * 10); 
        col = Math.floor(Math.random() * 10);
      }while(row == 9-i && col == 9-i);

      for(let j=0; j < i+1; j++)
      {
        if(adjuster)
        {
          if(row+j < 9)
          {
            temp = String.fromCharCode(col+65) + String.fromCharCode(row+j+49);
            checker = AIships.search(temp) < 0;
          }
          else if(row+j == 9)
          {
            temp = String.fromCharCode(col+65) + "10";
            checker = AIships.search(temp) < 0;
          }
          else checker = false;
        }
        else
        {
          if(col+j <= 9)
          {
            temp = String.fromCharCode(col+j+65);

            if(row < 9) temp +=String.fromCharCode(row+49);
            else temp += "10";

            checker = AIships.search(temp) < 0;
          }
          else checker = false;
        }
      }
    }while(!checker);

    for(let j=0; j< i+1; j++)
    {
      if(adjuster)
      {
        if(row+j == 9)
        {
          AIships += String.fromCharCode(col+65) + "10";
        }
        else
        {
          AIships += String.fromCharCode(col+65) + String.fromCharCode(row+j+49);
        }
      }
      else
      {
        AIships += String.fromCharCode(col+j+65);
        if(col+j < 9) AIships +=String.fromCharCode(row+49);
        else AIships += "10";
      }

      if(((j*(j+1))/2) < ((numShips*(numShips-1))/2)) AIships += ",";
    }
  }
  AIships += "]";

  console.log(AIships);

  window.localStorage.setItem("AIactivated", JSON.stringify(AIactivated));
  window.localStorage.setItem("difficulty", JSON.stringify(difficulty));

  document.getElementById("Opponent").innerHTML = "AI placed their ships at " + AIships + ".";
  document.getElementById("P2Ships").disabled = false;
  document.getElementById("showShipsForP2Btn").disabled = false;
  document.getElementById("playGameBtn").disabled = false;
  fillShipsLoc(p2ShipLoc, AIships);
  p2ShipLocArr = getShipsLocArry(AIships);
  window.localStorage.setItem("p2ShipLoc", JSON.stringify(p2ShipLoc));
  window.localStorage.setItem("p2ShipLocArr", JSON.stringify(p2ShipLocArr));
}

//same as above, but with added local storage to transfer pages
function getShipsForP2() {
  Player2Ships = prompt("Enter ships location in grid for Player 2", "[J10,E3,E4,F1,F2,F3]");
  let shipArray = Player2Ships.replace(/[\[\]']+/g,'').split(',')
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
  
  while (findDuplicates(shipArray).length != 0) {
    Player2Ships = prompt("Wrong input! Enter ships location in grid for Player 2", "[J10,E3,E4,F1,F2,F3]");
    shipArray = Player2Ships.split(',')
  }
  let isValid = true;
  
  while (Player1Ships == null) {
    Player2Ships = prompt("Wrong input! Enter ships location in grid for Player 2", "[J10,E3,E4,F1,F2,F3]");
    shipArray = Player2Ships.split(',')
  }
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
            console.log(shipArray[j], shipArray[j+1]);
          }
        }
      }
      if (i == 3) {
        for (let j = i; j < 5; j++) {
          
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[1] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[1] = false
        }
      }
      if (i == 6) {
        for (let j = i; j < 9; j++) {
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[2] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[2] = false
        }
      }
      if (i == 10) {
        for (let j = i; j < 14; j++) {
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[3] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[3] = false
        }
      }
    } 
    
    for (let i = 0; i < isRowSame.length; i++) {
      if (isRowSame[i] == false && isColSame[i] == false) isValid = false;
      console.log("isrowsame: ", isRowSame[i], " isColSame: ", isColSame[i])
    }
    
    
    if (!isValid) {
      Player2Ships = prompt("Wrong input! Enter ships location in grid for Player 2", "[J10,E3,E4,F1,F2,F3]");
      shipArray = Player2Ships.split(',')
    }
  }while (!isValid)
  
  if (isValid) {
    fillShipsLoc(p2ShipLoc,Player2Ships);
    p2ShipLocArr= getShipsLocArry(Player2Ships);
    document.getElementById("showShipsForP1Btn").disabled = true;
    document.getElementById("showShipsForP2Btn").disabled = false;
    document.getElementById("P2Ships").innerHTML = Player2Ships  + " ships locations!";
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
  
   
}

function showFireLocations(plyrNo) {
  
  //let btnId="fireAtBy"+ plyrNo +"Btn";
  //let tblId="tlbCellFrAtBy"+ plyrNo;
  //let frCellbtn="frCellBy"+plyrNo+"Btn";
  let fireLocationArr;
  let enemyShipLocArr;
  let enemyShipLocString;

  if(plyrNo=="P1")
  {
    fireLocationArr=p1sFireLoc;
    enemyShipLocArr=p2ShipLoc;
    enemyShipLocString=p2ShipLocArr;

  }
  else
  {
    fireLocationArr=p2sFireLoc;
    enemyShipLocArr=p1ShipLoc;
    enemyShipLocString=p1ShipLocArr;
  }
  
    //console.log(fireLocationArr.length);
    let arrElm=0;
    let arrElmShip=0;
    let elmId="";
    let opnShipsLocRow=0;
    let opnShipsLocCol=0;
    let opnShipsLocStr="";
    let noShipsArrLen=0;
    for(var a=1;a<=numShips;a++)
    {
      noShipsArrLen=noShipsArrLen+a;
    }
    console.log("enemyShipLocString before for loop:"+enemyShipLocString);
    for(var i=0;i<fireLocationArr.length;i++)
    {
      for(var j=0;j<fireLocationArr.length;j++)
      {
        arrElm=fireLocationArr[i][j];
        //console.log(typeof fireLocationArr);
        //console.log("fireLocationArr="+fireLocationArr);
        arrElmShip=enemyShipLocArr[i][j]; 
        //console.log("noShipsArrLen="+noShipsArrLen);
        //console.log("enemyShipLocString.length="+enemyShipLocString.length);
        //console.log("opnShipsLocArry="+enemyShipLocString);
        //console.log("enemyShipLocString[0]="+enemyShipLocString[0]);
        //console.log("enemyShipLocString[1]="+enemyShipLocString[1]);
        for(var k=0;k<noShipsArrLen;k++)
        {
          opnShipsLocStr=enemyShipLocString[0][k];
         // console.log(typeof enemyShipLocString);
          //console.log("opnShipsLocStr="+opnShipsLocStr+" enemyShipLocString[1][k]="+enemyShipLocString[1][k]);
          //console.log(typeof opnShipsLocStr);
          //console.log(enemyShipLocString[1][k]);
          
          opnShipsLocCol=opnShipsLocStr.charCodeAt(0) - 97;
          opnShipsLocRow=Number(opnShipsLocStr.substring(1,opnShipsLocStr.length))-1;
          //console.log("opnShipsLocRow="+opnShipsLocRow+" i="+i+ " opnShipsLocCol="+opnShipsLocCol+" j="+j);
          //console.log("enemyShipLocString[1][k]="+enemyShipLocString[1][k]+" arrElmShip="+arrElmShip);
          //console.log("opnShipsLocRow="+opnShipsLocRow);
          if(opnShipsLocRow==i && opnShipsLocCol==j && enemyShipLocString[1][k]=='0' && arrElmShip>0 && arrElm!=0)
          {
            enemyShipLocString[1][k]='1';
            //console.log("enemyShipLocString[0][k]="+enemyShipLocString[0][k]);
            //console.log("enemyShipLocString[1][k]="+enemyShipLocString[1][k]);
          }
        }
        if(arrElm!=0) //check if hit or not
        {
          elmId="FrAt"+ plyrNo.toString()+i.toString()+j.toString();
          console.log(elmId);
          if(arrElmShip==0)
          {
            document.getElementById(elmId).innerHTML = "Miss";
          }
          else 
          {
            document.getElementById(elmId).innerHTML = "Hit S"+arrElmShip.toString();
          }
        }
      }
        
    }
    console.log("enemyShipLocString after for loop:"+enemyShipLocString);
    //document.getElementById(btnId).disabled = true;
    //document.getElementById(frCellbtn).disabled = true;
    //document.getElementById(btnId).innerHTML = "Hide Ships of " + plyrNo;
    //document.getElementById(tblId).style.removeProperty("display");
  
  
    
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
function ShipHealthBar() {
  let nShipsDn=0;
  let noShipsArrLen=0;
  let shipNo=numShips;
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
        if(nShipsDn = numShips)
        {
          prompt("Ship has been Sunk");
        }
      }
      
    }
   return nShipsDn;
 
}

function frCellByP1() {
  let nShipsDn=0;
  let frCell = prompt("Pick a space on the opponent's board to 'fire' at.", "[J10]");
  
  let row, col;
  col = frCell.toUpperCase().charCodeAt(1)-65;
 
  if(frCell.length == 4)
  { row = frCell.substring(2,3)-1;}
  else if(frCell.length == 5)
  { row = frCell.substring(2,4)-1;}

  if(row < 0 || row > 9 || col < 0 || col > 9)
  {
    window.alert("Attack coordinate out of bounds. Try again.");
  }

  if (p1sFireLoc[row][col] == 0) { // check if sunk
    attack(p1sFireLoc,frCell);

    document.getElementById("P1FrCell").innerHTML = frCell  + " Fire at locations!";
    showFireLocations('P1');
    nShipsDn=ShipHealthBar('P1');
    document.getElementById("P1FrHitStatus").innerHTML = nShipsDn  + " ship down! "+(numShips-nShipsDn) + " to go";
    if((numShips-nShipsDn)==0)
    {
      document.getElementById("gameStatus").innerHTML = " Congratulations! game won by player 1.";
      document.getElementById("turnByP2Btn").disabled = true;
      document.getElementById("frCellByP1Btn").disabled = true;
    } else
    {
      document.getElementById("turnByP2Btn").disabled = false;
      document.getElementById("frCellByP1Btn").disabled = true;
    }
  }
  else{
    window.alert("Invalid attack coordinate. Try again.");
  }
}

function frCellByP2() {
  let nShipsDn=0;
  frCell = prompt("Pick a space on the opponent's board to 'fire' at.", "[A10]");

  let row, col;
  col = frCell.toUpperCase().charCodeAt(1)-65;
 
  if(frCell.length == 4)
  { row = frCell.substring(2,3)-1;}
  else if(frCell.length == 5)
  { row = frCell.substring(2,4)-1;}

  if(row < 0 || row > 9 || col < 0 || col > 9)
  {
    window.alert("Attack coordinate out of bounds. Try again.");
  }

  if (p2sFireLoc[row][col] == 0) {
    attack(p2sFireLoc,frCell);
    document.getElementById("P2FrCell").innerHTML = frCell  + " Fire at locations!";
    showFireLocations('P2');
    nShipsDn=ShipHealthBar('P2');
    document.getElementById("P2FrHitStatus").innerHTML = nShipsDn  + " ship down! "+(numShips-nShipsDn) + " to go";
    if((numShips-nShipsDn)==0)
    {
      document.getElementById("gameStatus").innerHTML = " Congratulations! game won by player 2.";
      document.getElementById("turnByP2Btn").disabled = true;
      document.getElementById("frCellByP2Btn").disabled = true;
    } else
    {
      document.getElementById("turnByP1Btn").disabled = false;
      document.getElementById("frCellByP2Btn").disabled = true;
    }
  }
  else{
    window.alert("Invalid attack coordinate. Try again.");
  }
}

function frCellTurnOfP1()
{
  if(!gameSetup)
  {
    opponentNaming();
    gameSetup = true;
  }

  document.getElementById("turnByP1Btn").disabled = true;
  document.getElementById("frCellByP1Btn").disabled = false;
  // document.getElementById("tlbCellFrAtByP2").style.setProperty("display","none");
  document.getElementById("tlbCellFrAtByP1").style.removeProperty("display");
  showFireLocations('P1');

}

function frCellTurnOfP2()
{
  document.getElementById("turnByP2Btn").disabled = true;
  document.getElementById("frCellByP2Btn").disabled = false;
  document.getElementById("tlbCellFrAtByP2").style.removeProperty("display");
  showFireLocations('P2');
}

function opponentNaming() {
  document.getElementById("turnByP2Btn").style.removeProperty("display");
  document.getElementById("frCellByP2Btn").style.removeProperty("display");

  if(AIactivated) 
  {
    document.getElementById("turnByP2Btn").innerHTML = "Start AI's turn";
    document.getElementById("frCellByP2Btn").innerHTML = "Launch AI attack";
  }
  else
  {
    document.getElementById("turnByP2Btn").innerHTML = "Start P2's turn";
    document.getElementById("frCellByP2Btn").innerHTML = "Choose Cell to Fire at P2";
  }
}

function secondAttacker(){
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

  do{
    row = Math.floor(Math.random() * 10); 
    col = Math.floor(Math.random() * 10);
  }while(p2sFireLoc[row][col] != 0);

  if(row == 9) attackCoordinate += String.fromCharCode(col+65) + "10";
  else attackCoordinate += String.fromCharCode(col+65) + String.fromCharCode(row+49);
  attackCoordinate += "]";

  markAIAttack(attackCoordinate);
}

function mediumAttack() {

}

function hardAttack() { //p1ShipLocArr
  let attackCoordinate = "";
  let length;
  let index;
  let temp = "";

  if(!firstTurn)
  {
    temp += p1ShipLocArr[0];
    console.log(temp)
    enemyShips = temp.split(',');
    firstTurn = true;
  }
  console.log(enemyShips);
  console.log(enemyShips[1]);

  length = enemyShips.length;
  console.log(length);
  index = Math.floor(Math.random() * length);
  console.log(index);
  attackCoordinate += enemyShips[index];

  console.log(attackCoordinate);

  enemyShips = enemyShips.filter((value, temp) => value != attackCoordinate);
  attackCoordinate = "[" + attackCoordinate.toUpperCase() + "]";

  console.log(attackCoordinate);

  markAIAttack(attackCoordinate);
}

function markAIAttack(attackCoordinate) {

  let sunkShips = 0;

  attack(p2sFireLoc,attackCoordinate);
  document.getElementById("P2FrCell").innerHTML = attackCoordinate  + " Fire at locations!";
  showFireLocations('P2');
  sunkShips = Gameover('P2')
  document.getElementById("P2FrHitStatus").innerHTML = sunkShips  + " ship down! "+(numShips-sunkShips) + " to go";

  if((numShips-sunkShips)==0)
  {
    document.getElementById("gameStatus").innerHTML = " Gameover. You lost to the" + difficulty + " AI.";
    document.getElementById("turnByP2Btn").disabled = true;
    document.getElementById("frCellByP2Btn").disabled = true;
  } 
  else
  {
    document.getElementById("turnByP1Btn").disabled = false;
    document.getElementById("frCellByP2Btn").disabled = true;
  }
}


