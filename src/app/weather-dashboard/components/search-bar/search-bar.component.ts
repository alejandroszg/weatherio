import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  output,
} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, InputTextModule, IftaLabelModule, ButtonModule],
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  city: string = '';

  @Output() sendCity = new EventEmitter<string>();

  searchCity(city: string) {
    console.log(`Enviando ${city}...`);
    this.city = city;
    this.sendCity.emit(this.city);
  }
}
