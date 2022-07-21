let price=document.getElementById('price');
let tax=document.getElementById('tax');
let ads=document.getElementById('ads');
let escompt=document.getElementById('escompt');
let total=document.getElementById('total');
let namee=document.getElementById('name');
let model=document.getElementById('model');
let search=document.getElementById('search');
let create=document.getElementById('create');
let quantite=document.getElementById('quantite');
let mood='create';
let temp;
function getotal(){

    if( price.value != ''){
        let result=(+price.value + +tax.value + +ads.value )- +escompt.value;
        total.innerHTML = result;
        total.style.background ='green';
    }
    else{
        total.innerHTML ='';
        total.style.background ='red';
    }
}
let arr;
if(localStorage.product != null){
    arr=JSON.parse(localStorage.product);
}
else{
    arr=[];
}


//create
create.onclick=function(){
    let newproduct={
        name:namee.value.toLowerCase(),
        model:model.value.toLowerCase(),
        price:price.value,
        tax:tax.value,
        ads:ads.value,
        escompt:escompt.value,
        total:total.innerHTML,
        quantite:quantite.value,
    };
    if(tax.value==''){
        newproduct.tax= '0';
    }
    if(ads.value==''){
        newproduct.ads='0';
    }
    if(escompt.value==''){
        newproduct.escompt='0';
    }

    if(namee.value!='' && model.value!='' && price.value!='' ){
      if(newproduct.quantite<101 && newproduct.quantite>0 ){
       if(mood==='create'){
         if(quantite.value>1){
        for(let i=0;i<quantite.value;i++){
        arr.push(newproduct);}
        }
        else{
        arr.push(newproduct);
        }
    }
    }
    else{
        arr[temp]=newproduct;
        mood='create';
        create.innerHTML='create';
        quantite.style.display="block";
        
    }  
    cleardata();
    }
    
   
    
    localStorage.setItem( 'product',JSON.stringify(arr));
    
    showtb();
}




//clear
function cleardata(){
        namee.value='';
        model.value='';
        price.value='';
        tax.value='';
        ads.value='';
        escompt.value='';
        total.innerHTML='';
        quantite.value='';
}


//SHOW

function showtb(){
    getotal();
let table='';
for(let i=0; i<arr.length;i++){
    table+=`  <tr>
    <td>${i+1}</td>
    <td>${arr[i].name}</td>
    <td>${arr[i].model}</td>
    <td>${arr[i].price}</td>
    <td>${arr[i].tax}</td>
    <td>${arr[i].ads}</td>
    <td>${arr[i].escompt}</td>
    <td>${arr[i].total}</td>
    <td><button onclick="edite(${i})">edit</button></td>
    <td><button onclick="delet(${i})">delete</button></td>
  </tr>
    `
}
document.getElementById('haw').innerHTML=table;
let dellallbtn=document.getElementById('dellall');
if(arr.length>0){
    dellallbtn.innerHTML=`
    <button onclick="dellall()">delete all (${arr.length})</button>
    `
}
else{ dellallbtn.innerHTML=''
}
}
showtb()

//DEL

function delet(i){
    arr.splice(i,1);
    localStorage.product=JSON.stringify(arr);
    showtb()

}


//DELL ALL

function dellall(){
    localStorage.clear();
    arr.splice(0);
    showtb();
}


//edit


function edite(i){
    temp = i;
    create.innerHTML='edit';
    quantite.style.display="none";
    namee.value=arr[i].name;
    model.value=arr[i].model;
    price.value=arr[i].price;
    tax.value=arr[i].tax;
    ads.value=arr[i].ads;
    escompt.value=arr[i].escompt;
    getotal();
    mood='edit';
    scroll({
        top:0,
        behavior:"smooth"
    })
}

//search


let moood;
function searchmood(id){
    if(id=='sname'){
        moood='name';
    }
    else{
        moood='model';
    }
    search.placeholder = 'search by '+ moood;
    search.focus();
    search.value='';
    showtb();
    
}


function searrch(value){
    let table='';
    for(let i=0; i<arr.length;i++){
        if(moood='name'){
            if(arr[i].name.includes(value.toLowerCase())){
                table+=`  <tr>
                <td>${i+1}</td>
                <td>${arr[i].name}</td>
                <td>${arr[i].model}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].tax}</td>
                <td>${arr[i].ads}</td>
                <td>${arr[i].escompt}</td>
                <td>${arr[i].total}</td>
                <td><button onclick="edite(${i})">edit</button></td>
                <td><button onclick="delet(${i})">delete</button></td>
              </tr>
                `

            }
        }else{
            if(arr[i].model.includes(value.toLowerCase())){
                table+=`  <tr>
                   <td>${i+1}</td>
                   <td>${arr[i].name}</td>
                   <td>${arr[i].model}</td>
                   <td>${arr[i].price}</td>
                   <td>${arr[i].tax}</td>
                   <td>${arr[i].ads}</td>
                   <td>${arr[i].escompt}</td>
                   <td>${arr[i].total}</td>
                   <td><button onclick="edite(${i})">edit</button></td>
                   <td><button onclick="delet(${i})">delete</button></td>
                 </tr>
                   `
                

            }
        }
        
    
}
    document.getElementById('haw').innerHTML=table;

}














