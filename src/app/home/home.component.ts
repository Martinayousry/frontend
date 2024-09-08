import { Component } from '@angular/core';
import { BestSellingComponent } from "../best-selling/best-selling.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BestSellingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
