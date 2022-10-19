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

  sprintTitle : any;
  featureTitle : any;
  taskTitle : any;

  @ViewChildren("projectInput")
  projectInput!: QueryList<ElementRef>

  @ViewChildren("toDo")
  toDo!: QueryList<ElementRef>

  @ViewChildren("development")
  development!: QueryList<ElementRef>

  @ViewChildren("review")
  review!: QueryList<ElementRef>

  @ViewChildren("testing")
  testing!: QueryList<ElementRef>

  @ViewChildren("closed")
  closed!: QueryList<ElementRef>

  @ViewChildren("tasks")
  tasks!: QueryList<ElementRef>

  ngAfterViewInit(): void {
    this.http.get("https://tasktrackerserver.herokuapp.com/v1/features").subscribe(response => {
      this.features = response;
      connect()

      this.features.forEach((feature: any, f: number) => {
        feature.tasks.forEach((task: any) => {

          switch (task.status) {
            default:
              this.toDo.changes.subscribe(list => {
                list.get(f).nativeElement.append($("#"+task.id).get(0))
              })
              break;
            case "Development":
              this.development.changes.subscribe(list => {
                list.get(f).nativeElement.append($("#"+task.id).get(0))
              })
              break;
            case "Review":
              this.review.changes.subscribe(list => {
                list.get(f).nativeElement.append($("#"+task.id).get(0))
              })
              break;
            case "Testing":
              this.testing.changes.subscribe(list => {
                list.get(f).nativeElement.append($("#"+task.id).get(0))
              })
              break;
            case "Closed":
              this.closed.changes.subscribe(list => {
                list.get(f).nativeElement.append($("#"+task.id).get(0))
              })
              break;
          }
        })
      })
    })

    this.projectInput.changes.subscribe(p => {
        p.toArray().forEach((projectRef: ElementRef<HTMLInputElement>) => {
          autocomplete("#"+projectRef.nativeElement.id, "https://lukemind.herokuapp.com/api/get_task_titles/1")
        })
    })
  }


  constructor(private http: HttpService) {

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

  trackTask(e: any): void {
    const time = <HTMLInputElement>$(e.target.parentElement).find(".timerInput").get(0)
    const task = e.target.closest(".task")
    if (e.target.classList.contains("timerBtnMoving")) {
      e.target.classList.remove("timerBtnMoving")
      this.http.post("https://tasktrackerserver.herokuapp.com/v1/unTrack/"+task.id, {}).subscribe()
      unsubscribe(task.id)
    } else {
      e.target.classList.add("timerBtnMoving")
      const task = e.target.closest(".task")
      this.http.post("https://tasktrackerserver.herokuapp.com/v1/track/"+task.id, {}).subscribe()
      subscribe((message: any) => {time.value = message.text}, task.id)
    }
  }

  dragStart(e: any, task: any): void {
    e.dataTransfer.setData("task", JSON.stringify(task))
  }

  dragOver(e : any): void {
    e.preventDefault();
  }

  dragDrop(e : any, feature: any): void {
      const task = JSON.parse(e.dataTransfer.getData("task"))
      const drag = document.getElementById(task.id)

      if (e.target.tagName != "TD") {
        e.target.closest("td").append(drag)
        task.status = e.target.closest("td").classList[0]
      } else {
        e.target.append(drag)
        task.status = e.target.classList[0]
      }

      task.feature = feature
      this.http.put("https://tasktrackerserver.herokuapp.com/v1/tasks", task).subscribe()

  }
}
