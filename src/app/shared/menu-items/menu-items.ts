import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'users', type: 'link', name: 'Users', icon: 'account_circle' },
  { state: 'categories', type: 'link', name: 'Categories', icon: 'category' },
  { state: 'products', type: 'link', name: 'Products', icon: 'receipt' },
  { state: 'manufacturers', type: 'link', name: 'Manufacturers', icon: 'new_releases' },
  { state: 'pages', type: 'link', name: 'Pages', icon: 'pages' },
  { state: 'colors', type: 'link', name: 'Colors', icon: 'palette' },
  { state: 'carousel', type: 'link', name: 'Carousel', icon: 'slideshow' },
  { state: 'settings', type: 'link', name: 'Settings', icon: 'settings' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
