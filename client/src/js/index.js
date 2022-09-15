// js files
import { initdb, getDb, postDb } from './database';
import { fetchCards } from "./cards";
import { toggleForm, clearForm } from "./form";
import { deleteDB } from 'idb';

// Import CSS files
import "../css/index.css";

import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

window.addEventListener('load', function () {
    initdb();
    fetchCards();

    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
  });

    // Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
  toggleForm()
 })

form.addEventListener('submit', event => {
  // Handle data
  event.preventDefault();
let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let email = document.getElementById("email").value;
let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
if (submitBtnToUpdate == false) {
  postDb(name, email, phone, profile);
} else {

  fetchCards();
    // Toggles the submit button back to POST functionality
  submitBtnToUpdate = false;
}

window.editCard = (e) => {
  // Grabs the id from the button element attached to the contact card and sets a global variable that will be used in the form element.
  profileId = parseInt(e.dataset.id);

  // Grabs information to pre-populate edit form
  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;

  document.getElementById("name").value = editName;
  document.getElementById("email").value = editEmail;
  document.getElementById("phone").value = editPhone;

  form.style.display = "block";

  // Toggles the Submit button so that it now Updates an existing contact instead of posting a new one
    submitBtnToUpdate = true;
};

deleteCard = (e) => {
  // Delete the card
  deleteDB();
  // Reload the DOM
  fetchCards();
};

// Clear form
clearForm();
// Toggle form
toggleForm();
// Reload the DOM
fetchCards();
});