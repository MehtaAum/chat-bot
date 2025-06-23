let search = document.querySelector(".search")
let enterIcon = document.querySelector(".enter-icon")
let interaction = document.querySelector(".interaction")

let chatData = {
  
}

    //fetch
    fetch("grok_chatbot_expanded.json")
    .then((res) => res.json())
    .then((data) => {

      chatData = data.grok 

    })
    //fetch


function autoResize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

function scrollToBottom() {
  interaction.scrollTop = interaction.scrollHeight;
}


function handleSend(e) {

  if(e.key == "Enter" && !e.shiftKey || e.type == "click"){

    e.preventDefault()

    if(search.value == ""){
      return
    }

    //user

    let response = document.createElement("div")
    interaction.appendChild(response)
    scrollToBottom();

    response.className =  "rounded-[25px] text-white  px-4 py-2 w-fit max-w-[60%] flex self-end text-wrap wrap-anywhere bg-[#313031]"

    response.innerHTML = `
       <h1 class="flex items-center">${search.value}</h1>
    `

          let userInput = search.value.trim().toLowerCase()
          
          // let matchKey = Object.keys(chatData).find(key => key.includes(userInput))
          let matchKey = Object.keys(chatData).find(key => userInput.includes(key));


          let botText = "Hmm... I didn't get that" //default

          if(matchKey){
            let responseArray = chatData[matchKey]
            botText = responseArray[Math.floor(Math.random() * responseArray.length)]
          }


          //bot

          let botResponse = document.createElement("div")
          interaction.appendChild(botResponse)

          botResponse.className =  "rounded-[25px] text-white  px-4 py-2 w-fit max-w-[60%] flex self-start text-wrap wrap-anywhere bg-[#313031]"

          botResponse.innerHTML = `
          <h1 class="flex items-center">${botText}</h1>
          `
    



    search.value = ""

  }


}


search.addEventListener("keydown", handleSend)
enterIcon.addEventListener("click", handleSend)
