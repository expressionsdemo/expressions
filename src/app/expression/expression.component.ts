import { Component,
         ViewChild,
         ViewContainerRef,
         ComponentFactoryResolver,
         ComponentRef,
         ComponentFactory,
         Output, 
         EventEmitter  } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { AddComponent } from '../add/add.component'

@Component({
  selector: 'app-expression',
  template: `
    <div cdkDropList [cdkDropListData]="stages[0]" (cdkDropListDropped)="drop($event)" class="expression-list" (createEvent)="createComponent($event)" (destroyEvent)="destroyComponent()">
    
        <div>
            <div class="add-box" *ngFor="let item of stages[0]" cdkDrag [cdkDragData]="item">{{item}}</div>
        </div>
    </div>`,
  styleUrls: ['./expression.component.css'],
})
export class ExpressionComponent {
    componentRef: any;
    stages = [[],[]]
    @Output() createEvent = new EventEmitter<string>();
    @Output() destroyEvent = new EventEmitter<string>();
    @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
    constructor(private resolver: ComponentFactoryResolver) { }
    createComponent(message) {
      this.entry.clear();
      const factory = this.resolver.resolveComponentFactory(AddComponent);
      this.componentRef = this.entry.createComponent(factory);
      this.componentRef.instance.message = message;
    }
    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {         
          switch(event.item.data) {
            case 'add':
              this.createEvent.next('add')
              this.destroyEvent.next()
            break
            case 'subtract':
              this.createEvent.next('subtract')
              this.destroyEvent.next()
            break
            case 'foo':
              this.createEvent.next('foo')
              this.destroyEvent.next()
            break
            case 'doSomethingComplicated':
              this.createEvent.next('doSomethingComplicated')
              this.destroyEvent.next()
            break
            default:
          }         
        }
    }
    
    
}