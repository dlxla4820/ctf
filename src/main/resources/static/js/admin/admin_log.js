const getAjax = function(url) {
    return new Promise((resolve, reject) => { // 1.
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json"
            ,
            success: (res) => {
                resolve(res);  // 2.
            },
            error: (e) => {
                reject(e);  // 3.
            }
        });
    });
}


async function getLogList(category){
    const url = "/admin_log_list/"+category;
    try {
        return await getAjax(url);
    } catch(e) {
        console.log(e);
    }
}



async function renderPagination(currentPage, type) {
    const contents = document.querySelector("#log-content");
    const data = await getLogList(type);
    let totalCount = data.length;

    let maxPage = Math.ceil(totalCount / 10);

    let maxGroup = Math.ceil(maxPage / 5);
    let currentGroup = Math.ceil(currentPage / 5)
    let currentData;
    if((currentPage-1) * 10  >= totalCount){
        currentData = data.slice((currentPage-1) * 10, totalCount);
    }else {
        currentData = data.slice((currentPage-1) * 10, (currentPage) * 10);
    }
    if(totalCount === 0){
        noDataRender(type);
    } else{
        if( currentGroup === maxGroup ){
            await renderButton((currentGroup * 5)-4,maxPage, currentPage -((currentGroup * 5)-4),type, maxPage);
            renderTable(currentData, type);
        } else {
            await renderButton((currentGroup * 5)-4, currentGroup * 5, currentPage -((currentGroup * 5)-4),type, maxPage)
            renderTable(currentData,type);
        }
    }


}
const noDataRender = (type) =>{
    const tables = document.querySelector("#log-content");
    while (tables.hasChildNodes()) {
        tables.removeChild(tables.lastChild);
    }

    const buttons = document.querySelector("#paging");
    // 버튼 리스트 초기화
    while (buttons.hasChildNodes()) {
        buttons.removeChild(buttons.lastChild);
    }

    const table = document.createElement("tr");
    const td = document.createElement("td");
    td.innerText="No Input Data"
    if(type === "ACCESS"){
        td.colSpan=4;
    } else if(type==="DOWNLOAD"){
        td.colSpan=4;
    } else{
        td.colSpan=6;
    }

    td.style.height="48.818182px";
    td.style.textAlign="center";
    table.appendChild(td);
    tables.appendChild(table);
}

const renderButton = async (page, maxPage, now,type, totalMaxPage) => {
    const buttons = document.querySelector("#paging");
    // 버튼 리스트 초기화
    while (buttons.hasChildNodes()) {
        buttons.removeChild(buttons.lastChild);
    }
    // 화면에 최대 5개의 페이지 버튼 생성
    for (let id = page; id <= maxPage; id++) {
        buttons.appendChild(makeButton(id,type));
    }
    // 첫 버튼 활성화(class="active")
    buttons.children[now].classList.add("active");

    const prev = document.createElement("button");
    prev.classList.add("btn", "btn-secondary");
    prev.innerHTML = '<i class="fa-solid fa-caret-left"></i>';
    prev.onclick = () => renderPagination(now,type);

    const next = document.createElement("button");
    next.classList.add("btn", "btn-secondary");
    next.innerHTML = '<i class="fa-solid fa-caret-right"></i>';
    next.onclick = () => renderPagination(now+2,type);

    buttons.prepend(prev);
    buttons.append(next);
    console.log(page, maxPage)
    // 이전, 다음 페이지 버튼이 필요한지 체크
    if ((now+1)  === 1 ) buttons.removeChild(prev);
    if ((now+1) === totalMaxPage) buttons.removeChild(next);
};


const renderTable = (dataSet, type) => {
    const tables = document.querySelector("#log-content");
    // 버튼 리스트 초기화
    while (tables.hasChildNodes()) {
        tables.removeChild(tables.lastChild);
    }
    if(type === "ACCESS"){
        for(let i=0; i<dataSet.length; i++){
            tables.appendChild(makeAccessTable(dataSet[i]));
        }
    } else if(type ==="DOWNLOAD"){
        for(let i=0; i<dataSet.length; i++){
            tables.appendChild(makeDownloadTable(dataSet[i]));
        }
    } else {
        for(let i=0; i<dataSet.length; i++){
            tables.appendChild(makeFlagTable(dataSet[i]));
        }
    }

}

const makeButton = (id,type) => {
    const buttons = document.querySelector("#paging");
    const button = document.createElement("button");
    button.classList.add("btn","btn-secondary");
    button.dataset.num = id;
    button.innerText = id;
    button.onclick = () => renderPagination(id,type);
    button.addEventListener("click", (e) => {
        Array.prototype.forEach.call(buttons.children, (button) => {
            if (button.dataset.num) button.classList.remove("active");
        });
        e.target.classList.add("active");
    });
    return button;
};

const makeAccessTable = (data) => {

    const table = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = data.recordKey.dateTime
    const td2 = document.createElement("td");
    td2.innerText = data.recordKey.userId;
    const td3 = document.createElement("td");
    td3.innerText = data.userIp;
    const td4 = document.createElement("td");
    td4.innerText = data.quizName;


    table.appendChild(td1);
    table.appendChild(td2);
    table.appendChild(td3);
    table.appendChild(td4);
    return table;
};
const makeDownloadTable = (data) => {

    const table = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = data.recordKey.dateTime
    const td2 = document.createElement("td");
    td2.innerText = data.recordKey.userId;
    const td3 = document.createElement("td");
    td3.innerText = data.userIp;
    const td4 = document.createElement("td");
    td4.innerText = data.quizName;


    table.appendChild(td1);
    table.appendChild(td2);
    table.appendChild(td3);
    table.appendChild(td4);
    return table;
};
const makeFlagTable = (data) => {

    const table = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = data.recordKey.dateTime
    const td2 = document.createElement("td");
    td2.innerText = data.recordKey.userId;
    const td3 = document.createElement("td");
    td3.innerText = data.userIp;
    const td4 = document.createElement("td");
    td4.innerText = data.quizName;
    const td5 = document.createElement("td");
    td5.innerText = data.flag;
    const td6 = document.createElement("td");
    td6.innerText = data.successOrNot;
    if(data.successOrNot === "SUCCESS"){
        td6.style.color = "green";
    } else {
        td6.style.color = "red";
    }
    table.appendChild(td1);
    table.appendChild(td2);
    table.appendChild(td3);
    table.appendChild(td4);
    table.appendChild(td5);
    table.appendChild(td6);

    return table;
};