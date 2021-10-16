window.onload = function() {

    let main = document.getElementsByTagName("main")[0]
    let contentDiv = document.getElementById("content")
    let genButton = document.getElementsByClassName("button")[0]
    let promptPara = document.getElementById("prompt")
    let introParas = document.getElementsByClassName('intro')

    let testCount = "test prompt of a set amount of characters. maybe two stencnes. perhaps three? who knows! Try to code something else because this isn't working";

    let textParaPrompt = document.createElement('p');
    textParaPrompt.setAttribute("id","prompt")
    textParaPrompt.setAttribute("class", "fadeIn")
    
    genButton.addEventListener('click', updatePrompt);

    function updatePrompt(){
        if (promptPara === null || promptPara.textContent === null) {
            textParaPrompt.textContent = testCount;
            contentDiv.appendChild(textParaPrompt)
        }  
        if (introParas.length == 1) {
            for (i = 0; i < introParas.length; i++) {
                introParas[i].setAttribute('class','hide')
            }
        }
    }
}


