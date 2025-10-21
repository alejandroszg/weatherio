import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, InputTextModule, IftaLabelModule, DividerModule],
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  value: string | undefined;
}
