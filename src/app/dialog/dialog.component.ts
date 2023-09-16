import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  myForm!: FormGroup;
  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.myForm.controls['name'].setValue(this.editData.name);
      this.myForm.controls['email'].setValue(this.editData.email);
      this.myForm.controls['mobile'].setValue(this.editData.mobile);
      this.myForm.controls['address'].setValue(this.editData.address);
     
    }
  }

  addProfile() {
    console.log(this.myForm.value)
    if (!this.editData) {
      if (this.myForm.valid) {
        this.api.postProfile(this.myForm.value).subscribe({

          next: (res) => {
            console.log(res)
            alert('Profile added successfully');
            this.myForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error while adding the Profile');
          },
        });

      }
    } else {
      this.updateProfile();
    }
  }
  updateProfile() {
    this.api.putProfile(this.myForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Profile updated successfully');
        this.myForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error while updating the record!!');
      },
    });
  }
  actionBtn: string = 'save';
  
}
