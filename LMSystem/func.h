//Clear screen 
void cls (  )
{
  int i = 25  ;
  while (  i--  )
    printf (  "\n\n\n"  )  ;
}
 
  
//Add book in database  
  
void add_book (  MYSQL *connect  ,  MYSQL_RES *res  ,  MYSQL_ROW row  )
{
   struct BOOK book  ;
   printf ( "\n ISBN:\t " )  ;
   scanf ( "%s" , book.ISBN )  ;
   printf ( "\n NAME:\t " )  ;
   scanf ( "%s" , book.name )  ;
   printf ( "\n Publisher:\t " )  ;
   scanf ( "%s" , book.publisher )  ;
   printf ( "\n Quantity:\t " )  ;
   scanf ( "%d" , &book.quantity )  ;
   
   
   //changing quantity from int to string
   int temp , i = 0 , j  ;
   char quantity[10]  ;
   while ( book.quantity )
   {
     quantity[i++]= ( char ) (  ( book.quantity%10 )+48 )  ;
     book.quantity/=10  ;
   }
   //reverse of string
   temp=i  ;
   for ( i=0  ;i<temp/2  ;i++ )
   {
     j=quantity[i]  ;
     quantity[i]=quantity[temp-i-1]  ;
     quantity[temp-i-1]=j  ;
   }
   quantity[temp]='\0'  ;   
   
   
   //constructing query for insertion
   memset (  query ,  0 ,  sizeof ( query )  )  ;
   strcat ( query ,  " INSERT INTO BOOK VALUES (  '" )  ;
   strcat ( query ,  book.name  )  ;
   strcat ( query ,  "'  ,  '" )  ;
   strcat ( query ,  book.publisher  )  ;
   strcat ( query ,  "'  ,  '" )  ;
   strcat ( query ,  book.ISBN  )  ;
   strcat ( query ,  "'  ,  '" )  ;
   strcat ( query ,  quantity )  ;
   strcat ( query ,  "'  ,  '" )  ;
   strcat ( query ,  quantity )  ;
   strcat ( query ,  "' )  ;" )  ;
   
//   perror ( query )  ;
   
   //running query
   if  ( mysql_query ( connect ,  query ) ) {
   printf ( "%s\n" ,  mysql_error ( connect ) )  ;
		exit ( 1 )  ;
	
   }
   
   memset (  query ,  0 ,  sizeof ( query )  )  ;
   strcat ( query ,  "select * from BOOK WHERE ISBN=" )  ;
   strcat ( query ,  book.ISBN  )  ;
   strcat ( query ,  "   ;" )  ;
//   perror ( query )  ;
   
   if  ( mysql_query ( connect ,  query ) ) {
  
		printf ( "%s\n" ,  mysql_error ( connect ) )  ;
		exit ( 1 )  ;
	}
	 
  res = mysql_use_result ( connect )  ;
  // output table name 
  printf ( "\n\tInformation added:\n" )  ;
   
	while  (  ( row = mysql_fetch_row ( res ) ) != NULL )
		 printf ( "\nName:\t%s\nPublisher:\t%s\nISBN:\t%s\nQuantity:\t%s \n" ,  row[0] ,  row[1] ,  row[2] ,  row[3] )  ;
   
   printf ( "\n\n\t\tThe record is sucessfully added\n\n" )  ;
   while(1)
   {
    printf("Press y to continue:");
    scanf("%c",&ch);
    if(ch=='y')
      break;
   }
   mysql_free_result ( res )  ;
}














