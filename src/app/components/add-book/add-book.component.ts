import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.bookForm = this.formBuilder.group({
      name: [""],
      price: [""],
      description: [""]
    })
  }

  ngOnInit(): void {
    var sessionLogin = sessionStorage.getItem('userLogin');
    if (sessionLogin == null) {
        this.ngZone.run(() => this.router.navigateByUrl('/book-list'));
    }
  }

  onSubmit(): any {
    this.crudService.AddBook(this.bookForm.value)
    .subscribe((err) => {
      if (err == null){
        var texts = this.bookForm.value.name + " has been added!";
        console.log("Data added successfully");
        this.ngZone.run(() => this.router.navigateByUrl('/book-list'))
        Swal.fire({
          icon: 'success',
          title: 'Successfully',
          text: texts,
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Book has been added!',
        })
      }
    }, (err) => {
      console.log(err);
    })
  }

}
