import { Cinema } from './cinema.mjs';
import { Movie } from './movie.mjs';

import { Customer } from './customer.mjs'

const grandRex = new Cinema("GrandRex")
grandRex.setRoom(1,5,8)
grandRex.setRoom(2,4,6)

console.log(grandRex)

const avatar = new Movie("Avatar", "2h40")
console.log(avatar)

const paul = new Customer("Paul")

console.log(paul)
