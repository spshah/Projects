import sys
import os
print("The Python version is %s.%s.%s" % sys.version_info[:3])
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/Shashi/Desktop/chatbot/vchat/authkey.json"
#os.environ["https_proxy"] = "http://192.168.0.20:3128"

from functions import *



from nltk.chat.util import Chat, reflections
pairs = [
    [
        r"my name is (.*)",
        ["Hello %1, How are you today ?",]
    ],
     [
        r"what is your name ?",
        ["My name is Vchat and I'm a chatbot :) ",]
    ],
    [
        r"how are you ?",
        ["I'm good\nHow about You ?",]
    ],
    [
        r"sorry (.*)",
        ["Its alright","Its OK, never mind",]
    ],
    [
        r"i'm (.*) doing good",
        ["Nice to hear that","Alright :)",]
    ],
    [
        r"hi|hey|hello",
        ["Hello", "Hey there",]
    ],
    [
        r"(.*) age?",
        ["You are kidding me!\nI'm a computer program buddy\nSeriously you are asking me this?",]
        
    ],
    [
        r"what (.*) want ?",
        ["Make me an offer I can't refuse",]
        
    ],
    [
        r"(.*) created ?",
        ["Shashi created me using Python's NLTK library, Google translate API ","top secret ;)",]
    ],
    [
        r"(.*) (location|city) ?",
        ['Durgapur',]
    ],
    [
        r"how is weather in (.*)?",
        ["Weather in %1 is awesome like always","Too hot man here in %1","Too cold man here in %1","Never even heard about %1"]
    ],
    [
        r"i work in (.*)?",
        ["%1 is an Amazing company, I have heard about it. But they are in huge loss these days.",]
    ],
[
        r"(.*)raining in (.*)",
        ["No rain since last week here in %2","Damn its raining too much here in %2"]
    ],
    [
        r"how (.*) health(.*)",
        ["I'm a computer program, so I'm always healthy ",]
    ],
    [
        r"(.*) (sports|game) ?",
        ["I'm a very big fan of Football",]
    ],
    [
        r"who (.*) sportsperson ?",
        ["Messy","Ronaldo","Roony"]
],
    [
        r"who (.*) (moviestar|actor)?",
        ["Brad Pitt"]
],
    [
        r"quit",
        ["BBye take care. See you soon 🙂 ","It was nice talking to you. See you soon :)"]
],
    [
        r"(.*)",
        ["Sorry, Please repeat 🙂 ",":)"]
],
]


reflections = {
  "am"     : "are",
  "was"    : "were",
  "i"      : "you",
  "i'd"    : "you would",
  "i've"   : "you have",
  "i'll"   : "you will",
  "my"     : "your",
  "are"    : "am",
  "you've" : "I have",
  "you'll" : "I will",
  "your"   : "my",
  "yours"  : "mine",
  "you"    : "me",
  "me"     : "you"
}

def retrieve_input(text):
    txttospeech(text)

def retrieve_audio():
    print("Recording.......")
    speechtotxt()
    f = open("convertedtext1.txt", "r")
    # print(type(translation['translatedText']))
    txt=f.read()
    f.close()
    return txt
    

def play():
    print("Playing audio!!!")
    cmd='play output.flac'
    os.system(cmd)
    
class my_chatbot(Chat):
  def Converse(self, quit="quit"):
        user_input = ""
        
        while user_input != quit:
            user_input = quit
            try:
                user_input = input(">")
                if(user_input[0]=='r'):
                  txt=retrieve_audio();
                  print("retrive:"+ txt)
                  if(txt==""):
                    print("Sorry, Try Again!!! ")
                  else:
                    #while user_input[-1] in "!.":
                      user_input = txt
                      print("user_input:\t"+user_input+ "\n type")
                      txt=self.respond(user_input)
                      print(type(self.respond(user_input)))
                      retrieve_input(txt)                 
            except EOFError:
                print(user_input)

                
                
                
def chatterbox():
    print("Hi, I'm Chatterbox and I chat alot ;)\nPlease type lowercase English language to start a conversation. Type quit to leave ") #default message at the start
    chat = my_chatbot(pairs, reflections)
    chat.Converse()
    
    
    

if __name__ == "__main__":
    chatterbox()
    
 
