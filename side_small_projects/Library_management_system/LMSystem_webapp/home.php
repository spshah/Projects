<?php include('connection.php') ?>
<!--<?php include('add.php') ?>
<?php include('modify.php') ?>
<?php include('issue.php') ?>
-->  
<!doctype html>
<html lang="en">
 <head>
    <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="author" content="Shashi Prakash Shah">
  <meta name="description" content="Library Management System by Shashi as his personal project .">
  
  <title>Library Online</title>
 
 
   <!-- #Bootstrap Core CSS and JS-->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
   <link rel="stylesheet" text="text/css" href="./CSS/index.css">
   <!-- #Bootstrap JS-->
   <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
   
   <!-- #GOOGLE FONT -->
   <link rel="stylesheet" href="https://www.fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">
   

    <link rel="stylesheet" text="text/css" href="./CSS/home.css">
<!--     <script src="JS/js_home.js"></script> -->

<script src="JS/js_home.js"></script>
  <script src="JS/form_validation.js"></script>
 <head>

 <body onload="toggletabs()" >

<script>
function toggletabs() {
  var link1 = document.getElementById('SEARCH');
  var link2 = document.getElementById('MODIFY');
  var link3 = document.getElementById('DEPOSIT');
  var link4 = document.getElementById('CALCULATION');
  var link5 = document.getElementById('ISSUE');
 // link1.style.display = 'none'; //or
 // link1.style.visibility = 'hidden';
  //link2.style.display = 'none'; //or
 // link2.style.visibility = 'hidden';
 // link3.style.display = 'none'; //or
  //link3.style.visibility = 'hidden';
 // link4.style.display = 'none'; //or
 // link4.style.visibility = 'hidden';
 // link5.style.display = 'none'; //or
 // link5.style.visibility = 'hidden';

}
</script>


  <!-- navigation bar Starts -->
   <nav class="navbar navbar-dark bg-primary navbar-expand-lg sticky-top">   
    <a class="navbar-brand" href="#"><img src="./Data/images/logo.jpeg" width="45" height="40" class="d-inline-block align-center" alt="">  Libraryonline</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbaroptions" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
       <div class="collapse navbar-collapse" id="navbaroptions">
         <ul class="navbar-nav mr-auto">
          <li class="nav-item active"><a class="nav-link" href="index.html">Home </a></li>
          <li class="nav-item active"><a class="nav-link active" href="#">About us</a></li>
         </ul>   
         <ul class="nav navbar-nav  "> 
          
                 <?php if(isset($_SESSION['username'])){ echo "Welcome {$_SESSION['username']}";}?>
         </ul>
         
       </div><!-- Div nav-bar collapse end -->
    
  
   </nav><!-- end nav--> 
 
    <!--container starts -->
  <div class="container">
  
   <div class="tab">
  <button class="tablinks" onclick="Lib_form(event, 'ADD')">Add</button>
  <button class="tablinks" onclick="Lib_form(event, 'SEARCH')">Search</button>
  <button class="tablinks" onclick="Lib_form(event, 'MODIFY')">Modify</button>
  <button class="tablinks" onclick="Lib_form(event, 'ISSUE')">Issue</button>
  <button class="tablinks" onclick="Lib_form(event, 'DEPOSIT')">Deposit</button>
  <button class="tablinks" onclick="Lib_form(event, 'CALCULATION')">Fine calculation</button>
</div>

                
<div id="ADD" class="tabcontent" style="display: inline;padding-left: 55px;">
<h3>ADD BOOK</h3>
  <div class="row">
    <div class="col-lg-6">
           <div class="libform">
              <form name="ADD" method="post" action="add.php" onsubmit="return validateForm_add()">
                 <label for="ISBN">ISBN:</label>
                 <input type="text" class="form-control" name="ISBN" placeholder="9780070636774">

                 <p id="ISBN-error" class = "error"></p>
         
                 <label for="NAME">NAME:</label>
                 <input type="text" class="form-control" name="name" placeholder="The Complete Reference JAVA">

                 <p id="name-error" class="error"></p>
         
                 <label for="PUB">PUBLISHER:</label>
                 <input type="text" class="form-control" name="pub" placeholder="TATA McGRAW-HILL">

                 <p id="pub-error" class="error"></p>
         
                 <label for="ISBN">Quantity:</label>
                 <input type="text" class="form-control" name="quantity" placeholder="10">

                 <p id="quantity-error" class="error"></p>
         
                 <button type="submit" name="submit" class="btn btn-primary">Submit</button>
              </form>
           </div>
    </div>        
  </div>
