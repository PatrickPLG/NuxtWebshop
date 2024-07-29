export class Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    quantity: number;

    constructor(
        id: number,
        title: string,
        price: number,
        category: string,
        description: string,
        image: string,
        quantity: number = 0 // Default value for quantity
    ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.description = description;
        this.image = image;
        this.quantity = quantity;
    }
}