<?php
session_start();


//$firstname = "";
//$email    = "";
//$errors = array(); 

// database connection
  define('DB_SERVER','localhost');
  define('DB_USERNAME','root');
  define('DB_PASSWORD','pass1234');
  define('DB_DATABASE','libmanagesys');
  
  
  $fname_error="";
  $lname_error="";
  $mail_error="";
  $password_error="";
  $email_error="";
  
  $emerror=false;
  $perror=false;
  $merror=false;
  $lerror=false;
  $ferror=false;
  $error=false;
  
  $db=mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
  if ($db->connect_error)
   {
    die("Connection failed: " . $db->connect_error);
    array_push($errors, "Cannot connect to database"); 
   }
   
// Registration
if (isset($_POST['submit'])) 
{
  $firstname = mysqli_real_escape_string($db, $_POST['Firstname']);
  $lastname = mysqli_real_escape_string($db, $_POST['Lastname']);
  $email = mysqli_real_escape_string($db, $_POST['mail']);
  $password = mysqli_real_escape_string($db, $_POST['password']);

  // form validation and error checking
  if (empty($firstname)) 
  {
   $fname_error="Firstname is required"; 
   $ferror=true; 
   $error=true;  
  }
  if (empty($lastname)) 
  {
   $lname_error="Lastname is required";
   $lerror=true;
   $error=true;
  }
  if (empty($email)) 
  {
   $mail_error="Email is required";
   $merror=true; 
   $error=true;
  }
  if (empty($password)) 
  { 
  $password_error="Password is required";
  $perror=true;
  $error=true;
 }
  $user_check_query = "SELECT * FROM info WHERE email='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result); 
  if ($user) 
  {
    if ($user['email'] == $email)
     {
//      array_push($errors, "email already exists");
      $email_error="email already exists";
      $emerror=true;
      $error=true;
    }
  }
  if ($error==false)
   {
   $db=null;
   try {
//    $conn = new PDO("mysql:host=DB_SERVER;dbname=DB_DATABASE", DB_USERNAME, DB_PASSWORD);
    $user='root';$pass='pass1234';
    $conn = new PDO('mysql:host=localhost;dbname=libmanagesys', $user, $pass);
    echo "Logged in succesfully";
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $date = date('Y-m-d H:i:s');
    $sql = "INSERT INTO INFO VALUES('$firstname','$email','$password', '$lastname') ;";
    // use exec() because no results are returned
    $conn->exec($sql);
    echo "Logged in succesfully";
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
   
}
}

error_reporting(E_ALL | E_STRICT);  
ini_set('display_startup_errors',1);  
ini_set('display_errors',1);

?>
 
<?php //Report simple run errors error_reporting(E_ERROR | E_WARNING | E_PARSE); //Report E_NOTICE in addition to simple run errors //(to catch uninitialized variables or variable name misspellings) error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE); //Report all PHP errors error_reporting(-1); //Report all PHP errors (see changelog) error_reporting(E_ALL); //Turn off all error reports error_reporting(0); ?>
