window.onload = function() {

    // let main = document.getElementsByTagName("main")[0]
    let contentDiv = document.getElementById("content")
    let genButton = document.getElementsByClassName("button")[0]
    let promptPara = document.getElementById("prompt")
    // let introParas = document.getElementsByClassName('intro')

    let textParaPrompt = document.createElement('p');
    textParaPrompt.setAttribute("id","prompt")
    textParaPrompt.setAttribute("class", "fadeIn")
    
    genButton.addEventListener('click', updatePrompt);

    let rules = new Object(    {
        start: "$subject $verb $object.",
        subject: "I | You | They",
        object: "coffee | bread | milk",
        verb: "want | hate | like | love"
    }) 
    
    let rg = RiTa.grammar(rules);  // load our grammar

    function updatePrompt(){
        let result = rg.expand();      // and then run it!
        if (promptPara === null || promptPara.textContent === null) {
            textParaPrompt.textContent = result;
            contentDiv.appendChild(textParaPrompt)
        }  

    }
}