</div>
<div id="SEARCH" class="tabcontent" style="display: inline;padding-left: 55px;">
  <h3>SEARCH BOOK</h3>
  <div class="row">
    <div class="col-lg-6">
           <div class="libform">
              <form id="searchform"name="SEARCH" method="post" action="home.php" onsubmit="return validateForm_search()">
                 <label for="ISBN">ISBN:</label>
                 <input type="text" class="form-control" name="ISBN" id="ISBN_search" placeholder="9780070636774">

                 <p id="ISBN-error_search" class = "error"></p>
                 <button type="submit" name="submit_search" class="btn btn-primary">Submit</button>
              </form>
           </div>
           <?php include('search.php') ?>

    </div>        
  </div>
</div>
<div id="MODIFY" class="tabcontent" style="display: inline;padding-left: 55px;">
  <h3>MODIFY</h3>
  <div class="row">
     <div class="col-lg-6">
           <div class="libform">
              
              <form name="MODIFY" method="post" action="modify.php" onsubmit="return validateForm_modify()">
                 <label for="ISBN" required="required">ISBN <span class="mandatory"> * </span> :</label>
                 <input type="text" class="form-control" name="ISBN" placeholder="9780070636774">
                 <p id="modify-error" class = "error"></p>
                 </br></br></br>
                 <label for="NAME">NAME:</label>
                 <input type="text" class="form-control" name="name" placeholder="The Complete Reference JAVA">
                 <label for="PUB">PUBLISHER:</label>
                 <input type="text" class="form-control" name="pub" placeholder="TATA McGRAW-HILL">
                 <label for="ISBN">Quantity:</label>
                 <input type="text" class="form-control" name="quantity" placeholder="10">
                 <button type="submit" name="submit_modify" class="btn btn-primary">Submit</button>
              </form>
           </div>
     </div>        
  </div>
</div>
<div id="ISSUE" class="tabcontent" style="display: inline;padding-left: 55px;">
  <h3>ISSUE</h3>
  <div class="row">
        <div class="col-lg-6">
           <div class="libform">
              <form name="ISSUE" method="post" action="issue.php" onsubmit="return validateForm_issue()">
                 <label for="ISBN">ISBN:</label>
                 <input type="text" class="form-control" name="ISBN" id="ISBN" placeholder="9780070636774">
                 <p id="issue-error-isbn" class = "error"></p>
                 <label for="C_No">Card no:</label>
                 <input type="text" class="form-control" name="card" id="card" placeholder="123456">
                 <p id="issue-error-card" class = "error"></p>
                 <button type="submit" name="submit_issue" class="btn btn-primary">ISSUE</button>
            </form>
         </div>
      </div>
    </div>
</div>

<div id="DEPOSIT" class="tabcontent" style="display: inline;padding-left: 55px;">
  <h3>DEPOSIT</h3>
  <div class="row">
        <div class="col-lg-6">
           <div class="libform">
              <form name="DEPOSIT" method="post" onsubmit="return validateForm_deposit()" action="deposit.php">
                 <label for="ISBN">ISBN:</label>
                 <input type="text" class="form-control" name="ISBN" id="ISBN" placeholder="9780070636774">
                 <p id="deposit-error-isbn" class = "error"></p>
                 <label for="C_No">Card no:</label>
                 <input type="text" class="form-control" name="card" id="card" placeholder="123456">
                 <p id="deposit-error-card" class = "error"></p>
                 <button type="submit" name="submit_deposit" class="btn btn-primary">Deposit</button>
            </form>
            
            
         </div>
      </div>
    </div>
</div>

<div id="CALCULATION" class="tabcontent" style="display: inline;padding-left: 55px;">
  <h3>FINE CALCULATION</h3>
  <div class="row">
        <div class="col-lg-6">
           <div class="libform">
              <form name="calc" method="post" action="home.php" onsubmit="return validateForm_calc()">
                 <label for="C_No">Card no:</label>
                 <input type="text" class="form-control" name="card" id="card" placeholder="123456">
                 <p id="calc-error" class = "error"></p>
                 <button type="submit" name="submit_calc" class="btn btn-primary">Calculate</button>
            </form>
         </div>
          <?php include('calc.php') ?>
      </div>
    </div>
</div>
  
  

  </div><!--container ends -->
  </body>
</html>
