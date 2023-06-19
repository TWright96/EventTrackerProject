export class Purchase {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;


  constructor(
    id: number = 0,
  name: string= '',
  description: string = '',
  imageUrl: string = '',
  price: number = 0,

  ){
    this.id =id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

}
