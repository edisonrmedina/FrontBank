import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from '../../../../domain/model/IUser';
import { State } from '../../../../domain/state';
import { LoginComponent } from '../../components/login/login.component';
@Component({
  selector: 'lib-auth-container',
  imports: [LoginComponent,
    
  ],
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss',
})
export class AuthContainerComponent {
  private readonly state = inject(State);
  public auth$: Observable<IUser>;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };
      
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
