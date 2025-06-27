import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "sanitizer",
  standalone: true,
})
export class SanitizerPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | unknown, arg: string): string | unknown | null {
    if (!value) return "";

    switch (arg) {
      case "html":
        return this.sanitizer.bypassSecurityTrustHtml(value as string);
      case "style":
        return this.sanitizer.bypassSecurityTrustStyle(value as string);
      case "script":
        return this.sanitizer.bypassSecurityTrustScript(value as string);
      case "url":
        return this.sanitizer.bypassSecurityTrustUrl(value as string);
      case "resourceUrl":
        return this.sanitizer.bypassSecurityTrustResourceUrl(value as string);
      default:
        return this.sanitizer.bypassSecurityTrustHtml(value as string);
    }
  }
}
