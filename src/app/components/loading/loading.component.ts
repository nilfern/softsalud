import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<div class="lds-ripple-container">
      <div class="lds-ripple">
          <div></div>
          <div></div>
      </div>
  </div>`,
  styleUrl: './loading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent { }
