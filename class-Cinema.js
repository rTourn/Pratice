class Cinema{
    constructor(name){
        this.name = name;
        this.movies = [];
        this.customers = []
    }

    addMovie(movie){
        const index = this.movies.indexOf(movie);

        if(index > -1){
            this.movies.push(movie)
            console.log(`You added this movie: ${movie.title} to the cinema : ${this.name}`)
        }else{
            console.log(`This movie: ${movie.title} is already in stock`)
        }
    }

    removeMovie(movie){
        const index = this.movies.indexOf(movie);

        if(index === -1){
            this.movies.splice(index, 1)
            console.log(`You have removed this movie: ${movie.title} from the stock of this cinema : ${this.name}`)
        }else{
            console.log(`This movie: ${movie.title} isn't in stock of the cinema`)
        }
    }

    addCustomer(member){
        const index = this.customers.indexOf(member);

        if(index > -1){
            this.customers.push(member)
            console.log(`You added this member: ${member.name} to the cinema : ${this.name}`)
        }else{
            console.log(`This member: ${member.name} is already registered`)
        }
    }

    removeCustomer(member){
        const index = this.customers.indexOf(member);

        if(index === -1){
            this.customers.splice(index, 1)
            console.log(`You have removed this member: ${member.name} from this cinema : ${this.name}`)
        }else{
            console.log(`This member: ${member.name} isn't registerd in this cinema: ${this.name}`)
        }
    }

    registeredCustomer(customer){
        const whatchList = Array.from(customer.reservations.entries()).map(([movies, times])=> ({
                Movie: movies.title,
                ShowTime : times
            }))
        console.log(`ID: ${customer.id}, Name: ${customer.name}`)
        console.log(`Wachted`)
        console.table(whatchList)

    }

    listMovies(){
        console.log(`Movie list : ${this.movies}`)

    }

    findMovieByTitle(title){
        const result = this.movies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));

        if(result.length > 0){
            console.log(result)
        }else{
            console.log(`This ${title} doesn't exist in this cinema`)
        }
    }

    showReservations(movie){
       movie.listReservations()
    }
}

class Movie{
    constructor(title, duration){
        this.id = generateId()
        this.title = title;
        this.duration = duration;
        this.showtimes = [];
        this.reservations = new Map();
    }

    addShowtime(time){
        this.showtimes.push(time);
    }

    reserveSeat(customer, time){
        if (!this.showtimes.includes(time)) {
            console.log(`This time: ${time} is not available for this movie: ${this.title}`);
            return;
        }

        if (this.reservations.has(customer.id)) {
            console.log(`${customer.name} has already reserved a seat.`);
            return;
        }

        this.reservations.set(customer.id, { customer, time });
        console.log(`${customer.name} reserved a seat for "${this.title}" at ${time}`);
            
    }

    cancelReservation(customer){

        if(this.reservations.has(customer.id)){
             this.reservations.delete(customer.id)
             console.log(`${customer.name}'s reservation has been cancelled.`)
        }else{
            console.log(`No reservation found for ${customer.name}`)
        }
        
    }

    listReservations(){
        const reservationList = Array.from(this.reservations.entries()).map(([id, info])=> ({
                id: id,
                Name: info.customer.name,
                showtime: info.time
            }))
        
        console.log(`Reservations for ${this.title}`)
        console.table(reservationList)
        
    
    }
}

class Customer{
    constructor(name){
        this.id = generateId()
        this.name = name;
        this.reservations = new Map();
    }

    makeReservation(movie, time){

    }

    cancelReservation(movie, time){

    }

    listMyReservations(){
        
    }

}