import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductQuery } from 'shared';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-skeleton',
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css',
})
export class SkeletonComponent {
  private readonly _productQuery = inject(ProductQuery);

  loading = toSignal(this._productQuery.selectCurrentStateLoading(), {
    initialValue: false,
  });
}
