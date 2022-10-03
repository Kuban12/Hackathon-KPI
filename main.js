

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
        ava: "./Images/Picsart_0.jpg"
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


let rendersChoose = 3

async function render(){
    if(rendersChoose == 1){
        render1()
    }else if (rendersChoose == 2){
        render2()
    }else if (rendersChoose == 3){
        render3()
    }
}

let firstRender = document.querySelector('.first-Render');
firstRender.addEventListener('click', ()=>{
    rendersChoose = 1;
    render()
})

let secondRender = document.querySelector('.second-Render');
secondRender.addEventListener('click', ()=>{
    rendersChoose = 2;
    render()
})

let thirdRender = document.querySelector('.third-Render');
thirdRender.addEventListener('click', ()=>{
    rendersChoose = 3;
    render()
})



async function render1(){
    let productsList = document.querySelector('#products-list');
    let productsList3 = document.querySelector('#products-list3');
    let thirdView = document.querySelector('#thirdView');

    productsList3.style.height = '0px';
    productsList3.style.paddingLeft = '0%';
    productsList3.style.marginTop = '0%';
    thirdView.style.height = '0px';
    thirdView.style.paddingLeft = '0%';
    thirdView.style.marginTop = '0%';
    
    productsList.innerHTML = '';
    productsList3.innerHTML = '';
    thirdView.innerHTML ='';
    let requestAPI = `${PRODUCTS_API}?q=${search}&_page=${page}&_limit=6`;
    if(search != ''){
        requestAPI = `${PRODUCTS_API}?q=${search}`;
    }
    let res = await fetch(requestAPI);
    let data = await res.json();
    data.forEach(item => {
        productsList.innerHTML += `
        <div class="card m-5" style="width: 25rem;">
            <div class="card-body">
            <div class="d-flex">
            <div>
            <div>
            <img src=${item.ava} class="imgMainAva" id="${item.id}" style="width: 100px" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" alt="error" 
            </div>
            <h3 class="card-name"><strong>${item.lastname}   ${item.name}</strong></h3>
            <p class="card-text"><strong>number: </strong>${item.number}</p>
            </div>
            </div>

 <div>
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
        </div>
        `;
    });

    pageHtml.innerHTML = `page: ${page}  of  ${countPage2}`
    if(data.length === 0) return;
    addEditEvent();
    addDeleteEvent();
    addEditEventToAva()
    addEditEventToAv()
}

async function render2(){
    let productsList = document.querySelector('#products-list');
    let productsList3 = document.querySelector('#products-list3');
    let thirdView = document.querySelector('#thirdView');


    productsList3.style.height = '0px';
    productsList3.style.paddingLeft = '0%';
    productsList3.style.marginTop = '0%';
    thirdView.style.height = '0px';
    thirdView.style.paddingLeft = '0%';
    thirdView.style.marginTop = '0%';
    
    productsList.innerHTML = '';
    productsList3.innerHTML = '';
    thirdView.innerHTML ='';
    let requestAPI = `${PRODUCTS_API}?q=${search}&_page=${page}&_limit=6`;
    if(search != ''){
        requestAPI = `${PRODUCTS_API}?q=${search}`;
    }
    let res = await fetch(requestAPI);
    let data = await res.json();
    data.forEach(item => {
        productsList.innerHTML += `
        <div class="card m-1" style="width: 55rem;">
            <div class="card-body d-flex justify-content-around align-items-center">
        
            <img src=${item.ava} class="imgMainAva" id="${item.id}" style="width: 100px" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" alt="error" 
        
            

            <span d-flex flex-column>
            <h3 class="card-name"><strong>${item.lastname}
            <p> ${item.name}</p></strong>
            </h3>
            </span>
            
            
        
<span>
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
  </span>

  <div>
  <p class="card-text"><strong>number: </strong>${item.number}</p>
  <div class="d-flex m-1">  
  <a href="#" class="btn  btn-delete" id="${item.id}">Delete</a> 
  <a href="#" class="btn btn-edit btn-update" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  id="${item.id}">Update</a>
  </div>
  </div>
</div>
        </div>
        `;
    });

    pageHtml.innerHTML = `page: ${page}  of  ${countPage2}`
    if(data.length === 0) return;
    addEditEvent();
    addDeleteEvent();
    addEditEventToAva()
    addEditEventToAv()
}


