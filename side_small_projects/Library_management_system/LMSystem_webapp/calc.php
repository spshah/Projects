<head>
<style>
table, th, td {
    border: 1px solid black;
}
</style>
</head>
<body>

<?php
  $to_search=false;


  
  $db=mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
  if ($db->connect_error)
   {
    die("Connection failed: " . $db->connect_error);
   }


  if (isset($_POST['submit_calc'])) 
   {
    
    $book_check_query = "SELECT * FROM FINE;";
    $result = mysqli_query($db, $book_check_query);
        echo "<div class=\"result_table\"><table><tr><th>CARD N0.</th><th>FINE</th></tr>";
    // output data of each row
   if(mysqli_num_rows($result) > 0 )
    {
       while($row = $result->fetch_assoc()) 
        {
           echo " <tr><td>".$row['card']."</td><td>".$row['fine']."</td><tr>";
        }
        echo "</div>";
    }
    else 
     {
      echo "0 results";
     }
    
  
}

    
       // header('Location:http://google.com');
     
 //  header('Location:https://yahoo.com');
  
//error_reporting(E_ALL | E_STRICT);  
//ini_set('display_startup_errors',1);  
//ini_set('display_errors',1);

?>

