import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchProps } from './switch-props';

/**
 * ToggleSwitchComponent: A customizable toggle switch component.
 * 
 * This component supports various configurations, such as size, color, and shape.
 * It emits events when toggled, making it suitable for interactive forms and UI controls.
 * 
 * ### Usage:
 * ```html
 * <lib-toggle-switch
 *   [switchProps]="{ id: '123', size: 2 }" 
 *   (switchToggle)="yourHandlerer($event)"
 * ></lib-toggle-switch>
 * ```
 * 
 * - **`switchProps`**: Configuration object for toggle switch. Mandatory.
 * - **`switchToggle`**: Event emitted when the switch is toggled. Mandatory.
 */
@Component({
  selector: 'lib-toggle-switch',
  imports: [CommonModule],
  template: `
      <label class="switch">
      <input 
        type="checkbox"
        [disabled]="switchProps.disabled"
        [checked]="switchProps.isToggleOn"
        (change)="onToggleSwitch($event)">
        <span class="slider round"></span>
      </label>`,
  styleUrl: './toggleSwitch.component.scss',
})
export class ToggleSwitchComponent implements OnInit, OnChanges {

  /**
   * Configuration object for the toggle switch.
   * ## Usage: 
   * ```html
   * [switchProps]="{
   *    id?:string; // An "id" or "eventName must be assigned". 
   *    eventName?:string; // An "id" or "eventName must be assigned".
   *    size?:number; // Default 1
   *    variant?: 'rounded' | 'squared' // Default rounded.
   *    primaryColor?:string; // Default #ffffff
   *    accentColor?:string; // Default #2196F3
   *    isToogleOn?:boolean; // Default false
   *    disabled?:boolean; // Default false
   * }"
   * ```
   */
  @Input() switchProps!:SwitchProps;

  /**
   * Event emitted when the toggle state changes.
   * Emits an object containing the toggle state, ID, and event name.
   */
  @Output() switchToggle = new EventEmitter<{
    state:boolean;
    id?: string;
    eventName?: string;
  }>();

  // Host bindings for dynamic styles and classes
  @HostBinding('style.--sizeFactor') sizeFactor?:string;
  @HostBinding('style.--primary') primary?:string;
  @HostBinding('style.--accent') accent?:string;
  @HostBinding('attr.id') @Input() id?:string;

  @HostBinding('class.disabled') 
  get isDisabled():boolean {
    return this.switchProps.disabled!;
  };
  @HostBinding('class.rounded') 
  get isRounded():boolean {
    return this.switchProps?.variant === 'rounded';
  };
  @HostBinding('class.squared') 
  get isSquared():boolean {
    return this.switchProps?.variant === 'squared';
  };

  private hostId?:string;

  constructor(private hostElement:ElementRef) {}
  
  /**
   * Lifecycle hook: Called once the component is initialized.
   */
  ngOnInit(): void {   
    this.applyDefaultSetting();
    this.validateProps();
  }

  /**
   * Lifecycle hook: Called whenever input properties change.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.applyDefaultSetting();
    this.primary = this.switchProps?.primaryColor;
    this.accent = this.switchProps?.accentColor;
  }

  /**
   * Apply default settings for optional properties in switchProps.
   */
  private applyDefaultSetting():void {
    // Ensure switchProps is initialized as an object
    this.switchProps = {
      size: 1, // Default size
      variant: 'rounded', // Default variant
      isToggleOn: false, // Default toggle state 
      disabled: false, // Default disable state
      ...this.switchProps, // Override with provided values (if any)
    };
    this.sizeFactor = `${this.switchProps.size}`;
  }

  /**
   * Validate that either `id` or `eventName` is provided in switchProps.
   */
  private validateProps():void {
    const { id,eventName } = this.switchProps;

    if(!id && !eventName) {
      throw new Error(
        'Either "id" or "eventName" must be provided in [switchProps]' +
        ' component properties object. See component documentation.'
      )
    }
  }

  /**
   * Handle toggle switch changes and emit the switchToggle event.
   * @param event The DOM event triggered by user interaction.
   */
  onToggleSwitch(event:Event) {
    if(this.switchProps?.disabled) return; //Prevent toggling if switch is disabled
    
    const checkbox = event.target as HTMLInputElement;
    const previousState = this.switchProps?.isToggleOn;
    this.switchProps.isToggleOn = checkbox.checked;

    if(this.switchProps?.isToggleOn !== previousState) {
      this.switchToggle.emit({
        state:this.switchProps?.isToggleOn,
        id:this.switchProps?.id,
        eventName:this.switchProps?.eventName
      })
    }
  }
}
