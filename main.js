

const USERS_API = 'http://localhost:5000/users'


function showAdminPanel(){
    let adminPanel = document.querySelector('#admin-panel');
    if(!checkUserForProductCreate()){
        adminPanel.setAttribute('style', 'display: none !important;')
    }else{
        adminPanel.setAttribute('style', 'display:  !important;')
    }
}


// /////// create

let studentsName = document.querySelector('#students-name')
let studentsLastname = document.querySelector('#students-lastname')
let studentsNumber = document.querySelector('#students-number')
let studentsWeeklyKPI = document.querySelector('#students-weekly-KPI')
let studentsMonthlyKPI = document.querySelector('#students-monthly-KPI')
let pageHtml = document.querySelector('.pageHtml')

const PRODUCTS_API = 'http://localhost:5000/products';

async function createProduct(){
    if(
        !studentsName.value.trim() || 
        !studentsLastname.value.trim() || 
        !studentsNumber.value.trim() || 
        !studentsWeeklyKPI.value.trim()|| 
        !studentsMonthlyKPI.value.trim()){
        alert('Some inputs are empty')
        return;
    };

    let userObj ={
        name: studentsName.value,
        lastname: studentsLastname.value,
        number: studentsNumber.value,
        weeklyKPI: studentsWeeklyKPI.value,
        monthlyKPI: studentsMonthlyKPI.value,
    };

    await fetch(PRODUCTS_API, {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });
    studentsName.value = '';
    studentsLastname.value = '';
    studentsNumber.value = '';
    studentsWeeklyKPI.value = '';
    studentsMonthlyKPI.value = '';

    render()
};


let addProductBtn = document.querySelector('#add-product-btn');
addProductBtn.addEventListener('click', createProduct)

// read

let page = 1;
let search = '';
let category = '';

async function render(){
    let productsList = document.querySelector('#products-list');
    productsList.innerHTML = '';
    let requestAPI = `${PRODUCTS_API}?q=${search}&_page=${page}&_limit=9`;
    if(search != ''){
        requestAPI = `${PRODUCTS_API}?q=${search}`;
    }
    let res = await fetch(requestAPI);
    let data = await res.json();
    data.forEach(item => {
        productsList.innerHTML += `
        <div class="card m-5" style="width: 25rem;">
            <div class="card-body">
                <h3 class="card-name"><strong>${item.lastname}   ${item.name}</strong></h3>
                <p class="card-text"><strong>number: </strong>${item.number}</p>

 
                <table class="table text-center">
  <thead>
    <tr class="text-center Table-title">
      <th scope="col">Weekly KPI</th>
      <th scope="col">Monthly KPI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${item.weeklyKPI}</td>
      <td>${item.monthlyKPI}</td>
    </tr>
  </tbody>
</table>
<div class="d-flex justify-content-around">  
<a href="#" class="btn  btn-delete" id="${item.id}">Delete</a> <a href="#" class="btn btn-edit btn-update" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  id="${item.id}">Update</a>
</div>
            </;div>
        </div>
        `;
    });
    pageHtml.innerHTML = `page: ${page}  of  ${countPage2}`
    if(data.length === 0) return;
    addEditEvent();
    addDeleteEvent();
};
getArr()
render();

/////// update

let saveChangesBtn = document.querySelector('.save-changes-btn');
function checkCreateAndSaveBtn(){
    if(saveChangesBtn.id){
        addProductBtn.setAttribute('style', 'display: none;');
        saveChangesBtn.setAttribute('style', 'display: block;')
    } else{
        addProductBtn.setAttribute('style', 'display: block;');
        saveChangesBtn.setAttribute('style', 'display: none;')
    }
}
checkCreateAndSaveBtn();

async function addProductDataToForm(e){
    let productId = e.target.id
    let res = await fetch(`${PRODUCTS_API}/${productId}`)
    let userObj = await res.json();

    studentsName.value = userObj.name
    studentsLastname.value = userObj.lastname
    studentsNumber.value = userObj.number
    studentsWeeklyKPI.value = userObj.weeklyKPI
    studentsMonthlyKPI.value = userObj.monthlyKPI

    saveChangesBtn.setAttribute('id', userObj.id)
    checkCreateAndSaveBtn();
};
function addEditEvent(){
    let btnEditProduct = document.querySelectorAll('.btn-edit');
    btnEditProduct.forEach(item => {item.addEventListener('click', addProductDataToForm);
    })
};

async function saveChanges(e){
    let updateduserObj = {
        id: e.target.id,
        name: studentsName.value,
        lastname: studentsLastname.value,
        number: studentsNumber.value,
        weeklyKPI: studentsWeeklyKPI.value,
        monthlyKPI: studentsMonthlyKPI.value,
    };

    await fetch(`${PRODUCTS_API}/${e.target.id}`, {
        method: 'PUT',
        body: JSON.stringify(updateduserObj), 
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });
    studentsName.value = '';
    studentsLastname.value = '';
    studentsNumber.value = '';
    studentsWeeklyKPI.value = '';
    studentsMonthlyKPI.value = '';

    saveChangesBtn.removeAttribute('id');
    checkCreateAndSaveBtn();
    render();
};
saveChangesBtn.addEventListener('click', saveChanges);

let btnClose = document.querySelector('.btn-close')
btnClose.addEventListener('click', ()=> {
    studentsName.value = '';
    studentsLastname.value = '';
    studentsNumber.value = '';
    studentsWeeklyKPI.value = '';
    studentsMonthlyKPI.value = '';
} )
/// delete

async function deleteProduct(e){
    let productId = e.target.id;

    await fetch(`${PRODUCTS_API}/${productId}`, {
        method: "DELETE"
    })
    render();
}
function addDeleteEvent(){
    let deleteProductBtn = document.querySelectorAll('.btn-delete');
    deleteProductBtn.forEach(item => {
        item.addEventListener('click', deleteProduct)
    });
};

/////search
requestsssAPI = `${PRODUCTS_API}?q=${search}&_page=${page}`
let searchInp = document.querySelector('#search-inp');
searchInp.addEventListener('input', ()=>{
    search = searchInp.value;
    render()
})




///////////pagination

let countPage2 = 0;

async function getArr() {
  let res = await fetch(`http://localhost:5000/products`);
  let data = await res.json();
  let counter = data.length;
  let countPage = counter / 9;
  countPage2 = Math.ceil(countPage);
  console.log(countPage2);
}


getArr();

let prevBtn = document.querySelector('#prev-page')
let nextBtn = document.querySelector('#next-page')


function checkpage(){
    if(page == 1){
        prevBtn.style.display = 'none'
    }else{
        prevBtn.style.display = 'block'
    };
    
    if(page == countPage2){
        nextBtn.style.display = 'none'
    } else{
        nextBtn.style.display = 'block'
    };
}
checkpage()


prevBtn.addEventListener('click', ()=>{
    getArr();
    page--;
    checkpage()
    render();
})

nextBtn.addEventListener('click', ()=>{
    getArr();
    page++;
    checkpage()
    render();
})

