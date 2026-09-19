/* =========================================
   BLOG CMS - MAIN JAVASCRIPT
========================================= */

const STORAGE_KEY = "blogPosts";


/* =========================================
   LOCAL STORAGE FUNCTIONS
========================================= */

// Get all posts from localStorage
function getPosts() {
    const storedPosts = localStorage.getItem(STORAGE_KEY);

    if (!storedPosts) {
        return [];
    }

    try {
        return JSON.parse(storedPosts);
    } catch (error) {
        console.error("Could not read posts:", error);
        return [];
    }
}


// Save posts to localStorage
function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}


/* =========================================
   HELPER FUNCTIONS
========================================= */

// Generate a simple unique ID
function generateId() {
    return Date.now().toString() + Math.random().toString(16).slice(2);
}


// Convert date to readable format
function formatDate(dateString) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "Unknown date";
    }

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}


// Escape user-generated text before displaying it as HTML
function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// Get post ID from URL
function getPostId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}


// Convert tags array to readable text
function tagsToText(tags) {
    if (!Array.isArray(tags)) {
        return "";
    }

    return tags.join(", ");
}


// Convert tags input into an array
function parseTags(tagsText) {
    return tagsText
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
}


// Create a short excerpt
function createExcerpt(content, maxLength = 180) {
    if (content.length <= maxLength) {
        return content;
    }

    return content.substring(0, maxLength) + "...";
}


/* =========================================
   INDEX PAGE
========================================= */

function initializeIndexPage() {

    const postsContainer = document.getElementById("postsContainer");

    if (!postsContainer) {
        return;
    }

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const statusFilter = document.getElementById("statusFilter");

    populateCategoryFilter();

    renderPosts();


    // Search and filters use the same render function
    searchInput.addEventListener("input", renderPosts);

    categoryFilter.addEventListener("change", renderPosts);

    statusFilter.addEventListener("change", renderPosts);


    // Rebuild the category list from saved posts
    function populateCategoryFilter() {

        const posts = getPosts();

        const categories = [
            ...new Set(
                posts
                    .map(post => post.category)
                    .filter(category => category)
            )
        ];

        categories.sort((a, b) =>
            a.localeCompare(b)
        );

        categoryFilter.innerHTML =
            '<option value="all">All Categories</option>';

        categories.forEach(category => {

            const option = document.createElement("option");

            option.value = category;
            option.textContent = category;

            categoryFilter.appendChild(option);
        });
    }


    function renderPosts() {

        const posts = getPosts();

        const searchTerm =
            searchInput.value.trim().toLowerCase();

        const selectedCategory =
            categoryFilter.value;

        const selectedStatus =
            statusFilter.value;


        const filteredPosts = posts.filter(post => {

            const searchableText = [
                post.title,
                post.content,
                post.category,
                ...(post.tags || [])
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                searchableText.includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                post.category === selectedCategory;

            const matchesStatus =
                selectedStatus === "all" ||
                post.status === selectedStatus;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );
        });


        // Newest posts first
        filteredPosts.sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        );


        if (filteredPosts.length === 0) {

            if (posts.length === 0) {

                postsContainer.innerHTML = `
                    <div class="empty-state">

                        <h2>No posts yet</h2>

                        <p>
                            Create your first blog post to get started.
                        </p>

                        <a
                            href="create.html"
                            class="primary-button"
                        >
                            + Create New Post
                        </a>

                    </div>
                `;

            } else {

                postsContainer.innerHTML = `
                    <div class="empty-state">

                        <h2>No matching posts</h2>

                        <p>
                            Try changing your search or filters.
                        </p>

                    </div>
                `;
            }

            return;
        }


        postsContainer.innerHTML =
            filteredPosts
                .map(post => createPostCard(post))
                .join("");
    }


    function createPostCard(post) {

        const statusClass =
            post.status === "published"
                ? "badge-published"
                : "badge-draft";

        const statusText =
            post.status === "published"
                ? "Published"
                : "Draft";


        return `
            <article class="post-card">

                <div class="post-card-header">

                    <div>

                        <div class="post-title">
                            ${escapeHTML(post.title)}
                        </div>

                        <div class="post-meta">

                            <span class="badge category-badge">
                                ${escapeHTML(post.category)}
                            </span>

                            <span class="badge ${statusClass}">
                                ${statusText}
                            </span>

                            <span>
                                ${formatDate(post.createdAt)}
                            </span>

                        </div>

                    </div>

                </div>

                <p class="post-excerpt">
                    ${escapeHTML(
                        createExcerpt(post.content)
                    )}
                </p>

                ${
                    post.tags && post.tags.length
                    ? `
                        <div class="post-meta">
                            <strong>Tags:</strong>
                            ${post.tags
                                .map(tag =>
                                    `<span>${escapeHTML(tag)}</span>`
                                )
                                .join(" · ")
                            }
                        </div>
                    `
                    : ""
                }

                <div class="post-actions">

                    <a
                        href="post.html?id=${encodeURIComponent(post.id)}"
                        class="action-button view-button"
                    >
                        View
                    </a>

                    <a
                        href="edit.html?id=${encodeURIComponent(post.id)}"
                        class="action-button edit-button"
                    >
                        Edit
                    </a>

                    <button
                        type="button"
                        class="action-button delete-button"
                        data-delete-id="${escapeHTML(post.id)}"
                    >
                        Delete
                    </button>

                </div>

            </article>
        `;
    }


    // Event delegation for Delete buttons
    postsContainer.addEventListener("click", function(event) {

        const deleteButton =
            event.target.closest("[data-delete-id]");

        if (!deleteButton) {
            return;
        }

        const postId =
            deleteButton.dataset.deleteId;

        deletePost(postId);
    });


    function deletePost(postId) {

        const posts = getPosts();

        const post =
            posts.find(item => item.id === postId);

        if (!post) {
            return;
        }


        const confirmed = confirm(
            `Are you sure you want to delete "${post.title}"?`
        );


        if (!confirmed) {
            return;
        }


        const updatedPosts =
            posts.filter(item => item.id !== postId);

        savePosts(updatedPosts);

        populateCategoryFilter();

        renderPosts();
    }
}


