import { DoctorLookup } from './../js/doctor-lookup.js';

function displayResults(results) {
  console.log(results);
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
