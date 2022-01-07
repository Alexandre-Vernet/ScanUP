import { Injectable } from '@angular/core';

const PRODUCT_LIST = [
    {
        id: 1,
        name: 'Tronçonneuse électrique RCS2340B2C 2300W 40cm - RYOBI',
        price: 99.0,
        quantity: 1,
        img: 'tronconneuse.png',
        code: '1111',
    },
    {
        id: 2,
        name: 'Ratelier de 9 clés torx 1,5 à 10mm chrome vanadium - INVENTIV',
        price: 12.5,
        quantity: 1,
        img: 'ratelier.png',
        code: '2222',
    },
    {
        id: 3,
        name: 'Rénovateur brillant Star longue durée tous sols intérieurs Starwax 1L',
        price: 17.95,
        quantity: 1,
        img: 'hammer.png',
        code: '3333',
    },
    {
        id: 4,
        name: 'Peinture sol trafic extrême satin 0.5L - Rouge brique - V33',
        price: 24.0,
        quantity: 1,
        img: 'paint.jpg',
        code: '4444',
    },
];

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    // "base de données"

    constructor() {}

    checkProductExist(id: number) {
        return { ...PRODUCT_LIST.find((product) => product.id === id) };
    }

    productList() {
        return [...PRODUCT_LIST];
    }
}
