import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../services/article-services.component';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetArticleForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  articleForm: FormGroup;
  tagListArray = [];

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      body: ['', [Validators.required]],
      tagList: [[''], [Validators.required]],
    });

    const slug = this.route.snapshot.paramMap.get('slug');
    this.articleService.getArticle(slug).subscribe(data => {
      this.tagListArray = data.article.tagList;
      this.articleForm.patchValue(data.article);
    });
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim() && this.tagListArray.length < 5) {
      this.tagListArray.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tagListArray.indexOf(tag);
    if (index >= 0) {
      this.tagListArray.splice(index, 1);
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.articleForm.controls[controlName].hasError(errorName);
  }

  updateArticleForm() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (window.confirm('Seguro deseas editar el artículo??')) {
      this.articleService.updateArticle(slug, this.articleForm.value).subscribe( res => {
        this.router.navigate(['private/articles']);
      });
    }
  }

}
