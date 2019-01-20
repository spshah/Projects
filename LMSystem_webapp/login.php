<?php include('login_server.php') ?>

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
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   
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
                    }
                    
            body {
                   background-image: url("./Data/images/login.jpeg");
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
                       top: 500%;
                       margin:20px;
                      }
            
   </style>
   
 <head>

<body style="height: 100%;">
  <!-- navigation bar Starts -->
   <nav class="navbar navbar-dark bg-primary navbar-expand-lg sticky-top">   
     <a class="navbar-brand" href="#"><img src="./Data/images/logo.jpeg" width="45" height="40" class="d-inline-block" alt=""> Libraryonline</a>
   </nav><!-- end nav--> 
   
   <!-- container starts-->
<div class="container" style="padding-top: 100">
    <div class="row">
     <div class="col-lg-3"></div>
        <div class="col-lg-6">
              <form method="post" action="login.php">
              <div class="form-group">
                 <div class ="compact">
                 <h3 align="center">LOGIN</h3></br>
                            <div class="form_error"><?php  if($error==true): ?>
                                 <span><?php echo $errorm ?></span>
                                 <?php endif ?>
                            </div><!--form-error ends-->
                  <label for="InputEmail">Email address</label>
                  <input type="email" class="form-control" name="mail" id="InputEmail1" aria-describedby="emailHelp" placeholder="something@example.com">
                      
                            <div class="form_error"> <?php  if($merror==true): ?>
                                 <span><?php echo $mail_error ?></span>
                                 <?php endif ?>
                            </div><!--form-error ends-->
                 
                  <label for="Password">Password</label>
                  <input type="password" class="form-control" name="password" id="exampleInputPassword1" placeholder="Password">
                  
                            <div class="form_error"> <?php if($perror==true): ?>
                                 <span><?php echo $password_error ?></span>
                                 <?php endif ?>
                            </div><!--form-error ends-->

                      </br>
                   <button type="submit" name="submit" class="btn btn-primary" style="margin:20px;">Submit</button>
                   <button type="submit" name="guest"  class="btn btn-secondary"style="margin:20px;">GUEST</button>  
                 </div><!--compact ends-->
                 </div><!--form-group ends-->                  
            </form>
            <div class="text-center" style="margin: 25px; color: white;"><small>Not registered yet?</small>&nbsp;<a href="reg.php">Register</a> </div>
        </div><!--col-lg-6 ends-->
        <div class="col-lg-3"></div>
    </div><!--row ends-->
  </div><!--container ends-->
  </div>
  <!-- FOOTER -->
      <footer style="height:40px; width:100%; background-color: #232F3F">
        <p style="color: white; text-align: center; padding: 5px 0px 0px 0px"> By Shashi prakash Shah   <a href="#" class="fa fa-facebook"></a>  
        <a href="#" class="fa fa-linkedin"></a></p>
			
      </footer>
        



<script src="public/js/libs/jquery-2.1.1.min.js"></script>
<script src="public/js/libs/jquery-ui-1.10.3.min.js"></script>

<script src="public/js/bootstrap/bootstrap.min.js"></script>
<script src="public/js/plugins/jquery-validate/jquery.validate.min.js"></script>  

</body>
</html>
