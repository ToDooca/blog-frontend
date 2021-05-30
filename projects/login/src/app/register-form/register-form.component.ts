import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {JwtService} from "../../../../common/src/services/jwt.service";
import {environment} from "../../environments/environment";
import * as M from "materialize-css";

@Component({
  selector: 'login-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  public registerForm = this.fb.group({
    fullName: [null, Validators.required],
    username: [null, Validators.required],
    displayName: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    repeatPassword: [null, Validators.required],

  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastService: ToastrService,
              private jwtService: JwtService) { }

  ngOnInit(): void {
    M.updateTextFields();
  }

  async onSubmit() {

  }


}
