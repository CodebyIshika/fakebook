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
const closeModalButton = select('#closeModal');


const monthNames = [
                     'January', 'February', 'March', 'April', 
                     'May', 'June', 'July', 'August', 'September', 
                     'October', 'November', 'December'
];

const user = new User(2573, 'Ishika', 'ishika15', 'ishika@email.com');

const subscriberData = {
    id: user.id,
    name: user.name,
    userName: user.userName,
    email: user.email,
    pages: ['Travel', 'Cooking'],
    groups: ['Techies', 'Readers'],
    canMonetize: true
};

const subscriber = new Subscriber(subscriberData);

                 
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


// Validate post button based on textarea and image input
function validatePostButton() {
    const isTextareaEmpty = textarea.value.trim() === '';
    const isImageSelected = inputImage.files.length > 0;

    postButton.disabled = isTextareaEmpty && isImageSelected;

}

// Handle textarea input
function handleTextAreaInput() {
    validatePostButton();
}

// Handle post button click
function handlePost(event) {
    event.preventDefault(); // Prevent the form from submitting and page reloading

    const postText = textarea.value.trim();
    const imageSelection = inputImage.files.length > 0;


    if ((postText !== '' || imageSelection)&& !postButton.disabled)  {
        displayPost();
        resetForm();
    }
}

// Display the post section with user's information
function displayPost() {
    const postText = textarea.value.trim();
    const postImageFile = inputImage.files[0];

    const newPost = document.createElement('section');
    newPost.classList.add('post');
    newPost.innerHTML = `
        <div class="post-header">
            <div class="user-profile">
            <div class="user-image">
                <img src="./assets/images/clouds.jpg" alt="">
            </div>
            <p class="user-name">${subscriber.name}</p>
            </div>
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
    const day = currentDate.getDate();
    const month = monthNames[currentDate.getMonth()].slice(0, 3);
    const year = currentDate.getFullYear();
    
    return `${month} ${day}, ${year}`;
}

// Update post content
function getPostImageText(postImageFile) {
    return postImageFile ? `<img src="${URL.createObjectURL(postImageFile)}" alt="Posted Image" class="post-image">` : '';
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

function closeModal() {
    modal.style.display = 'none';
}


// Event listeners
onEvent('load', window, function () {
    inputImage.value = '';
    textarea.value = '';
});

onEvent('change', inputImage, displayImageName);
onEvent('input', textarea, handleTextAreaInput);
onEvent('click', postButton, handlePost);

onEvent('click', profileInfo, function() {
    displayUserInfo(subscriber);
});

onEvent('click', closeModalButton, closeModal);

// Close the modal when clicking outside the modal content
onEvent('click', window, function(event) {
    if (event.target === modal) {
        closeModal();
    }
});