import {PersonalInformation} from "./personal-information";
import {Skip, Type} from "serializer.ts/Decorators";

export class User {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  @Type(() => PersonalInformation)
  personalInformation: PersonalInformation;
  @Skip()
  accessToken: string;


  constructor() {
    this.personalInformation = new PersonalInformation;
  }
}
