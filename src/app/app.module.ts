import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DragndropComponent } from './dragndrop/dragndrop.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { ExpressionComponent } from './expression/expression.component'
import { AddComponent } from './add/add.component'
import { SubtractComponent } from './subtract/subtract.component'
import { FooComponent } from './foo/foo.component'
import { DoSomethingComplicatedComponent } from './doSomethingComplicated/doSomethingComplicated.component'

@NgModule({
  declarations: [
    AppComponent,
    DragndropComponent,
    ExpressionComponent,
    AddComponent,
    SubtractComponent,
    FooComponent,
    DoSomethingComplicatedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddComponent, SubtractComponent, FooComponent, DoSomethingComplicatedComponent]
})
export class AppModule { }
