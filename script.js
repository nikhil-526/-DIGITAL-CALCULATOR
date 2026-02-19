let display = document.getElementById("display");

let historyDiv = document.getElementById("history");

function addToHistory(expression, result) {
  let entry = document.createElement("p");
  entry.textContent = `${expression} = ${result}`;
  historyDiv.appendChild(entry);
}

let clickSound = new Audio("click.mp3"); // add a small sound file

function playSound() {
  clickSound.play();
}

document.addEventListener("keydown", function(event) {
  let display = document.getElementById("display");

  // Numbers and operators
  if (!isNaN(event.key) || ["+", "-", "*", "/", "."].includes(event.key)) {
    display.value += event.key;
  }

  // Enter = Equals
  if (event.key === "Enter") {
    calculateResult(); // your function to evaluate expression
  }

  // Backspace = Delete last character
  if (event.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  // Escape = Clear all
  if (event.key === "Escape") {
    display.value = "";
  }
});

function handleInput(value) {
  let display = document.getElementById("display");

  switch(value) {
    case "➕": display.value += "+"; break;
    case "➖": display.value += "-"; break;
    case "✖️": display.value += "*"; break;
    case "➗": display.value += "/"; break;
    case "🎲": 
      let randomNum = Math.floor(Math.random() * 100); // random 0–99
      display.value += randomNum;
      break;
    default: display.value += value;
  }
}

function setTheme(theme) {
  document.body.className = theme; // applies body theme
  document.querySelectorAll("button").forEach(btn => {
    btn.className = theme; // applies button theme
  });
}

document.addEventListener("keydown", function(event) {
  if(!isNaN(event.key) || ["+", "-", "*", "/", "."].includes(event.key)) {
    document.getElementById("display").value += event.key;
  }
  if(event.key === "Enter") {
    calculateResult();
  }
});

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function calculate() {
  try {
    let expression = display.value;

    // Convert percentages into decimal form
    expression = expression.replace(/(\d+)%/g, "($1/100)");

    display.value = eval(expression);
  } catch (error) {
    display.value = "Error";
  }
}



let score = 0;
let streak = 0;
let level = "easy"; // can be "easy", "medium", "hard"

function generateProblem() {
  let num1, num2, operator, correctAnswer;

  if (level === "easy") {
    num1 = Math.floor(Math.random() * 20);
    num2 = Math.floor(Math.random() * 20);
    operator = "+";
    correctAnswer = num1 + num2;
  } else if (level === "medium") {
    num1 = Math.floor(Math.random() * 50);
    num2 = Math.floor(Math.random() * 50);
    operator = "*";
    correctAnswer = num1 * num2;
  } else {
    num1 = Math.floor(Math.random() * 100);
    num2 = Math.floor(Math.random() * 100);
    operator = ["+", "-", "*"][Math.floor(Math.random() * 3)];
    correctAnswer = eval(`${num1} ${operator} ${num2}`);
  }

  let userAnswer = prompt(`Solve: ${num1} ${operator} ${num2}`);
  
  if (parseInt(userAnswer) === correctAnswer) {
    score += 10;
    streak++;
    alert(`✅ Correct! Score: ${score}, Streak: ${streak}`);
  } else {
    streak = 0;
    alert(`❌ Wrong! The answer was ${correctAnswer}. Score: ${score}`);
  }
}

document.getElementById("challengeBtn").addEventListener("click", () => {
  generateProblem(); // or startChallenge(), depending on your function name
});