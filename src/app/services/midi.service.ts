import { Song } from '../shared/song';
import { SongComponent } from '../dialogs/song/song.component';
import { OnInit, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlService } from './urls.service';

@Injectable()

export class MidiService {
  // Variable which tell us what step of the game we're on.
  // We'll use this later when we parse noteOn/Off messages
  private currentStep = 0;
  turn = 0;

  correctNoteSequence = [60, 65, 69, 65, 69, 67, 65, 62, 60]; // Amazing Grace in F
  activeNoteSequence = [];

  chords: Array<{chord: number[]}> = [];
  private activeChord = [];
  private urls = [];
  private image: string;

  constructor(private urlService: UrlService) { }

  // request MIDI access
  onMidiInit() {
    if (navigator.requestMIDIAccess) {
      console.log('This browser supports WebMIDI!');
      const mAccess = navigator.requestMIDIAccess();

      mAccess
        .then(this.onMIDISuccess.bind(this))
        .catch(this.onMIDIFailure.bind(this));
    } else {
      alert('No MIDI support in your browser.');
    }
  }

  // Function for if MIDI connection is successful
  onMIDISuccess(midiAccess: any) {
    console.log('MIDI has successfully connected');
    let inputs = midiAccess.inputs;
    let outputs = midiAccess.outputs;

    // Attatch MIDI event "listeners" to each input
    for (let input of midiAccess.inputs.values()) {
      input.onmidimessage = this.onMIDIMessage.bind(this);
    }
  }

  // Function for if MIDI connection has failed
  onMIDIFailure(e: any) {
    console.log('Error: ' + e);
  }

  // Function to parse the MIDI messages
  onMIDIMessage(message: any) {
    const command = message.data[0];
    const note = message.data[1];
    const velocity = (message.data.length > 2) ? message.data[2] : 0;

    switch (command) {
      case 144: // note on
        if (velocity > 0) {
          this.noteOn(note, velocity);
        } else {
          this.noteOff(note);
        }
        break;
      case 128: // note off
        this.noteOff(note);
        break;
    }
  }

  // Function to handle if key is pressed
  noteOn(note: any, velocity: any) {
    switch (this.currentStep) {
      case 0:
        console.log(this.turn);

        this.activeChord.push(note);
        if (this.activeChord.length === this.chords[this.turn].chord.length) {
          let match = true;
          console.log(this.activeChord);
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.activeChord.length; i++) {
            // tslint:disable-next-line: prefer-for-of
            if (this.activeChord[i] !== this.chords[this.turn].chord[i]) {
              match = false;
              break;
            }
          }

          if (match) {
            console.log('Correct Chord!');
            this.urlService.updateUrlList(this.urls[this.turn]);
            document.getElementById('url').setAttribute('src', this.urls[this.turn]);
            this.turn++;
          }

          if(this.turn === this.chords.length) {
            this.turn = 0;
          }

        }
      }
  }

  // Function to handle if key is released
  noteOff(note: any) {
    switch (this.currentStep) {
      case 0:
        // Remove the note value from the active chord array
        this.activeChord.splice(this.activeChord.indexOf(note), 1);
        break;
    }
  }

  setSong(c: Array<{chord: number[]}>, u: any[]) {
    this.chords = [];
    this.urls = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < c.length; i++) {
      this.chords.push({chord: c[i].chord});
      this.urls[i] = u[i];
    }
  }
}
