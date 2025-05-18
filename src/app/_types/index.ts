import { Post, PostCategory, Category } from "@prisma/client";

export type PostWithCategory = Post &{
  postCategories: PostCategoryInCategory[]
}

type PostCategoryInCategory = PostCategory & {
  category: Category
}