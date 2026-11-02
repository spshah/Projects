from core import *
from tkinter import *
import tkinter



def res(user_response,lang):
    user_response=user_response.lower()
    if(user_response!='bye'):
        if(user_response=='thanks' or user_response=='thank you' ):
            flag=False
            print("\nROBO: You are welcome..")
            INPUT.insert(tkinter.INSERT,"\nROBO: You are welcome..")
            reply="You are welcome"
        else:
            if(greeting(user_response)!=None):
                reply=greeting(user_response)
            else:
                if user_response=='' or user_response==' ':
                  reply="sorry did not get you try again"
                else:
                  reply=response(user_response)
                 
                #sent_tokens.remove(user_response)
    else:
        flag=False
        print("ROBO: Bye! take care..")
        reply="\nROBO: Bye! take care.."
    print("\nROBO: "+ reply)
    txttospeech(reply,lang)
    reply="\nROBO: "+ reply
    Chat.insert(tkinter.INSERT,reply)

def retrieve_input():
    global lang
    text = INPUT.get("1.0",'end');
    #INPUT.delete('1.0', END)
    print("input  "+ text)
    Chat.insert(tkinter.INSERT,"\nGuest: "+ text)
    res(text,lang)
    

def retrieve_audio():
    global lang
    INPUT.delete('1.0', END)
    INPUT.insert(tkinter.INSERT,"Recording.......")
    speechtotxt(lang)
    f = open("convertedtext1.txt", "r")
    # print(type(translation['translatedText']))
    txt=f.read()
    f.close()   
    if(txt=="" or txt==" "):
      INPUT.delete('1.0', END)
      INPUT.insert(tkinter.INSERT,"Sorry, Try Again!!! ")
    else:
      Chat.insert(tkinter.INSERT,"\nGuest: "+ txt)
      INPUT.delete('1.0', END)
      INPUT.insert(tkinter.INSERT,"\nGuest: "+ txt)
      res(txt,lang)

def close_window(): 
    window.destroy()
    
    
window = tkinter.Tk()
window.title('The Bot')
window.geometry("550x550") 
window.resizable(0, 0)

#top = Frame(root)
#bottom = Frame(root)
#top.pack(side=TOP)
#bottom.pack(side=BOTTOM, fill=BOTH, expand=True)


head = Label ( window, height=3,width=50, relief='raised', bg='black',fg='white',text="Chatbot with in-build Voice")
INPUT= Text(window,width=40,height=3)
Chat= Text(window,width=40)
text=Button(window,activebackground='grey',bg='white',bd=4,command=retrieve_input,relief='raised',text='Text',height=2,width=4)
Record=Button(window,activebackground='grey',bg='white',bd=4,command=retrieve_audio,relief='raised',text='Record',height=2,width=4)
#play=Button(window,activebackground='grey',bg='white',bd=4,command=play,relief='raised',text='Play',height=2,width=4)
ext = Button (window, text = "Good-bye.",relief='raised', command = close_window)


head.grid(row=1, padx=60, pady=10,sticky=W+E+N+S,columnspan=2)

INPUT.grid(row=2,sticky=W,padx=10)

Record.grid(row=3,column=1, sticky=W,padx=0,pady=10)
Chat.grid(row=3,column=0,rowspan=3,sticky=W ,padx=10 )
text.grid(row=2,column=1, sticky=W,padx=0,pady=10)

#play.grid(row=3,column=0, sticky=E,padx=80,pady=10)


ext.grid(row=6,column=0,padx=80,pady=20,sticky=W+E+N+S)
#label.grid(row=2,column=0,padx=70,pady=5 ,sticky=N+E)


flag=True
intro="\nROBO: My name is Robo. I will answer your queries about Chatbots. If you want to exit, type Bye!"
print(intro)
Chat.insert(tkinter.INSERT,intro)




OPTIONS = [
"English-India",
"Bengali",
"Hindi"
]



lang_opt = StringVar(window)
lang_opt.set(OPTIONS[2]) # default value

w = OptionMenu(window, lang_opt, *OPTIONS)
w.grid(row=4,column=1, sticky=W,padx=0,pady=10)

# on change dropdown value
def change_dropdown(*args):
    global lang
    l = lang_opt.get()
    if l=="English-India":
      lang="en-In"
    elif l=="Bengali":
       lang="bn-In"
    else:
      lang="hi-IN"

# link function to change dropdown
lang_opt.trace('w', change_dropdown)




window.mainloop()













        

