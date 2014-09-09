function Persoon(name) // Constructor
{
    this.name = name;

    this.speak = function()
   	{
       console.log("My name is " + this.name);
   	}
}

Persoon.prototype.walk = function()
{
    console.log("Walking...");
}

Persoon.prototype.eat = function()
{
    console.log("Eating...");
}

var bob = new Persoon("Bob");


var PersoonLiteral = {
    // an array literal
    name: "Bob",
    speak: function() { // function
        console.log("My name is " + this.name);
    },
    walk: function() { // function
       console.log("Walking...");
    },
    eat: function() { // function
        console.log("Eating...");
    }
};
