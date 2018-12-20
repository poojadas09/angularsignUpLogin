import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          username: ['', Validators.required],
          mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[6-9]\\d{9}')]],
          address: ['', [Validators.required, Validators.maxLength(30)]],
          password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9\.]*$')]],
          confirmpassword: ['', Validators.required]
      }, {validator: this.passwordMatchValidator});
  }
  passwordMatchValidator(frm: FormGroup) {
      return frm.get('password').value === frm.get('confirmpassword').value ? null : {'mismatch': true};
 }
 get password() { return this.registerForm.get('password'); }
 get confirmpassword() { return this.registerForm.get('confirmpassword'); }
 get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
      this.loading = true;
      if (this.authenticationService.register(this.registerForm.value)) {
        this.router.navigate(['/login']);
      }
  }

}
