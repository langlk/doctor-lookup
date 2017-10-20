import { DoctorLookup } from './../js/doctor-lookup.js';

function formatKey(key) {
  let key_words = key.split("_");
  key_words = key_words.map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return key_words.join(" ");
}

function formatPhone(phoneNumber) {
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

// Responsible for displaying the information for each Doctor Search result item.
function displayDoctor(result) {
  console.log(result);
  // Make div for result, add first & last name as header
  $('#results').append(`<div id='${result.npi}'></div>`);
  let titleString = result.profile.title ? ", " + result.profile.title : "";
  $(`#${result.npi}`).append(`<h2>${result.profile.first_name} ${result.profile.last_name}${titleString}</h2>`);

  // Display information about each of doctor's practice
  $(`#${result.npi}`).append(`<h3>Practices</h3><ul></ul>`);
  result.practices.forEach(function(practice) {
    $(`#${result.npi} ul`).append(`<li><h4>${practice.name}</h4></li>`);
    let accepting = practice.accepts_new_patients ? "" : "Not";
    $(`#${result.npi} ul li`).last().append(`<h5 class="${accepting}accepting">${accepting} Accepting New Patients</h5>`);

    let street2 = practice.visit_address.street2 ? practice.visit_address.street2 : "";
    $(`#${result.npi} ul li`).last().append(`<h5>Address:</h5>
      <div class="address">
        <p>${practice.visit_address.street}</p>
        <p>${street2}</p>
        <p>${practice.visit_address.city}, ${practice.visit_address.state} ${practice.visit_address.zip}</p>
      </div>`);

    $(`#${result.npi} ul li`).last().append(`<h5>Phones:</h5><div class="phone"></div>`);
    practice.phones.forEach(function(phone) {
      $(`#${result.npi} .phone`).last().append(`<p><strong>${formatKey(phone.type)}:</strong> ${formatPhone(phone.number)}</p>`);
    });

    $(`#${result.npi} ul li`).last().append(`<h5>Website:</h5><div class="website"></div>`);
    if (practice.website) {
      $(`#${result.npi} .website`).last().append(`<p><a href="${practice.website}">${practice.website}</a></p>`);
    } else {
      $(`#${result.npi} .website`).last().append("<p class='no-site'>Not Provided</p>");
    }
  });
}

function displayResults(results) {
  if (results.data.length > 0) {
    let plural = (results.data.length > 1) ? "s" : "";
    $('#results').append(`<h1>${results.data.length} Doctor${plural} Found:<h1>`);
    results.data.forEach(function(result) {
      displayDoctor(result);
    });
  } else {
    $('#results').append(`<h1>No Doctors Found</h1>`);
  }
}

function displayError(error) {
  $('#results').append(`<h1>Something Went Wrong!<h1>`);
  $('#results').append(`<h3>Error: ${error.message}<h3>`);
}

$(document).ready(function() {
  let doctorLookup = new DoctorLookup();
  $('#doctor-search').submit(function(event) {
    event.preventDefault();
    $('#results').html("");

    let searchType = $('#search-type').val();
    let searchTerm = $('#search-term').val();
    // if (searchType === "name") {
      let searchPromise = doctorLookup.search(searchType, searchTerm);
      searchPromise.then(function(response) {
        let results = JSON.parse(response);
        displayResults(results);
      })
      .catch(function(error) {
        displayError(error);
      });
    // }
  });
});
