function validateForm_add() {
    var error = 1;
    var ISBN = document.forms["ADD"]["ISBN"].value;
    var name = document.forms["ADD"]["name"].value;
    var pub = document.forms["ADD"]["pub"].value;
    var quantity = document.forms["ADD"]["quantity"].value;
    if (ISBN == "") {
        
        document.getElementById("ISBN-error").innerHTML = "ISBN is required";  
        error = 0;
    }
    if (name == "") {
        
        document.getElementById("name-error").innerHTML = "Name is required";  
        error = 0;
    }
    if (pub == "") {
        
        document.getElementById("pub-error").innerHTML = "Publication name is required";  
        error = 0;
    }
    if (quantity == "") {
        
        document.getElementById("quantity-error").innerHTML = "Quantity is required";  
        error = 0;
    }
    if (error==0)
     {
       return false;
     }
    else
    {
       return true
    }

}

function validateForm_search() {
    var ISBN = document.forms["SEARCH"]["ISBN"].value;
    if (ISBN == "") {
        
        document.getElementById("ISBN-error_search").innerHTML = "ISBN is required";  
        return false;
     }
    else
     {
      return true;
     }
}

function validateForm_modify() {
    var error = 1;
    var ISBN = document.forms["MODIFY"]["ISBN"].value;
    var name = document.forms["MODIFY"]["name"].value;
    var pub = document.forms["MODIFY"]["pub"].value;
    var quantity = document.forms["MODIFY"]["quantity"].value;
    if (ISBN == "") {
        
        document.getElementById("modify-error").innerHTML = "ISBN is required";  
        error = 0;
    }
    else
    {
      if (name == "" && pub=="" && quantity =="") 
      {
        
        document.getElementById("modify-error").innerHTML = "Enter Information to modify";  
        error = 0;
      }
    }
    if (error==0)
     {
       return false;
     }
    else
    {
       return true;
    }

}

function validateForm_issue() {
    var error = 1;
    var ISBN = document.forms["ISSUE"]["ISBN"].value;
    var card = document.forms["ISSUE"]["card"].value;
    if (ISBN == "") {
        
        document.getElementById("issue-error-isbn").innerHTML = "ISBN is required";  
        error = 0;
    }
    else if (card == "") {
        
        document.getElementById("issue-error-card").innerHTML = "Card no. is required";  
        error = 0;
    }
    
    if (error==0)
     {
       return false;
     }
    else
    {
       return true
    }

}

function validateForm_deposit() {
    var error = 1;
    var ISBN = document.forms["DEPOSIT"]["ISBN"].value;
    var card = document.forms["DEPOSIT"]["card"].value;
    if (ISBN == "") {
        
        document.getElementById("deposit-error-isbn").innerHTML = "ISBN is required";  
        error = 0;
    }
    else if (card == "") {
        
        document.getElementById("deposit-error-card").innerHTML = "Card no. is required";  
        error = 0;
    }
    
    if (error==0)
     {
       return false;
     }
    else
    {
       return true
    }

}
function validateForm_calc() {
    var error = 1;
    var card = document.forms["calc"]["card"].value;
    if (card == "") {
        document.getElementById("calc-error").innerHTML = "Card no. is required";  
        error = 0;
    }
    
    if (error==0)
     {
       return false;
     }
    else
    {
       return true
    }

}


