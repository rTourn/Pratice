let previouslyId = []

function generateId(){
    let data = Date.now().toString(36) + Math.random().toString(36).substring(2,5);

    while(previouslyId.includes(data)){
        data = Date.now().toString(36) + Math.random().toString(36).substring(2,5);
    }

    previouslyId.push(data)
    return data;
}


class Cinema{
    constructor(name){
        this.name = name;
        this.movies = [];
        this.customers = []
    }

    addMovie(movie){
        const index = this.movies.indexOf(movie);

        if(index === -1){
            this.movies.push(movie)
            console.log(`You added this movie: ${movie.title} to the cinema : ${this.name}`)
        }else{
            console.log(`This movie: ${movie.title} is already in stock`)
        }
    }

    removeMovie(movie){
        const index = this.movies.indexOf(movie);

        if(index > -1){
            this.movies.splice(index, 1)
            console.log(`You have removed this movie: ${movie.title} from the stock of this cinema : ${this.name}`)
        }else{
            console.log(`This movie: ${movie.title} isn't in stock of the cinema`)
        }
    }

    addCustomer(member){
        const index = this.customers.indexOf(member);

        if(index === -1){
            this.customers.push(member)
            this.member.cinema = this.name;
            console.log(`You added this member: ${member.name} to the cinema : ${this.name}`)
        }else{
            console.log(`This member: ${member.name} is already registered`)
        }
    }

    removeCustomer(member){
        const index = this.customers.indexOf(member);

        if(index > -1){
            this.member.cinema = undefined;
            this.customers.splice(index, 1)
            console.log(`You have removed this member: ${member.name} from this cinema : ${this.name}`)
        }else{
            console.log(`This member: ${member.name} isn't registerd in this cinema: ${this.name}`)
        }
    }

    registeredCustomer(){
        const customerList = this.customers.map(customer=> ({
                Name: customer.name,
                ID: customer.id,
                Reservations: customer.getMyReservation()
            }))
        console.log(`Registred Customer`)
        console.table(customerList)

    }

    listMovies(){
        const movieList = this.movies.map(movie=> ({
            Title: movie.title,
            Duration: movie.duration,
            ID: movie.id
        }))

        console.table(movieList)

    }

    listCustomers(){
        const customersList = this.customers.map(customer=> ({
            Name: customer.name,
            ID: customer.id,
        }))

        console.table(customersList)

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

    hasMovie(movie){
        const index = this.movies.indexOf(movie)

        if(index === -1){
            return false
        }
        return true;
    }
}

class Movie{
    constructor(title, duration){
        this.id = generateId()
        this.title = title;
        this.duration = duration;
        this.showtimes = new Map(); // key: time, value: { capacity, reservation };
        
    }

    addShowtime(time,capacity){
        this.showtimes.set(time, {capacity, reservation: new Map()})
    }

    listShowTimes(){
        
    }

    reserveSeat(customer, time){

        if (!this.showtimes.includes(time)) {
            console.log(`This time: ${time} is not available for this movie: ${this.title}`);
            return false;
        }

        const info = this.showtimes.get(time);

        if(info.capacity === info.reservation.length){
            console.log(`This movie: ${this.title} is already all booked`);
            return false;
        }

        if (info.reservation.includes(customer.id)) {
            console.log(`${customer.name} has already reserved a seat.`);
            return false;
        }

        info.reservation.set(customer.id, { customer });
        
        console.log(`${customer.name} reserved a seat for "${this.title}" at ${time}`);
        return true;
    }

    cancelReservation(customer, time){
        if (!this.showtimes.includes(time)) {
            console.log(`This time: ${time} is not available for this movie: ${this.title}`);
            return false;
        }

        const info = this.showtimes.get(time);

        if (!info.reservation.includes(customer.id)) {
            console.log(`${customer.name} hasn't reserved a seat for this movie: ${this.title} and this time: ${time}.`);
            return false;
        }

        info.reservation.delete(customer.id)
        console.log(`${customer.name}'s reservation has been cancelled.`)
        return true;
        
    }

    listReservations(time){
        const info = this.showtimes.get(time);
        const reservationList = Array.from(info.reservation.entries()).map(([capacity, reservation])=> ({
                Name: reservation.customer.name,
            }))
        
        console.log(`Reservations for ${this.title} and time ${time}`)
        console.table(reservationList)
        
    
    }
}

class Customer{
    constructor(name){
        this.id = generateId()
        this.name = name;
        this.reservations = new Map();
        this.cinema = undefined;
    }

    makeReservation(movie, time){
        if(!this.cinema.hasMovie(movie)){
            console.log(`Movie not found in this cinema.`)
            return 
        }

        if(movie.reserveSeat(this, time)){
             this.reservations.set(movie.id, { movie, time });
             console.table(this.getMyReservation())
        }
    }

    cancelReservation(movie, time){

        if(!this.cinema.hasMovie(movie)){
            console.log(`Movie not found in this cinema.`)
            return 
        }

        if(movie.cancelReservation(this, time)){
            this.reservations.delete(movie.id);
            console.table(this.getMyReservation())
        }
    }

    hasReservation(movie){
        if(this.reservations.has(movie.id)){
            return true;
        }
        return false;
    }

    listMyReservations(){
        const reservationList = Array.from(this.reservations.entries()).map(([id, info])=> ({
            Id: id,
            Name: info.movie.title,
            showtime: info.time
        }))
        console.log(`Reservations for ${this.name}`)
        console.table(reservationList)

    }

    getMyReservation(){
        return Array.from(this.reservations.entries()).map(([id, info])=> ({
            Id: id,
            Name: info.movie.title,
            showtime: info.time
        }))
    }
}