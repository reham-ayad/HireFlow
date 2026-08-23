import { Component } from '@angular/core';
import{ RouterLink, RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
