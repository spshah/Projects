from functions import *
from Tkinter import *
import Tkinter

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/Shashi/My First Project-ff14ceed11f5.json"
os.environ["https_proxy"] = "http://192.168.0.20:3128"





def retrieve_input():
    text = INPUT.get("1.0",'end');
    txttospeech(text)

def retrieve_audio():
    print("2"+ conv_text)
    speechtotxt()
    f = open("convertedtext1.txt", "r")
    # print(type(translation['translatedText']))
    txt=f.read()
    f.close()
    INPUT.delete('1.0', END)
    if(txt=="" or txt==" "):
      INPUT.insert(Tkinter.INSERT,"Sorry, Try Again!!! ")
    else:
      txt="Converted Text: " + txt
      INPUT.insert(Tkinter.INSERT,txt)

def play():
    print("Playing audio!!!")
    cmd='play output.flac'
    os.system(cmd)
window = Tkinter.Tk()
window.title('The Translator')
window.geometry("550x300") 
window.resizable(0, 0)

#top = Frame(root)
#bottom = Frame(root)
#top.pack(side=TOP)
#bottom.pack(side=BOTTOM, fill=BOTH, expand=True)


head = Label ( window, height=3,width=50, relief='raised', bg='black',fg='white',text="Translation from Bengali Voice to English Text and Vice versa")
INPUT= Text(window,width=50,height=8)
#INPUT.grid(row=2,column=3)
head.grid(row=1)
INPUT.grid(row=3)
#head.pack(in_=top, side=LEFT, fill=BOTH, expand=True)
#INPUT.pack(in_=top, side=LEFT, fill=BOTH, expand=True)
translate=Button(window,activebackground='grey',bg='white',bd=4,command=retrieve_input,relief='raised',text='Translate',height=2,width=4)
record=Button(window,activebackground='grey',bg='white',bd=4,command=retrieve_audio,relief='raised',text='Record',height=2,width=4)
record.grid(row=5,column=0, sticky=W)
translate.grid(row=5,column=1, sticky=W)
play=Button(window,activebackground='grey',bg='white',bd=4,command=play,relief='raised',text='Play',height=2,width=4)
play.grid(row=5,column=2, sticky=W)
#INPUT.insert(Tkinter.INSERT,conv_text)
#record.pack()
#translate.pack()
window.mainloop()




