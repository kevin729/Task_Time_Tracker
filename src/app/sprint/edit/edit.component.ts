import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import $ from "jquery";

import { HttpService } from '../../http.service';

// function autocomplete(elementID : string) : void {
//         $(elementID).autocomplete({
//           source:function() {
//
//           }
//         })
// }


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})


export class EditComponent implements OnInit {

  features : any = [];

  featureTitle : any;
  taskTitle : any;

  @ViewChild('tableWrapper')
  tableWrapper : any;
  table : any;

  @ViewChild('projectInput')
  projectInput : any;

  ngAfterViewInit(): void {
   this.table = this.tableWrapper.nativeElement;
 }


  constructor(private http: HttpService) {
    http.get("https://tasktrackerserver.herokuapp.com/v1/features").subscribe(response => {
      this.features = response;
    })


  }

  ngOnInit(): void {

  }

  addSprint(): void {

  }

  addFeature(): void {
      if (this.featureTitle == "" || this.featureTitle == undefined) {
        return;
      }

      this.http.post("https://tasktrackerserver.herokuapp.com/v1/features", {"title": this.featureTitle}).subscribe(response => {
        this.features = response;
      })
  }

  addTask(feature : string): void {
    if (this.taskTitle == "" || this.taskTitle == undefined) {
      return;
    }

    this.http.post("https://tasktrackerserver.herokuapp.com/v1/tasks", {"title":this.taskTitle, feature}).subscribe(response => {
      this.features = response;
    });
  }

  dragStart(e : any): void {
    e.dataTransfer.setData("elementID", e.target.id)
  }

  dragOver(e : any): void {
    e.preventDefault();
  }

  dragDrop(e : any): void {
      const elementID = e.dataTransfer.getData("elementID")
      const drag = document.getElementById(elementID)

      if (e.target.tagName != "TD") {
        e.target.closest("td").append(drag)
      } else {
        e.target.append(drag)
      }
  }
}
