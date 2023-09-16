import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  myFormValue!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.myFormValue = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],

      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/
          ),
        ],
      ],
    });
  }

  get f() {
    return this.myFormValue.controls;
  }

  public login() {
    this.http.get<any>('http://localhost:3000/signup').subscribe({
      next: (res) => {
        const user =
          res.find(
            (item: any) => this.myFormValue.get('email')?.value === item.email
          ) && this.myFormValue.get('password')?.value;

        if (user) {
          alert('Login Successfully');
          // this.toast.success({
          //   detail: 'Success Message',
          //   summary: 'Login Successfully',
          //   duration: 9000,
          // });
          this.myFormValue.reset();
          this.router.navigate(['restaurant']);
          localStorage.setItem(
            'token',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
          );
          this.myFormValue.value.email
            ? localStorage.setItem('usertype', 'employee')
            : '';
        } else {
          alert('User Not Found');
          // this.toast.error({
          //   detail: 'Error Message',
          //   summary: 'User Not Found',
          //   duration: 8000,
          // });
        }
      },
      error: (e) => {
        alert('Something Went Wrong');
        // this.toast.warning({
        //   detail: 'Error Message',
        //   summary: 'User Not Found',
        //   duration: 8000,
        // });
      },
    });
  }
}
