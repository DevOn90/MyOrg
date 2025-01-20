import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-toggle-switch',
  imports: [CommonModule],
  templateUrl: './toggleSwitch.component.html',
  styleUrl: './toggleSwitch.component.scss',
})
export class ToggleSwitchComponent implements OnInit, OnChanges {

  @Input() size?:number;
  @Input() variant: 'rounded' | 'squared' = 'rounded';
  @HostBinding('style.--sizeFactor') sizeFactor?:string;
  @HostBinding('class.rounded') get isRounded():boolean {
    return this.variant === 'rounded';
  };
  @HostBinding('class.squared') get isSquared():boolean {
    return this.variant === 'squared';
  };

  ngOnInit(): void {
    this.applyDefaultSetting();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyDefaultSetting();
  }

  private applyDefaultSetting() {
    this.sizeFactor = `${this.size ?? 1}`; // Use 1 as fallback value
  }
}
