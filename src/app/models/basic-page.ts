export class BasicPage {
  id: number;
  name: string;
  alias: string;
  body: string;
}

export interface BasicPagePage {
  content: BasicPage[];
  numberOfElements: number;
}
