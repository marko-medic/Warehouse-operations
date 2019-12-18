import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';
import { ItemList } from 'src/app/models/ItemList';
import { Item } from 'src/app/models/Item';
import { Document } from 'src/app/models/Document';
import { getValidDate } from 'src/app/shared/helpers';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  orderSub: Subscription;
  orderList: ItemList<Item>;
  pageOptions = {
    size: 10,
    current: 1,
    sort: '_id',
    sortDirection: 'asc',
    count: 0
  };

  tableHeadsArray = [
    { text: 'Date of Creation', checked: true, href: 'dateOfCreation' },
    { text: 'Date of Recording', checked: true, href: 'dateOfRecording' },
    { text: 'Status', checked: true, href: 'status' },
    { text: 'Transaction Type', checked: true, href: 'transactionType' },
    { text: 'Business Partner', checked: true, href: '' },
    { text: 'Business Partner Location', checked: true, href: '' },
    { text: 'Year', checked: true, href: '' }
  ];
  showTableSettings = false;
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getOrders();
  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }

  getFormatedText(th: { text: string; href: string }, order: Document) {
    switch (th.text) {
      case 'Date of Creation':
        return getValidDate(order.dateOfCreation);
      case 'Date of Recording':
        return getValidDate(order.dateOfRecording);
      case 'Business Partner':
        return `${order.businessPartner.name}`;
      case 'Business Partner':
        return `${order.businessPartner.name}`;
      case 'Business Partner Location':
        return `${order.businessPartner.address} ${order.businessPartner.city}`;
      case 'Year':
        return order.year;
      default:
        return th.text;
    }
  }

  sortHandler(sort: string) {
    if (!sort) {
      return false;
    }
    if (this.pageOptions.sort === sort) {
      this.pageOptions.sortDirection =
        this.pageOptions.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.pageOptions.sortDirection = 'asc';
    }
    this.pageOptions.sort = sort;
    this.getOrders();
  }

  changePageHandler(event: Event) {
    this.getOrders();
    this.pageOptions.current = Number(event);
  }

  private getOrders() {
    this.orderSub = this.orderService
      .getOrders(this.pageOptions)
      .subscribe(data => {
        this.orderList = data;
        this.pageOptions.count = data.count;
      });
  }
}
