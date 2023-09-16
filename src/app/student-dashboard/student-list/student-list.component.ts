import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentList } from './students';
import { StudentModel } from './student.model';
import { ApiService } from 'src/app/service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  showModal = false;
  studentObj: StudentModel = new StudentModel();

  students: StudentList[] = [
    {
      id: 1,
      phone: '090780734264',
      name: 'Oluwaseyi Alugbin',
      class: '10th',
      email: 'oluwaseyialugbin@gmail.com',
    
    },
    {
      id: 2,
      phone: '090780734264',
      name: 'Oluwaseyi Alugbin',
      class: '12th',
      email: 'johnfedalugbin@gmail.com',
    
    },
    {
      id: 3,
      phone: '090780734264',
      name: 'Oluwaseyi Alugbin',
      class: '14th',
      email: 'oluwaseyimiderw@gmail.com',
    
    },
    {
      id: 4,
      phone: '090780734264',
      name: 'Oluwaseyi Alugbin',
      class: '33th',
      email: 'oluwaseyialugbin@gmail.com',
    
    },
    {
      id: 5,
      phone: '090780734264',
      name: 'Oluwaseyi Alugbin',
      class: '2',
      email: 'oluwaseyialugbin@gmail.com',
    
    },
  ];
  student: any;

  studentValue!: FormGroup;

  studentList: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studentValue = this.formBuilder.group({
      name: [''],
      class: [''],
      email: [''],
      date: [''],
      phone: [''],
    });
    this.getProfile();
  }

  addStudent() {
    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.class = this.studentValue.value.class;
    this.studentObj.email = this.studentValue.value.email;
    this.studentObj.phone = this.studentValue.value.phone;
    this.api.postProfile(this.studentObj).subscribe({
      next: (v: any) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
        alert('error');
      },
      complete: () => {
        console.log('Student record added');
        alert('student record added!');
        this.getProfile();
        this.studentValue.reset();
      },
    });
  }

  deleteProfile(id:number){
    this.api.deleteProfile(id)
    .subscribe({
      next:(res)=>{
        alert("Profile Deleted Successfully")
        this.getProfile();
      },
      error: (e) => {
        console.log(e);
        alert('error');
      },
      complete: () => {
        console.log('Student record dleted');
        alert('student record deleted!');
        this.getProfile();
        this.studentValue.reset();
      },
    });
  }

  getProfile() {
    this.api.getProfile().subscribe((res) => {
      this.studentList = res;
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  myModal() {
    this.dialog.open(ModalComponent, {
      width: '500px',
      enterAnimationDuration: '1s',
      exitAnimationDuration: '1s',
    });
  }
}
