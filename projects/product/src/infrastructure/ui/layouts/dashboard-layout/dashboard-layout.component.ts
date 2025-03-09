import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RegisterComponent } from '../../components/register/register.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';

@Component({
  selector: 'lib-dashboard-layout',
  imports: [
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  @Output() logoutRequested = new EventEmitter<void>();

  @Output() submitted = new EventEmitter<any>();
  @Input() registerForm: FormGroup;

  onSubmit() {
    if (this.registerForm.valid) {
      this.submitted.emit(this.registerForm.value);
    } else {
      console.log('Form is invalid, marking as touched');
      this.registerForm.markAllAsTouched();
      return;
    }
  }

  handleLogout(): void {
    console.log('Logout requested');
    this.logoutRequested.emit();
  }


}
