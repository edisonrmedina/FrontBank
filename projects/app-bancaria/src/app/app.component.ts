import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SkeletonComponent, ToastComponent } from 'shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SkeletonComponent,ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-bancaria';
}
