let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;

let list: number[] = [1, 2, 3];
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK



enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;



function warnUser(): void {
    alert("This is my warning message");
}

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
