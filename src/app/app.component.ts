import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-test';

  user:any = [];

  ngOnInit(): void {
    var sessionLogin = sessionStorage.getItem('userLogin');
    if (sessionLogin != null) {
      this.user[0] = sessionLogin;
    }
  }
  

}
