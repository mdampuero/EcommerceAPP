export class Product {
  public name: string;
  public code: string;
  public description: string;
  public picture: string;
  public price: number;
  public cost: number;
  public vat: number;
  public subtotal: number;
  public subtotalVat: number;
  public amount = 0;
  public unit = 1;
  constructor(fields?: any) {
    // tslint:disable-next-line: forin
    for (const f in fields) {
      this[f] = fields[f];
    }
    this.subtotal = this.cost * this.amount;
    this.subtotalVat = this.subtotal * this.vat;
  }
}
