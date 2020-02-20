export class Song {
  name: string;
  chords: number[];
  urls: string[];

  constructor(n: string, c: number[], u: string[]) {
    this.name = n;
    this.chords = c;
    this.urls = u;
  }
}
