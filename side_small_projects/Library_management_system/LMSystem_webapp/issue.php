<?php include('connection.php') ?>
<?php


define('DB_SERVER','localhost');
  define('DB_USERNAME','root');
  define('DB_PASSWORD','pass1234');
  define('DB_DATABASE','libmanagesys');

  $db=mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
  if ($db->connect_error)
   {
    die("Connection failed: " . $db->connect_error);
   }
   
// ISSUE
if (isset($_POST['submit_issue'])) 
{
  $isbn = mysqli_real_escape_string($db, $_POST['ISBN']);
  $card = mysqli_real_escape_string($db, $_POST['card']);
  $book_check_query = "SELECT * FROM BOOK WHERE ISBN='$isbn';";
  $result = mysqli_query($db, $book_check_query);
  if(mysqli_num_rows($result) > 0 )
    {
     $db=null;
    try {
//    $conn = new PDO("mysql:host=DB_SERVER;dbname=DB_DATABASE", DB_USERNAME, DB_PASSWORD);
    $user='root';$pass='pass1234';
    $conn = new PDO('mysql:host=localhost;dbname=libmanagesys', $user, $pass);
   // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO ISSUE (ISBN, card, issue_date) 
  			  VALUES('$isbn', '$card',CURDATE()) ;";
    // use exec() because no results are returned
    $conn->exec($sql);
    $book_check_query1 = "UPDATE BOOK SET available = available - 1 WHERE ISBN='$isbn';";
              $conn->exec( $book_check_query1);
          // $result1 = mysqli_query($db, $book_check_query1);
      
    echo"<script>alert(\"Book Issued Succesfully\");</script>";

    }
    catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }
    
     $conn = null;
   }
    
  else
  {
    echo "<script>alert(\"Please enter correct ISBN\");</script>"; 
  }
}
error_reporting(E_ALL | E_STRICT);  
ini_set('display_startup_errors',1);  
ini_set('display_errors',1);

?>

