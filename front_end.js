var botui = new BotUI('thermostat-bot')
const dict_2 = { placeholder: ''}

function init_1(){
    botui.message.bot(
        {content:"hello how can I help you ?"}
      )
    }

function init_2(){
          botui.action.text({ // show 'text' action
          human:true,
          action: { 
              placeholder : " "
            }
        })
       .then(async function (res){ // wait till its shown
        var url = "http://127.0.0.1:8000/chat/?query=" + res.value;
        let response = await fetch(url);
        
        if (response.ok) { // if HTTP-status is 200-299
          let json = await response.json();
          console.log(json)
          botui.message.bot({
            delay : 700,
            loading : true,
            content : json
        })          
        } else {
          alert("HTTP-Error: " + response.status);
        }
        }).then(init_2)  
}

init_1();
init_2();