import { GifStructure } from "../interfaces/gif-response.interfaces";
import { Gif } from "../interfaces/gif.interfaces";

export class GifMapper {

  static mapGifStructureToGif(item: GifStructure): Gif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static mapGifStructureArrayToGifArray(items: GifStructure[]): Gif[]{
    return items.map(item => this.mapGifStructureToGif(item));
  }

}
