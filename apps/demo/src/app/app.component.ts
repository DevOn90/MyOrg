import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToggleSwitchComponent } from '@my-org/toggleSwitch';
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

  onToggle(event:{state:boolean,eventName:string}) {
    console.log(`Event name: ${event.eventName} Switch state: ${event.state}`)
  }
}
