<?php include('connection.php') ?>
<?php


  $db=mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
  if ($db->connect_error)
   {
    die("Connection failed: " . $db->connect_error);
   }
   
  $name = "";
  $publisher = "";
  $quantity = "";
  $m=false;
   
// MODIFY
if (isset($_POST['submit_modify'])) 
{
  $isbn = mysqli_real_escape_string($db, $_POST['ISBN']);
  $name = mysqli_real_escape_string($db, $_POST['name']);
  $publisher = mysqli_real_escape_string($db, $_POST['pub']);
  $quantity = mysqli_real_escape_string($db, $_POST['quantity']);
  $book_check_query = "SELECT * FROM BOOK WHERE ISBN='$isbn';";
  $result = mysqli_query($db, $book_check_query);
  if(mysqli_num_rows($result) > 0 )
    {
  if(empty($name))
   {}
  else
   {
     $book_name_update_query = "UPDATE BOOK SET Name = '$name' WHERE ISBN='$isbn';";
     $result1 = mysqli_query($db, $book_name_update_query);
     $m=true;
   
   }
   if(empty($publisher))
   {}
  else
   {
     $book_publisher_update_query = "UPDATE BOOK SET publisher = '$publisher' WHERE ISBN='$isbn';";
     $result2 = mysqli_query($db, $book_publisher_update_query);
     $m=true;
   
   }
   if(empty($quantity))
   {}
  else
   {
     $book_quantity_update_query = "UPDATE BOOK SET available = available + '$quantity'- quantity, quantity = '$quantity'   WHERE ISBN='$isbn';";
     $result3 = mysqli_query($db, $book_quantity_update_query);
     $m=true;
   }
     if($m==true)    
      { echo "<script>alert(\"Information modified Succesfully\");</script>";
      }
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

