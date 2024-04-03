// In index.mjs
import { Bond } from './bondModel.mjs'; // assuming bondModel.mjs is in the same directory

const bonds = [new Bond({name: 'Bond1', value: 100, yield: 5, maturityDate: new Date()}), new Bond({name: 'Bond2', value: 200, yield: 6, maturityDate: new Date()})];

console.log('Bond Number\tBook In Date\tStatus Type\tAmount\tCID\tName\tStreet\tCity\tState\tOffense\tMdate');
bonds.forEach((bond, index) => {
    console.log(`${index + 1}\t${new Date()}\tActive\t${bond.value}\t-\t${bond.name}\t-\t-\t-\t-\t${bond.maturityDate}`);
});
