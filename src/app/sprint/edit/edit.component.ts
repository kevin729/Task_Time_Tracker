import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  featureTitle : any;
  features : any = [];

  taskTitle : any;
  tasks : any = [];


  constructor() {
  }

  ngOnInit(): void {
  }

  addFeature(): void {
    if (this.featureTitle == "" || this.featureTitle == undefined) {
      return;
    }

    this.features.push(this.featureTitle);
  }

  addTask(): void {
    if (this.taskTitle == "" || this.taskTitle == undefined) {
      return;
    }

    this.tasks.push(this.taskTitle)}
}
