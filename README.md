# Blog / CMS Application

## Project Overview

A small WordPress-style Blog / Content Management System (CMS) built as an internship mini project.

The application demonstrates the basic CMS workflow:

Create → Manage → Organize → Publish → View

The project is designed to understand the basic concepts of content management without reproducing WordPress itself.

---

## Features

### Create Post
- Create a new post
- Add title
- Add content/body
- Select category
- Add tags
- Save as Draft or Published

### Manage Posts
- View all posts
- View an individual post
- Edit posts
- Delete posts
- Confirmation before deleting

### Organization
- Search posts
- Filter posts by category
- Filter posts by status
- Use search and filters together

### Storage
- Posts are stored using browser localStorage
- Posts remain available after refreshing the browser

### Responsive Design
- Desktop-friendly interface
- Mobile-friendly responsive layout

---

## Technologies Used

- HTML
- CSS
- Vanilla JavaScript
- Browser localStorage

No backend or database is required.

---

## Project Structure

```text
blog-cms/
│
├── PROJECT-SPECIFICATION.md
├── README.md
├── index.html
├── create.html
├── post.html
├── edit.html
│
├── css/
│   └── style.css
│
└── js/
    └── script.js