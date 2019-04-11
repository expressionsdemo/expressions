import { Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory } from '@angular/core'
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop'
import { AddComponent } from './add/add.component'
import { SubtractComponent } from './subtract/subtract.component'
import { FooComponent } from './foo/foo.component'
import { DoSomethingComplicatedComponent } from './doSomethingComplicated/doSomethingComplicated.component'

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <h1>
      Welcome to {{ title }}!
    </h1>
    <div cdkDropListGroup>
      <template #messagecontainer></template>
      <app-expression (createEvent)="createComponent($event)" (destroyEvent)="destroyComponent()" *ngIf="showExpression"></app-expression>
        <div cdkDropList [cdkDropListData]="stages[2]" (cdkDropListDropped)="drop($event)">
          <div class="example-list">
            <div class="example-box" *ngFor="let item of stages[2]" cdkDrag [cdkDragData]="item">{{item}}</div>
          </div>
        </div>
    </div>
     <button (click)="onClickMe()">clear</button>
 </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showExpression = true
  title = 'app';
  componentRef: any;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver) { }
  todo = [];
  stages = [[],[],
    [
      "add",
      "subtract",
      "foo",
      "doSomethingComplicated"
    ]
  ]
  createComponent(message) {
    this.entry.clear();    
    let component: any = {}
    switch(message) {
      case 'add':
        component = AddComponent   
      break
      case 'subtract':
        component = SubtractComponent
      break
      case 'foo':
        component = FooComponent
      break
      case 'doSomethingComplicated':
        component = DoSomethingComplicatedComponent
      break
      default:
    }    
    let factory = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.entry.createComponent(factory);         
  }
  destroyComponent() {
    this.showExpression = false
  }
  onClickMe() {
    this.showExpression = true
    this.entry.clear()    
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    }
  }
}
