const rangeInput = document.getElementById("char-range");
const numberInput = document.getElementById("char-count");
const numbersToggle = document.getElementById("switch-numbers-checkbox")
const symbolsToggle = document.getElementById("switch-symbols-checkbox")

const minNumberInput = 8;
const maxNumberInput = 100;

let characterCount = minNumberInput;
let includeNumbers = true;
let includeSymbols = false;

rangeInput.addEventListener('input', function(){
    numberInput.value = rangeInput.value;
    characterCount = parseInt(rangeInput.value)
});

numberInput.addEventListener('change', function(){

    let numberInt = parseInt(numberInput.value);

    if(numberInt > maxNumberInput){
        numberInput.value = maxNumberInput;
        rangeInput.value = numberInput.value;
    } 

    else if (numberInt >= minNumberInput){
        rangeInput.value = numberInput.value;
    }

    else if(numberInt < minNumberInput){
        numberInput.value = minNumberInput;
        rangeInput.value = minNumberInput;
    }

    characterCount = numberInt;
})


numbersToggle.addEventListener("change", function() {
    includeNumbers = numbersToggle.checked;
    console.log("Include Numbers:", includeNumbers);
});

symbolsToggle.addEventListener("change", function(){
    includeSymbols = symbolsToggle.checked;
    console.log("Include Symbols:", includeSymbols);
})


