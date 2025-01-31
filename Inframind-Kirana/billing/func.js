var product = {"Colgate-large":{"ID":"COL-L","Name":"Colgate:100gm","Rate":"30"},
 "Colgate-small":{"ID":"COL-S","Name":"Colgate:50gm","Rate":"10"},
 "Kitkat-large":{"ID":"KIT-L","Name":"Kitkat:35gm","Rate":"45"},
 "Kitkat-medium":{"ID":"KIT-M","Name":"Kitkat:25gm","Rate":"25"},
 "Kitkat-small":{"ID":"KIT-S","Name":"Kitkat:10gm","Rate":"10"},
 "Dettol-small":{"ID":"DET-S","Name":"Dettol:100ml","Rate":"50"}};

var serial = 1
var link;
function add_item(item)
{
  console.log(item)
  var table = document.getElementById("myTable");
  var row = table.insertRow(serial);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  cell1.innerHTML = serial
  cell2.innerHTML = item["ID"]
  cell3.innerHTML = item["Name"]
  cell4.innerHTML = "1";
  cell5.innerHTML = item["Rate"]
  cell6.innerHTML = item["Rate"]
  serial=serial+1;
  if(serial==2)
  {
    document.getElementById("pay").style.setProperty("display","block");
  }
}

function run() { 
console.log("inside run")   
    var site = "https://localhost/billing/cgi-enabled/predict.py";
    console.log(site);
    document.getElementById("frame").innerHTML ="<iframe  id='frame' name='frame' src='" + site + "' width='200'  height='300'   allowfullscreen></iframe>"
    document.getElementsByClassName("spinner")[0].style.display="block";
    $('iframe').on('load', function()
     {
        var k = window.frames[0].document.body.childNodes[0].innerHTML;
        console.log(k);
        var k = JSON.parse(k);
        for (i = 0; i < k.length; i++) { 
         var product_name = k[i].label;
         // console.log(product_name)
          var item = product[product_name]
          add_item(item)
          }
        document.getElementsByClassName("spinner")[0].style.display="none";
        
     });
    
}

function prepareImg() {
   var canvas = document.getElementById('canvas');
   document.getElementById('inp_img').value = canvas.toDataURL();
}
function onbodyload(){

   document.getElementsByClassName("contentarea")[0].style.display="none";
   document.getElementById("pay").style.display="none";
   document.getElementsByClassName("spinner")[0].style.display="none";
   
  }
function getAmount()
{
   var i=1;
   var table = document.getElementById("myTable");
   var amount = 0;
   while(i<serial)
   {
     amount = amount + parseInt(table.rows[i].cells[5].innerHTML);
     console.log(amount);
     i = i+1;
   }
   document.getElementById("item_addition").style.display="none";
   return amount;
}
function payment(){

  var node = document.getElementsByClassName("invoice")[0];
  var result = document.createElement("span");
  node.appendChild(result);
  result.setAttribute("id", "result"); 
  document.getElementById("result").style.padding = "0% 0% 0% 90%";
  //document.getElementById("result").style.font-size= "150%";
  
  var Amount = getAmount();
  var textnode = document.createTextNode("Total: " + Amount);         // Create a text node
  result.appendChild(textnode);
  
  
}

