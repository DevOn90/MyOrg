import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-toggle-switch',
  imports: [CommonModule],
  templateUrl: './toggleSwitch.component.html',
  styleUrl: './toggleSwitch.component.scss',
})
export class ToggleSwitchComponent implements OnInit, OnChanges {

  @Input() size!:number;
  @HostBinding('style.--sizeFactor') sizeFactor!:string;

  ngOnInit(): void {
    this.applyDefaultSetting();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyDefaultSetting();
  }

  private applyDefaultSetting() {
    this.sizeFactor = `${this.size || 1}`; // Use 1 as fallback value
  }
}
