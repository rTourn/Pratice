let previouslyId = []

export function generateId(){
    let data = Date.now().toString(36) + Math.random().toString(36).substring(2,5);

    while(previouslyId.includes(data)){
        data = Date.now().toString(36) + Math.random().toString(36).substring(2,5);
    }

    previouslyId.push(data)
    return data;
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

export {Customer}