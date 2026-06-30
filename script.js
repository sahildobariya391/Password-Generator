const resultEl=document.getElementById('result')
const lengthEl=document.getElementById('length')
const uppercaseEl=document.getElementById('uppercase')
const lowercaseEl=document.getElementById('lowercase')
const lengthValue = document.getElementById("lengthValue");
const numbersEl=document.getElementById('number')
const symbolsEl=document.getElementById('symbol')
const generateEl=document.getElementById('generate')
const clipbordEl =document.getElementById('clipboard')
// Show default value
lengthValue.textContent = lengthEl.value;

// Update value while moving the slider
lengthEl.addEventListener("input", () => {
    lengthValue.textContent = lengthEl.value;
});

const randomFunc = {
    lower:getRandomLowercase,
    upper:getRandomUppercase,
    number:getRandomNumbers,
    symbol:getRandomSymbols
}

generateEl.addEventListener('click',()=>{
  const length=+ lengthEl.value
  const hasLower = lowercaseEl.checked
  const hasUpper = uppercaseEl.checked;
  const hasNumber=numbersEl.checked;
  const hasSymbol=symbolsEl.checked;


  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
);
})


function generatePassword(lower ,upper ,number,symbol, length){
  let generatePassword=''
  let typeCount=lower+upper+number+symbol

 const typesArr=[{lower},{upper},{number},{symbol}].filter((item)=>
  Object.values(item)[0]
 )

 if(typeCount==0){
  return '';

 }
 for(let i=0;i<length;i+=typeCount){
  typesArr.forEach((type)=>{
    const keyFromRandomFun=Object.keys(type)[0]
    generatePassword += randomFunc[keyFromRandomFun]()
  })
 }
 
 const finalPassword = generatePassword.slice(0,length);

 return finalPassword


}
generateEl.addEventListener("click", () => {
    const length = +lengthEl.value; // Value between 6 and 20

    const password = generatePassword(
        lowercaseEl.checked,
        uppercaseEl.checked,
        numbersEl.checked,
        symbolsEl.checked,
        length
    );

    resultEl.innerText = password;
});

clipbordEl.addEventListener("click", () => {
    navigator.clipboard.writeText(resultEl.innerText);
    alert("Password Copied!");
});


// To generate lowercase latters 97 to 122
function getRandomLowercase(){
   return String.fromCharCode(Math.floor(Math.random()*26)+97)
}

// To generate uppercase latters 65 to 90
function getRandomUppercase(){
  return String.fromCharCode(Math.floor(Math.random()*26)+65)
}

// To generate numbers 48 to 57
function getRandomNumbers(){
  return String.fromCharCode(Math.floor(Math.random()*10)+48)
}


function getRandomSymbols(){
  const symbols="!@#$%^&*(){}[]=<>/,.";

  return symbols[Math.floor(Math.random()*symbols.length)]
}