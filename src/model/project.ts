import {IsLength} from "validator.ts/decorator/Validation";
export class Project {
  id: number;

  @IsLength(1)
  name: string;
}
