let data: {
    chat: Array<string>,
    user: Array<string>
} = {
    chat: [],
    user: []
}

export default async (req: Request) => {
    if (req.method == `POST`) {
        const reqData = await req.json();
        if (reqData.type == `post`) {
            if (reqData.body.chat == `/reset`) {
                data = {
                    chat: [],
                    user: []
                }
            } else {
                data.chat.push(reqData.body.chat as string);
                data.user.push(reqData.body.user as string);
            }
            return new Response(null);
        } else if (reqData.type == `get`) {
            return new Response(JSON.stringify(data));
        }
    } else {
        return new Response(/** html */`<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>* {
    margin: 0;
}

html,
body {
    overflow: hidden;
    height: 100%;
    width: 100%;
}

#chatlog {
    background-color: dodgerblue;
    height: calc(100% - 70px);
    width: calc(100% - 20px);
    overflow-y: scroll;
    padding: 10px;
}

#chatlog::-webkit-scrollbar {
    display: none;
}

#input {
    width: calc(100% - 150px);
    padding: 0 20px;
    height: 50px;
    font-size: 25px;
}

#post {
    font-size: 25px;
    width: 100px;
    height: 50px;
}

.others,
.mine {
    border-radius: 10px;
    width: fit-content;
    user-select: none;
    cursor: default;
    padding: 10px;
}

.others {
    background-color: white;
}

.mine {
    margin: 0 0 0 auto;
    background-color: lime;
}</style>
</head>
<body>
    <div id="chatlog"></div>
    <input type="text" placeholder="テキストを入力" id="input"><button id="post">送信</button>
    <script>const chatlog = document.getElementById(\`chatlog\`);
const input = document.getElementById(\`input\`);
const post = document.getElementById(\`post\`);

let length = 0;
let myName = \`\`;
let data = {
    chat: [],
    user: []
}

const reloadChat = () => {
    chatlog.textContent = \`\`;
    for (let i = 0; i < data.chat.length; i++) {
        chatlog.innerHTML += \`<p class="\${data.user[i] == myName ? \`mine\` : \`others\`}">\${data.chat[i]}</p>\`;
    }
}

const getData = () => {
    fetch(\`http://localhost:8888\`, {
        method: \`post\`,
        headers: { 'Content-Type': \`application/json\` },
        body: JSON.stringify({ type: \`get\`, body: \`\` })
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

post.addEventListener(\`click\`, () => {
    if (input.value != \`\`) {
        if (myName == \`\`) {
            myName = input.value;
            setTimeout(getData, 500);
        } else {
            fetch(\`http://localhost:8888\`, {
                method: \`post\`,
                headers: { 'Content-Type': \`application/json\` },
                body: JSON.stringify({ type: \`post\`, body: { chat: input.value, user: myName } })
            });
        }
        input.value = \`\`;
    }
});
</script>
</body>
</html>`, {headers: {'Content-Type': `text/html`}});}}