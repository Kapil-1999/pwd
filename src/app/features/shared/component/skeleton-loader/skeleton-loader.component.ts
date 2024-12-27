import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.scss'
})
export class SkeletonLoaderComponent {
  @Input() columns: Array<{ key: string; title: string; width?: string; }> | any;
  @Input()  items : any
}
