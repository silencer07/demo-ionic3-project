import {IsEmail, IsLength} from "validator.ts/decorator/Validation";
export class User {
  @IsEmail()
  username: string;

  @IsLength(4)
  password: string;
}
