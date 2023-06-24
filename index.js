startBtn = document.getElementById("startBtn");
firstParagraph = document.getElementById("firstParagraph");
numUpper = document.getElementById("upperLimit");
startDiv = document.getElementById("startDiv");
secondDiv = document.getElementById("secondDiv");
numChance = document.getElementById("numChance");
numGuess = document.getElementById("numGuess");
takeGuessBtn = document.getElementById("takeGuessBtn");
statusNumber = document.getElementById("statusNumber");
let orginalNumber;

numUpper.addEventListener("keypress", (e) => {
  if (e.code == "NumpadEnter" || e.code == "Enter") {
    startGuessesNumber();
  }
});
startBtn.addEventListener("click", startGuessesNumber);

function startGuessesNumber() {
  numUpper = document.getElementById("upperLimit");
  numUpper = Number(numUpper.value);
  if (isNaN(Number(numUpper)) === false) {
    if (numUpper <= 10) {
      firstParagraph.classList.add("red");
      firstParagraph.innerText = "Your number must be bigger than 10";
    } else {
      startDiv.classList.add("hidden");
      secondDiv.classList.remove("hidden");
      numGuess.focus();
      orginalNumber = Math.floor(Math.random() * (numUpper + 1));
      GuessesNumber(numUpper);
    }
  }
}

function GuessesNumber(numUpper) {
  numChance.innerHTML = Math.floor(Math.log2(numUpper)) + 1;
}

function createSpanWithColor(text, color) {
  span = document.createElement("span");
  span.innerText = ` ${text} `;
  if (color == "red") {
    span.classList.add("red");
    return span;
  } else if (color == "blue") {
    span.classList.add("blue");
    return span;
  }
}

numGuess.addEventListener("keypress", (e)=>{
    if (e.code == "NumpadEnter" || e.code == "Enter") {
        checkNumberIsOrginal();
      }
});
takeGuessBtn.addEventListener("click", checkNumberIsOrginal);

function checkNumberIsOrginal() {
  if (numGuess.value != "" && isNaN(Number(numGuess.value)) === false) {
    numChance.innerHTML = Number(numChance.innerText) - 1;
    if (Number(numChance.innerText) === 0) {
      secondDiv.innerHTML = "Unfortunately, your chance has ended";
      secondDiv.classList.add("red");      
    }
    if (numGuess.value < orginalNumber) {
      statusNumber.appendChild(createSpanWithColor(numGuess.value, "blue"));
      numGuess.value = "";
    } else if (numGuess.value > orginalNumber) {
      statusNumber.appendChild(createSpanWithColor(numGuess.value, "red"));
      numGuess.value = "";
    } else if (numGuess.value == orginalNumber) {
      secondDiv.innerHTML = "Congratulations, you succeeded";
      secondDiv.classList.add("green");
    }
  }
}

