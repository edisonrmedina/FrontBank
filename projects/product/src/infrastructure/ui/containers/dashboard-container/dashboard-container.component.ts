import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SaveUserUseCase } from '../../../../application/create-user-use-case';
import { LogOutUseCase } from '../../../../application/logout-use-case';
import { IUser } from '../../../../domain/model/IUser';
import { State } from '../../../../domain/state';
import { DashboardLayoutComponent } from '../../layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'lib-dashboard-container',
  imports: [DashboardLayoutComponent],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss',
})
export class DashboardContainerComponent {
  private readonly state = inject(State);
  private readonly _useCase = inject(SaveUserUseCase); 
  private readonly _logoutUseCase = inject(LogOutUseCase);
  public userSave$: Observable<IUser>;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: 'GOD',
    });
  }

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this._logoutUseCase.initSubscriptions();
   }

   handleSave()  {
    this._useCase.execute(this.registerForm.value);
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
    this._logoutUseCase.destroySubscriptions();
  }

  handleLogout() {
    this._logoutUseCase.execute();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const credentials = {
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        role: 'GOD',
      };
      this._useCase.execute(credentials);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
