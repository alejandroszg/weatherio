import { Component } from '@angular/core';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-error-toast',
  imports: [Toast],
  templateUrl: './error-toast.component.html',
})
export class ErrorToastComponent {}
