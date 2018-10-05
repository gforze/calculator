var calc=[];
var num=[];
var op1 =0, op2 =0;
var ans=0;
var key="";

window.onload = function(){
  $("button").click(function(){
     key = this.id;
     handleInput(key);
     printHistory();
  });
}

function sumtabel(arg){
  if (num.length >0){
    console.log(calc);
    calc.push(parseFloat(arg.join("")));
    num=[];
  }
}

function printHistory(){
  if(calc.length>0){
    var history=calc.join("");
    $("#history").html(history);
  }
}
function updateCurrent(){
  var temp=num.join("");
  $("#display").html(temp);
}

function isFloat(n){
 return n === +n && n !== (n|0);
}

function isInteger(n){
 return n === +n && n === (n|0);
}

function handleInput(key){

  if (key=="=") {
      if(isInteger(calc[calc.length-1]) || isFloat(calc[calc.length-1])){
        num=[];
        $("#display").html("0");
      }
      else{
        sumtabel(num);
        if(calc.length>=3){
          if(isInteger(calc[calc.length-1]) || isFloat(calc[calc.length-1])){
            $("#display").html(calculate());
          }
        }
      }
  }
  else if(key=="ac"){
    //clears array completely
    calc=[];
    $("#display").html("0");
    $("#history").html("0");
  }
  else if(key=="ce"){
    //delete last entry in tabel
    sumtabel(num);
    calc.splice(-1,1);
    $("#display").html("0");
  }

  else if(key=="/"){
    sumtabel(num);
    if((isInteger(calc[calc.length-1]) || isFloat(calc[calc.length-1])) && calc.length>0){
      calc.push(key);
      $("#display").html("/");
   }
  }

  else if(key=="+"){
    sumtabel(num);
    if((isInteger(calc[calc.length-1]) || isFloat(calc[calc.length-1])) && calc.length>0){
    calc.push(key);
    $("#display").html("+");
  }

  }
  else if(key=="-"){
    sumtabel(num);
    if((isInteger(calc[calc.length-1]) || isFloat(calc[calc.length-1])) && calc.length>0){
    calc.push(key);
    $("#display").html("-");
  }
  }
  else if (key=="x") {
    sumtabel(num);
    if((isInteger(calc[calc.length-1]) || isFloat(calc[calc.length-1])) && calc.length>0){
    calc.push(key);
    $("#display").html("x");
  }
  }

  else{
      num.push(key);
      updateCurrent();
}
}

function calculate(){
  var insert=0;
  while(calc.length>1){
    for(var i=0; i<calc.length; i++){
      if (calc[i] == "x" || calc[i] == "/"){
        var temp1=calc.splice(i-1,3);
        if(temp1[1] == "x"){
          op1 =temp1[0];
          op2= temp1[2];
          insert = op1*op2;
          calc.splice(i-1, 0, insert);


        }
        else{
          op1 =temp1[0];
          op2= temp1[2];
          if(op2 != 0){
            insert = op1/op2;
            calc.splice(i-1, 0, insert);
          }
          else{
            num=[];
            $("#history").html("0");
            return " x/0 not possible";
          }

        }
      }

    }

    for(var i=0; i<calc.length; i++){
      if (calc[i] == "+" || calc[i] == "-"){
        var temp1=calc.splice(i-1,3);

        if(temp1[1] == "+"){
          op1 =temp1[0];
          op2= temp1[2];
          insert = op1+op2;
          calc.splice(i-1, 0, insert);
        }
        else{
          op1 =temp1[0];
          op2= temp1[2];
          insert = op1-op2;
          calc.splice(i-1, 0, insert);
        }
      }
    }
  }
  calc[0]=parseFloat(Math.round(calc[0] * 100) / 100).toFixed(2);
  return calc[0];
}
