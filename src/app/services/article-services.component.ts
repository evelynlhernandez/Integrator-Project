import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ArticleService {

  readonly baseUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient) {}

  addArticle(article): Observable<any> {
    const url = this.baseUrl + '/articles';

    return this.http.post<any>(url, article);
  }

  getArticles() {
    const url = this.baseUrl + '/articles';
    return this.http.get<any>(url);
  }

  getArticlesByUser(username) {
    const url = `${this.baseUrl}/articles?author=${username}`;
    return this.http.get<any>(url);
  }

  getArticle(slug) {
    const url = this.baseUrl + '/articles/' + slug;
    return this.http.get<any>(url);
  }

  updateArticle(slug, articleForm) {
    const url = this.baseUrl + '/articles/' + slug;
    const request = {
      article: articleForm
    };

    return this.http.put<any>(url, request);
  }

  deleteArticle(slug) {
    const url = this.baseUrl + '/articles/' + slug;
    return this.http.delete<any>(url);
  }

  addCommentByArticle(slug, comment) {
    const url = this.baseUrl + '/articles/' + slug + '/comments';

    const commentByArticle = {
      comment
    };

    return this.http.post<any>(url, commentByArticle);
  }

  getCommentsByArticle(slug) {
    const url = this.baseUrl + '/articles/' + slug + '/comments';
    return this.http.get<any>(url);
  }

  deleteCommentByArticle(slug, id) {
    const url = this.baseUrl + '/articles/' + slug + '/comments/' + id;
    return this.http.delete<any>(url);
  }
}
