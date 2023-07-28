

var productName   = document.getElementById('productName');
var productPrice  = document.getElementById('productPrice');
var productModel  = document.getElementById('productModel');
var productDesc   = document.getElementById('productDesc');
var options       = document.getElementById('options');
var tbody         = document.getElementById('tbody');

var productList = [];

function addProduct() {

  // make new product using fields
  var newProduct = {
    productName : productName.value,
    productPrice : productPrice.value,
    productModel : productModel.value,
    productDesc : productDesc.value,
  };

  // put the new values in the end of the array
  productList.push(newProduct);

  // display the products inside the array
  displayProduct(productList);

  // resets all the fields
  resetFields();

}

function displayProduct(list) {
  var cartona = '';

  if (list.length == 0) {
    tbody.innerHTML = "";
  } else {
    for (var i = 0; i < list.length; i++) {
      cartona += `
        <tr>
          <td>${ i + 1 }</td>
          <td>${productList[i].productName}</td>
          <td>${productList[i].productPrice}</td>
          <td>${productList[i].productModel}</td>
          <td>${productList[i].productDesc}</td>
          <td>
            <button onclick="editProduct(${i})" class="btn btn-warning text-capitalize"><i class="fa fa-edit fa-fw me-2"></i>Edit</button>
          </td>
          <td>
            <button onclick="deleteProduct(${i})" class="btn btn-danger text-capitalize"><i class="fa fa-trash fa-fw me-2"></i>delete</button>
          </td>
        </tr>
      `;
  
      tbody.innerHTML = cartona;
    }
  }

  
}

// edit function
function editProduct(id) {

  // fill the fields with the given data first
  productName.value = productList[id].productName
  productPrice.value = productList[id].productPrice
  productModel.value = productList[id].productModel
  productDesc.value = productList[id].productDesc

  options.innerHTML = `
        <button onclick="addProduct()" class="text-capitalize btn btn-primary px-3">
          <i class="fa fa-plus fa-fw me-2"></i>Add product</button>

          <button onclick="updateProduct(${id})" class="text-capitalize btn btn-info px-2">
          <i class="fa fa-check fa-fw me-2"></i>Update</button>
  `;

}

// update function
function updateProduct(id) {
  options.innerHTML = `
        <button onclick="addProduct()" class="text-capitalize btn btn-primary px-3">
          <i class="fa fa-plus fa-fw me-2"></i>add product</button>
  `;

  productList[id].productName = productName.value;
  productList[id].productPrice = productPrice.value;
  productList[id].productModel = productModel.value;
  productList[id].productDesc = productDesc.value;

  // display the products inside the array
  displayProduct(productList);
  resetFields();

}

// resets all the fields
function resetFields() {
  productName.value = '';
  productPrice.value = '';
  productModel.value = '';
  productDesc.value = '';
}

// delete function
function deleteProduct(index) {
  productList.splice(index, 1);
  // display the products inside the array
  displayProduct(productList);

  console.log(productList);
}
