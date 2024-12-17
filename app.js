
const imageboxx=document.getElementById("imgbox");
const qr=document.getElementById("QR");
const textInput=document.querySelector('.inbox');
const qrbutton=document.querySelector(".styled-button");
const downloadBtn = document.getElementById('download-btn');
function geanarator(){
    if (textInput.value.length > 0){
        qr.src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + textInput.value;
    imageboxx.classList.add('show-img');
    downloadBtn.style.display = 'block';
    }else{
        textInput.classList.add('error')
        setTimeout(() => {
            textInput.classList.remove('error')
        }, 1000);
    }
}
qrbutton.addEventListener('click',()=>{
    geanarator();
    // imageboxx.classList.add('show-img');
    
})
textInput.addEventListener('keydown',(event)=>{
    if (event.key=== 'Enter'){
        geanarator(textInput.value);
        // imageboxx.classList.add('show-img');
    }
});

//to download the qr
downloadBtn.addEventListener('click',async()=>{
    const response=await fetch(qr.src);
    const data=await response.blob();

    const newBlob = new Blob([data], { type: 'image/png' });
    

    const filhandle =await window.showSaveFilePicker({
        suggestion: 'qr-code.png',
        types:[{
            des:'PNG image',
            acpect:{'image/png':['.png']},
        }],
    })
    const stream=await filhandle.createWritable();
    stream.write(newBlob);
    stream.close();
})