async function render3(){
    let productsList = document.querySelector('#products-list');
    let productsList3 = document.querySelector('#products-list3');
    let thirdView = document.querySelector('#thirdView');

    productsList3.style.height = '800px';
    productsList3.style.paddingLeft = '7%';
    productsList3.style.marginTop = '5%';
    thirdView.style.height = '800px';
    thirdView.style.paddingLeft = '25%';
    thirdView.style.marginTop = '6.2%';

    
    productsList.innerHTML = '';
    productsList3.innerHTML = '';
    thirdView.innerHTML ='';
    let requestAPI = `${PRODUCTS_API}?q=${search}&_page=${page}&_limit=6`;
    if(search != ''){
        requestAPI = `${PRODUCTS_API}?q=${search}`;
    }
    let res = await fetch(requestAPI);
    let data = await res.json();
    data.forEach(item => {
        productsList3.innerHTML += `

        <div d-flex flex-column>
            <div class="card m-5" style="width: 12rem;">
                <div class="card-body d-flex flex-column align-items-center text-center">
                
                <img src=${item.ava} class="imgMainAva iconItem" id="${item.id}" style="width: 100px" alt="error" 
    
                <h2 class="card-name"><strong>${item.lastname}   ${item.name}</strong></h2>
            </div>
        <div>`
    

    thirdView.innerHTML +=`
        <div class="card m-4 mainCard" id="${item.id}" style="width: 35rem; height: 42rem; display: none;">
            <div class="card-body d-flex justify-content-center">
            <span>
            <img src=${item.ava} style="width: 80%; padding-left: 15%" class="imgMainAva test" id="${item.id}" style="width: 100px" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" alt="error" 
            </span>
            <div d-flex flex-column align-items-center >
            <h3 class="card-name text-center"><strong>${item.lastname}   ${item.name}</strong></h3>
            <p class="card-text text-center"><strong>number: </strong>${item.number}</p>
            </div>

 <div>
<table class="table text-center m-3">
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
        </div>
        </div>
        </div>
        `;

    });

    pageHtml.innerHTML = `page: ${page}  of  ${countPage2}`
    if(data.length === 0) return;
    addEditEvent();
    addDeleteEvent();
    addEditEventToAva()
    addEditEventToAv()
    connectAllIcons()

    function connectAllIcons(){
        let btnEditProduct = document.querySelectorAll('.iconItem');
        btnEditProduct.forEach(item => {item.addEventListener('click', (e)=>{
            let iconstId = e.target.id        
            let mainCard = document.querySelectorAll('.mainCard');
            mainCard.forEach(item => {
                item.style.display = "none"
                if(item.id == iconstId){
                    item.style.display = "block"
                }
            })
        });
        })
    };

}




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
        method: 'PATCH',
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




///////////Change avatar logic


let userId
let userObj
let updateduserObj
async function addProductDataToFor(e){
    userId = e.target.id
    avatarId = e.target.id
    let res = await fetch(`${PRODUCTS_API}/${userId}`)
    userObj = await res.json();
};


async function updateTheUserAva(e){

    let avatarsSrc = e.target.id

    updateduserObj = {
        ava: `./Images/Picsart_${avatarsSrc}.jpg`,
    };

    await fetch(`${PRODUCTS_API}/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(updateduserObj), 
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });
    render();

}


function addEditEventToAv(){
    let allAvatars = document.querySelectorAll('.imgAvatar');
    allAvatars.forEach(item => {item.addEventListener('click', updateTheUserAva);
    })
};


function addEditEventToAva(){
    let allAvatars = document.querySelectorAll('.imgMainAva');
    allAvatars.forEach(item => {item.addEventListener('click', addProductDataToFor);
    })
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
  let countPage = counter / 6;
  countPage2 = Math.ceil(countPage);

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
    if(page == 1 && page == countPage2){
        nextBtn.style.display = 'none'
        nextBtn.style.display = 'none'
    }

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



