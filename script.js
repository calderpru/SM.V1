const searchInput = document.getElementById('search-bar');
const postsContainer = document.getElementById('posts-container');
const createPostButton = document.getElementById('create-post-button');

let posts = [];

createPostButton.addEventListener('click', () => {
    window.open('create-post.html', '_blank', 'width=600,height=400');
});

window.addEventListener('message', (e) => {
    if (e.data.type === 'postCreated') {
        posts.push(e.data.post);
        displayPosts(posts);
    }
});

searchInput.addEventListener('input', () => {
    const filteredPosts = posts.filter(post => {
        const searchTerm = searchInput.value.toLowerCase();
        return post.gameName.toLowerCase().includes(searchTerm) ||
            post.postTitle.toLowerCase().includes(searchTerm) ||
            post.postDescription.toLowerCase().includes(searchTerm);
    });
    displayPosts(filteredPosts);
});

function displayPosts(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.postTitle}</h2>
            <p>Game/Software Name: ${post.gameName}</p>
            <p>${post.postDescription}</p>
            ${post.postImage ? `<img class="post-image" src="${URL.createObjectURL(post.postImage)}">` : ''}
            <p>Date Posted: ${post.datePosted.toLocaleString()}</p>
            <div class="post-actions">
                <button class="like-button" data-post-id="${posts.indexOf(post)}">Like</button>
                <button class="dislike-button" data-post-id="${posts.indexOf(post)}">Dislike</button>
                <button class="save-button" data-post-id="${posts.indexOf(post)}">Save</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });

    // Add event listeners for the like, dislike, and save buttons
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.dataset.postId;
            posts[postId].likes++;
            displayPosts(posts);
        });
    });

    const dislikeButtons = document.querySelectorAll('.dislike-button');
    dislikeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.dataset.postId;
            posts[postId].dislikes++;
            displayPosts(posts);
        });
    });

    const saveButtons = document.querySelectorAll('.save-button');
    saveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.dataset.postId;
            posts[postId].saved = true;
            displayPosts(posts);
        });
    });

    // Resize images to fit the post container
    const postImages = document.querySelectorAll('.post-image');
    postImages.forEach(image => {
        image.addEventListener('load', () => {
            const containerWidth = image.parentElement.clientWidth;
            const containerHeight = image.parentElement.clientHeight;
            const imageWidth = image.naturalWidth;
            const imageHeight = image.naturalHeight;
            if (imageWidth > containerWidth || imageHeight > containerHeight) {
                const widthRatio = containerWidth / imageWidth;
                const heightRatio = containerHeight / imageHeight;
                const scaleRatio = Math.min(widthRatio, heightRatio);
                image.style.width = `${imageWidth * scaleRatio}px`;
                image.style.height = `${imageHeight * scaleRatio}px`;
            }
        });
    });
}