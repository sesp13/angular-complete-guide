import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "appShorten",
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number = 15): string {
    if (value.length > limit) {
      return value.substring(0, limit) + " ...";
    } else {
      return value;
    }
  }
}
