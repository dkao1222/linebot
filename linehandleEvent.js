function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }
    var messagebody = ''


    console.log(`使用者 ID: ${event.source.userId}`);

    client.getProfile(event.source.userId)
        .then((profile) => {
            console.log(profile.userId);
            console.log(profile.displayName);
            console.log(profile.pictureUrl);
            console.log(profile.statusMessage);


        })
        .catch((err) => {
            // error handling
        });



    //var userId = event.source.userId
    //var userName = event.source.profile.displayName
    client.getProfile(event.source.userId)
        .then((profile) => {
            var currectUserName = ""
            currectUserName = profile.displayName



            switch (event.message.text.toLowerCase()) {
                case 'help':
                    messagebody = 'Hi, ' + currectUserName + ', how can i help you!'
                    //messagebody  = 'how can i help you! id:' + client.getProfile(event.source.userId).then((profile)=>{ profile.displayName})
                    break;
                case 'submit':
                    messagebody = 'what do you want submit case'

                    break;
                default:
                    messagebody = event.message.text


            }

            const echo = { type: 'text', text: 'only echo ' + messagebody };
            return client.replyMessage(event.replyToken, echo);

        });

}

