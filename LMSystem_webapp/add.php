<?php include('connection.php') ?>
<?php

  $ierror=false;
  $perror=false;
  $qerror=false;
  $nerror=true;
  $res="";
  

  // database connection
  define('DB_SERVER','localhost');
  define('DB_USERNAME','root');
  define('DB_PASSWORD','pass1234');
  define('DB_DATABASE','libmanagesys');
  
  

  $db=mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
  if ($db->connect_error)
   {
    die("Connection failed: " . $db->connect_error);
   }
// login
if (isset($_POST['submit'])) 
{
  $isbn = mysqli_real_escape_string($db, $_POST['ISBN']);
  $name = mysqli_real_escape_string($db, $_POST['name']);
  $publisher = mysqli_real_escape_string($db, $_POST['pub']);
  $quantity = mysqli_real_escape_string($db, $_POST['quantity']);
  
  $book_check_query = "SELECT * FROM BOOK WHERE ISBN='$isbn';";
  $result = mysqli_query($db, $book_check_query);
  if(mysqli_num_rows($result) > 0 )
    {
     
    
      while($row = $result->fetch_assoc()) 
        {
           $book_check_query1 = "UPDATE BOOK SET quantity = quantity + '$quantity' , available = available + '$quantity' WHERE ISBN='$isbn';";
           $result1 = mysqli_query($db, $book_check_query1);
      
        }
       echo"<script>alert(\"Information added Succesfully\");</script>";
    }
      
    
  else{  
    $db=null;
    try {
//    $conn = new PDO("mysql:host=DB_SERVER;dbname=DB_DATABASE", DB_USERNAME, DB_PASSWORD);
    $user='root';$pass='pass1234';
    $conn = new PDO('mysql:host=localhost;dbname=libmanagesys', $user, $pass);
   // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO BOOK (Name, publisher, ISBN, quantity, available) 
  			  VALUES('$name', '$publisher','$isbn','$quantity','$quantity') ;";
    // use exec() because no results are returned
    $conn->exec($sql);
    echo"<script>alert(\"Information added Succesfully\");</script>";

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

