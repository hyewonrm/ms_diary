
function saveDiary(date, text, imageUrl){
    const entry = [text,imageUrl];
    localStorage.setItem(date, JSON.stringify(entry));
}

function showAllDiaries(){
    const diaryList = document.getElementById("diaryList");
    diaryList.innerHTML="";
    for(let i = 0; i<localStorage.length; i++){
        const date=localStorage.key(i);
        const entry =JSON.parse(localStorage.getItem(date));

        const [text,imageUrl] =entry;

        const el = document.createElement("div");
        el.innerHTML=`
            <h3>${date}</h3>
            <p>${text}</p>
            <img src="${imageUrl}" style = "max-width:200px;">
            <button class="del-btn" data-date="${date}">삭제</button>
            <hr>
        `;

        diaryList.appendChild(el)
    }

    document.querySelectorAll(".del-btn").forEach(btn =>{
        btn.addEventListener("click",e=>{
            const dateToDelete = e.target.getAttribute("data-date");
            localStorage.removeItem(dateToDelete);
            showAllDiaries();
        })
    })
}



const AllBtn = document.getElementById("save").addEventListener("click",()=>{
    const date = document.getElementById("todaydate").value;
    const text = document.getElementById("todaydiary").value;
    const fileInput = document.getElementById("todayimage")

    if(fileInput.files.length >0){
        const file =fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e){
            const imageUrl = e.target.result;
            saveDiary(date, text, imageUrl);
            showAllDiaries();
        };
        reader.readAsDataURL(file);
    } else{
        saveDiary(date, text, "");
        showAllDiaries();
    }
});
window.onload = showAllDiaries;
