import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hide'
})
export class HidePipe implements PipeTransform {

  transform(value: string){
    
    let pipedString = ""
    value.split("").forEach(() => pipedString += '*')

    return pipedString
  }

}
