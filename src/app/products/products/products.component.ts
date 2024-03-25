import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ModalService } from '../modal.service';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    private products: ProductsService,
    private modal: ModalService,
    private alert: AlertService
  ) {}

  productForm: FormGroup | undefined;
  productsArray: any[] | undefined;
  modalStatus: boolean = false;

  openModal(id: number) {
    this.modal.openModal();
    this.modal.setProductId(id);
  }

  createProduct() {
    console.log(this.productForm?.value);
    this.products.createProduct(this.productForm?.value).subscribe((data) => {
      console.log(data);
      this.alert.success.next('Product created successfully');
      this.productForm?.reset();
      this.control.clear();
      this.imageCover.setValue(null);
    });
  }

  get imageCover() {
    return this.productForm?.get('imageCover') as FormControl;
  }

  get control() {
    return this.productForm?.get('images') as FormArray;
  }
  onFileSelected(event: any) {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.control.push(new FormControl(event.target.files[i]));
      }
    }
  }

  onImageSelected(event: any) {
    if (event.target.files) {
      this.imageCover.setValue(event.target.files[0]);
    }
  }

  deleteProduct(id: any) {
    this.products.deleteProduct(id).subscribe((data) => {
      console.log(data);
      this.alert.success.next('Product deleted successfully');
    });
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      imageCover: new FormControl(null, [Validators.required]),
      ratingsAverage: new FormControl(null, [Validators.required]),
      images: new FormArray([], [Validators.required]),
    });

    this.products.getProducts().subscribe((res) => {
      this.productsArray = res.data;

      console.log(this.productsArray);
    });

    this.modal.modalStatus.subscribe((data) => {
      this.modalStatus = data;
    });
  }
}
