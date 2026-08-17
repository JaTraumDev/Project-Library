const myLibrary = [];

function book(name, author) {
	this.name = name
	this.author = author
	this.id = crypto.randomUUID();
	this.displayInfo = function () {
		console.log(`Name: ${this.name}`)
		console.log(`Author: ${this.author}`)
		console.log(`id: ${this.id}`)
	}
}

function addBookToLibrary(name, author) {
	const bookObject = new book(name, author);
	myLibrary.push(bookObject);
}

function showBooks() {
	myLibrary.forEach((bookObject) => {
		bookObject.displayInfo();
		console.log("---")
	})
}


addBookToLibrary("Dynamite", "James Sunderland");
addBookToLibrary("I Have No Mouth, and I Must Scream", "Harlan Ellison");
addBookToLibrary("Fifty Shades of Grey", "E.L. James");
showBooks();
