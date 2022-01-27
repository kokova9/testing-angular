import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) { 
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getId = parseInt(this.getId);

    this.crudService.GetBook(this.getId).subscribe(res => {
      this.updateForm.setValue({
        id: res['id'],
        name: res['name'],
        price: res['price'],
        description: res['description']
      })
    });

    this.updateForm= this.formBuilder.group({
      id: [''],
      name: [''],
      price: [''],
      description: ['']
    });

   }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.crudService.updateBook(this.getId, this.updateForm.value).subscribe(() => {
      var texts = this.updateForm.value.name + " has been update!"
      console.log('Data updated successfully');
      this.ngZone.run(() => this.router.navigateByUrl('/book-list'));
      Swal.fire({
      icon: 'success',
      title: 'Successfully',
      text: texts
    });
    }, (err) => {
        console.log(err);
      })
  }
}