void search_book ( MYSQL *connect ,  MYSQL_RES *res ,  MYSQL_ROW row )
{
   struct BOOK book  ;
   printf ( "\n ISBN:\t " )  ;
   scanf ( "%s" , book.ISBN )  ;

   memset ( query ,  0 ,  sizeof ( query )  )  ;
   strcat ( query ,  "select * from BOOK WHERE ISBN=" )  ;
   strcat ( query ,  book.ISBN  )  ;
   strcat ( query ,  "  ;" )  ;
//   perror ( query )  ;
   
   if  ( mysql_query ( connect ,  query ) != 0 ) {
  printf ( "%s\n" ,  mysql_error ( connect ) )  ;
   exit ( -1 )  ;
	
   }
  res = mysql_use_result ( connect )  ;
  //checking
 if (  ( row =mysql_fetch_row ( res ) ) != NULL )
   {
      printf ( "Following information is available:\n" )  ;
      printf ( "Name:\t%s\n\nPublisher:\t%s\n\nISBN:\t%s\n\nQuantity:\t%s\n\nAvailable:\t%s\n" ,  row[0] ,  row[1] ,  row[2] ,  row[3] ,  row[4] )  ;
 //    while  (  ( row = mysql_fetch_row ( res ) ) != NULL )
//		printf ( "Name:\t%s\nPublisher:\t%s\nISBN:\t%s\nQuantity:\t%s \n" ,  row[0] ,  row[1] ,  row[2] ,  row[3] )  ;
      mysql_free_result ( res )  ;
   }
  else
    printf ( "Book not available\n" )  ;
   
  }
  
  
  
  
  

