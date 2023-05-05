const gameButton = document.getElementById('game-button');
const softwareButton = document.getElementById('software-button');
const searchContainer = document.getElementById('search-container');
const searchSelect = document.getElementById('search-select');
const searchInput = document.getElementById('search-input');
const postTitleInput = document.getElementById('post-title');
const postDescriptionInput = document.getElementById('post-description');
const postImageInput = document.getElementById('post-image');
const postForm = document.getElementById('post-form');

let postType = 'Game';
let searchList = ['Fortnite', 'Apex', 'Rust'];

gameButton.addEventListener('click', () => {
    postType = 'Game';
    searchList = ['Fortnite', 'Apex', 'Rust'];
    gameButton.classList.add('selected');
    softwareButton.classList.remove('selected');
    updateSearchSelect();
});

softwareButton.addEventListener('click', () => {
    postType = 'Software';
    searchList = ['Blender', 'Adobe', 'FinalCutPro', 'Unity'];
    softwareButton.classList.add('selected');
    gameButton.classList.remove('selected');
    updateSearchSelect();
});

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const options = searchSelect.options;
    for (let i = 0; i < options.length; i++) {
        const optionValue = options[i].value.toLowerCase();
        if (optionValue.includes(searchValue)) {
            options[i].style.display = '';
        } else {
            options[i].style.display = 'none';
        }
    }
});

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const gameName = searchSelect.value;
    const postTitle = postTitleInput.value;
    const postDescription = postDescriptionInput.value;
    const postImage = postImageInput.files[0];
    const datePosted = new Date();
    const post = {
        gameName,
        postTitle,
        postDescription,
        postImage,
        datePosted,
        postType,
        likes: 0,
        dislikes: 0,
        saved: false
    };
    window.opener.postMessage({ type: 'postCreated', post }, '*');
    window.close();
});

function updateSearchSelect() {
    searchSelect.innerHTML = '';
    searchList.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        searchSelect.appendChild(option);
    });
    searchInput.value = '';
}

updateSearchSelect();