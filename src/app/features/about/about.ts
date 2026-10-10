import { Component } from '@angular/core';
import { Route,RouterLink ,RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink,RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
