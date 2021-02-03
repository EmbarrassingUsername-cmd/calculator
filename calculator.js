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
//global variables for calculator input and output repeat variabless are to allow evaluate to repeat the action on clicking equals multiple times 
operatorButton.forEach(element=> element.addEventListener("click", operatorFunction));
numberButton.forEach(element=> element.addEventListener("click", numberFunction));
equalsButton.addEventListener("click", evaluateFunction);
clearButton.addEventListener("click", clearFunction);
delButton.addEventListener("click",deleteFunction);
window.addEventListener("keydown", keyboardFunction);
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
//keyboardfunction allows for key presses to activate buttons added 2 data key properties to support num pad and normal number keys
function keyboardFunction(e){
    const key=document.querySelector(`button[data-key="${e.keyCode}"]`);
    if(!key){
        const key2=document.querySelector(`button[data-key2="${e.keyCode}"]`);
        if(key2) key2.click();
        return;
    }
    key.click();
}

function deleteFunction(){
    if(secondValue){
        secondValue=secondValue.slice(0,-1);
        displayEntry.innerText=secondValue;
        return;
    }
    else if(operatorValue){
        operatorValue="";
        displayCalc.innerText="";
        displayEntry.innerText=firstValue;
        return;
    }
    else if (firstValue){
        firstValue=firstValue.slice(0,-1);
        displayEntry.innerText=firstValue;
    };
};
function evaluateFunction(){
    if (operatorValue&&firstValue&&secondValue){
        result=operate(operatorValue,firstValue,secondValue)
        result=Number.parseFloat(result).toPrecision(precision(result));
        if (result===undefined){secondValue=""; displayEntry.innerText=""; return}
        displayEntry.innerText=result;
        displayCalc.innerText="";
        repeatSecond=secondValue;
        repeatFunction=operatorValue;
        firstValue="";
        operatorValue="";
        secondValue="";
    }
    else if(result&&repeatSecond&&repeatFunction&&!operatorValue&&!firstValue&&!secondValue){
        result=operate(repeatFunction,result,repeatSecond);
        result=Number.parseFloat(result).toPrecision(precision(result));
        displayEntry.innerText=result;
    }
    else alert("Please try again there appears to be something missing");
};
function operatorFunction(){
    if(!firstValue){
        if(result){
            firstValue=result;
        }
        else  if(this.id=="subtract"){
            firstValue="-";
            displayEntry.innerText=firstValue;
            return;
        }
        else return alert("enter a value before hitting the operator");
    };
//to switch between negative and positive values using minus button
    if(firstValue=="-"){
        firstValue=""
        displayEntry.innerText=firstValue;
        return;
    };
    if(firstValue&&secondValue&&operatorValue) {
        evaluateFunction();
        operatorFunction();  
    };
    operatorValue=(this.id);
    let operator= this.innerText;
    displayCalc.innerText=firstValue+" "+operator;
    displayEntry.innerText=secondValue;
};
//number function will used when number/decimal is pressed and will change the value stings accordingly
function numberFunction(){
    if(operatorValue){
        if (secondValue.length<13){
            if (this.id.charAt(this.id.length-1)=="l"){
                if(secondValue.indexOf(".")==-1) secondValue+="."
                else return alert("decimal point already used")
            }
            else secondValue+=this.id.charAt(this.id.length-1);
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
        if(!(secondValue==="0"))return divide(b,c);
        else return alert("Please do not attempt division by zero this is a known bug with Universe v1.0.0 and successful division is not currently possible please consult with the developer of Universe to see when this will be patched. Universe has not seen an update in nearly 14 billion years and the expected 2012 patch never happened");
    }
    else{alert("There appears to have been a problem please alert the developer if you haven't been fiddling in the console")};
}
function precision(x){
    if (`${x}`.length<10) return `${x}`.length
    else return 9
}
function add(a,b){
    return +a+(+b);
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
