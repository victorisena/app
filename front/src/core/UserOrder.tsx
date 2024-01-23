import Order from "./Order"

export default class UserOrder {
    #user_id: number
    #name: string
    #orders: Order[]

    constructor (user_id: number = 0, name: string = '', orders: Order[] = []){
        this.#user_id = user_id;
        this.#name = name;
        this.#orders = orders;
    }

    get empty(){
        return new UserOrder(0, "", []);
    }

    get user_id(){
        return this.#user_id;
    }

    get name(){
        return this.#name;
    }

    get orders(){
        return this.#orders;
    }
}