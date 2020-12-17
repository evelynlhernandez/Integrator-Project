import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ArticleService } from '../services/article-services.component';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from '../models/article';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss']
})
export class ArticleCommentComponent implements OnInit {
  CommentsData: any = [];
  dataSource: MatTableDataSource<Article>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['title', 'action'];
  commentForm: FormGroup;
  slug = '';

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.commentForm = this.fb.group({
      body: ['', [Validators.required]],
    });
    this.getComments();
  }

  getComments() {
    this.articleService.getCommentsByArticle(this.slug).subscribe(data => {
      this.CommentsData = data.comments;
      this.dataSource = new MatTableDataSource<Article>(this.CommentsData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  submitCommentForm() {
    this.articleService.addCommentByArticle(this.slug, this.commentForm.value).subscribe(res => {
      this.getComments();
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.commentForm.controls[controlName].hasError(errorName);
  }

  deleteComment(index: number, e) {
    if (window.confirm('Seguro deseas borrar el comentario?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.articleService.deleteCommentByArticle(e.slug, index).subscribe();
    }
  }
}
