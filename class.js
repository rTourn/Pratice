class Library{
    constructor(name){
        this.name = name;
        this.book = [];
        this.member =[];
    }

    
}

class Book{
    
    constructor(title, author){
        this.title = title;
        this.author = author;
        this.available = true;
        this.id = null;
    }

    displayInfo(){
        console.log(`${this.title}, ${this.author}, le livre est dispo : ${this.available}, ID : ${this.id},`)
    }

    borrow(){   
        if(this.available === true){
            this.available = false
            return true
        }else{
            return false
        }
    }
    returnBook(){
        this.available = true;
        return 

    }
}

class Member{
    constructor(name){
        this.name = name;
        this.id = ID;
        this.borrowedBooks =[];
        this.maxBooksAllowed = 2;
    }

    get borrowDuration(){
        return 14;
    }

    borrowBook(book){
        if(this.borrowedBooks.length >= this.maxBooksAllowed){
            return console.log(`You can't take more book, You have already have ${this.borrowedBooks.length} and your limits is ${this.maxBooksAllowed}`)
        }
        if(book.borrow()){
            this.borrowBook.push(book)
            return console.log(`You have sucefully borrowed this book : ${book.title}`)
        }else{
            return console.log(`This book : ${book.title} is already borrowed`)
        }
    }

    returnBook(book){
        const index = this.borrowedBooks.indexOf(book)
        if(index > -1){
            this.borrowedBooks.splice(index, 1)
            book.returnBook();
            return console.log(`${this.name} returned "${book.title}" successfully.`);
        }else{
            console.log(`You don't have "${book.title}"`);
        }
        
    }
}