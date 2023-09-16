import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
   myForm!: FormGroup
  constructor( private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}
  ngOnInit(): void {

    this.myForm = this.formBuilder.group ({
      name:['', Validators.required],
      email:['', Validators.required],
      mobile:['', Validators.required],
      date: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
  })
  }

  public signUp() {
    this.http.post<any>("http://localhost:3000/signup", this.myForm.value).subscribe({
      next:(res) => {
        alert("Successfully Registered")
        this.myForm.reset();
        this.router.navigate(['login'])
      },
      error: (e) => { 
        console.log(e);
        alert('Something Went wrong');
      },

    })
  }

  

}
