import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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

  @Input() primaryColor?:string;
  @Input() accentColor?:string;

  @HostBinding('style.--primary') primary?:string;
  @HostBinding('style.--accent') accent?:string;

  @Input() isToggleOn:boolean = false; // Default is set off
  @Input() eventName: string = 'toggleChange'; //Custom event name, default is 'toggleChange'
  @Output() switchToggle:EventEmitter<{state:boolean,id?:string,eventName:string}> = new EventEmitter();

  @Input() disabled:boolean = false;
  @HostBinding('class.disabled') get isDisabled():boolean {
    return this.disabled;
  };

  @HostBinding('attr.id') @Input() id?:string;
  private hostId?:string;

  constructor(private hostElement:ElementRef) {}

  ngOnInit(): void {
    this.applyDefaultSetting();
    
    this.hostId = 
      this.id || 
      this.hostElement.nativeElement.getAttribute('id') ||
      undefined
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyDefaultSetting();
    this.primary = this.primaryColor;
    this.accent = this.accentColor;
  }

  private applyDefaultSetting() {
    this.sizeFactor = `${this.size ?? 1}`; // Use 1 as fallback value
  }

  onToggleSwitch(event:Event) {
    if(this.disabled) return; //Prevent toggling if switch is disabled
    
    const checkbox = event.target as HTMLInputElement;
    const previousState = this.isToggleOn;
    this.isToggleOn = checkbox.checked;

    if(this.isToggleOn !== previousState) {
      this.switchToggle.emit({
        state:this.isToggleOn,
        id:this.hostId,
        eventName:this.eventName
      })
    }
  }
}
