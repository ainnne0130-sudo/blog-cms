# Blog / CMS Application - Project Specification

## 1. Project Objective

The objective is to build a small WordPress-style Blog / Content Management System (CMS).

The application will demonstrate the basic CMS workflow:

Create → Manage → Organize → Publish → View

The application is not intended to reproduce WordPress. It will focus on the core concepts of content management.

---

## 2. Core Features

### Create Post

Users should be able to create a post with:

- Title
- Content / Body
- Category
- Tags
- Draft or Published status

### Manage Posts

Users should be able to:

- View a list of posts
- View an individual post
- Edit an existing post
- Delete a post

### Organize Posts

Users should be able to:

- Search posts by keyword
- Filter posts by category
- Filter posts by status

### Publishing

A post can have one of two statuses:

- Draft
- Published

Draft posts should remain unpublished.

Published posts should be available for viewing.

---

## 3. Application Screens

The application will contain the following main screens:

### Dashboard / Posts Page

This page will display:

- All posts
- Search bar
- Category filter
- Status filter
- Create New Post button
- View button
- Edit button
- Delete button

### Create Post Page

This page will contain:

- Title input
- Content textarea
- Category input/select
- Tags input
- Status selector
- Save Post button

### View Post Page

This page will display:

- Post title
- Post content
- Category
- Tags
- Publication status
- Post date

### Edit Post Page

This page will allow users to:

- Modify title
- Modify content
- Modify category
- Modify tags
- Change draft/published status
- Save changes

---

## 4. Post Data Structure

Each post will contain:

- id
- title
- content
- category
- tags
- status
- createdAt

Example:

{
  "id": 1,
  "title": "AI in Modern Industry",
  "content": "Artificial Intelligence is transforming modern industries.",
  "category": "AI",
  "tags": ["AI", "Industry", "Technology"],
  "status": "published",
  "createdAt": "2026-09-18"
}

---

## 5. User Flow

### Create Post

Dashboard
→ Create New Post
→ Fill Post Form
→ Save Post
→ Post appears in Posts List

### Edit Post

Posts List
→ Edit
→ Modify Post
→ Save Changes
→ Updated Post appears in Posts List

### Delete Post

Posts List
→ Delete
→ Confirm Delete
→ Post is removed

### View Post

Posts List
→ View
→ Individual Post Page

### Search

Posts List
→ Enter keyword
→ Matching posts are displayed

### Filter

Posts List
→ Select category or status
→ Matching posts are displayed

---

## 6. Storage

The application will use browser localStorage for storing posts.

No external database is required for the initial version.

Posts should remain available after refreshing the browser.

---

## 7. Technology

The initial application will use:

- HTML
- CSS
- JavaScript
- Browser localStorage

The application should be responsive and usable on desktop and mobile screens.

---

## 8. Basic UI Requirements

The interface should be:

- Clean
- Simple
- Easy to navigate
- Responsive
- Beginner-friendly
- Consistent across pages

The dashboard should clearly show available actions such as:

- Create
- View
- Edit
- Delete
- Search
- Filter

---

## 9. Optional Features

If the core requirements are completed successfully, the following features may be added:

- Featured image
- Character / word count
- SEO title
- Meta description
- SEO checklist
- Preview before publishing

Optional features should only be implemented after the required features are working correctly.

---

## 10. Testing Requirements

The following functionality must be tested:

- Create a new post
- Save a draft
- Publish a post
- View a post
- Edit a post
- Delete a post
- Search for a post
- Filter by category
- Filter by status
- Refresh the browser and confirm saved posts remain available
- Test the application on different screen sizes

---

## 11. Development Workflow

The project will follow this workflow:

Requirements
→ Plan
→ Specification
→ Prompt AI
→ Build
→ Test
→ Debug
→ Improve

The AI will be used as a development assistant, while the implementation will be reviewed and tested manually.# Blog / CMS Application - Project Specification

## 1. Project Objective

The objective is to build a small WordPress-style Blog / Content Management System (CMS).

The application will demonstrate the basic CMS workflow:

Create → Manage → Organize → Publish → View

The application is not intended to reproduce WordPress. It will focus on the core concepts of content management.

---

## 2. Core Features

### Create Post

Users should be able to create a post with:

- Title
- Content / Body
- Category
- Tags
- Draft or Published status

### Manage Posts

Users should be able to:

- View a list of posts
- View an individual post
- Edit an existing post
- Delete a post

### Organize Posts

Users should be able to:

- Search posts by keyword
- Filter posts by category
- Filter posts by status

### Publishing

A post can have one of two statuses:

- Draft
- Published

Draft posts should remain unpublished.

Published posts should be available for viewing.

---

## 3. Application Screens

The application will contain the following main screens:

### Dashboard / Posts Page

This page will display:

- All posts
- Search bar
- Category filter
- Status filter
- Create New Post button
- View button
- Edit button
- Delete button

### Create Post Page

This page will contain:

- Title input
- Content textarea
- Category input/select
- Tags input
- Status selector
- Save Post button

### View Post Page

This page will display:

- Post title
- Post content
- Category
- Tags
- Publication status
- Post date

### Edit Post Page

This page will allow users to:

- Modify title
- Modify content
- Modify category
- Modify tags
- Change draft/published status
- Save changes

---

## 4. Post Data Structure

Each post will contain:

- id
- title
- content
- category
- tags
- status
- createdAt

Example:

{
  "id": 1,
  "title": "AI in Modern Industry",
  "content": "Artificial Intelligence is transforming modern industries.",
  "category": "AI",
  "tags": ["AI", "Industry", "Technology"],
  "status": "published",
  "createdAt": "2026-09-18"
}

---

## 5. User Flow

### Create Post

Dashboard
→ Create New Post
→ Fill Post Form
→ Save Post
→ Post appears in Posts List

### Edit Post

Posts List
→ Edit
→ Modify Post
→ Save Changes
→ Updated Post appears in Posts List

### Delete Post

Posts List
→ Delete
→ Confirm Delete
→ Post is removed

### View Post

Posts List
→ View
→ Individual Post Page

### Search

Posts List
→ Enter keyword
→ Matching posts are displayed

### Filter

Posts List
→ Select category or status
→ Matching posts are displayed

---

## 6. Storage

The application will use browser localStorage for storing posts.

No external database is required for the initial version.

Posts should remain available after refreshing the browser.

---

## 7. Technology

The initial application will use:

- HTML
- CSS
- JavaScript
- Browser localStorage

The application should be responsive and usable on desktop and mobile screens.

---

## 8. Basic UI Requirements

The interface should be:

- Clean
- Simple
- Easy to navigate
- Responsive
- Beginner-friendly
- Consistent across pages

The dashboard should clearly show available actions such as:

- Create
- View
- Edit
- Delete
- Search
- Filter

---

## 9. Optional Features

If the core requirements are completed successfully, the following features may be added:

- Featured image
- Character / word count
- SEO title
- Meta description
- SEO checklist
- Preview before publishing

Optional features should only be implemented after the required features are working correctly.

---

## 10. Testing Requirements

The following functionality must be tested:

- Create a new post
- Save a draft
- Publish a post
- View a post
- Edit a post
- Delete a post
- Search for a post
- Filter by category
- Filter by status
- Refresh the browser and confirm saved posts remain available
- Test the application on different screen sizes

---

## 11. Development Workflow

The project will follow this workflow:

Requirements
→ Plan
→ Specification
→ Prompt AI
→ Build
→ Test
→ Debug
→ Improve

The AI will be used as a development assistant, while the implementation will be reviewed and tested manually.