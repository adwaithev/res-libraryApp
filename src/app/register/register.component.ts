import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-z]*')]],
    reno: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9a-z]*')]],

  })

  constructor(private ds: DataService, private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }



  register() {
    if (this.registerForm.valid) {
      let uname = this.registerForm.value.uname;
      let reno = this.registerForm.value.reno;
      let pswd = this.registerForm.value.pswd;
      let result = this.ds.register(reno, uname, pswd)

      if (result) {
        alert("user created")
        this.route.navigateByUrl("")
      }

    } else {
      alert("invalid form")
    }
  }

}