void mod_book ( MYSQL *connect ,  MYSQL_RES *res ,  MYSQL_ROW row )
{
   struct BOOK book , book1  ;
   int ch  ;
   
   printf ( "\nUPDATE:\n\t1.ISBN\n\t2.Name\n\t3.Publisher\n\t4.Quantity\n\t\tChoice:\t" )  ;
   scanf ( "%d" , &ch )  ;
   memset (  query ,  0 ,  sizeof ( query )  )  ;
   switch ( ch ) {
   
   case 1:
       
       printf ( "\n OLD ISBN:\t " )  ;
       scanf ( "%s" , book.ISBN )  ;
       printf ( "\n NEW ISBN:\t " )  ;
       scanf ( "%s" , book1.ISBN )  ;
       strcat ( query ,  "SELECT * from BOOK WHERE ISBN='" )  ;
       strcat ( query ,  book.ISBN  )  ;
       strcat ( query ,  "'" )  ;
       if  ( mysql_query ( connect ,  query ) != 0 )
          {
            printf ( "%s\n" ,  mysql_error ( connect ) )  ;
            break  ;
	  } 
        res = mysql_store_result ( connect )  ;
        mysql_free_result ( res )  ;
       // the current connection handler to knows that it's okay to execute another query
       //for (   ; mysql_next_result ( connect ) == 0  ; ) 
           /* do nothing */  ;
       memset (  query ,  0 ,  sizeof ( query )  )  ;
       printf ( "\nUpdate start" )  ; 
       strcat ( query ,  "UPDATE BOOK SET ISBN = '" )  ;
       strcat ( query ,  book1.ISBN  )  ;
       strcat ( query ,  "' WHERE ISBN ='" )  ;
       strcat ( query ,  book.ISBN  )  ;
       strcat ( query ,  "'  ;" )  ;
//       perror ( query )  ;
       printf ( "\nUpdate end" )  ; 
       if  ( mysql_query ( connect ,  query ) != 0 )
          {
            printf ( "%s\n" ,  mysql_error ( connect ) )  ;
            exit ( -1 )  ;
	  }
	res = mysql_store_result ( connect )  ;
        mysql_free_result ( res )  ;
	break  ;
   case 2:
       printf ( "\n ISBN:\t " )  ;
       scanf ( "%s" , book.ISBN )  ;
       printf ( "\n NEW Name:\t " )  ;
       scanf ( "%s" , book1.name )  ;
       memset (  query ,  0 ,  sizeof ( query )  )  ;
       strcat ( query ,  "select * from BOOK WHERE ISBN='" )  ;
       strcat ( query ,  book.ISBN  )  ;
       strcat ( query ,  "'" )  ;
       if  ( mysql_query ( connect ,  query ) != 0 )
          {
            printf ( "%s\n" ,  mysql_error ( connect ) )  ;
            break  ;
	  } 
       res = mysql_store_result ( connect )  ;
       mysql_free_result ( res )  ;  
       memset (  query ,  0 ,  sizeof ( query )  )  ;
       strcat ( query ,  "UPDATE BOOK SET Name = '" )  ;
       strcat ( query ,  book1.name  )  ;
       strcat ( query ,  "' WHERE ISBN ='" )  ;
       strcat ( query ,  book.ISBN  )  ;
       strcat ( query ,  "'  ;" )  ;
//       perror ( query )  ;
       if  ( mysql_query ( connect ,  query ) != 0 )
          {
            printf ( "%s\n" ,  mysql_error ( connect ) )  ;
            break  ;
	  }
	res = mysql_store_result ( connect )  ;
        mysql_free_result ( res )  ;
	break  ;
   case 3:
       printf ( "\n ISBN:\t " )  ;
       scanf ( "%s" , book.ISBN )  ;
       printf ( "\n NEW Publisher:\t " )  ;
       scanf ( "%s" , book1.publisher )  ;
       memset (  query ,  0 ,  sizeof ( query )  )  ;
       strcat ( query ,  "select * from BOOK WHERE ISBN='" )  ;
       strcat ( query ,  book.ISBN  )  ;
       strcat ( query ,  "'" )  ;
       if  ( mysql_query ( connect ,  query ) != 0 )
          {
            printf ( "%s\n" ,  mysql_error ( connect ) )  ;
            break  ;
	  }
	res = mysql_store_result ( connect )  ;
        mysql_free_result ( res )  ;  
        printf ( "\nUpdate start" )  ; 
       memset (  query ,  0 ,  sizeof ( query )  )  ;
       strcat ( query ,  "UPDATE BOOK SET publisher = '" )  ;
       strcat ( query ,  book1.publisher  )  ;
       strcat ( query ,  "' WHERE ISBN ='" )  ;
       strcat ( query ,  book.ISBN  )  ;
       strcat ( query ,  "'  ;" )  ;
//       perror ( query )  ;
       printf ( "\nend" )  ;
       if  ( mysql_query ( connect ,  query ) != 0 )
          {
            printf ( "%s\n" ,  mysql_error ( connect ) )  ;
            break  ;
	  }
	res = mysql_store_result ( connect )  ;
        mysql_free_result ( res )  ;
        break  ;
   case 4:
       printf ( "\n ISBN:\t " )  ;
       scanf ( "%s" , book.ISBN )  ;
       printf ( "\n NEW Quantity:\t " )  ;
       scanf ( "%s" , book1.name )  ;
       memset (  query ,  0 ,  sizeof ( query )  )  ;
       strcat ( query ,  "select * from BOOK WHERE ISBN=" )  ;
       strcat ( query ,  book.ISBN  )  ;
       strcat ( query ,  "  ;" )  ;
       if  ( mysql_query ( connect ,  query ) != 0 )
          {
            printf ( "%s\n" ,  mysql_error ( connect ) )  ;
            break  ;
	  } 
	res = mysql_store_result ( connect )  ;
        mysql_free_result ( res )  ;  
       memset (  query ,  0 ,  sizeof ( query )  )  ;
       strcat ( query ,  "UPDATE BOOK SET Quantity = '" )  ;
       strcat ( query ,  book1.name  )  ;
       strcat ( query ,  "' WHERE ISBN ='" )  ;
       strcat ( query ,  book.ISBN  )  ;
       strcat ( query ,  "'  ;" )  ;
//       perror ( query )  ;
       if  ( mysql_query ( connect ,  query ) != 0 )
          {
            printf ( "%s\n" ,  mysql_error ( connect ) )  ;
            exit ( -1 )  ;
	  }
	res = mysql_store_result ( connect )  ;
        mysql_free_result ( res )  ;
	break  ;
       }
}  





