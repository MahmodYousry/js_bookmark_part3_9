

var siteName  = document.getElementById('siteName');
var siteLink  = document.getElementById('siteLink');
var options   = document.getElementById('options');
var tbody     = document.getElementById('tbody');


var localArray = localStorage.getItem("siteList");

if (localArray) {
  var siteList = JSON.parse(localArray);
} else{ 
  var siteList = [];
}

displaySites(siteList);

function addSite() {

  // make new site using fields
  var newSite = {
    siteName : siteName.value,
    siteLink : siteLink.value,
  };

  // put the new values in the end of the array
  siteList.push(newSite);

  // store the new array after pushing new object inside it
  localStorage.setItem("siteList", JSON.stringify(siteList));

  // display the products inside the array
  displaySites(siteList);

  // resets all the fields
  resetFields();
}

function displaySites(list) {
  var cartona = '';

  if (list.length == 0) {
    tbody.innerHTML = "";
  } else {
    for (var i = 0; i < list.length; i++) {
      cartona += `
        <tr>
          <td class="align-middle">${ i + 1 }</td>
          <td class="text-capitalize align-middle">${ list[i].siteName }</td>
          <td class="align-middle"><a class="btn btn-info text-light" href="http://${list[i].siteLink}" target="_blank"><i class="fa fa-eye fa-fw me-2"></i>Visit</a></td>
          <td class="align-middle">
            <button onclick="editSite(${i})" class="btn btn-warning text-capitalize text-light"><i class="fa fa-edit fa-fw me-2"></i>Edit</button>
          </td>
          <td class="align-middle">
            <button onclick="deleteSite(${i})" class="btn btn-danger text-capitalize text-light"><i class="fa fa-trash fa-fw me-2"></i>delete</button>
          </td>
        </tr>
      `;
  
      tbody.innerHTML = cartona;
    }
    console.log(list)
  }  
}

function displaySearch(list) {
  var cartona = '';

  if (list.length == 0) {
    tbody.innerHTML = "";
  } else {
    for (var i = 0; i < list.length; i++) {
      cartona += `
        <tr>
          <td class="align-middle">${ i + 1 }</td>
          <td class="text-capitalize align-middle">${ list[i].newName ? list[i].newName : list[i].siteName }</td>
          <td class="align-middle"><a class="btn btn-info text-light" href="http://${list[i].siteLink}" target="_blank"><i class="fa fa-eye fa-fw me-2"></i>Visit</a></td>
          <td class="align-middle">
            <button onclick="editSite(${i})" class="btn btn-warning text-capitalize text-light"><i class="fa fa-edit fa-fw me-2"></i>Edit</button>
          </td>
          <td class="align-middle">
            <button onclick="deleteSite(${i})" class="btn btn-danger text-capitalize text-light"><i class="fa fa-trash fa-fw me-2"></i>delete</button>
          </td>
        </tr>
      `;
  
      tbody.innerHTML = cartona;
    }
    console.log(list)
  }  
}

// edit
function editSite(id) {

  // fill the fields with the given data first
  siteName.value = siteList[id].siteName
  siteLink.value = siteList[id].siteLink

  options.innerHTML = `
        <button onclick="addSite()" class="text-capitalize btn btn-primary px-3">
          <i class="fa fa-plus fa-fw me-1"></i>Add Site</button>

          <button onclick="updateSite(${id})" class="text-capitalize btn btn-info px-2 text-light">
          <i class="fa fa-check fa-fw me-2"></i>Update</button>
  `;
}

// update
function updateSite(id) {
  options.innerHTML = `
        <button onclick="addSite()" class="text-capitalize btn btn-primary px-3">
          <i class="fa fa-plus fa-fw me-2"></i>Add Site</button>
  `;

  siteList[id].siteName = siteName.value;
  siteList[id].siteLink = siteLink.value;

  // store the new array after updating object info
  localStorage.setItem("siteList", JSON.stringify(siteList));

  // display the sites inside the array
  displaySites(siteList);
  resetFields();
}

// resets
function resetFields() {
  siteName.value = '';
  siteLink.value = '';
}

// delete
function deleteSite(index) {
  // delete the object in the array using its index number
  siteList.splice(index, 1);
  // set the new array data info localstorage
  localStorage.setItem("siteList", JSON.stringify(siteList));
  // display the products inside the array
  displaySites(siteList);
}


function searchByName() {
  var foundedItems = [];

  var term = document.getElementById('searchByName').value;

  for (var i = 0; i < siteList.length; i++) {
    if (siteList[i].siteName.toLowerCase().includes(term.toLowerCase()) == true) {

      siteList[i].newName = siteList[i].siteName.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`);
      // console.log('Founded', i);
      foundedItems.push(siteList[i]);
      
    }
  }

  displaySearch(foundedItems);
}

