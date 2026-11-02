<?php include('connection.php') ?>
<?php



  $db=mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
  if ($db->connect_error)
   {
    die("Connection failed: " . $db->connect_error);
   }
   
// ISSUE
if (isset($_POST['submit_deposit'])) 
{

  $isbn = mysqli_real_escape_string($db, $_POST['ISBN']);
  $card = mysqli_real_escape_string($db, $_POST['card']);
  $book_check_query = "SELECT * FROM ISSUE WHERE ISBN='$isbn';";
  $result = mysqli_query($db, $book_check_query);
  if(mysqli_num_rows($result) > 0 )
    {
     //$db=null;
     try{
           $user='root';$pass='pass1234';
           $conn = new PDO('mysql:host=localhost;dbname=libmanagesys', $user, $pass);
   // set the PDO error mode to exception
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           $set_date_query = "UPDATE ISSUE SET Returned_date = CURDATE();";
           $conn->exec($set_date_query);
           
           
         //  echo "<script>alert(\"date set\");</script>";
           
         
           $set_fine_query = "UPDATE ISSUE SET fine =  CASE WHEN DATEDIFF(CURDATE(),issue_date)-15 >-1  THEN DATEDIFF(CURDATE(),issue_date)-15 ELSE fine END WHERE ISBN ='$isbn' AND card='$card';";
           
           $conn->exec($set_fine_query);
          
           
        //  echo "<script>alert(\"fine set\");</script>";
           
           
           
           
           
       //    $info_query = "select * from ISSUE WHERE ISBN ='$isbn' AND card='$card';";
        //   $conn->exec($info_query);
       //    $conn->query($info_query);
           
           
       //    echo "<script>alert(\"\");</script>";
          
            $set_avai = "UPDATE BOOK SET  available = available + 1 WHERE ISBN='$isbn';";
            $conn->exec($set_avai);
            
            
            //echo "<script>alert(\"update available\");</script>";
            
            
           //$result1 = mysqli_query($db, $set_avai);
           //$set_fine = "UPDATE FINE SET  fine = fine +  WHERE ISBN='$isbn';";
            //$conn->exec($set_avai);
      
      //  $update_fine_query = "SELECT * FROM FINE WHERE card='$card';";
      
      $update_fine_query = "SELECT '$card' FROM FINE ;";
      $result = mysqli_query($db, $update_fine_query);
      $cnt = mysqli_num_rows($result);
     // echo "cnt ";
    //  echo $cnt;
      if( $cnt> 0 )
      
      {         
          //  echo "<script>alert(\"searched for card in fine\");</script>";

            
          //  if(mysqli_num_rows($rslt) > 0 )
           //  {
                $set_fine = "UPDATE FINE set fine = fine + (select fine from ISSUE WHERE card='$card' AND ISBN='$isbn');";
              //  echo "<script>alert(\"fine found\");</script>";
             }
             else
             {
               $set_fine = "INSERT INTO FINE (card,fine ) SELECT card , fine from ISSUE WHERE card='$card';";
              //  echo "<script>alert(\"fine not found\");</script>";
             }
            $conn->exec($set_fine);
            
        $del_book = "DELETE from ISSUE WHERE ISBN='$isbn' AND card='$card';";
        //   $conn->exec($del_book);
           
           
         //  echo "<script>alert(\"delete\");</script>";
      echo "<script>alert(\"Book Deposited\");</script>"; 
    }
    catch(PDOException $e)
    {
    echo "<br>" . $e->getMessage();
    }
     $db=null;
     $conn = null;
   }
   else
   {
      echo "<script>alert(\"No such Book Issued\");</script>"; 
   }
}    
  else
  {
    echo "<script>alert(\"Please enter correct ISBN\");</script>"; 
  }

error_reporting(E_ALL | E_STRICT);  
ini_set('display_startup_errors',1);  
ini_set('display_errors',1);

?>

       
     
     

