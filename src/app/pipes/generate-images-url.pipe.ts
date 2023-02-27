import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generateImageUrl'
})
export class GenerateImagesUrlPipe implements PipeTransform {
  imageBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
  imgFormat = ".png";
  transform(value: string): string {

       let url1 = new URL(value);
       const str = url1.pathname.split('/').at(4);
       return this.imageBaseUrl + str + this.imgFormat;


     }



}
