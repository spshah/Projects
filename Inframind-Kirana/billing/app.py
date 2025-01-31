
#!/usr/bin/env python3
import cgitb
cgitb.enable()    

print()    
print(“Hello World!”)
f= open("guru99.txt","w+")
#f=open("guru99.txt","a+")
for i in range(10):
         f.write("This is line %d\r\n" % (i+1))
f.close() 
