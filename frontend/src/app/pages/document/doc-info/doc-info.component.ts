import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Document } from 'src/app/models/Document';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-doc-info',
  templateUrl: './doc-info.component.html',
  styleUrls: ['./doc-info.component.css']
})
export class DocInfoComponent implements OnInit, OnDestroy {
  @Input() doc: Document;
  @Input() docId: number;

  constructor(private orderService: OrderService) {}

  recordHandler() {
    this.orderService.putDocument(this.doc, this.docId);
  }
  ngOnInit() {}

  ngOnDestroy() {}
}
