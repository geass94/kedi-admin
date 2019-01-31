import {Input} from "@angular/core";

export class Signup {
  @Input()
  private name: string;
  @Input()
  private email: string;
  @Input()
  private password: string;
}
