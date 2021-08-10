import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  loginForm = this.fb.group({
    reno: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9a-z]*')]]
  })

  constructor(private ds: DataService, private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  login() {

    if (this.loginForm.valid) {
      let reno = this.loginForm.value.reno;
      let pswd = this.loginForm.value.pswd;
      let result = this.ds.login(reno, pswd)

      if (result) {
        alert("login successful");
        this.route.navigateByUrl("dashboard")
      }
    } else {
      alert("invalid form")
    }

  }

}