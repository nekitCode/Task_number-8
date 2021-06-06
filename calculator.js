class Calculator {
    #screen1
    #screen2
    #equally
    #operator
    #backspace
    #digit
    #clear
  constructor(elem) {
    this.#screen1 = elem.screen1;
    this.#screen2 = elem.screen2;
    this.#equally = elem.equally;
    this.#operator = elem.operator;
    this.#backspace = elem.backspace;   
    this.#digit = elem.digit;
    this.#clear = elem.clear; 
    this.dis1 = '';
    this.dis2 = '';
    this.result = null;
    this.isDot = false;
    this.lastOperation = '';
  }

  appendNumber() {
    this.#digit.forEach((number) => {
      number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !this.isDot) {
          this.isDot = true;
        } else if (e.target.innerText === "." && this.isDot) {
          return;
        }
        this.dis2 += e.target.innerText;
        this.#screen2.innerText = this.dis2;
      });
    });
  }

  operation1() {
    this.#operator.forEach((elemOperation) => {
      elemOperation.addEventListener("click", (e) => {
        if (!this.dis2) return;
        this.isDot = false;
        const operationName = e.target.innerText;
        if (this.dis1 && this.dis2 && this.lastOperation) {
          mathOperation();
        } else {
          this.result = parseFloat(this.dis2);
        }
        this.clearVar(operationName);
        this.lastOperation = operationName;
      });
    }); 
  }
  
  clearVar(name = '') {
    this.dis1 += this.dis2 + " " + name + " ";
    this.#screen1.innerText = this.dis1;
    this.#screen2.innerText = "";
    this.dis2 = "";
  }

  mathOperation() {
    if (this.lastOperation ===  undefined) {
      console.log(true);
    } else if (this.lastOperation === "x") {
      this.result = parseFloat(this.result) * parseFloat(this.dis2);
    } else if (this.lastOperation === "+") {
      this.result = parseFloat(this.result) + parseFloat(this.dis2);
    } else if (this.lastOperation === "-") {
      this.result = parseFloat(this.result) - parseFloat(this.dis2);
    } else if (this.lastOperation === "/") {
      this.result = parseFloat(this.result) / parseFloat(this.dis2);
    }
  }
  
  clearAll() {
    this.#clear.addEventListener("click", () => {
      this.dis1 = "";
      this.dis2 = "";
      this.#screen1.innerText = "";
      this.#screen2.innerText = "";
      this.result = "";
      });  
  }
  
  clearLast() {
    this.#backspace.addEventListener("click", () => {
      this.#screen2.innerText = "";
      this.dis2 = "";
    });
  }
  
  checkElement() {
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "." ||
        e.key === ","
      ) {
        this.clickButtonEl(e.key);
      } else if (e.key === "+" || e.key === "-" || e.key === "/") {
        this.clickOperation(e.key);
      } else if (e.key === "*") {
        this.clickOperation("x");
      } else if (e.key == "Enter" || e.key === "=") {
        this.clickEqual();
      }
    });
  
  }

  equalE() {
    this.#equally.addEventListener("click", () => {
      if (!this.dis2 || !this.dis1) return;
      this.isDot = false;
      this.mathOperation();
      this.clearVar();
      this.#screen2.innerText = this.result;
      this.dis2 = this.result;
      this.dis1 = "";

    });  
  }
  
  clickButtonEl(key) {
    this.#digit.forEach((button) => {
      if (button.innerText === key) {
        console.log(button.innerText);
        button.click();
      }
    });
  }
  clickOperation(key) {
    this.#operator.forEach((operation) => {
      if (operation.innerText === key) {
        console.log(operation);
        operation.click();
      }
    });
  }
  clickEqual() {
    this.#equally.click();
  }

}

const calculator = new Calculator({
  screen1: document.querySelector(".s1"),
  screen2: document.querySelector(".s2"),
  digit: document.querySelectorAll(".digit"),
  operator: document.querySelectorAll(".operator"),
  equally: equally = document.querySelector(".equally"),
  clear: document.querySelector(".clear"),
  backspace: document.querySelector(".backspace")
});

calculator.appendNumber();
calculator.operation1();
calculator.checkElement();
calculator.equalE();
calculator.clearAll();
calculator.clearLast();

function commaReplacement(comma) {
  return comma.replace(/,/, '.');
}
