import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToggleSwitchComponent } from '@my-org/toggle-switch';
@Component({
  imports: [
    RouterModule,
    ToggleSwitchComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo';

  onToggle(event:{state:boolean,id?:string,eventName?:string}) {
    console.log(
      `Event name: ${event.eventName} 
       Id: ${event.id} 
      Switch state: ${event.state}`
      )
  }
}
