
class Book{
    constructor(id , name, author){
        this.id = id;
        this.name = name;
        this.author = author;
        this.available = true;
    }

    displayInfo(){
        return console.log( this.name, this.author, this.id)
    }

    borrow(){
        if(!this.available == true){
            return false
        }else{
            this.available = false;
            return true
        }
    }

    returnBook(){
        this.available = true;
        return
    }

}

class Member{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.borrowedBook = [];
    }

    borrowBook(book){
        if(book.borrow()){
            this.borrowedBook.push(book)
            console.log(`You have succefuly borrowed this book: ${book.title}`)
        }else{
            console.log(`This book: ${book.title} is already borrowed`)
        }
    }

    returnBook(book){
        index = this.borrowedBook.indexOf(book);

        if(index > -1){
            this.borrowedBook.slice(index, 1);
            book.returnBook();
            return console.log(`You have succefuly return the book ${book.title}`)
        }else{
            return console.log(`You don't have this book ${book.title} in you possesion`)
        }
    }
}

class Library{
    constructor(){
        this.books =[];
        this.Member = [];
    }
}