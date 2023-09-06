let apiKey = "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";

let maxImg = 4;

let selectedImgNumber = null;

function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max - min +1))+ min
}

function disableBtnDuringgenerate(){
    document.getElementById("btn").disabled = true;
}
function enableBtnAftergenerate(){
    document.getElementById("btn").disabled = false;
}
function clearImgGrid(){
    let imgGrid = document.getElementById("img-grid");
    imgGrid.innerHTML = "";
}

async function GenerateImg(input){
    disableBtnDuringgenerate();
    clearImgGrid();

    let loading = document.getElementById("loading");
    loading.style.display = "block";


    let imagesUls = [];

    for(let i=0; i<maxImg; i++){
        //generate random number between 1 and 10000 
        //and append it to the prompt

        let randomNumber = getRandomNumber(1,10000);
        let prompt = `${input} ${randomNumber}`;

        //we added random number to prompt
        // to create different result

        let response = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney",
            {
                method: "POST",
                headers:{
                    "content-type": "application/json",
                    "Authorization":`Bearer ${"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"}`
                },
                body:JSON.stringify({ inputs:prompt })
            }
        )


        if(!response.ok){
            alert("Faild")
        }

        let blob = await response.blob();
        let imgurl = URL.createObjectURL(blob);
        imagesUls.push(imgurl);


        let img = document.createElement("img");
        img.src = imgurl;
        img.onclick=()=>downloadImage(imgurl, i);
        document.getElementById("img-grid").appendChild(img)

    }


    loading.style.display ="none"
    enableBtnAftergenerate();

    selectedImgNumber = null; //reset selected img number
}

document.getElementById("btn").addEventListener("click",()=>{
    let  input = document.getElementById("prompt").value;
    GenerateImg(input)
});


function downloadImage(imgurl , imageNumber){
    let link = document.createElement("a");
    link.href = imgurl;
    link.download = `image-${imageNumber + 1}.jpg`;
    link.click()
}











