import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OutputRequest } from '@models/request/outputRequest';
import { ProductRequest } from '@models/request/productRequest';
import { AuthService } from '@services/auth.service';
import { OutputService } from '@services/output.service';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public products: ProductRequest[] | undefined;
  public send: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _productService: ProductService,
    private _outputService: OutputService,
  ) {}

  ngOnInit() {
    this.read();
  }

  read() {
    this._productService.read().subscribe((res) => {
      this.products = res.data;
    });
  }

  formProduct = this._fb.group({
    id: 0,
    name: ['', [Validators.required]],
    image: ['', Validators.required],
    idState: ['', Validators.required],
  });

  formOutput = this._fb.group({
    idProduct: 0,
    quantity: ['', [Validators.required]],
    idUser: 0,
  });

  productModal(model: ProductRequest) {
    this.send = false;
    this.formProduct.patchValue({
      id: model.id,
      name: model.name,
      image: model.image,
      idState: model.idState,
    });
  }

  outputModal(model: ProductRequest) {
    this.send = false;
    this.formOutput.patchValue({
      idProduct: model.id,
      idUser: Number(localStorage.getItem('id'))
    });
  }

  closeModal() {
    this.read();
  }

  update(model: ProductRequest) {
    if (this.formProduct.valid) {
      this._productService.update(model).subscribe((res) => {
        if (res.exito === 1) {
          this.send = true;
        } else alert('Error: ' + res.message);
      });
    }
  }

  output(model: OutputRequest) {
    if (this.formOutput.valid) {
      this._outputService.create(model).subscribe((res) => {
        if (res.exito === 1) {
          this.send = true;
        } else alert('Error: ' + res.message);
      });
    }
  }

  readUser() {
    let jwt = this._authService.userData.token;
    this._authService.getUser(jwt).subscribe((res) => {
      localStorage.setItem('id', res.data[0].id)
    });
  }
}
