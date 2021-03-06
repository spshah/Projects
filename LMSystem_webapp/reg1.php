<?php include('server.php') ?>

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
   <script src='https://www.google.com/recaptcha/api.js'></script>
   
   
   
   <style> .form_error span {
                             width: 80%; height: 20px; margin: 3px 10%; font-size: 1.1em; color: #D83D5A;
                            } 
           .compact {
                         /* border: 1px solid #427df4; */
                          padding: 20px 20px 20px 20px; 
                          margin :20%;
                          color: white;   
                    }
                    
            body {
                   background-color: #223E4A;
                   background-position: center;
                   background-repeat: no-repeat;
                   background-size: cover;
                   height: 100%;
                 }
            body,html
                      {
                        height:100%;
                      }
            .button   {
                       position: absolute;
                       top: 50%;
                       margin:20px;
                      }
            
   </style>
   
   
   
 <head>
 



    <body>

    
      <!-- navigation bar Starts -->
   <nav class="navbar navbar-dark bg-primary navbar-expand-lg sticky-top">   
    <a class="navbar-brand" href="#"><img src="./Data/images/logo.jpeg" width="45" height="40" class="d-inline-block align-center" alt="">  Libraryonline</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbaroptions" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
       <div class="collapse navbar-collapse" id="navbaroptions">
         <ul class="navbar-nav mr-auto">
          <li class="nav-item active"><a class="nav-link" href="index.html">Home </a></li>
          <li class="nav-item active"><a class="nav-link active" href="#">About us</a></li>
  
<!--     <div  align="right" >
      <li class="nav-item dropdown" >
         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
         </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
      </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
-->      </ul>   
         <form class="form-inline ">
          <input class="form-control " type="search" placeholder="Search" aria-label="Search">
          <button class="btn  btn-success" type="submit">Search</button>
         </form>
         <ul class="nav navbar-nav  "> 
          <li class="nav-item"><a class="nav-link active" href="login.php"><button class="btn btn-secondary" type="submit">Sign in</button></a></li>
        </ul>
       </div><!-- Div nav-bar collapse end -->
    
  
   </nav><!-- end nav--> 
	 	
	 	<!--container starts-->
  <div class="container" style="padding: 100">
    <div class="row">
     <div class="col-lg-3"></div>
        <div class="col-lg-6">
              <form method="post" action="reg.php">
                <div class="form-group">
                   <div class="compact">
                     <h3 align="center">Registration</h3></br>
                     <label for="Name">First name</label>
                     <input type="text" class="form-control" name="Firstname" placeholder="First name" >
                                <div class="form_error" <?php if($ferror==true): ?>>
                                <span><?php echo $fname_error ?></span>
                                <?php endif ?>
                                </div> 
                    <label for="Name1">Last name</label>
                    <input type="text" class="form-control" name="Lastname" placeholder="Last name">
                                <div class="form_error" <?php if($lerror==true): ?>>  
                                <span><?php echo $lname_error ?></span>
                                <?php endif ?>
                       	        </div> 
                    <label for="InputEmail">Email address</label>
                    <input type="email" class="form-control" name="mail" id="InputEmail1" aria-describedby="emailHelp" placeholder="something@example.com">
                 		<div class="form_error" <?php  if($emerror==true): ?>>
                      		<span><?php echo $email_error ?>
                      		</span><?php endif ?>
                 		</div> 
                 		   
                 		<div class="form_error" <?php  if($mail_error==true): ?>>
                      		<span><?php echo $mail_error ?></span>
                      		<?php endif ?>
                 		</div>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    <label for="Password">Password</label>
                    <input type="password" class="form-control" name="password" id="Password" placeholder="Password">
                 		<div class="form_error" <?php if($password_error==true): ?>>
                      		<span><?php echo $password_error ?></span>
                      		<?php endif ?>
                 		</div>
                   </div><!--compact ends-->
                 </div><!--form-group ends-->
              </br>
              
                  <div align ="center"><button type="submit" name="submit" class="btn btn-primary">Submit</button><div>
              </form>
                </br>
                <div class="text-center"><small>Already registered?</small>&nbsp;<a href="login.php">Log in</a> </div>
     </div>
   </div>
     </div>

    </body>
</html>

<!--<?php include('errors.php') ?>




