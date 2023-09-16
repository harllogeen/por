import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {}

  getProfile(){
    return this.http.get<any>(" http://localhost:3000/users/");
  }

  postProfile(data:any){
    return this.http.post<any>(" http://localhost:3000/users/",data);
  }

  putProfile(data:any,id:number){
    return this.http.put<any>( " http://localhost:3000/users/"+id,data);
  }

  deleteProfile(id:number){
    return this.http.delete<any>(" http://localhost:3000/users/"+id);
  }


  //another method using rxjs
//get all restaurant data
  getAllRestaurant(){
    return this.http.get<any>(" http://localhost:3000/posts").pipe(map((res:any)=>{
        return res
    }))
  }

  //post all restaurant data
  postRestaurant(data:any){
    return this.http.post<any>(" http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res
    }))
  }

  //update or edit all restaurant data
  updateRestaurant(data:any, id:number){
    return this.http.put<any>(" http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res
    }))
  }

  //delete restaurant data
  deleteRestaurant( id:number){
    return this.http.delete<any>(" http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res
    }))
  }
}
