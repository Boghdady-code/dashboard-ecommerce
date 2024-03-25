import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shared/alert/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit, OnDestroy {
  constructor(
    private brandsService: BrandsService,
    private alert: AlertService
  ) {}
  brands: any[] | undefined;
  mode = 'create';
  id: any;
  brandsSubscription: Subscription | undefined;

  brandsForm: FormGroup | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.brandsForm?.get('image')?.setValue(file);
    }
  }

  createBrand() {
    console.log(this.brandsForm?.value);
    if (this.mode == 'create') {
      this.brandsService
        .createBrand(this.brandsForm?.value)
        .subscribe((res) => {
          console.log(res);
          this.alert.success.next('Brand has been created successfully');
        });
    } else {
      this.brandsService
        .updateBrand(this.id, this.brandsForm?.value)
        .subscribe((res) => {
          console.log(res);
          this.alert.success.next('Brand has been updated successfully');
          this.mode = 'create';
        });
    }

    this.brandsForm?.reset();
  }

  editBrand(id: any) {
    this.mode = 'update';
    this.id = id;
    this.brandsService.getBrand(id).subscribe((res) => {
      console.log(res);
      this.brandsForm?.get('name')?.setValue(res.data.name);
      this.brandsForm?.get('image')?.setValue(res.data.image);
    });
  }

  deleteBrand(id: any) {
    this.brandsService.deleteBrand(id).subscribe((res) => {
      console.log(res);
      this.alert.success.next('Brand has been deleted successfully');
    });
  }

  ngOnInit(): void {
    this.brandsForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });

    this.brandsSubscription = this.brandsService
      .getBrands()
      .subscribe((res) => {
        this.brands = res.data;
      });
  }

  ngOnDestroy(): void {
    this.brandsSubscription?.unsubscribe();
  }
}
