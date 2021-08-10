import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user: any = {
    10: { reno: 10, uname: "akhil", password: "one", history: [] },
    11: { reno: 11, uname: "nihil", password: "two", history: [] },
    12: { reno: 12, uname: "amal", password: "three", history: [] }
  }

  books: any = {
    1: { slno: 1, boookname: "anna kareina", stock_no: 100 },
    2: { slno: 2, boookname: "alchemist", stock_no: 50 },
    3: { slno: 3, boookname: "Godfather", stock_no: 60 }
  }

  currentuser = ""
  currentacc = ""

  constructor() { this.getDetails()
  }


  saveDetails() {
    localStorage.setItem("user", JSON.stringify(this.user))
    if (this.currentuser) {
      localStorage.setItem("currentuser", JSON.stringify(this.currentuser))
    }
    if (this.currentacc) {
      localStorage.setItem("currentacc", JSON.stringify(this.currentacc))
    }
  }

  getDetails() {
    this.user = JSON.parse(localStorage.getItem('user') || '')
    if (localStorage.getItem("currentuser")) {
      this.currentuser = JSON.parse(localStorage.getItem("currentuser") || "")
    }
    if (localStorage.getItem("currentacc")) {
      this.currentacc = JSON.parse(localStorage.getItem("currentacc") || '')
    }
  }

  history() {
    return this.user[this.currentacc].history
  }


  register(reno: any, uname: any, password: any) {

    let accDetails = this.user

    if (reno in accDetails) {
      alert("user exists, please login");
      return false;
    } else {
      accDetails[reno] = {
        reno,
        uname,
        password,
        history:[]
      }
      this.saveDetails();
      return true
    }

  }

  login(reno: any, password: any) {

    let accDetails = this.user;

    if (reno in accDetails) {
      if (password == accDetails[reno]["password"]) {
        this.currentuser = accDetails[reno]["uname"]
        this.currentacc= reno;
        this.saveDetails();
        return true;
      }
      else {
        alert("incorrect password")
        return false;
      }
    } else {
      alert("invaild user, please register");
      return false;
    }
  }

  borrow(reno: any, password: any, slno: any, bno: any) {
    console.log(this.currentacc)

    var accDetails = this.user;

    let bookDetails = this.books;

    var bookno = parseInt(bno);

    if (reno in accDetails) {
      if (password == accDetails[reno]["password"]) {

        if (slno in bookDetails) {
          if (bookno < bookDetails[slno]["stock_no"]) {
            bookDetails[slno]["stock_no"] -= bookno;
            accDetails[this.currentacc]["history"].push({
              slno: slno,
              bno: bookno,
              act: "BORROW"
            })
            this.saveDetails();
            return bookDetails[slno]["stock_no"];

          } else {
            alert("insufficient stock")
            return false;
          }

        } else {
          alert("book not found")
          return false;
        }
      }
      else {
        alert("incorrect password")
        return false;
      }

    } else {
      alert("invalid user")
      return false;
    }

  }

  add(reno: any, password: any, slno: any, bno: any) {
    

    let accDetails = this.user;
    let bookDetails = this.books;
    let bookno = parseInt(bno);

    if (reno in accDetails) {
      if (password == accDetails[reno]["password"]) {
        if (slno in bookDetails) {
          bookDetails[slno]["stock_no"] += bookno;

          accDetails[this.currentacc]["history"].push({
            slno: slno,
            bno: bookno,
            act: "RETURN"
          })
          this.saveDetails();
          return bookDetails[slno]["stock_no"]
        } else {

          alert("book not found")
          return false;
        }
        
      } else {
        alert("incorrect password")
        return false;
      }
    }else {
      alert("invalid user")
      return false
    }


  }
}