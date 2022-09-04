import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})


export class EditComponent implements OnInit {

  featureTitle : any;
  features : any = ["Task Timer"];

  taskTitle : any;
  tasks : any = [];


  @ViewChild('tableWrapper')
  tableWrapper : any;
  table : any;

  ngAfterViewInit(): void {
   this.table = this.tableWrapper.nativeElement;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  addFeature(): void {
      if (this.featureTitle == "" || this.featureTitle == undefined) {
        return;
      }

      this.features.push(this.featureTitle)
  }

  addTask(): void {
    if (this.taskTitle == "" || this.taskTitle == undefined) {
      return;
    }

    this.tasks.push(this.taskTitle)
  }

  dragStart(e : any): void {
    e.dataTransfer.setData("elementID", e.target.id)
  }

  dragOver(e : any): void {
    e.preventDefault();
  }

  dragDrop(e : any): void {
      const elementID = e.dataTransfer.getData("elementID")
      const element = document.getElementById(elementID)

      alert(elementID)
  }
}
