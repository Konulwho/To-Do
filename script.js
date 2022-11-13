const input=document.querySelector(".inputElement");
const addTodo=document.querySelector(".addTodo");
const todoPart=document.querySelector(".todoPart")
const mark=document.querySelector(".icon")
const btn=document.querySelector(".button")
const filter=document.querySelector(".filter")
const clear=document.querySelector(".clear")
const array=[];
const textarray=[];
let count=0;
var counter_id=0;

function addTask(){
    let element=document.createElement("div")
    element.setAttribute('draggable', true);
        this.counter_id+=1
        element.setAttribute('id', this.counter_id);
       

        element.addEventListener('dragstart', (li) => {
          li.dataTransfer.setData("text",li.target.id)
         
        })
        addTodo.addEventListener("dragover",(li)=>{
          li.preventDefault()
        })
        addTodo.addEventListener("drop",(li)=>{
          const dragedItemId=li.dataTransfer.getData("text")
          addTodo.append(document.getElementById(dragedItemId))
        })
       
    element.classList.add("todoPart");
    let todoText=document.createElement("span");
    todoText.classList.add("todoText");
    todoText.innerText=input.value;
    textarray.push(input.value)
    element.append(todoText);
    element.innerHTML+=`<i class="fa-solid fa-pen-to-square eicon" onclick="editEl(this.previousElementSibling)"></i>`
    element.innerHTML+=`<i class="fa-solid fa-circle-xmark xicon"></i>`
    addTodo.append(element)
    array.push(element);
    addTodo.style.display="block";
}

   btn.addEventListener("click",()=>{
    if(input.value !=""){
       addTask();
       input.value="";
        
    } 

   })

input.addEventListener("keypress",(e)=>{
   
    if(e.key==="Enter"){
        addTask();
        input.value="";
    }
            
        });

mark.addEventListener("click",()=>{
    input.value="";
    input.focus();
})

addTodo.addEventListener("click",(e)=>{
 if(e.target.classList.contains("xicon")){

    e.target.parentElement.remove();
    array.splice(e.target.parentElement,1)
    
    if(array.length==0){
        addTodo.style.display="none";
    }
   
    
 }
})

clear.addEventListener("click",()=>{
    location.reload();
})

function editEl(element)
{
    const { value } = Swal.fire({
        title: 'Edit Task',
        input: 'text',
        inputLabel: 'Change from here',
        inputValue: element.innerText,
        confirmButtonText: 'Save',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
              return 'You need to write something!'
            }
            else {
                element.innerText = value;
            }
        }
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Successfully!',
                'Your task has changed successfully!',
                'success');
        }
      })
}
