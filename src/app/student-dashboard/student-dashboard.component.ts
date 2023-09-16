import { Component, OnInit ,Input} from '@angular/core';


@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  showMenu:boolean = false;

 

 
  constructor() {}

  ngOnInit(): void {
    
  }
  toggleNavbar() {
    this.showMenu= !this.showMenu
  }
}
