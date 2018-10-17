import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';


@Injectable({
  providedIn: 'root'
})
export class GdslistValidatorService  implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'gds': new FormControl(null, Validators.required),
      'prc': new FormControl(),
      'cnt': new FormControl(null, Validators.required)
      });
  }
}
