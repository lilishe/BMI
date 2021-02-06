let heightInput = document.querySelector('#height');
let weightInput = document.querySelector('#weight');
let submitBtn = document.querySelector('.submitBtn');
let alertText = document.querySelector('.alertText');
let refreshBtn = document.querySelector('.refreshBtn');
let listPanel = document.querySelector('.listPanel');
let deleteAll = document.querySelector('.delete');
let data = JSON.parse(localStorage.getItem('data')) || [];

heightInput.addEventListener('blur',check);
weightInput.addEventListener('blur',check);
submitBtn.addEventListener('click',addData);
listPanel.addEventListener('click',deleteList);
refreshBtn.addEventListener('click',clearStatus);
deleteAll.addEventListener('click',clearAll);
//checkInput
function check(){
    let weight = weightInput.value;
    let height = heightInput.value;
    if(height === ''){
        alertText.textContent = '身高不可空白';
    }else if(weight === ''){
        alertText.textContent = '體重不可空白';
    }else if(isNaN(height)){
        alertText.textContent = '身高只能填數字';
    }else if(isNaN(weight)){
        alertText.textContent = '體重只能填數字';
    }else{
        alertText.textContent = '';
    }
}
//增加BMI紀錄
function addList(item){
    let listPanel = document.querySelector('.listPanel');
    let str = '';
    for(let i =0;i < item.length;i++){
        str += `<div class="listItem weight-${data[i].status}-border">
                    <div class="listStatus">${data[i].statusText}</div>
                    <div class="listBMI">
                            <h5>BMI</h5>
                            <p>${data[i].bmi}</p>
                    </div>
                    <div class="listWeight">
                            <h5>weight</h5>
                            <p>${data[i].weight}</p>
                    </div>
                    <div class="listHeight">
                        <h5>height</h5>
                        <p>${data[i].height}</p>
                    </div>
                    <div class="listDate">
                        <h5>${data[i].date}</h5>
                    </div>
                    <div>
                        <a href="#" class="listDelete">
                            <img src="img/trash-can.svg" alt="trash">
                        </a>
                    </div>
                </div>`
    }
    listPanel.innerHTML = str;
}

//日期
function Day(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let today = date.getDate();
    let time = '0' + month + '-' + today + '-' + year;
    // console.log(time);
    return time;
}

function addData(e){
    e.preventDefault();
    let height = heightInput.value;
    let weight = weightInput.value;
    height = height / 100;
    let BMI = weight / Math.pow(height,2);
    BMI = BMI.toFixed(2);
    let statusItem = {};
    if(BMI < 18.5){
        statusItem.status = 'primary';
        statusItem.statusText = '過輕';
    }else if(BMI >= 18.5 && 24 > BMI){
        statusItem.status = 'success';
        statusItem.statusText = '理想';
    }else if(BMI >= 24 && 27 > BMI){
        statusItem.status = 'warming';
        statusItem.statusText = '過重';
    }else if(BMI >= 27 && 30 > BMI){
        statusItem.status = 'info';
        statusItem.statusText = '輕度肥胖';
    }else if(BMI >= 30 && 35 > BMI){
        statusItem.status = 'info';
        statusItem.statusText = '中度肥胖';
    }else{
        statusItem.status = 'danger';
        statusItem.statusText = '重度肥胖';
    }
    statusItem.bmi = BMI;
    statusItem.weight = weight;
    statusItem.height = height;
    statusItem.date = Day();

    data.push(statusItem);
    localStorage.setItem('data',JSON.stringify(data));
    addList(data);
    let status = document.querySelector('.status');
    submitBtn.style.display = 'none';
    status.style.display = 'flex';
    document.querySelector('.status h3').textContent = statusItem.bmi;
    document.querySelector('.statusText').textContent = statusItem.statusText;
    status.setAttribute('class','status ' + `weight-${statusItem.status}-color`);
    refreshBtn.setAttribute('class','refreshBtn ' + `weight-${statusItem.status}-background`);

}

function deleteList(e){
    e.preventDefault();
    if(e.target.parentElement.className == 'listDelete'){
        let dataNum = e.target.dataset.num;
        data.splice(dataNum,1);
        localStorage.setItem('data',JSON.stringify(data));
        addList(data);
    }
}

function clearStatus(e){
    e.preventDefault();
    let status = document.querySelector('.status');
    status.style.display = 'none';
    submitBtn.style.display = 'block';
    heightInput.value = '';
    weightInput.value = '';
}

function clearAll(e){
    e.preventDefault();
    let dataNum = e.target.dataset;
    data.splice(dataNum);
    localStorage.setItem('data',JSON.stringify(data));
    addList(data);
    clearAllBtn();
}


addList(data);


