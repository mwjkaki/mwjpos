import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable({
  providedIn: 'root'
})
export class HistValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'memo': new FormControl()
      });
  }
}
