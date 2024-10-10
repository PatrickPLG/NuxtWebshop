export class Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    imageUrl: string;
    quantity: number;

    constructor(
        id: number,
        title: string,
        price: number,
        category: string,
        description: string,
        imageUrl: string,
        quantity: number = 0 // Default value for quantity
    ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.description = description;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }
}