void issue_book ( MYSQL *connect ,  MYSQL_RES *res ,  MYSQL_ROW row )
{
   struct BOOK book , book1  ;

memset (  query ,  0 ,  sizeof ( query )  )  ;
   //SEARCHING FOR BOOK
   printf ( "\nEnter ISBN:\t " )  ;
   scanf ( "%s" , book.ISBN )  ;
   strcat ( query ,  "select * from BOOK WHERE ISBN=" )  ;
   strcat ( query ,  book.ISBN  )  ;
   strcat ( query ,  "  ;" )  ;
   if  ( mysql_query ( connect ,  query ) != 0 )
      {
        printf ( "%s\n" ,  mysql_error ( connect ) )  ;
      }     
   res = mysql_store_result ( connect )  ;
   row = mysql_fetch_row ( res )  ;
   //if found print information
    if ( row != NULL )
    { 
      printf ( "Following information is available:\n" )  ;
      printf ( "Name:\t%s\n\nPublisher:\t%s\n\nISBN:\t%s\n\nQuantity:\t%s\n\nAvailable:\t%s\n" ,  row[0] ,  row[1] ,  row[2] ,  row[3] ,  row[4] )  ;
      
      
      //If boot not available for issue
      
       memset (  query ,  0 ,  sizeof ( query )  )  ;
       strcat ( query ,  "select * from BOOK WHERE ISBN=" )  ;
       strcat ( query ,  book.ISBN  )  ;
       strcat ( query ,  " AND available >0  ;" )  ;
//       perror ( query )  ;
       if  ( mysql_query ( connect ,  query ) != 0 )
          {
            printf ( "%s\n" ,  mysql_error ( connect ) )  ;
            
	  } 
	res = mysql_store_result ( connect )  ;
        row = mysql_fetch_row ( res )  ;
        if ( row == NULL )
         {
           printf ( " \n There is no book left in the library to issue" )  ;
           mysql_free_result ( res )  ;
         }
         else
        {
         printf ( "\n\n\nEnter Card No.:\t" )  ;
         scanf ( "%s" , book.name )  ;
         memset (  query ,  0 ,  sizeof ( query )  )  ;
         strcat ( query ,  " INSERT INTO ISSUE VALUES (  '" )  ;
         strcat ( query ,  book.ISBN  )  ;
         strcat ( query ,  "'  ,  '" )  ;
         strcat ( query ,  book.name  )  ;
         strcat ( query ,  "'  ,  " )  ;
         strcat ( query ,  "CURDATE (  )  , DATE_ADD ( CURDATE (  )  , INTERVAL 14 DAY ) ,  0  ,  NULL )   ;"  )  ;
//         perror ( query )  ;
         if  ( mysql_query ( connect ,  query ) != 0 )
           {
              printf ( "%s\n" ,  mysql_error ( connect ) )  ;
           }
         res = mysql_store_result ( connect )  ;
         mysql_free_result ( res )  ;
         memset (  query ,  0 ,  sizeof ( query )  )  ;
/*         strcat ( query ,  "UPDATE ISSUE SET return_date = DATE_ADD ( CURDATE (  )  , INTERVAL 14 DAY" )  ; 
         strcat ( query ,  " ) WHERE Name = "  )  ;
         strcat ( query ,  book.name  )  ;
         strcat ( query ,  "  ;" )  ;
//         perror (  query )  ;
         if  ( mysql_query ( connect ,  query ) != 0 )
              {
                printf ( "%s\n" ,  mysql_error ( connect ) )  ;
              }
         res = mysql_store_result ( connect )  ;
         mysql_free_result ( res )  ;
*/         memset (  query ,  0 ,  sizeof ( query )  )  ;
         strcat ( query , "UPDATE BOOK SET available = available - 1 WHERE ISBN = " )  ;
         strcat ( query ,  book.ISBN  )  ;
         strcat ( query ,  "   ;" )  ;
//         perror ( query )  ;
         if  ( mysql_query ( connect ,  query ) != 0 )
          {
            printf ( "%s\n" ,  mysql_error ( connect ) )  ;
          }     
          res = mysql_store_result ( connect )  ;
          mysql_free_result ( res )  ;   
       }
       
     }       
   else
    {
      printf ( "\n BOOK NOT AVAILABLE IN THE LIBRARY\n" )  ;
      mysql_free_result ( res )  ;        
    }
}










