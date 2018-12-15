import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui'
import send_icon from './resources/send_icon.svg';
import sarika from './sarika.png';
import IO from 'socket.io-client'
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import './App.css';

const socket = IO.connect('http://localhost:3010')

class App extends Component {

  constructor(props) {
    super(props)
    this.myRef = React.createRef() // create a ref object 
}


  componentDidMount(){
    const script = document.createElement("script");

    script.src = "https://buttons.github.io/buttons.js";
    script.async = true;

    document.body.appendChild(script);
  }
  state = {
    textMessage: '',
    messages: [
      new Message({
        id: 1,
        message: "I'm the recipient! (The person you're talking to)",
      }), 
      new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
      new Message({ id: 0, message: "I'm you -- the blue bubble! my custom" }), // Blue bubble
      new Message({ id: 1, message: "I'm you kk -- the blue bubble! my custom" }), // Blue bubble
    ],
    Element:Scroll.Element,
  };

  handleMessageSocket (message, callback) {
    socket.emit('message', message, callback)
  }
  onSend = () => {
    this.handleSend()
  }

  onValueChange = (evt) => {
    this.setState({
      textMessage: evt.target.value
    })
  }

  handleAddNewMessage (message) {
    const msgList=this.state.messages;
    
    const newMsgList = [...msgList, message]
    
    this.setState({
      messages: newMsgList
    })
    
  }

  handleSend(){
    const myMessage= new Message({id: 0, message: this.state.textMessage});
    this.handleAddNewMessage(myMessage)
    this.setState({
      textMessage: '',
    });
    this.handleMessageSocket(this.state.textMessage, value=> {
      console.log('value => ', value)
      const returnMessage = new Message({id: 1, message: value});
      this.handleAddNewMessage(returnMessage)
    })
    // scrollToComponent(this.Blue, { offset: 1000, align: 'bottom', duration: 500, ease:'inCirc'});
    this.scrollToBottom();
  }
  scrollToBottom() {
    scroll.scrollToBottom();
  };
  onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      this.handleSend() 
    }
  }

  render() {
    return (
      <div className="App" style={{flex:1}} >

        {/* <script async defer src="https://buttons.github.io/buttons.js"></script> */}
        <link href='https://fonts.googleapis.com/css?family=Bayon|Francois+One' rel='stylesheet' type='text/css'></link>
      
        <div style={{flex:1,flexDirection:'row' ,display: 'flex',backgroundColor:'Gainsboro',justifyContent:'space-between', paddingTop:10, paddingBottom:10, paddingLeft: 20,paddingRight:20, borderBottom:'1px solid #ccc' }}>
          <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
            <img src={sarika} alt="Smiley face" height="42" width="42"></img>
          </div>
          <div style={{display:'flex'}}>
            <div style={{paddingRight:10}}><a class="github-button" href="https://github.com/slashdigital/khmer-chatbot-up2018" data-size="large" data-show-count="true" aria-label="Star slashdigital/khmer-chatbot-up2018 on GitHub">Star</a></div>
            <div style={{paddingLeft:10}}><a class="github-button" href="https://github.com/slashdigital/khmer-chatbot-up2018/fork" data-size="large" data-show-count="true" aria-label="Fork slashdigital/khmer-chatbot-up2018 on GitHub">Fork</a></div>
          </div>
        </div>
        <div style={{width:'50%', margin: '0 auto', position:'relative'}} >  
              <div style={{marginBottom:50,}}>
                  <ChatFeed
                      messages={this.state.messages} // Boolean: list of message objects
                      isTyping={this.state.is_typing} // Boolean: is the recipient typing
                      hasInputField={false} // Boolean: use our input, or use your own
                      showSenderName={false} // show the name of the user who sent the message
                      bubblesCentered={true} //Boolean should the bubbles be centered in the feed?
                      // JSON: Custom bubble styles
                      bubbleStyles={{ text: { fontSize: 15,  fontFamily: 'Bayon' },chatbubble: { textAlign: 'left', borderRadius: 10, padding: 10, marginLeft:15, marginRight:15}}}
                  />
              </div>
              <div style={{flex:1, flexDirection: 'row', display:'flex', width:'50%', margin: '0 auto', position: 'fixed', bottom: 0, left: 0, right: 0,}}>
                  <div style={{flex:1}}> 
                    <MessageInput
                        onKeyPress={this.onKeyPress}
                        message={this.state.textMessage}
                        onValueChange={this.onValueChange}
                    />
                  </div>
                  <button style={{backgroundColor:'transparent', borderColor:'tranparent', borderWidth:0}} 
                      onClick={this.onSend}> 
                      <img src={send_icon} alt="send"/>
                  </button>
              </div>
          </div>
      </div>
    );
  }
}

const MessageInput = ({message, onValueChange, onKeyPress})=>(
    <input
      style={
        {width: '99%', 
        height: 40, 
        fontSize: 15, 
        border: '0 !important', 
        boxShadow: '0 !important',
        outline: 'none',
        fontFamily: 'Bayon'
      }}
      onChange={onValueChange}
      onKeyPress={onKeyPress}
      value={message}
      placeholder="Type your message and hit ENTER"
      type="text" />
  )

export default App;
