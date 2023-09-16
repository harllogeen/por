import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../service/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-restaurant',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss']
})
export class RestaurantComponent implements OnInit  {

  constructor(private dialog:MatDialog, private api:ApiService, private toast:NgToastService){}

  displayedColumns: string[] = ['name','email', 'mobile','address', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

ngOnInit(): void {
 this.getAllProfiles() 
  
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    console.log()
    this.dialog.open(DialogComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val ==="save"){
        this.getAllProfiles();
      }
    });
  }

  editProfile(row:any){
    this.dialog.open(DialogComponent, {
     width:'30%',
     data:row 
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProfiles();
      }
    })
  }
  
  deleteProfile(id:number){
    this.api.deleteProfile(id)
    .subscribe({
      next:(res)=>{
        alert("Profile Deleted Successfully")
        this.getAllProfiles();
      },
      error:()=>{
        alert("Error while deleting the Profile!!")
      }
    })
  }

  getAllProfiles(){
    this.api.getProfile().subscribe({
      next:(res)=>{
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.paginator =this.paginator;
        this.dataSource.sort = this.sort

      },
      error:(err)=>{
        alert("Error while fetching the Records!!!")
      }
    })
  }

  logout(){
    this.toast.success({detail:"update Mesaage", summary:"Logout Successfully", duration:4000})
  }
}
