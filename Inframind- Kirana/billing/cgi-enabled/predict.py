#!/home/Shashi/anaconda3/bin/python
# enable debugging
import cgitb
from model import *
cgitb.enable()
print ("Content-Type: text/html\r\n\r\n")
#print ('Content-Type: application/json\n\n')
#print ("Hello World!")
import sys, os, io

def run():
    predict = prediction_model()
    #print("choose \n1.create model\n2.predict")
    k=2
    if k==1:
        print("creating dataset\n\n\n\n\n\n")
        predict.create_dataset()
        print("\n\n\n\n\creating network")
        predict.create_network()
        predict.train()
    else:
        #print("\n\n\n prediction \n\n\n\n\n\n\n\n\n\n")
        predict.create_network()
        #print("network created")
        msg = predict.predict()
        print(json.dumps(msg))
        #print("<div id=\"message\"></div>")
        #print("<script type=\"text/javascript\"> document.getElementById(\"message\").innerHTML =",msg,";")
        #print(" var obj = JSON.parse(text); </script>")
        #print("completed")
run()
#print(os.environ.get('QUERY_STRING'))


