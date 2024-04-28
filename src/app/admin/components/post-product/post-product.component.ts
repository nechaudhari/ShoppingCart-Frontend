import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


interface Category {
  id: number;
  name: string;
  description: string;
}
@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})

export class PostProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  listOfCategories: Category[] = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  private subscription: Subscription;
  

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });

    this.getAllCategories();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe(
      categories => {
        this.listOfCategories = categories;
      },
      error => {
        console.error('Error fetching categories:', error);
        // Handle error
      }
    );
  }

  

  addProduct(): void {
    if (this.productForm.valid) {
      const formData: FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this.adminService.addProduct(formData).subscribe(
        (res) => {
          if (res.id != null) {
            this.snackBar.open('Product posted successfully!', 'Close', {
              duration: 5000
            });
            this.router.navigateByUrl('/admin/dashboard');
          } else {
            this.snackBar.open(res.message, 'ERROR', {
              duration: 5000
            });
          }
        },
        error => {
          console.error("Error adding product:", error);
          this.snackBar.open("An error occurred while adding the product.", 'ERROR', {
            duration: 5000
          });
        }
      );
    } else {
      for (const i in this.productForm.controls) {
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
}