import { Component, OnInit } from "@angular/core";
import { Cart } from "./cart";
import { ProductCart } from "./product-cart";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    cart: Cart = new Cart();
    products = [];

    total = 0;
    customer = { type: "", amount: 0 };

    unitTest = false;

    ngOnInit() {
        if (this.unitTest) {
            const a = new ProductCart(1, "Tronconneuse", 99.9, 1);
            this.cart.addProduct(a);

            this.scanProduct(1);
            this.changeQuantity();
            this.scanProduct(2);
            this.scanProduct(3);
            this.cart.deleteProductById(1);
            this.pay();
        }
    }

    changeQuantity() {
        const product = this.cart.getById(1);
        product.quantity = 4;
        this.printTestResult("change Quantity", product.quantity === 4);
    }

    addProductCart(product: ProductCart) {
        this.cart.addProduct(product);

        // this.printTestResult('add Product Cart', this.cart);
    }

    scanProduct(code: number) {
        const exist = this.products.find((x) => {
            code === x.id;
        });

        if (exist) {
            const newProductCart = new ProductCart(
                exist.id,
                exist.name,
                exist.price,
                1
            );
            this.addProductCart(newProductCart);
        }

        // this.printTestResult('scan product', )
    }

    choosePaymentMode(type: string, amount: number) {
        this.customer = { type, amount };
    }

    pay() {
        this.cart.products.forEach((element: ProductCart) => {
            this.total += element.price * element.quantity;
        });
        do {
            this.choosePaymentMode("CB", 18);
            this.total = this.total - this.customer.amount;
        } while (this.total > 0);

        if (this.total > 0) {
            console.log("Reste à payer: " + this.total);
        } else {
            console.log("Montant à rendre: " + this.total);
        }

        this.printTestResult("pay", this.total <= 0);
    }

    printTestResult(testName: string, condition: boolean) {
        if (condition) {
            console.log(`%c ${testName} : OK`, "color: green");
        } else {
            console.log(`%c ${testName} : KO`, "color: red");
        }
    }
}
