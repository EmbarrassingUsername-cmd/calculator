const operatorButton=document.querySelectorAll(".operator");
const numberButton=document.querySelectorAll(".number");
const displayEntry=document.querySelector("#num-entry");
const displayCalc=document.querySelector("#num-calc");
const equalsButton=document.querySelector("#equals");
const clearButton=document.querySelector("#clear");
const delButton=document.querySelector("#delete");
let firstValue="";
let operatorValue="";
let secondValue="";
let result="";
let repeatSecond="";
let repeatFunction="";
//global variables for calculator input and output
operatorButton.forEach(element=> element.addEventListener("click", operatorFunction));
numberButton.forEach(element=> element.addEventListener("click", numberFunction));
equalsButton.addEventListener("click", evaluateFunction);
clearButton.addEventListener("click", clearFunction);
delButton.addEventListener("click",deleteFunction);
function clearFunction(){
    displayEntry.innerText="";
    displayCalc.innerText="";
    firstValue="";
    operatorValue="";
    secondValue="";
    result="";
    repeatFunction="";
    repeatSecond="";
};
function deleteFunction(){
    if(secondValue){
        secondValue=secondValue.slice(0,-1);
        displayEntry.innerText=secondValue;
        return;
    }
    else if(operatorValue){
        operatorValue="";
        displayCalc.innerText=firstValue;
        return;
    }
    else if (firstValue){
        firstValue=firstValue.slice(0,-1);
        displayCalc.innerText=firstValue
    }
};
function evaluateFunction(){
    if (operatorValue&&firstValue&&secondValue){
        result=operate(operatorValue,firstValue,secondValue);
        displayEntry.innerText=result;
        displayCalc.innerText="";
        repeatSecond=secondValue
        repeatFunction=operatorValue
        firstValue="";
        operatorValue="";
        secondValue="";
    }
    else if(result&&repeatSecond&&repeatFunction&&!operatorValue&&!firstValue&&!secondValue){
        result=operate(repeatFunction,result,repeatSecond)
        displayEntry.innerText=result
    }
    else alert("Please try again there appears to be something missing");
};
function operatorFunction(){
    if(!firstValue){
        if(result){
            firstValue=result;
        }
        else  if(this.id=="subtract"){
            firstValue="-"
            displayEntry.innerText=firstValue
            return
        }
        else return alert("enter a value before hitting the operator")
    };
    if(firstValue=="-"){
        firstValue=""
        displayEntry.innerText=firstValue
        return
    };
    if(firstValue&&secondValue&&operatorValue) {
        evaluateFunction()
        operatorFunction()      
    };
    operatorValue=(this.id)
    let operator= this.innerText
    displayCalc.innerText=firstValue+" "+operator 
    displayEntry.innerText=secondValue
};
function numberFunction(){
    if(operatorValue){
        if (secondValue.length<13){
            if (this.id.charAt(this.id.length-1)=="l"){
                if(!secondValue.indexOf(".")) secondValue+="."
            else return alert("decimal point already used")
            };
            secondValue+=this.id.charAt(this.id.length-1);
            displayEntry.innerText=secondValue;
            return;
        }
        else{alert("Please limit inputs to 12 characters"); return}
    };
    if (firstValue.length<13){
        if (this.id.charAt(this.id.length-1)=="l"){
            if((firstValue.indexOf(".")==-1)){
                firstValue+="."
            }
        else return alert("Decimal point already used");
        }
    else firstValue+=this.id.charAt(this.id.length-1);
    displayEntry.innerText=firstValue;
    }
    else alert("Please limit inputs to 12 characters");
};
function operate(operator,b,c){
    if (operator==="add")return add(b,c);
    if (operator==="subtract")return subtract(b,c);
    if (operator==="multiply")return multiply(b,c);
    if (operator==="divide"){
        if(!(secondValue===0))return divide(b,c);
        else alert("Please do not attempt division by zero this is a known bug with life v1.0.0 and successful division is not currently possible please consult with the developer of life to see when this will be patched though the project appears to be abandonned")
    }
    else{alert("There appears to have been a problem please alert the developper if you haven't been fiddling in the console")}
}
function add(a,b){
    return +a + (+b);
};
function subtract(a,b){
    return a-b;
};
function multiply(a,b){
    return a*b ; 
};
function divide(a,b){
    return a/b;
};
