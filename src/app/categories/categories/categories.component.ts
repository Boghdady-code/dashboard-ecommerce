import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { AlertService } from '../../shared/alert/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  constructor(
    private categoriesService: CategoriesService,
    private alert: AlertService
  ) {}
  categories: any[] = [];
  categoryForm: FormGroup | undefined;
  mode = 'create';
  id: any;
  categorySubscription: Subscription | undefined;

  createCategory() {
    console.log(this.categoryForm?.value);
    if (this.mode == 'create') {
      this.categoriesService
        .createCategory(this.categoryForm?.value)
        .subscribe((res) => {
          console.log(res);
          this.alert.success.next('Category has been created successfully');
        });
    } else {
      this.categoriesService
        .updateCategory(this.id, this.categoryForm?.value)
        .subscribe((res) => {
          console.log(res);
          this.alert.success.next('Category has been updated successfully');
          this.mode = 'create';
        });
    }

    this.categoryForm?.reset();
  }

  editCategory(id: any) {
    this.mode = 'update';
    this.id = id;
    this.categoriesService.getCategory(id).subscribe((res) => {
      console.log(res);
      this.categoryForm?.get('name')?.setValue(res.data.name);
      this.categoryForm?.get('image')?.setValue(res.data.image);
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.categoryForm?.get('image')?.setValue(file);
    }
  }

  deleteCategory(id: any) {
    this.categoriesService.deleteCategory(id).subscribe((res) => {
      console.log(res);
      this.alert.success.next('Category deleted successfully');
    });
  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });
    this.categoriesService.getCategories().subscribe((res) => {
      console.log(res);

      this.categories = res.data;
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }
}
