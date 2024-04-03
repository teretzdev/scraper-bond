// In bondModel.mjs
export class Bond {
  constructor(data) {
    this.name = data.name;
    this.value = data.value;
    this.yield = data.yield;
    this.maturityDate = data.maturityDate;
   }
}
