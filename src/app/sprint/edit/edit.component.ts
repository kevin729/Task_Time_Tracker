import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import $ from "jquery";
import { HttpService } from '../../http.service';

declare function autocomplete(id : string, path : string): void
declare function connect(): void
declare function subscribe(callback:any, id:string): void
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

  @ViewChildren("projectInput")
  projectInput!: QueryList<ElementRef>

  @ViewChild("toDo")
  toDo!: ElementRef

  @ViewChild("development")
  development!: ElementRef

  @ViewChild("review")
  review!: ElementRef

  @ViewChild("testing")
  testing!: ElementRef

  @ViewChild("closed")
  closed!: ElementRef

  @ViewChildren("tasks")
  tasks!: QueryList<ElementRef>

  ngAfterViewInit(): void {
    this.tasks.changes.subscribe(t => {
      t.toArray().forEach((taskRef: ElementRef<HTMLDivElement>) => {
        const taskElement: HTMLDivElement = taskRef.nativeElement
        let status: string = "Test";

        this.features.every((feature: any) => {
          if (feature.tasks == null) {
            return
          }

          feature.tasks.every((task: any) => {
            if (taskElement.id == task.id) {
              status = task.status
            }
          })
        })

        switch (status) {
          default:
            this.toDo.nativeElement.append(taskElement)
            break;
          case "Development":
            this.development.nativeElement.append(taskElement)
            break;
          case "Review":
            this.review.nativeElement.append(taskElement)
            break;
          case "Testing":
            this.testing.nativeElement.append(taskElement)
            break;
          case "Closed":
            this.closed.nativeElement.append(taskElement)
        }
      })
    })

    this.projectInput.changes.subscribe(p => {
        p.toArray().forEach((projectRef: ElementRef<HTMLInputElement>) => {
          autocomplete("#"+projectRef.nativeElement.id, "https://lukemind.herokuapp.com/api/get_task_titles/1")
        })
    })
  }


  constructor(private http: HttpService) {
    http.get("http://localhost:8080/v1/features").subscribe(response => {
      this.features = response;
      connect()
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

      this.http.post("http://localhost:8080/v1/features", {"title": this.featureTitle}).subscribe(response => {
        this.features = response;
      })
  }

  addTask(feature : string): void {
    if (this.taskTitle == "" || this.taskTitle == undefined) {
      return;
    }

    this.http.post("http://localhost:8080/v1/tasks", {"title":this.taskTitle, feature}).subscribe(response => {
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
      this.http.post("http://localhost:8080/v1/track", {}).subscribe()
      subscribe((message: string) => {time.value = message}, time.id)
    }
  }

  dragStart(e : any): void {
    e.dataTransfer.setData("elementID", e.target.id)
  }

  dragOver(e : any): void {
    e.preventDefault();
  }

  dragDrop(e : any, feature: any): void {
      const elementID = e.dataTransfer.getData("elementID")
      const drag = document.getElementById(elementID)

      if (e.target.tagName != "TD") {
        e.target.closest("td").append(drag)
      } else {
        e.target.append(drag)
      }

      this.http.put("http://localhost:8080/v1/tasks", {"id":elementID, "status":e.target.classList[0], feature}).subscribe()
  }
}
