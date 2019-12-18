import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemList } from '../models/ItemList';
import { Item } from '../models/Item';
import { Article } from '../models/Article';
import { Document as Doc } from '../models/Document';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const BASE_URL = 'http://localhost:3000/api/documents';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private docsUpdated = new Subject<Doc>();
  private itemsUpdated = new Subject<Item>();

  constructor(private http: HttpClient, private router: Router) {}

  getOrders(query: any) {
    return this.http.get<ItemList<Item>>(
      BASE_URL +
        `?page=${query.current}&pageSize=${query.size}&sortDirection=${query.sortDirection}&sort=${query.sort}`
    );
  }

  getDocumentItems(id: number) {
    return this.http.get<ItemList<Item>>(BASE_URL + '/' + id + '/items');
  }

  getArticles() {
    return this.http.get<ItemList<Article>>(
      'http://localhost:3000/api/articles'
    );
  }

  getDocument(id: number) {
    return this.http.get<Doc>(BASE_URL + '/' + id);
  }

  removeDocument(id: number) {
    this.http.delete(BASE_URL + '/' + id).subscribe(res => {
      if (!res) {
        console.log('Something went wrong');
        return;
      }
      this.router.navigate(['/documents']);
    });
  }

  postItem(item: Item, id: number) {
    this.http
      .post<Item>(BASE_URL + '/' + id + '/items', item)
      .subscribe(res => {
        this.itemsUpdated.next(res);
      });
  }

  putDocument(doc: Doc, id: number) {
    const updatedDoc: Doc = {
      ...doc,
      status: 'recorded',
      dateOfRecording: new Date().toDateString()
    };
    this.http.put<Doc>(BASE_URL + '/' + id, updatedDoc).subscribe(res => {
      this.docsUpdated.next(res);
    });
  }

  getdocsUpdatedListener() {
    return this.docsUpdated.asObservable();
  }
  getItemsUpdatedListener() {
    return this.itemsUpdated.asObservable();
  }
}
