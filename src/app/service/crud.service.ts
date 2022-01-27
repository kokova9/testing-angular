import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

export class Book {
    _id!: Number;
    name!: String;
    price!: String;
    description!: String;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // C# API
  REST_API: string = 'https://localhost:7196/api/Book';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  AddBook(data: Book,id: any): Observable<any> {
    let API_URL = 'https://localhost:7196/api/shortlist/'+id;
    return this.httpClient.post(API_URL, data).pipe(
      catchError(this.handleError)
    )
  };

  // Get all obj
  GetBooks() {
    return this.httpClient.get(this.REST_API);
  };

  // Get single obj
  GetShortContent(id: any): Observable<any> {
    let API_URL = 'https://localhost:7196/api/shortlist/'+id;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
    .pipe(map((res: any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  };

  // Update
  updateBook(id: any, data: any): Observable<any> {
    let API_URL = this.REST_API+'/update-book/'+id;
    return this.httpClient.patch(API_URL, data, { headers: this.httpHeaders })
    .pipe(
      catchError(this.handleError)
    )
  };

  // Delete
  deleteBook(id: any): Observable<any> {
    let API_URL = this.REST_API+'/delete-book/'+id;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
    .pipe(
      catchError(this.handleError)
    )
  };

  // Login system
  login(data: any): Observable<any> {
    let API_URL = 'https://localhost:7196/api/Users/';
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(map((res: any) => {
      console.log(res);
      for (let index = 0; index < res.length; index++) {
        if (res[index].username == data.username && res[index].password == data.password) {
        return res;
        }
      }
    }),
    catchError(this.handleError)
    );
  };

  // Register system
  register(data: any): Observable<any> {
    let API_URL = 'https://localhost:7196/api/Users/register';
    return this.httpClient.post(API_URL, data).pipe(
     catchError(this.handleError)
    )
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent){
      //handle client error
      errorMessage = error.error.message;
    }else{
      // handle server
      errorMessage = "Error Code: ${"+error.status+"}\nMessage: ${"+error.message+"}";
    }
    console.log(errorMessage);
    return errorMessage;
  };
}
