import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Console } from 'console';
import { error } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  aspirateurForm = new FormGroup({
    x: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    y: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    startX: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    startY: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    orientation: new FormControl('', [
      Validators.required,
      Validators.pattern('^[N,W,S,E,n,s,w,e]+$'),
      Validators.maxLength(1),
    ]),

    instructions: new FormControl('', [
      Validators.required,
      Validators.pattern('^[D,G,A,d,g,a]+$'),
    ]),
  });

  constructor() {}
  result = '';

  ngOnInit(): void {}

  onSubmit() {
    var X = parseInt(this.aspirateurForm.get('x').value);
    var Y = parseInt(this.aspirateurForm.get('y').value);
    var startX = parseInt(this.aspirateurForm.get('startX').value);
    var startY = parseInt(this.aspirateurForm.get('startY').value);
    var orientation = this.aspirateurForm.get('orientation').value;
    var instructions = this.aspirateurForm.get('instructions').value;

    for (var i = 0; i < instructions.length; i++) {
      if (instructions.charAt(i) == 'A') {
        switch (orientation) {
          case 'E':
            startX = startX + 1;
            break;
          case 'W':
            startX = startX - 1;
            break;
          case 'N':
            startY = startY + 1;
            break;
          case 'S':
            startY = startY - 1;
            break;
        }
      } else {
        orientation = this.chnagedirection(orientation, instructions.charAt(i));
      }
    }
    if (startX > X || startY > Y) {
      this.result = 'Vous avez depassé la limite';
    } else {
      this.result =
        'position finale : x=' +
        startX +
        ' y=' +
        startY +
        ' orientation=' +
        orientation;
    }
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.aspirateurForm.controls[controlName].hasError(errorName);
  };

  public chnagedirection(Direction, instruction) {
    var NewD = '';
    switch (Direction) {
      case 'N':
        if (instruction == 'D') {
          NewD = 'E';
        } else if (instruction == 'G') {
          NewD = 'W';
        }
        return NewD;
        break;
      case 'W':
        if (instruction == 'D') {
          NewD = 'N';
        } else if (instruction == 'G') {
          NewD = 'S';
        }
        return NewD;
        break;
      case 'E':
        if (instruction == 'D') {
          NewD = 'S';
        } else if (instruction == 'G') {
          NewD = 'N';
        }
        return NewD;
        break;
      case 'S':
        if (instruction == 'D') {
          NewD = 'W';
        } else if (instruction == 'G') {
          NewD = 'E';
        }
        return NewD;
        break;
    }
  }
}
