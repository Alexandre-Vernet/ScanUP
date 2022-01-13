import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDto } from '../service/produc';
import { ProductsService } from '../service/products.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { templateJitUrl } from '@angular/compiler';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
    products: ProductDto[] = [];

    formGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        img: new FormControl('', Validators.required),
    });

    productId: string;
    oneProduct;
    productIdList = [];

    @ViewChild('editModal') editModal;
    @ViewChild('deleteModal') deleteModal;

    isChecked: boolean;
    constructor(
        private productsService: ProductsService,
        private modalService: NgbModal
    ) {}

    openModal(product) {
        this.oneProduct = product;
        // this.productId = id;
        this.modalService.open(this.editModal);
    }
    openModalD(id) {
        this.productId = id;
        this.modalService.open(this.deleteModal);
    }
    closeModal() {
        this.modalService.dismissAll();
    }
    ngOnInit(): void {
        this.getAllProduct();
    }
    selectAll(e) {
        this.isChecked = e.currentTarget.checked;
        console.log(this.isChecked);
        this.products.forEach((pdt) => {
            this.select(e, pdt.id);
        });
    }
    select(e, id) {
        if (e.currentTarget.checked) {
            this.productIdList.push(id);
            console.log(id);
        } else {
            this.productIdList.splice(this.productIdList.indexOf(id), 1);
        }
    }
    getAllProduct() {
        this.productsService
            .findAll()
            .subscribe((dataProduct: ProductDto[]) => {
                this.products = dataProduct;
                console.log(dataProduct);
            });
    }
    deleteProduct(id) {
        this.productsService.delete(id).subscribe((dataProduct) => {
            console.log(dataProduct);
        });
        location.reload();
    }
    deleteMultiple() {
        this.productIdList.forEach((element) => {
            this.deleteProduct(element);
        });
    }
    editProduct(id) {
        this.productsService.update(id, this.formGroup.value).subscribe();
        location.reload();
    }
    addProduct() {
        this.productsService
            .create(this.formGroup.value)
            .subscribe((dataProduct: ProductDto[]) => {
                console.log(dataProduct);
            });
        location.reload();
    }
}
