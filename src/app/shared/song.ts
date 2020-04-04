export class Song {
  name: string;
  chords: Array<{chord: number[]}>;
  urls: string[];

  constructor(n: string, c: Array<{chord: number[]}>, u: string[]) {
    this.name = n;
    this.chords = c;
    this.urls = u;
  }
}
