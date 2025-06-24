let search = document.querySelector(".search");
let enterIcon = document.querySelector(".enter-icon");
let interaction = document.querySelector(".interaction");
let userIcon = document.querySelector(".user-icon");
let sideBar = document.querySelector(".sidebar-icon");
let profile = document.querySelector(".profile");
let overlay = document.querySelector(".overlay")
let history = document.querySelector(".history")


let chatData = {
    
}
let defaultReplies = [
  "Samajh nahi aaya boss, thoda clearly likh na.",
  "Kya bolna chahte ho bhai? System confuse ho gaya.",
  "Ye kya likha hai? Mere processor ne bhi haath jod liye.",
  "Arey yeh toh dictionary mein bhi nahi milta!",
  "Mujhe samajh nahi aaya... tu khud samajh gaya kya?",
  "Beta main AI hoon, astrologer nahi.",
  "Lagta hai tu freestyle likh raha hai. Thoda simple kar.",
  "Matlab kya tha iska? Meri training mein yeh nahi tha.",
  "Bhai mujhe bhi nahi pata tu kya chahta hai.",
  "Aisa lag raha hai tu code nahi, shayari likh raha hai!",
  "I'm confused, but I’m pretending I’m not.",
  "Can you say that again… in actual human language?",
  "That input went into the void and never came back.",
  "I’m good, but I’m not psychic. Yet.",
  "Interesting… but I have no idea what you just said.",
  "Try again. This time, with actual words I know.",
  "My circuits are sobbing. I didn’t understand that."

];


//fetch
fetch("replies.json")
  .then((res) => res.json())
  .then((data) => {
    chatData = data.replies ;
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

    let matchKey = Object.keys(chatData).find((key) => userInput.includes(key));

    let botText = defaultReplies[Math.floor(Math.random() * defaultReplies.length)] //default

    let now = new Date();
    let time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    let day = now.toLocaleDateString('en-GB', { weekday: 'long' });
    let year = now.getFullYear();

    // Handle time/date/day/year dynamically
    if (userInput.includes("time")) {
      botText = `It's ${time}`;
    } else if (userInput.includes("date")) {
      botText = `Today is ${date}`;
    } else if (userInput.includes("day")) {
      botText = `It's ${day}`;
    } else if (userInput.includes("year")) {
      botText = `The year is ${year}`;
    } else if (matchKey) {
      let responseArray = chatData[matchKey];
      botText = responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    //bot

    let typing = document.createElement("div");
    typing.className = "rounded-[25px] text-white px-4 py-2 w-fit max-w-[60%] flex self-start text-wrap wrap-anywhere bg-[#313031]";
    typing.innerHTML = `<h1 class="flex items-center">Typing...</h1>`;
    interaction.appendChild(typing);
    scrollToBottom();

    setTimeout(() => {
      interaction.removeChild(typing);

      let botResponse = document.createElement("div");
      botResponse.className =
        "rounded-[25px] text-white px-4 py-2 w-fit max-w-[95%] sm:max-w-[60%] flex self-start text-wrap wrap-anywhere bg-[#313031]";
      botResponse.innerHTML = `<h1 class="flex items-center">${botText}</h1>`;
      interaction.appendChild(botResponse);
      scrollToBottom();
    }, Math.floor(Math.random() * 3000));

  }
}

search.addEventListener("keydown", handleSend);
enterIcon.addEventListener("click", handleSend);


//profile-icon

let flag = true

profile.style.opacity = "0"

userIcon.addEventListener("click" , function(e){
  e.stopPropagation() 

  if(flag){
    profile.style.opacity = "1"
    flag = false
  }
  else{
    profile.style.opacity = "0"
    flag = true
  }
  
  profile.innerHTML = `

    <h1>Login</h1>
    <input type="email" placeholder="Useremail" id="enteredUserEmailID" />
    
  
  `
})

profile.addEventListener("click" , function (e) {
    e.stopPropagation();
})



//profile-icon




let checkHis = false
//history-icon
  history.style.transform = "translateX(-590px)"
sideBar.addEventListener("click", function (e) {
  e.stopPropagation(); // prevent triggering document click

  if (!checkHis) {
    history.style.transform = "translateX(0px)";
    profile.classList.add("hidden");
    checkHis = true;
  } else {
    history.style.transform = "translateX(-590px)";
    checkHis = false;
    profile.classList.remove("hidden");
  }

  profile.style.opacity = "0";
  flag = true;
});




//history-icon

