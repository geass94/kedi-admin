export class Category {
  id: number;
  weight: number;
  name: string;
  parent: Category;
  children: Category[];
}
