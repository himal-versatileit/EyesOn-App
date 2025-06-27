import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "initials",
  standalone:true
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return "";

    const names = value.split(" ");
    const initials = names.map(name => name.charAt(0).toUpperCase()).join("");
    return initials;
  }
}
