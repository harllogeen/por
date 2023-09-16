import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  studentValue!: FormGroup;

  constructor(private myDialog: MatDialogRef<any>, private formBuilder: FormBuilder){}
  showModal = false;

  closeModal(){
    this.myDialog.close()
  }

  
    ngOnInit(): void {
      this.studentValue = this.formBuilder.group({
        name: [''],
        class: [''],
        email: [''],
        date: [''],
        phone: [''],
      });
    }
  
  

}
