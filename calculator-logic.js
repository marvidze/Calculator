let output = document.getElementById("out");
let tolerance = 0.000000001;
let maxIterations = 10000;

function buttonNumber(button) {
  let str = output.innerText;
  let lastChar = str.charAt(str.length - 1);
  let firsChar = str.charAt(0);
  if (
    (lastChar == "/" ||
      lastChar == "*" ||
      lastChar == "-" ||
      lastChar == "+") &&
    (button.innerText == "/" ||
      button.innerText == "*" ||
      button.innerText == "-" ||
      button.innerText == "+")
  ) {
    output.innerText = output.innerText.substring(0, str.length - 1);
  }

  if (
    (button.innerText == "/" ||
      button.innerText == "*" ||
      button.innerText == "-" ||
      button.innerText == "+") &&
    (str == "" || lastChar == ".")
  ) {
    return;
  }

  if (
    (button.innerText == "/" ||
      button.innerText == "*" ||
      button.innerText == "-" ||
      button.innerText == "+") &&
    lastChar == "0" &&
    !str.includes(".") &&
    str != "0"
  ) {
    return;
  }

  if (
    lastChar == "0" &&
    !str.includes(".") &&
    firsChar == "0" &&
    (button.innerText != "/") &
      (button.innerText != "*") &
      (button.innerText != "-") &
      (button.innerText != "+")
  ) {
    output.innerText = output.innerText.substring(0, str.length - 1);
  }

  output.innerText += button.innerText;
}

function buttonPlusMinus() {
  str = output.innerText;
  firstChar = str.charAt(0);
  if (firstChar == "-") output.innerText = str.substring(1, str.length);
  if (firstChar != "-") output.innerText = "-" + str;
}

function buttonDelete() {
  str = output.innerText;
  output.innerText = output.innerText.substring(0, str.length - 1);
}

function buttonDot() {
  let str = output.innerText;
  if (!str.includes(".")) {
    output.innerText += ".";
  }
}

function buttonDeleteAll() {
  output.innerText = "0";
}

function buttonEqually() {
  output.innerText = eval(output.innerText);
}

function sqrtHeron() {
  let number = eval(output.innerText);

  if (number < 0) {
    output.innerText = "NaN";
  }
  if (number == 0 || number == 1) {
    output.innerText = number;
  }

  let guess = number / 2;
  let iteration = 0;

  while (iteration < maxIterations) {
    let nextGuess = 0.5 * (guess + number / guess);

    if (Math.abs(nextGuess - guess) < tolerance) {
      output.innerText = nextGuess;
    }

    guess = nextGuess;
    iteration++;
  }
  output.innerText = guess;
}

function sinTaylor() {
  let number = (Math.PI / 180) * eval(output.innerText);
  let result = 0;
  let term = number;
  let n = 1;

  for (let i = 0; i < maxIterations; i++) {
    result += term;
    term *= -(number * number) / (2 * n * (2 * n + 1));
    n++;

    if (Math.abs(term) < tolerance) {
      break;
    }
  }

  addToOut(result);
  return result;
}

function cosTaylor() {
  let number = (Math.PI / 180) * eval(output.innerText);
  let result = 1;
  let term = 1;
  let n = 1;

  for (let i = 0; i < maxIterations; i++) {
    term *= -(number * number) / ((2 * n - 1) * (2 * n));
    result += term;
    n++;

    if (Math.abs(term) < tolerance) {
      break;
    }
  }

  addToOut(result);
  return result;
}

function tanTaylor() {
  const sinX = sinTaylor();
  const cosX = cosTaylor();

  if (Math.abs(cosX) < 0) {
    output.innerText = "NaN";
  }

  result = sinX / cosX;
  output.innerText = result;
}

function cotTaylor() {
  const sinX = sinTaylor();
  const cosX = cosTaylor();

  if (Math.abs(sinX) < 0) {
    output.innerText = "NaN";
  }

  result = cosX / sinX;
  output.innerText = result;
}

function lnFunction() {
  let number = eval(output.innerText);
  if (number <= 0) {
    addToOut("Ошибка: ln(x) определен только для x > 0");
    return;
  }

  let x = number;
  let sign = 1;

  if (x > 1) {
    x = 1 / x;
    sign = -1;
  }

  x = x - 1;
  let result = 0;
  let term = x;
  let n = 1;

  for (let i = 0; i < maxIterations; i++) {
    result += term / n;
    term *= -x;
    n++;

    if (Math.abs(term / n) < tolerance) {
      break;
    }
  }

  result *= sign;

  addToOut(result);
  return result;
}

function lgFunction() {
  let lnX = lnFunction();
  let ln10 = 2.302585084356762;

  output.innerText = lnX / ln10;
}

function expTaylor() {
  let number = eval(output.innerText);
  let result = 1;
  let term = 1;
  let n = 1;

  for (let i = 0; i < maxIterations; i++) {
    term *= number / n;
    result += term;
    n++;

    if (Math.abs(term) < tolerance) {
      break;
    }
  }

  output.innerText = result;
}

function addToOut(result) {
  output.innerText = result;
}
