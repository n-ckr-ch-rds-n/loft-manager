export class Pigeon {
  id: string;
  bandNo: string;
  year: number;
  name: string;
  color: string;
  sex: string;
  strain: string;
  loft: string;
  sire: string;
  dam: string;
  active: boolean;
  comments: string;
  imageUrl: string;
  carouselImages: Image[];
}

export class Image {
  id: string;
  caption: string;
  url: string;
  pigeon: Pigeon;
}
