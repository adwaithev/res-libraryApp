import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history:any
  constructor(public ds:DataService) {
    this.history=this.ds.history()
    console.log(this.history)
   }

  ngOnInit(): void {
  }

}
