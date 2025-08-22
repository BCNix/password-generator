const charPools = {
    alphaUpperCaseChar: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    alphaLowerCaseChar: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    numericChar: ["0","1","2","3","4","5","6","7","8","9"],
    symbolChar: ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]
}

const rangeInput = document.getElementById("char-range");
const numberInput = document.getElementById("char-count");
const numbersToggle = document.getElementById("switch-numbers-checkbox");
const symbolsToggle = document.getElementById("switch-symbols-checkbox");
const displayPassword = document.getElementById("gen-password");
const copyPassword = document.getElementById("btn-copy-pass");
const refreshPassword = document.getElementById("btn-refresh-pass");

const minNumberInput = 8;
const maxNumberInput = 100;

let characterCount = 12;
let includeNumbers = true;
let includeSymbols = false;

showPassword();

rangeInput.addEventListener('input', function(){
    numberInput.value = rangeInput.value;
    characterCount = parseInt(rangeInput.value)
    showPassword();
    
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
    showPassword();
})


numbersToggle.addEventListener("change", function() {
    includeNumbers = numbersToggle.checked;
    showPassword();
});

symbolsToggle.addEventListener("change", function(){
    includeSymbols = symbolsToggle.checked;
    showPassword();
})

copyPassword.addEventListener("click", function(){
    let content = displayPassword.textContent;

    navigator.clipboard.writeText(content).then(()=> {
        copyPassword.textContent = "     Copied!    ";
        copyPassword.classList.add("btn-copied");

        setTimeout(()=> {
            copyPassword.textContent = "Copy password";
            copyPassword.classList.remove("btn-copied");
        }, 1500)
    });

})

refreshPassword.addEventListener("click", function() {
    showPassword()
})


function showPassword(){

    displayPassword.textContent = "";

    let password =  generatePassword(characterCount, charPools, includeSymbols, includeNumbers).join("");

    for(let i = 0; i < password.length; i++){
        const char = password[i];
        const span = document.createElement("span");
        span.textContent = char;

        if(/[0-9]/.test(char)){
            span.classList.add("gen-password-numbers");
        } else if(/[\W_]/.test(char)){
            span.classList.add("gen-password-symbols");
        }

        displayPassword.appendChild(span);
    }

}


// Pick a random element in an array
function randomItem(arr){
    let arrItem = Math.floor(Math.random() * arr.length);

    return arr[arrItem];
}

// Shuffle an array
function shuffleArray(arr) {
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

// Return an array of arrays with possible combinations.
// Combinations: Letters (Upper & Lowercase) + Numbers, Letters, Letters + Symbols and Letters + Numbers + Symbols

function getArrayChar(hasSymbols, hasNumbers, poolsObj){

    let pools = [];

    pools.push(poolsObj.alphaUpperCaseChar);
    pools.push(poolsObj.alphaLowerCaseChar);

    if(hasSymbols && hasNumbers){
        pools.push(poolsObj.symbolChar);
        pools.push(poolsObj.numericChar);
    } else if(hasSymbols && !hasNumbers){
        pools.push(poolsObj.symbolChar);
    } else if(hasNumbers && !hasSymbols){
        pools.push(poolsObj.numericChar);
    }

    return pools;
}

function generatePassword(charCount, poolsObj, hasSymbols, hasNumbers){
    let passwordChars = [];

    passwordChars.push(randomItem(poolsObj.alphaUpperCaseChar));
    passwordChars.push(randomItem(poolsObj.alphaLowerCaseChar));

    if(hasNumbers){
        passwordChars.push(randomItem(poolsObj.numericChar));
    }

    if(hasSymbols){
        passwordChars.push(randomItem(poolsObj.symbolChar));
    }

    let remainingCount = charCount - passwordChars.length;

    let pools = getArrayChar(hasSymbols, hasNumbers, poolsObj);

    for(let i = 0; i < remainingCount; i++){
        let pool = randomItem(pools);
        passwordChars.push(randomItem(pool));
    }

    return shuffleArray(passwordChars);
}


