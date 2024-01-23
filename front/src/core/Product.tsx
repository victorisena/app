export default class Product {
    #product_id: number
    #value: number

    constructor (product_id: number = 0, value: number = 0){
        this.#product_id = product_id;
        this.#value = value;
    }

    get empty(){
        return new Product(0, 0);
    }

    get product_id(){
        return this.#product_id;
    }

    get value(){
        return this.#value;
    }
}