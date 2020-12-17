import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../services/article-services.component';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetArticleForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  articleForm: FormGroup;
  tagListArray = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      body: ['', [Validators.required]],
      tagList: [[''], [Validators.required]],
    });
  }

  submitArticleForm() {
    if (this.articleForm.valid) {

      if (this.articleForm.controls.tagList) {
        this.articleForm.controls.tagList.patchValue(this.tagListArray);
      }
      const req = {
        article: this.articleForm.value
      };

      this.articleService.addArticle(req).subscribe(res => {
        this.router.navigate(['private/articles']);
      });
    }
  }

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

  public handleError = (controlName: string, errorName: string) => {
    return this.articleForm.controls[controlName].hasError(errorName);
  }

}
