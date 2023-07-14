const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")

addBtn.addEventListener(
    "click",
    function() {
        addNote()
    }
)

function savenotes(){
    const notes= document.querySelectorAll(".note textarea");
    const data=[];
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data))
    }


}


function addNote(text=""){
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="note w-72 h-40 items-center bg-gray-100 mx-5 my-4 rounded-lg border-[1px] border-black ">
            <div class="tool flex justify-between p-2">
                <button id="save"> <img src="icons8-save.svg" class="w-7 " alt=""></button>
               <button id="trash"> <img src="icons8-delete-button.svg" class="w-7 " alt=""></button>
               
            </div>
        
            <textarea class="focus:outline-none  px-4 py-1 resize-none w-64 h-28 rounded-lg bg-gray-100" placeholder="Take A Note">${text}</textarea>
          </div>
    
    `;
    main.appendChild(note);
    note.querySelector("#trash").addEventListener(
        "click",
        function() {
            note.remove()
            savenotes()
        }
    ) 
    note.querySelector("#save").addEventListener("click",function(){
        savenotes();
    })
    

    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            savenotes()
        }
    )
}

(
    function() {
        const lsnotes=JSON.parse(localStorage.getItem("notes"));
        console.log(lsnotes);
        if(lsnotes===null){
            addNote()
        }
        else{
            lsnotes.forEach(
                (lsNote) => {
                    addNote(lsNote);
                }
            )

        }
        
    }
)()