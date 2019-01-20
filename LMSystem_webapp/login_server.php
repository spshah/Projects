<?php
session_start();


// database connection
  define('DB_SERVER','localhost');
  define('DB_USERNAME','root');
  define('DB_PASSWORD','pass1234');
  define('DB_DATABASE','libmanagesys');
  
 
  
  
  $error=false;
  $perror=false;
  $merror=false;
  
  $db=mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
  if ($db->connect_error)
   {
    die("Connection failed: " . $db->connect_error);
   }
   
// login
if (isset($_POST['guest'])) 
{
 $user='root';$pass='pass1234';
    $conn = new PDO('mysql:host=localhost;dbname=libmanagesys', $user, $pass);
   // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $_SESSION['username']='Guest'; 
    header('Location: home.php');   
}
if (isset($_POST['submit'])) 
{
  $email = mysqli_real_escape_string($db, $_POST['mail']);
  $password = mysqli_real_escape_string($db, $_POST['password']);

  // form validation and error checking
  if (empty($email)) 
  {
   $mail_error="Email is required";
   $merror=true; 
  }
  if (empty($password)) 
  { 
  $password_error="Password is required";
  $perror=true;
  }
  
  $user_check_query = "SELECT * FROM INFO WHERE email='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result); 


  


  if ($user) 
  { 
    if ($user['email'] == $email && $user['password'] == $password)
     {
          $_SESSION['username']=$user['Name']; 
          header('Location:home.php');
     }
    if ($user['email'] == $email && $user['password'] !== $password){
     $errorm="Invalid Credentials";
     $error=true;
     
      }
  }
  else{
     $errorm="email not registered.";
     $error=true;
     
      }
}

error_reporting(E_ALL | E_STRICT);  
ini_set('display_startup_errors',1);  
ini_set('display_errors',1);

?>
