let heightInput = document.querySelector('#height');
let weightInput = document.querySelector('#weight');
let submite = document.querySelector('.submite');
let status = document.querySelector('.status');
let alertText = document.querySelector('.alert-Text');
let clearAll = document.querySelector('.clearAll');
let list = document.querySelector('.list');
let change = document.querySelector('.change');
let data = JSON.parse(localStorage.getItem('data')) || [];
// console.log(change);

heightInput.addEventListener('blur',check);
weightInput.addEventListener('blur',check);
submite.addEventListener('click',addData);
clearAll.addEventListener('click',deleteAll);
change.addEventListener('click',clearStatus);

function check(){
    let height = heightInput.value;
    let weight = weightInput.value;
    // console.log(height,weight);
    if(height === ''){
        alertText.textContent = '身高不可空白';
    }else if(weight === ''){
        alertText.textContent = '體重不可空白';
    }else if(isNaN(weight)){
        alertText.textContent = '體重只可填入數字';
    }else if(isNaN(height)){
        alertText.textContent = '身高只可填入數字';
    }else{
        alertText.textContent = '';
    }
}

function today(){
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let time = month + '-' + day + '-' + year;
    return time;
}
function addList(item){
    let str = '';
    for(let i = 0; i < item.length;i++){
        str += 
        `<div class="statusItem weight-${data[i].status}-border">
            <p class="status-text">${data[i].text}</p>
            <div class="bmi ds-flex">
                <h5>bmi</h5>
                <p>${data[i].bmi}</p>
            </div>
            <div class="weight ds-flex">
                <h5>weight</h5>
                <p>${data[i].weight}</p>
            </div>
            <div class="height ds-flex">
                <h5>height</h5>
                <p>${data[i].height}</p>
            </div>
            <div class="day ds-flex">
                <h5>${data[i].today}</h5>
            </div>
        </div>`
    }
    list.innerHTML = str;
}

function addData(e){
    e.preventDefault();
    let height = heightInput.value / 100;
    let weight = weightInput.value;
    let BMI = weight / Math.pow(height,2);
    BMI = BMI.toFixed(2);
    let statusItem = {};
    statusItem = {
        weight:weight,
        height:height,
        bmi:BMI,
        today:today()
    }
    if(BMI < 18.5){
        statusItem.status = 'primary';
        statusItem.text = '過輕'; 
    }else if(18.5 <= BMI && BMI < 24){
        statusItem.status = 'success';
        statusItem.text = '理想';
    }else if(24 <= BMI && BMI < 27){
        statusItem.status = 'secondary';
        statusItem.text = '過重';
    }else if(27 <= BMI && BMI < 30){
        statusItem.status = 'info';
        statusItem.text = '輕度肥胖';
    }else if(30 <= BMI && BMI < 35){
        statusItem.status = 'info';
        statusItem.text = '中度肥胖';
    }else{
        statusItem.status = 'danger';
        statusItem.text = '重度肥胖';
    }
    data.push(statusItem);
    localStorage.setItem('data',JSON.stringify(data));
    addList(data);
    submite.style.display = 'none';
    status.style.display = 'flex';
    let statusBorder = document.querySelector('.status-border');
    let change = document.querySelector('.change');
    let statusText = document.querySelector('.status-Text');
    statusBorder.setAttribute('class','status-border btn ' + `weight-${statusItem.status}-color`);
    change.setAttribute('class','change ' + `weight-${statusItem.status}-bg`);
    document.querySelector('.BMI').textContent = statusItem.bmi;
    statusText.textContent = statusItem.text;
    status.setAttribute('class','status '+ `weight-${statusItem.status}-color`);
}

function clearStatus(e){
    e.preventDefault();
    submite.style.display = 'block';
    status.style.display = 'none';
    heightInput.value = '';
    weightInput.value = '';
}

function deleteAll(e){
    e.preventDefault();
    let dataNum = e.target.dataset;
    data.splice(dataNum);
    localStorage.setItem('data',JSON.stringify(data));
    addList(data);
}

addList(data);
// today()
// console.log(today());