/* =========================================
   CREATE PAGE
========================================= */

function initializeCreatePage() {

    const form =
        document.getElementById("postForm");

    if (!form) {
        return;
    }


    const content =
        document.getElementById("content");

    const counter =
        document.getElementById("contentCounter");

    const message =
        document.getElementById("formMessage");


    content.addEventListener("input", function() {

        updateCounter(
            content.value,
            counter
        );

    });


    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const title =
            document.getElementById("title")
                .value
                .trim();

        const contentValue =
            document.getElementById("content")
                .value
                .trim();

        const category =
            document.getElementById("category")
                .value
                .trim();

        const tagsText =
            document.getElementById("tags")
                .value;

        const status =
            document.getElementById("status")
                .value;


        if (!title || !contentValue || !category) {

            showMessage(
                message,
                "Please fill in all required fields.",
                "error"
            );

            return;
        }


        if (
            status !== "draft" &&
            status !== "published"
        ) {

            showMessage(
                message,
                "Please select a valid post status.",
                "error"
            );

            return;
        }


        const newPost = {

            id: generateId(),

            title: title,

            content: contentValue,

            category: category,

            tags: parseTags(tagsText),

            status: status,

            createdAt: new Date().toISOString()
        };


        const posts = getPosts();

        posts.push(newPost);

        savePosts(posts);


        showMessage(
            message,
            "Post saved successfully. Redirecting...",
            "success"
        );


        setTimeout(function() {

            window.location.href = "index.html";

        }, 700);
    });
}


/* =========================================
   VIEW SINGLE POST
========================================= */

