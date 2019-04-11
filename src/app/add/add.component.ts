import { Component,
         ViewChild,
         ViewContainerRef,
         ComponentFactoryResolver,
         Output, 
         EventEmitter  } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { SubtractComponent } from '../subtract/subtract.component'
import { FooComponent } from '../foo/foo.component'
import { DoSomethingComplicatedComponent } from '../doSomethingComplicated/doSomethingComplicated.component'
@Component({
    selector: 'app-add',
    template: `        
        <div class="container">
            <span>add</span>                 
            <div cdkDropList [cdkDropListData]="stages[0]" (cdkDropListDropped)="drop($event)" class="add-list" >
                <template #messagecontainer1></template>
                <div>
                    <div class="add-box" *ngFor="let item of stages[0]" cdkDrag [cdkDragData]="item">{{item}}</div>
                </div>
            </div>
            <div cdkDropList [cdkDropListData]="stages[1]" (cdkDropListDropped)="drop($event)" class="add-list">
                <div>
                    <div class="add-box" *ngFor="let item of stages[1]" cdkDrag [cdkDragData]="item">{{item}}</div>
                </div>
            </div>
            
        </div>
    `,
    styleUrls: ['./add.component.css'],
})
export class AddComponent {
    stages = [[],[]]        
    showFunction1 = true
    showExpression = true
    componentRef: any;
    
    @ViewChild('messagecontainer1', { read: ViewContainerRef }) entry: ViewContainerRef;
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
        console.log(event) 
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