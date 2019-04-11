import { Component,
        ViewChild,
        ViewContainerRef,
        ComponentFactoryResolver,
        Output, 
        EventEmitter   } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { SubtractComponent } from '../subtract/subtract.component'
import { AddComponent } from '../add/add.component'
import { DoSomethingComplicatedComponent } from '../doSomethingComplicated/doSomethingComplicated.component'
@Component({
    selector: 'app-foo',
    template: `
        <div class="container">
            foo
            
            <div cdkDropList [cdkDropListData]="stages[0]" (cdkDropListDropped)="drop($event)" class="add-list">
                <template #messagecontainer3></template>    
                <div>
                    <div class="add-box" *ngFor="let item of stages[0]" cdkDrag [cdkDragData]="item">{{item}}</div>
                </div>
            </div>
            <div cdkDropList [cdkDropListData]="stages[1]" (cdkDropListDropped)="drop($event)" class="add-list">
                <div>
                    <div class="add-box" *ngFor="let item of stages[1]" cdkDrag [cdkDragData]="item">{{item}}</div>
                </div>
            </div>
            <div cdkDropList [cdkDropListData]="stages[3]" (cdkDropListDropped)="drop($event)" class="add-list">
                <div>
                    <div class="add-box" *ngFor="let item of stages[1]" cdkDrag [cdkDragData]="item">{{item}}</div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['../add/add.component.css'],
})
export class FooComponent {
    stages = [[],[], []] 
    showExpression = true
    componentRef: any;
    @Output() createEvent = new EventEmitter<string>();
    @Output() destroyEvent = new EventEmitter<string>();
    @ViewChild('messagecontainer3', { read: ViewContainerRef }) entry: ViewContainerRef;
    constructor(private resolver: ComponentFactoryResolver) { }   
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
    drop(event: CdkDragDrop<string[]>) {       
        let factory 
        switch(event.item.data) {
            case 'add':
                factory = this.resolver.resolveComponentFactory(AddComponent);
                this.componentRef = this.entry.createComponent(factory);                
            break
            case 'subtract':
                factory = this.resolver.resolveComponentFactory(SubtractComponent);
                this.componentRef = this.entry.createComponent(factory); 
            break
            case 'foo':
                factory = this.resolver.resolveComponentFactory(FooComponent);
                this.componentRef = this.entry.createComponent(factory);                 
            break
            case 'doSomethingComplicated':
                factory = this.resolver.resolveComponentFactory(DoSomethingComplicatedComponent);
                this.componentRef = this.entry.createComponent(factory);                 
            break
            default:
        }           
    }
}