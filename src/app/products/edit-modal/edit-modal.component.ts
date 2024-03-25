import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
})
export class EditModalComponent implements OnInit {
  constructor(private modal: ModalService, private alert: AlertService) {}
  id: number | undefined;
  product: any;
  editForm: FormGroup | undefined;

  ngOnInit(): void {
    this.editForm = new FormGroup({
      title: new FormControl(null),
      quantity: new FormControl(null),
      price: new FormControl(null),
      description: new FormControl(null),
      brand: new FormControl(null),
      category: new FormControl(null),
      ratingsAverage: new FormControl(null),
      imageCover: new FormControl(null, [Validators.required]),
      images: new FormArray([], [Validators.required]),
    });

    this.id = this.modal.productId;

    this.modal.getProduct(this.id!).subscribe((res) => {
      this.product = res.data;

      this.initForm();
    });
  }

  initForm() {
    this.editForm = new FormGroup({
      title: new FormControl(this.product.title),
      quantity: new FormControl(this.product.quantity),
      price: new FormControl(this.product.price),
      description: new FormControl(this.product.description),
      brand: new FormControl(this.product.brand),
      category: new FormControl(this.product.category._id),
      ratingsAverage: new FormControl(this.product.ratingsAverage),
      imageCover: new FormControl(null, [Validators.required]),
      images: new FormArray([], [Validators.required]),
    });
  }

  updateProduct() {
    console.log(this.editForm?.value);
    this.modal
      .updateProduct(this.editForm?.value, this.id!)
      .subscribe((res) => {
        console.log(res);
        this.modal.modalStatus.next(false);
        this.alert.success.next('Product updated successfully');
      });
  }

  get imageCover() {
    return this.editForm?.get('imageCover') as FormControl;
  }

  get control() {
    return this.editForm?.get('images') as FormArray;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      if (this.imageCover.value === null) {
        this.imageCover.setValue(event.target.files[0]);
      }
    }
  }

  onImagesSelected(event: any) {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.control.push(new FormControl(event.target.files[i]));
      }
    }
  }

  closeModal() {
    const backdrop = document.querySelector('.backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    const modal = document.querySelector('.modal-box');
    if (modal) {
      modal.remove();
    }

    this.editForm?.reset();
    this.modal.modalStatus.next(false);
  }
}
