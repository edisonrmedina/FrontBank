import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logoUrl'
})
export class LogoUrlPipe implements PipeTransform {

  transform(url: string): string {
    
    if (!url) {
      return 'product.png'; 
    }

    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:image')) {
      return url;
    }

    return 'product.png'; 
  }

}