void deposit_book ( MYSQL *connect ,  MYSQL_RES *res ,  MYSQL_ROW row )
{
   struct BOOK book , book1  ;
   int i = 0  ;
   
   printf ( "\nEnter ISBN:\t " )  ;
   scanf ( "%s" , book.ISBN )  ;
   printf ( "\nEnter Card No:\t " )  ;
   scanf ( "%s" , book.name )  ;
   
   //returned date update
   memset (  query ,  0 ,  sizeof ( query )  )  ;
   strcat ( query ,  "UPDATE ISSUE SET Returned_date = CURDATE (  ) WHERE ISBN = "  )  ;
   strcat ( query ,  book.ISBN  )  ;
   strcat ( query ,  " AND Name = '"  )  ;
   strcat ( query ,  book.name  )  ;
   strcat ( query ,  "'   ;"  )  ;
    while ( query[i]!=NULL )
    printf ( "%c" , query[i++] )  ;
   printf ( "\n\n" )  ;
//   perror ( query )  ;
   if  ( mysql_query ( connect ,  query ) != 0 )
      {
        printf ( "%s\n" ,  mysql_error ( connect ) )  ;
      }     

   //fine calculation
   memset (  query ,  0 ,  sizeof ( query )  )  ;
   strcat ( query ,  "UPDATE ISSUE SET fine = DATEDIFF ( CURDATE (  ) , return_date ) WHERE ISBN =" )   ;
   strcat ( query ,  book.ISBN  )  ;
   strcat ( query ,  " AND Name = '"  )  ;
   strcat ( query ,  book.name  )  ;
   strcat ( query ,  "' AND DATEDIFF ( CURDATE (  ) , return_date ) > 0   ;"  )  ;
//   perror ( query )  ;
    if  ( mysql_query ( connect ,  query ) != 0 )
      {
        printf ( "%s\n" ,  mysql_error ( connect ) )  ;
      }     

   
   //printing info
   memset (  query ,  0 ,  sizeof ( query )  )  ;
   strcat ( query ,  "select * from ISSUE WHERE ISBN = " )  ;
   strcat ( query ,  book.ISBN  )  ;
   strcat ( query ,  " AND Name ='"  )  ;
   strcat ( query ,  book.name  )  ;
   strcat ( query ,  "'  ;" )  ;
//   perror ( query )  ;
   if  ( mysql_query ( connect ,  query ) != 0 )
      {
        printf ( "%s\n" ,  mysql_error ( connect ) )  ;
      }     
   res = mysql_store_result ( connect )  ;
   row = mysql_fetch_row ( res )  ;
   //if found print information
    if ( row != NULL )
    { 
      printf ( "Following information is available:\n\n" )  ;
      printf ( "ISBN:\t%s\n\nCard no:\t%s\n\nISSUED ON:\t%s\n\nRETURNING DATE:\t%s\n\nRETURNED ON:\t%s\n\nFine:\t%s\n\n\t%s\n" ,  row[0] ,  row[1] ,  row[2] ,  row[3] , row[5] , row[4] )  ;  
      
      
        
    
//    mysql_free_result ( res )  ;
     
    //Fine update
   memset (  query ,  0 ,  sizeof ( query )  )  ;
   strcat ( query ,  "select * from FINE WHERE Name ='" )  ;
   strcat ( query ,  book.name  )  ;
   strcat ( query , "'   ;" )  ;
//   perror ( query )  ;
   if  ( mysql_query ( connect ,  query ) != 0 )
      {
        printf ( "%s\n" ,  mysql_error ( connect ) )  ;
      } 
   mysql_free_result ( res )  ;    
   res = mysql_store_result ( connect )  ;
   row = mysql_fetch_row ( res )  ;
   
   
   if ( row != NULL )
    {
     memset (  query ,  0 ,  sizeof ( query )  )  ;
     strcat ( query ,  " UPDATE FINE SET fine = fine +  ( SELECT Fine from ISSUE WHERE ISBN = " )  ; 
     strcat ( query ,  book.ISBN  )  ;
     strcat ( query ,  " AND Name ='"  )  ;
     strcat ( query ,  book.name  )  ;
     strcat ( query ,  "'  ) WHERE Name ='"  )  ;
     strcat ( query ,  book.name  )  ;
     strcat ( query ,  "'  ;" )  ; 
     perror ( query )  ;
    }
   else{
    memset (  query ,  0 ,  sizeof ( query )  )  ;
   strcat ( query ,  " INSERT INTO FINE  (  Name  ,  fine  ) SELECT Name , Fine FROM ISSUE WHERE ISBN = " )  ;
   strcat ( query ,  book.ISBN  )  ;
   strcat ( query ,  " AND Name ='"  )  ;
   strcat ( query ,  book.name  )  ;
   strcat ( query ,  "'  ;" )  ;
//   perror ( query )  ;
   if  ( mysql_query ( connect ,  query ) != 0 )
      {
        printf ( "%s\n" ,  mysql_error ( connect ) )  ;
      }  
   
   res = mysql_store_result ( connect )  ;
   row = mysql_fetch_row ( res )  ;
   mysql_free_result ( res )  ;
   }
    
   
   
   // BOOK update
   
   memset (  query ,  0 ,  sizeof ( query )  )  ;
   strcat ( query , "UPDATE BOOK SET available = available + 1 WHERE ISBN = " )  ;
   strcat ( query ,  book.ISBN  )  ;
   strcat ( query ,  "  ;" )  ;
 //  perror ( query )  ;
    if  ( mysql_query ( connect ,  query ) != 0 )
      {
        printf ( "%s\n" ,  mysql_error ( connect ) )  ;
      }
   //remove issue
      
   memset (  query ,  0 ,  sizeof ( query )  )  ;
   strcat ( query , "DELETE FROM ISSUE WHERE ISBN = " )  ;
   strcat ( query ,  book.ISBN  )  ;
   strcat ( query ,  " AND Name ='"  )  ;
   strcat ( query ,  book.name  )  ;
   strcat ( query ,  "'  ;" )  ;
//   perror ( query )  ;  
   if  ( mysql_query ( connect ,  query ) != 0 )
      {
        printf ( "%s\n" ,  mysql_error ( connect ) )  ;
      }       
   }
}






void Fine ( MYSQL *connect ,  MYSQL_RES *res ,  MYSQL_ROW row )
{
   struct BOOK book  ;
   //constructing query for insertion
   
   int i = 0  ;
   memset (  query ,  0 ,  sizeof ( query )  )  ;
   strcat ( query ,  "select * from FINE   ;" )  ;
   //   perror ( query )  ;
   
   if  ( mysql_query ( connect ,  query ) ) {
  
		printf ( "%s\n" ,  mysql_error ( connect ) )  ;
		exit ( 1 )  ;
	}
	 
  res = mysql_use_result ( connect )  ;
  // output table name 
  printf ( "\n\n\tInformation Found:\n\n" )  ;
   
	while  (  ( row = mysql_fetch_row ( res ) ) != NULL )
		 printf ( "\n Sl no. -> %d \n Card no:\t%s\n Fine:\t%s\n\n" , ++i ,  row[0] ,  row[1] )  ;
   
   mysql_free_result ( res )  ;
}













