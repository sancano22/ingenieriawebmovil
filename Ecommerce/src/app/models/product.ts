export interface Product {
    id:number,
    name:string,
    image: string,
    description:string,
    stock:number,
    price:number,
    currency?:'CLP' | 'USD' | 'EUR',
    tags?:string[],
    category:string
    rating:{average:number,count:number},
    
}