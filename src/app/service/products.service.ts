import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDto } from './produc';

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
    prefixePath = 'api';
    productsResourcePath = 'products';

    constructor(private http: HttpClient) {}

    checkProductExist(id: number) {
        return { ...PRODUCT_LIST.find((product) => product.id === id) };
    }

    productList() {
        return [...PRODUCT_LIST];
    }

    findAll() {
        return this.http.get<ProductDto[]>(
            '/' + this.prefixePath + '/' + this.productsResourcePath
        );
    }

    getById(id: string) {
        return this.http.get(
            '/' + this.prefixePath + '/' + this.productsResourcePath + '/' + id
        );
    }

    create(obj: ProductDto) {
        return this.http.post(
            '/' + this.prefixePath + '/' + this.productsResourcePath,
            obj
        );
    }

    update(id: string, obj: ProductDto) {
        return this.http.put(
            '/' + this.prefixePath + '/' + this.productsResourcePath + '/' + id,
            obj
        );
    }

    delete(id: number) {
        return this.http.delete(
            '/' + this.prefixePath + '/' + this.productsResourcePath + '/' + id
        );
    }
}
