import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.registerForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    var sessionLogin = sessionStorage.getItem('userLogin');
    if (sessionLogin != null) {
        this.ngZone.run(() => this.router.navigateByUrl('/book-list'));
    }
  }

  onRegister(): any {
    this.crudService.register(this.registerForm.value)
    .subscribe((err) => {
      if (err == null) {
        var texts = "Register successfully";
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
          text: 'Username is registered!',
        })
      }
      
    }, (err) => {
      console.log(err);
    })
  }

}
