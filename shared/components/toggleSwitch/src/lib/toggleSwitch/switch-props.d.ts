/**
 * Represents the configuration properties for the ToggleSwitch component.
 * You can pass in an object containing these properties via the `switchProps` input.
 *
 * - `id` and `eventName` are **mutually exclusive** and at least one must be provided.
 * - All other properties are **optional**, but will fall back to defaults if not specified.
 */
export interface SwitchProps {
/**
 * The unique identifier for the switch.
 * 
 * @default '' 
 * @optional
 */
id?: string;
  
/**
 * The custom event name for the toggle event.
 * 
 * @default ''
 * @optional
 */
eventName?: string;

/**
 * The size of the toggle switch.
 * 
 * @default 1
 * @optional
 */
size?: number;

/**
 * The variant of the toggle switch (rounded or squared).
 * 
 * @default 'rounded'
 * @optional
 */
variant?: 'rounded' | 'squared';

/**
 * The primary color of the toggle switch.
 * 
 * @default '#000000'
 * @optional
 */
primaryColor?: string;

/**
 * The accent color of the toggle switch.
 * 
 * @default '#ffffff'
 * @optional
 */
accentColor?: string;

/**
 * The initial state of the toggle switch (on or off).
 * 
 * @default false
 * @optional
 */
isToggleOn?: boolean;

/**
 * Disables the toggle switch, preventing user interaction.
 * 
 * @default false
 * @optional
 */
disabled?: boolean;
}