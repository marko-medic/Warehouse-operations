import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ItemList } from 'src/app/models/ItemList';
import { Item } from 'src/app/models/Item';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() docList: ItemList<Item>;
  @Input() docId: number;
  private orderSub: Subscription = new Subscription();
  private articleSub: Subscription = new Subscription();

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderSub = this.orderService
      .getDocumentItems(this.docId)
      .subscribe(data => {
        this.docList = data;
      });

    this.articleSub = this.orderService
      .getItemsUpdatedListener()
      .subscribe(res => {
        this.docList.results.push(res);
      });
  }
  ngOnDestroy() {
    this.orderSub.unsubscribe();
    this.articleSub.unsubscribe();
  }
}
