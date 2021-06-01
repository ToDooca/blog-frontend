import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {JwtService} from "../../../../common/src/services/jwt.service";
import {environment} from "../../environments/environment";
import * as M from "materialize-css";
import {first} from "rxjs/operators";

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
        email: [null, [Validators.required, Validators.email]],
        about: [null, Validators.required],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required]
    }, {
        validator: this.ConfirmedValidator('password', 'confirmPassword')
    });
    loading = false;
    submitted = false;
    error: string;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private toastService: ToastrService) {
    }

    ngOnInit(): void {
        M.updateTextFields();
    }

    onSubmit() {
        this.authService.register(this.registerForm.value)
            .then(res => {
                RegisterFormComponent.navigateExternal();
            })
            .catch(err => {
            this.toastService.error(err.error.error)
        });
    }

    private static navigateExternal() {
        window.location.href = environment.adminBaseUrl;
    }


    ConfirmedValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({confirmedValidator: true});
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}
