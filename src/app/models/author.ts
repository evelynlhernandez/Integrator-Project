export class Author {
  id?: number;
  username?: string;
  bio?: string;
  image?: string;
  following?: boolean;

  constructor(author) {
    if (author.id) { this.id = author.id; }
    if (author.username) { this.username = author.username; }
    if (author.bio) { this.bio = author.bio; }
    if (author.image) { this.image = author.image; }
    if (author.following) { this.following = author.following; }
  }
}
