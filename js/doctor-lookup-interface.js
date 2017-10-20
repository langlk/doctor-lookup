import { DoctorLookup } from './../js/doctor-lookup.js';

// Responsible for displaying the information for each Doctor Search result item.
function displayDoctor(result) {
  console.log(result);
  // Make div for result, add first & last name as header
  $('#results').append(`<div id='${result.npi}'></div>`);
  $(`#${result.npi}`).append(`<h2>${result.profile.first_name} ${result.profile.last_name}, ${result.profile.title}</h2>`);

  // Display information about each of doctor's practice
  $(`#${result.npi}`).append(`<h3>Practices</h3><ul></ul>`);
  result.practices.forEach(function(practice) {
    $(`#${result.npi} ul`).append(`<li><h4>${practice.name}</h4></li>`);
    let accepting = practice.accepts_new_patients ? "" : "Not";
    $(`#${result.npi} ul li`).last().append(`<h5 class="${accepting}accepting">${accepting} Accepting New Patients</h5>`);

    $(`#${result.npi} ul li`).last().append(`<h5>Address:</h5>
      <div class="address">
        <p>${practice.visit_address.street}</p>
        <p>${practice.visit_address.street2}</p>
        <p>${practice.visit_address.city}, ${practice.visit_address.state} ${practice.visit_address.zip}</p>
      </div>`);

    $(`#${result.npi} ul li`).last().append(`<h5>Phones:</h5>`);
    practice.phones.forEach(function(phone) {
      $(`#${result.npi} ul li`).last().append(`<p class="phone"><strong>${phone.type}:</strong> ${phone.number}</p>`);
    });

    $(`#${result.npi} ul li`).last().append(`<h5>Website:</h5>`);
    if (practice.website) {
      $(`#${result.npi} ul li`).last().append(`<p><a href="${practice.website}">${practice.website}</a></p>`);
    } else {
      $(`#${result.npi} ul li`).last().append("<p class='no-site'>Not Provided</p>");
    }
  });
}

function displayResults(results) {
  results.data.forEach(function(result) {
    displayDoctor(result);
  });
}

function displayError(error) {
  console.log(error);
}

$(document).ready(function() {
  let doctorLookup = new DoctorLookup();
  $('#doctor-search').submit(function(event) {
    event.preventDefault();
    let searchType = $('#search-type').val();
    let searchTerm = $('#search-term').val();
    if (searchType === "name") {
      let searchPromise = doctorLookup.searchName(searchTerm);
      searchPromise.then(function(response) {
        let results = JSON.parse(response);
        displayResults(results);
      })
      .catch(function(error) {
        displayError(error);
      });
    }
  });
});
