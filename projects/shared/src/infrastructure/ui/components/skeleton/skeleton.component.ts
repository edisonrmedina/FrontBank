import { Component, OnDestroy } from '@angular/core';
import { ProductQuery } from 'product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-skeleton',
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css',
})
export class SkeletonComponent implements OnDestroy {
  private readonly _subscription = new Subscription();
  public loading = false;
  constructor(private _productQuery: ProductQuery) {
    this._subscription.add(
      this._productQuery.selectCurrentStateLoading().subscribe((loading) => {
        this.loading = loading;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
