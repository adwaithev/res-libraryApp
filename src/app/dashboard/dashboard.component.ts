import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  addForm = this.fb.group({
    reno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-z0-9]*')]],
    slno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    bno1: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })


  borrowForm = this.fb.group({
    reno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-z0-9]*')]],
    slno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    bno: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  })

 
 


  constructor(private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  add() {

    if (this.addForm.valid) {
      var reno1 = this.addForm.value.reno1;
      var pswd1 = this.addForm.value.pswd1;
      var slno1 = this.addForm.value.slno1;
      var bno1 = this.addForm.value.bno1;
      let result = this.ds.add(reno1, pswd1, slno1, bno1)

      if (result) {
        alert(bno1 + "  books added" + "   " + "available quantity is:   " + result)
      }
    }else{
      alert("invalid form")
    }
    
  }



  borrow() {

    if (this.borrowForm.valid) {
      var reno = this.borrowForm.value.reno;
      var pswd = this.borrowForm.value.pswd;
      var slno = this.borrowForm.value.slno;
      var bno = this.borrowForm.value.bno;
      let result = this.ds.borrow(reno, pswd, slno, bno)

      if (result) {
        alert(bno + "  books deliverd" + "   " + "available stock is:  " + result)
      }

    } else {
      alert("invalid form")
    }
  }


}
