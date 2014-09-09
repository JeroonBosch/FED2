////Local scope
function localScope() {
  var iterator = 0;
  var max = 10;
  var min = 0;

  //local scope code here
}



////Global scope
var iterator = 0;
var max = 10;
var min = 0;



////Closure
//explanation
/*
* Een closure is meestal een functie waar er binnen deze functie wordt verwezen naar een lokale variabele die buiten deze functie zelf ligt.
*/

//example
function multiplyBy (x) {
	return function (y) {
		return x * y;
	};
}
var doubleIt = multiplyBy(2);
var result = doubleIt(3);
alert(result); // 2 * 3 = 6

//When the multiplyBy function is called, it returns a function.
//That function closes the context and remembers what the parameter x was at exactly that time (i.e. 2 in the code above)
//When the result of calling the multiplyBy function is assigned to the variable doubleIt, it will always know what x was when it was initially created.
//The doubleIt variable above refers to a function which will always double what is being sent in.
//That means when doubleIt is called with a value of 3, it will multiply 3 with 2, and return 6.
