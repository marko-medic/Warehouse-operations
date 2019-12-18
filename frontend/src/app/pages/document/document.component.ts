import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemList } from 'src/app/models/ItemList';
import { Item } from 'src/app/models/Item';
import { Document as Doc } from 'src/app/models/Document';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy {
  docId: number;
  docList: ItemList<Item>;
  document: Doc;
  private routerSub: Subscription = new Subscription();
  private orderSub: Subscription = new Subscription();
  private docSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  removeHandler() {
    this.orderService.removeDocument(this.docId);
  }

  ngOnInit() {
    this.routerSub = this.route.paramMap.subscribe(params => {
      this.docId = +params.get('id');
    });
    this.orderSub = this.orderService.getDocument(this.docId).subscribe(res => {
      this.document = res;
    });
    this.docSub = this.orderService.getdocsUpdatedListener().subscribe(res => {
      this.document = res;
    });
  }
  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.orderSub.unsubscribe();
    this.docSub.unsubscribe();
  }
}
