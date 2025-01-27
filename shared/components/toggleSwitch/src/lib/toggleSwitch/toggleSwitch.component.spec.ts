import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleSwitchComponent } from './toggleSwitch.component';
import { By } from '@angular/platform-browser';
import { EventEmitter, SimpleChanges } from '@angular/core';

describe('ToggleSwitchComponent', () => {
  let component: ToggleSwitchComponent;
  let fixture: ComponentFixture<ToggleSwitchComponent>;

  // Setup before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleSwitchComponent);
    component = fixture.componentInstance;
    
    // Set up required switchProps.
    component.switchProps = {id:'test-id'};
    
    // Ensure "switchToggle" output is declared for all tests except the specific test
    Object.defineProperty(component.switchToggle,'observed',{value:true});
    
    // Trigger initial change detection. 
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values set for switchProps', () => {
    // Default values when not provided by the user
    expect(component.switchProps.size).toBe(1);
    expect(component.switchProps.variant).toBe('rounded');
    expect(component.switchProps.isToggleOn).toBe(false);
    expect(component.switchProps.disabled).toBe(false);
  });

  it('should not render the component and throw an error if neither id nor eventName provided', () => {
    component.switchProps = {};
    fixture.detectChanges();  

    expect(() => {
      component.ngOnChanges();
    }).toThrow(
      'Either "id" or "eventName" must be provided in [switchProps] component properties object. The value shall not be white space. See component documentation.'
    );

    // Expect the host element not to exist in the DOM when hasError is true
    expect(fixture.nativeElement.querySelector('lib-toggle-switch')).toBeNull();

  });

  it('should throw an error if (switchToggle) output is not declared', () => {
    // Replace "switchToggle" with a mocked EventEmitter
    const mockEventEmitter = new EventEmitter();
    Object.defineProperty(mockEventEmitter, 'observed', { value: false });
    component.switchToggle = mockEventEmitter; // Replace the output emitter
    
    // Simulate an `ngOnChanges` call
  const changes: SimpleChanges = {
    switchProps: {
      currentValue: { id: 'test-id' },
      previousValue: null,
      firstChange: true,
      isFirstChange: () => true,
    },
  };

    // Expect the validation to throw an error
    expect(() => component.ngOnChanges()).toThrow(
      'The "switchToggle" output is mandatory on component. Please bind an event handler to it.'
    );
  });

  it('should set the correct size factor style based on switchProps size', () => {
    component.switchProps.size=2;
    component.ngOnInit();
    fixture.detectChanges();
        
    const hostElement = fixture.debugElement.nativeElement;
    expect(hostElement.style.getPropertyValue('--sizeFactor')).toBe('2');
  });

  it('should apply the correct class for variant (rounded)', () => {
    component.switchProps.variant = 'rounded';
    component.ngOnInit();
    fixture.detectChanges();
    const hostElement = fixture.debugElement.nativeElement;
    expect(hostElement.classList).toContain('rounded');
  });

  it('should apply the correct class for variant (squared)', () => {
    component.switchProps.variant = 'squared';
    component.ngOnInit();
    fixture.detectChanges();
    const hostElement = fixture.debugElement.nativeElement;
    expect(hostElement.classList).toContain('squared');
  });

  it('should emit switchToggle event when toggle switch state changes', () => {
    jest.spyOn(component.switchToggle, 'emit');

    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    expect(component.switchToggle.emit).toHaveBeenCalledWith({
      state: true,
      id: 'test-id',
      eventName: undefined,
    });
  });

  it('should not emit switchToggle event if switch is disabled', () => {
    jest.spyOn(component.switchToggle, 'emit');
    component.switchProps.disabled = true;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    expect(component.switchToggle.emit).not.toHaveBeenCalled();
  });

  it('should bind the "disabled" property correctly to input element', () => {
    component.switchProps.disabled = true;
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    expect(checkbox.disabled).toBeTruthy();
  });

  it('should apply the correct dynamic styles for primary and accent colors', () => {
    component.switchProps.primaryColor = '#ff5733';
    component.switchProps.accentColor = '#33c1ff';
    component.ngOnInit();
    fixture.detectChanges();
    
    const hostElement = fixture.debugElement.nativeElement;
    expect(hostElement.style.getPropertyValue('--primary')).toBe('#ff5733');
    expect(hostElement.style.getPropertyValue('--accent')).toBe('#33c1ff');
  });

  it('should correctly handle the change event and update toggle state', () => {
    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.switchProps.isToggleOn).toBe(true);
  });

  it('should reflect the initial checked state based on switchProps.isToggleOn', () => {
    component.switchProps.isToggleOn = true;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    expect(checkbox.checked).toBe(true);
  });
});
