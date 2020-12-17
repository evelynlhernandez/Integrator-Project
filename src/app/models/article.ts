import { Author } from './author';

export class Article {
  id?: number;
  slug?: string;
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
  createdAt?: string;
  updatedAt?: string;
  favorited?: boolean;
  favoritesCount?: number;
  author?: Author;

  constructor(article) {
    if (article.id) { this.id = article.id; }
    if (article.slug) { this.slug = article.slug; }
    if (article.title) { this.title = article.title; }
    if (article.description) { this.description = article.description; }
    if (article.body) { this.body = article.body; }
    if (article.tagList) { this.tagList = article.tagList; }
    if (article.createdAt) { this.createdAt = article.createdAt; }
    if (article.favorited) { this.favorited = article.favorited; }
    if (article.favoritesCount) { this.favoritesCount = article.favoritesCount; }
    if (article.author) { this.author = new Author(article.author); }
  }
}
