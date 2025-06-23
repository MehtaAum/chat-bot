let search = document.querySelector(".search");
let enterIcon = document.querySelector(".enter-icon");
let interaction = document.querySelector(".interaction");

let chatData = {};

//fetch
fetch("grok_chatbot_expanded.json")
  .then((res) => res.json())
  .then((data) => {
    chatData = data.grok;
  });
//fetch

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

function scrollToBottom() {
  interaction.scrollTop = interaction.scrollHeight;
}

function handleSend(e) {
  if ((e.key == "Enter" && !e.shiftKey) || e.type == "click") {
    e.preventDefault();

    if (search.value == "") {
      return;
    }

    //user

    let response = document.createElement("div");

    response.className =
      "rounded-[25px] text-white  px-4 py-2 w-fit max-w-[60%] flex self-end text-wrap wrap-anywhere bg-[#313031]";

    response.innerHTML = `
       <h1 class="flex items-center">${search.value}</h1>
    `;

    interaction.appendChild(response);
    scrollToBottom();

    let userInput = search.value.trim().toLowerCase();
    search.value = "";
    autoResize(search);

    // let matchKey = Object.keys(chatData).find(key => key.includes(userInput))
    let matchKey = Object.keys(chatData).find((key) => userInput.includes(key));

    let botText = "Hmm... I didn't get that"; //default

    if (matchKey) {
      let responseArray = chatData[matchKey];
      botText = responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    //bot

    let typing = document.createElement("div");
    typing.className =
      "rounded-[25px] text-white px-4 py-2 w-fit max-w-[60%] flex self-start text-wrap wrap-anywhere bg-[#313031]";
    typing.innerHTML = `<h1 class="flex items-center">Typing...</h1>`;
    interaction.appendChild(typing);
    scrollToBottom();

    setTimeout(() => {
      interaction.removeChild(typing);

      let botResponse = document.createElement("div");
      botResponse.className =
        "rounded-[25px] text-white px-4 py-2 w-fit max-w-[60%] flex self-start text-wrap wrap-anywhere bg-[#313031]";
      botResponse.innerHTML = `<h1 class="flex items-center">${botText}</h1>`;
      interaction.appendChild(botResponse);
      scrollToBottom();
    }, Math.floor(Math.random() * 3000));

  }
}

search.addEventListener("keydown", handleSend);
enterIcon.addEventListener("click", handleSend);
