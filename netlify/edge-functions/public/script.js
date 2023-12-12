const chatlog = document.getElementById(`chatlog`);
const input = document.getElementById(`input`);
const post = document.getElementById(`post`);

let length = 0;
let myName = ``;
let data = {
    chat: [],
    user: []
}

const reloadChat = () => {
    chatlog.textContent = ``;
    for (let i = 0; i < data.chat.length; i++) {
        chatlog.innerHTML += `<p class="${data.user[i] == myName ? `mine` : `others`}">${data.chat[i]}</p>`;
    }
}

const getData = () => {
    fetch(`https://horiyouta-chattest.netlify.app/`, {
        method: `post`,
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify({ type: `get`, body: `` })
    })
        .then(res => res.json())
        .then(resData => {
            data = resData;
            if (length < data.chat.length) {
                length = data.chat.length;
                reloadChat();
            }
            setTimeout(getData, 500);
        });
}

post.addEventListener(`click`, () => {
    if (input.value != ``) {
        if (myName == ``) {
            myName = input.value;
            setTimeout(getData, 500);
        } else {
            fetch(`https://horiyouta-chattest.netlify.app/`, {
                method: `post`,
                headers: { 'Content-Type': `application/json` },
                body: JSON.stringify({ type: `post`, body: { chat: input.value, user: myName } })
            });
        }
        input.value = ``;
    }
});
