import Product from "./Product"

export default class Order {
    #order_id: number
    #total: number
    #date: string
    #products: Product[]

    constructor (order_id: number = 0, total: number = 0, date: string = "", products: Product[] = []){
        this.#order_id = order_id;
        this.#total = total;
        this.#date = date;
        this.#products = products;
    }

    get empty(){
        return new Order(0, 0, "", []);
    }

    get order_id(){
        return this.#order_id;
    }

    get total(){
        return this.#total;
    }

    get date(){
        return this.#date;
    }

    get products(){
        return this.#products;
    }
}