function initializePostPage() {

    const container =
        document.getElementById(
            "singlePostContainer"
        );

    if (!container) {
        return;
    }


    const postId = getPostId();

    const posts = getPosts();

    const post =
        posts.find(item => item.id === postId);


    if (!post) {

        container.innerHTML = `
            <div class="empty-state">

                <h2>Post not found</h2>

                <p>
                    The requested post could not be found.
                </p>

                <a
                    href="index.html"
                    class="primary-button"
                >
                    Back to Posts
                </a>

            </div>
        `;

        return;
    }


    const statusClass =
        post.status === "published"
            ? "badge-published"
            : "badge-draft";

    const statusText =
        post.status === "published"
            ? "Published"
            : "Draft";


    document.title =
        `${post.title} - Blog CMS`;


    container.innerHTML = `

        <article class="single-post">

            <p class="eyebrow">
                BLOG POST
            </p>

            <h1>
                ${escapeHTML(post.title)}
            </h1>

            <div class="single-post-meta">

                <span class="badge category-badge">
                    ${escapeHTML(post.category)}
                </span>

                <span class="badge ${statusClass}">
                    ${statusText}
                </span>

                <span>
                    ${formatDate(post.createdAt)}
                </span>

            </div>

            ${
                post.tags && post.tags.length
                ? `
                    <div class="post-meta">
                        <strong>Tags:</strong>

                        ${post.tags
                            .map(tag =>
                                `<span>${escapeHTML(tag)}</span>`
                            )
                            .join(" · ")
                        }
                    </div>
                `
                : ""
            }

            <div class="single-post-content">
                ${escapeHTML(post.content)}
            </div>

            <div class="single-post-actions">

                <a
                    href="edit.html?id=${encodeURIComponent(post.id)}"
                    class="primary-button"
                >
                    Edit Post
                </a>

                <a
                    href="index.html"
                    class="secondary-button"
                >
                    Back to Posts
                </a>

            </div>

        </article>
    `;
}


/* =========================================
   EDIT PAGE
========================================= */

function initializeEditPage() {

    const form =
        document.getElementById("editPostForm");

    if (!form) {
        return;
    }


    const postId = getPostId();

    const posts = getPosts();

    const post =
        posts.find(item => item.id === postId);


    if (!post) {

        form.innerHTML = `
            <div class="empty-state">

                <h2>Post not found</h2>

                <p>
                    The post you are trying to edit does not exist.
                </p>

                <a
                    href="index.html"
                    class="primary-button"
                >
                    Back to Posts
                </a>

            </div>
        `;

        return;
    }


    const title =
        document.getElementById("editTitle");

    const content =
        document.getElementById("editContent");

    const category =
        document.getElementById("editCategory");

    const tags =
        document.getElementById("editTags");

    const status =
        document.getElementById("editStatus");

    const counter =
        document.getElementById(
            "editContentCounter"
        );

    const message =
        document.getElementById(
            "editFormMessage"
        );


    // Fill form with existing post data
    title.value = post.title;

    content.value = post.content;

    category.value = post.category;

    tags.value = tagsToText(post.tags);

    status.value = post.status;


    updateCounter(
        content.value,
        counter
    );


    content.addEventListener("input", function() {

        updateCounter(
            content.value,
            counter
        );

    });


    form.addEventListener("submit", function(event) {

        event.preventDefault();


        const updatedTitle =
            title.value.trim();

        const updatedContent =
            content.value.trim();

        const updatedCategory =
            category.value.trim();

        const updatedTags =
            parseTags(tags.value);

        const updatedStatus =
            status.value;


        if (
            !updatedTitle ||
            !updatedContent ||
            !updatedCategory
        ) {

            showMessage(
                message,
                "Please fill in all required fields.",
                "error"
            );

            return;
        }


        if (
            updatedStatus !== "draft" &&
            updatedStatus !== "published"
        ) {

            showMessage(
                message,
                "Please select a valid status.",
                "error"
            );

            return;
        }


        post.title =
            updatedTitle;

        post.content =
            updatedContent;

        post.category =
            updatedCategory;

        post.tags =
            updatedTags;

        post.status =
            updatedStatus;


        savePosts(posts);


        showMessage(
            message,
            "Post updated successfully. Redirecting...",
            "success"
        );


        setTimeout(function() {

            window.location.href = "index.html";

        }, 700);
    });
}


/* =========================================
   COUNTER
========================================= */

function updateCounter(text, counterElement) {

    if (!counterElement) {
        return;
    }


    const characters =
        text.length;


    const words =
        text.trim()
            ? text.trim().split(/\s+/).length
            : 0;


    counterElement.textContent =
        `${words} words · ${characters} characters`;
}


/* =========================================
   FORM MESSAGE
========================================= */

function showMessage(
    element,
    text,
    type
) {

    if (!element) {
        return;
    }

    element.textContent = text;

    element.className =
        `form-message ${type}`;
}


/* =========================================
   INITIALIZE CORRECT PAGE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeIndexPage();

        initializeCreatePage();

        initializePostPage();

        initializeEditPage();

    }
);