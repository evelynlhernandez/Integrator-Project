import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from '../models/article';
import { MatPaginator } from '@angular/material/paginator';
import { ArticleService } from '../services/article-services.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  ArticleData: any = [];
  dataSource: MatTableDataSource<Article>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['title', 'action'];

  constructor(
    private articleService: ArticleService
    ) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    this.articleService.getArticlesByUser(currentUser.username).subscribe(data => {

      this.ArticleData = data.articles;
      this.dataSource = new MatTableDataSource<Article>(this.ArticleData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  deleteArticle(index: number, e) {
    if (window.confirm('Seguro deseas borrar el artículo?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.articleService.deleteArticle(e.slug).subscribe();
    }
  }

}
