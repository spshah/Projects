Set IE = CreateObject("InternetExplorer.Application")
IE.navigate "speednet.com/login"
IE.Visible = True

While IE.Busy
    WScript.Sleep 50
Wend
IE.InvokeMember("click")
