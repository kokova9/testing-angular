import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  getId: any;
  loginForm: FormGroup;
  user:any = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getId = parseInt(this.getId);

    this.loginForm = this.formBuilder.group({
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

  onLogin(): any {
    var sessionLogin = sessionStorage.getItem('userLogin');
    if (sessionLogin == null) {
        this.crudService.login(this.loginForm.value).subscribe(res => {
        if (res == null) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username or Password not correct!',
          })
        }else{
          var texts = "Welcome "+this.loginForm.value.username+" !"
          console.log('Login successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/book-list'));
          Swal.fire({
          icon: 'success',
          title: 'Successfully',
          text: texts
          })
          this.user = sessionStorage.setItem('userLogin', this.loginForm.value.username);
        }
      })
    }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You have loggedin!',
        })
    }
    
    }
  }


