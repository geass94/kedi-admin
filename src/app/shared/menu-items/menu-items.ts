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
  { state: 'products', type: 'link', name: 'Products', icon: 'receipt' },
  { state: 'categories', type: 'link', name: 'Categories', icon: 'category' },
  { state: 'manufacturers', type: 'link', name: 'Manufacturers', icon: 'new_releases' },
  { state: 'size', type: 'link', name: 'Size Chart', icon: 'settings' },
  { state: 'colors', type: 'link', name: 'Colors', icon: 'palette' },
  { state: 'carousel', type: 'link', name: 'Carousel', icon: 'slideshow' },
  { state: 'banner', type: 'link', name: 'Banner', icon: 'slideshow' },
  { state: 'pages', type: 'link', name: 'Pages', icon: 'pages' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
