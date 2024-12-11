import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export abstract class AbstractForm {

  abstract form: FormGroup

  getControl(control: string | AbstractControl) {
    if (typeof control === "string") {
      const c = this.form.get(control)
      if (!c) throw new Error("Can't find control : " + control)
      control = c
    }
    return control;
  }

  hasInteraction(control: string | AbstractControl) {
    control = this.getControl(control);
    return (control.dirty || control.touched)
  }

  isInvalid(control: string | AbstractControl) {
    control = this.getControl(control);
    return this.hasInteraction(control) && control.invalid
  }

  hasError(control: string | AbstractControl, errorCode: string) {
    control = this.getControl(control);
    return this.hasInteraction(control) && control.hasError(errorCode)
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.valid) this.onSubmit$()
  }

  abstract onSubmit$(): void


  mustMatch = (matchingcontrol: AbstractControl): ValidatorFn =>
    (control) =>
      control.value === matchingcontrol.value ? null : {
        mustmatch: {
          expected: matchingcontrol.value,
          actual: control.value
        }
      }

  password: ValidatorFn = (control) =>
    control.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}$")
      ? null
      : {password: true}
}
