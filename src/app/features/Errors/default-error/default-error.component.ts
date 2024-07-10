import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-default-error',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './default-error.component.html',
  styleUrl: './default-error.component.scss'
})
export class DefaultErrorComponent {

}
