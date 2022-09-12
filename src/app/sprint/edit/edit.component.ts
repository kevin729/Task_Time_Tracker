import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import $ from "jquery";
import { HttpService } from '../../http.service';

declare function autocomplete(id : string, path : string): void
declare function connect(callback: any, id: string): void
declare function unsubscribe(id: string): void

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})


export class EditComponent implements OnInit {

  features : any = [];

  featureTitle : any;
  taskTitle : any;

  ngAfterViewInit(): void {

 }


  constructor(private http: HttpService) {
    http.get("https://tasktrackerserver.herokuapp.com/v1/features").subscribe(response => {
      this.features = response;
      setTimeout(() => {autocomplete(".project", "https://lukemind.herokuapp.com/api/get_task_titles/1")}, 1000)
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

      this.http.post("https://tasktrackerserver.herokuapp.com/v1/tasks", {"title": this.featureTitle}).subscribe(response => {
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

  trackTask(e: any): void {
    const time = <HTMLInputElement>$(e.target.parentElement).find(".timerInput").get(0)

    if (e.target.classList.contains("timerBtnMoving")) {
      e.target.classList.remove("timerBtnMoving")
      unsubscribe(time.id)
    } else {
      e.target.classList.add("timerBtnMoving")

      this.http.post("https://tasktrackerserver.herokuapp.com/v1/track", {}).subscribe()
      connect((message: string) => {time.value = message}, time.id)
    }
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
