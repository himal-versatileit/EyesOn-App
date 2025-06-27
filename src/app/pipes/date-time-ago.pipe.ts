import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform, inject } from "@angular/core";

@Pipe({
  name: "dateToTimeAgo",
  standalone: true,
  pure: false,
})
export class DateToTimeAgo implements PipeTransform {
  private datePipe = inject(DatePipe);

  transform(value: string | Date): string {
    if (!value) return "";

    const date = typeof value === "string" ? new Date(value) : value;
    const now = new Date();

    // Calculate the difference in milliseconds
    const diff = date.getTime() - now.getTime();

    // Time units
    const seconds = Math.abs(Math.floor(diff / 1000));
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    // Normalize the date to just the date part (remove time) for better day comparison
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const dayDiff = (dateOnly.getTime() - nowOnly.getTime()) / (1000 * 60 * 60 * 24);

    if (diff < 0) {
      // Past date
      if (seconds < 60) {
        return "Just Now";
      } else if (minutes < 60) {
        return `${minutes} Minute${minutes > 1 ? "s" : ""} Ago`;
      } else if (hours < 24) {
        return `${hours} Hour${hours > 1 ? "s" : ""} Ago`;
      } else if (dayDiff === -1) {
        return "Yesterday";
      } else {
        return this.datePipe.transform(date, "d-MMM-yy") || "";
      }
    } else {
      // Future date
      if (seconds < 60) {
        return `After ${seconds} Second${seconds !== 1 ? "s" : ""}`;
      } else if (minutes < 60) {
        return `After ${minutes} Minute${minutes !== 1 ? "s" : ""}`;
      } else if (hours < 24) {
        return `After ${hours} Hour${hours !== 1 ? "s" : ""}`;
      } else if (dayDiff === 1) {
        return "Tomorrow";
      } else {
        return this.datePipe.transform(date, "d-MMM-yy") || "";
      }
    }
  }
}
