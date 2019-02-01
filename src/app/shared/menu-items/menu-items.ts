import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'starter', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'button', type: 'link', name: 'Users', icon: 'account_circle' },
  { state: 'grid', type: 'link', name: 'Categories', icon: 'category' },
  { state: 'lists', type: 'link', name: 'Products', icon: 'receipt' },
  { state: 'menu', type: 'link', name: 'Manufacturers', icon: 'new_releases' },
  { state: 'tabs', type: 'link', name: 'Colors', icon: 'palette' },
  { state: 'stepper', type: 'link', name: 'Country', icon: 'account_balance' },
  {
    state: 'expansion',
    type: 'link',
    name: 'State',
    icon: 'add_location'
  },
  { state: 'chips', type: 'link', name: 'Settings', icon: 'settings' },
  { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Progress snipper',
    icon: 'border_horizontal'
  },
  {
    state: 'progress',
    type: 'link',
    name: 'Progress Bar',
    icon: 'blur_circular'
  },
  {
    state: 'dialog',
    type: 'link',
    name: 'Dialog',
    icon: 'assignment_turned_in'
  },
  { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  {
    state: 'slide-toggle',
    type: 'link',
    name: 'Slide Toggle',
    icon: 'all_inclusive'
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
