import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from '../article-list/article-list.component';
import { ArticleAddComponent } from '../article-add/article-add.component';
import { ArticleEditComponent } from '../article-edit/article-edit.component';
import { PrivateAppComponent } from './private-app.component';
import { AuthGuard } from '../services/auth-guard.componet';
import { ArticleCommentComponent } from '../article-comment/article-comment.component';

const routes: Routes = [
  {
    path: 'private',
    component: PrivateAppComponent,
    canActivate: [AuthGuard] ,
    children: [
      {
        path: '',
        component: ArticleListComponent
      },
      {
        path: 'articles',
        component: ArticleListComponent
      },
      {
        path: 'new-article',
        component: ArticleAddComponent
      },
      {
        path: 'edit-article/:slug',
        component: ArticleEditComponent
      },
      {
        path: 'comment-article/:slug',
        component: ArticleCommentComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PrivateAppRoutingModule { }
