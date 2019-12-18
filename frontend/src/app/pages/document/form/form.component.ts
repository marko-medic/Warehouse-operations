import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Article } from 'src/app/models/Article';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  formData: any = {};
  articleList: Article[];
  private articleSub: Subscription = new Subscription();
  @Input() docId: number;

  constructor(private orderService: OrderService) {}

  onSubmit() {
    this.orderService.postItem(this.formData, this.docId);
    this.formData = {};
  }

  ngOnInit() {
    this.orderService.getArticles();
    this.articleSub = this.orderService.getArticles().subscribe(res => {
      this.articleList = res.results;
    });
  }
  ngOnDestroy() {
    this.articleSub.unsubscribe();
  }
}
