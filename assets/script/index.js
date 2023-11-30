'use strict';

import { onEvent, select } from "./utils.js";
import { User, Subscriber } from "./Class.js";

// Selections
const inputImage = select('#image-input');
const imageNameSpan = select('.image-name');
const textarea = select('textarea');
const postButton = select('.button');
const postsContainer = select('.posts-container');
const modal = select('#user-info-modal');
const modalAppear = select('.header-image img');
const profileInfo = select('.user-profile');
const closeModal = select('.close');


// Display image name
function displayImageName() {
    const fileName = getFileName(inputImage.files);
    updateImageName(fileName);
}

// Get file name from the input file element
function getFileName(files) {
    return files.length > 0 ? files[0].name : '';
}

// Update the image name in the UI
function updateImageName(name) {
    imageNameSpan.textContent = name ? ` ${name}` : '';
}

// Handle textarea input
function handleTextAreaInput() {
    validatePostButton();
}

// Validate post button based on textarea and image input
function validatePostButton() {
    const isTextareaEmpty = textarea.value.trim() === '';
    const isImageSelected = inputImage.files.length > 0;
    postButton.disabled = isTextareaEmpty && isImageSelected;
}

// Handle post button click
function handlePost(event) {
    event.preventDefault(); // Prevent the form from submitting and page reloading

    if (!postButton.disabled) {
        // console.log('Posting...');
        displayPost();
        resetForm();
    }
}

// Display the post section with user's information
function displayPost() {
    const postText = textarea.value.trim();
    const postImageFile = inputImage.files[0];

    const user = new User(1, 'Ishika', 'ishika15', 'ishika@email.com');
    const subscriberData = {
        id: user.id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        pages: ['Page1', 'Page2'],
        groups: ['Group1', 'Group2'],
        canMonetize: true
    };

    const subscriber = new Subscriber(subscriberData);

    const newPost = document.createElement('section');
    newPost.classList.add('post');
    newPost.innerHTML = `
        <div class="post-header">
            <div class="post-image">
                <img src="./assets/images/clouds.jpg" alt="">
            </div>
            <p class="user-name">${subscriber.fullName}</p>
            <p class="date">${getPostDate()}</p>
        </div>
        <p class="post-content">${postText}<br>${getPostImageText(postImageFile)}</p>
    `;

    // Insert the new post at the beginning of the container
    postsContainer.insertBefore(newPost, postsContainer.firstChild);
}

// Update post date
function getPostDate() {
    const currentDate = new Date();
    return currentDate.toDateString(); // Format the date as needed
}

// Update post content
function getPostImageText(postImageFile) {
    return postImageFile ? `<img src="${URL.createObjectURL(postImageFile)}" alt="Posted Image" style="max-width: 100%;">` : '';
}

// Reset form after posting
function resetForm() {
    textarea.value = '';
    inputImage.value = '';
    updateImageName('');
    validatePostButton();
}

function displayUserInfo(user) {
    const userInfoContent = `
        <p>User Information:</p>
        <p>ID: ${user.id}</p>
        <p>Name: ${user.name}</p>
        <p>Username: ${user.userName}</p>
        <p>Email: ${user.email}</p>
        <p>Pages: ${user.pages.join(', ')}</p>
        <p>Groups: ${user.groups.join(', ')}</p>
        <p>Can Monetize: ${user.canMonetize ? 'Yes' : 'No'}</p>
    `;

    select('#user-info').innerHTML = userInfoContent;
    modal.style.display = 'block';
}

// Event listeners
window.addEventListener('load', function () {
    inputImage.value = '';
    textarea.value = '';
});

onEvent('change', inputImage, displayImageName);
onEvent('input', textarea, handleTextAreaInput);
onEvent('click', postButton, handlePost);

onEvent('click', profileInfo, function() {
    displayUserInfo(subscriber);
});

onEvent('click', modalAppear, function() {
    modal.style.display = 'block';
});

// Close the modal when the close button is clicked
onEvent('click', closeModal, function() {
    modal.style.display = 'none';
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});