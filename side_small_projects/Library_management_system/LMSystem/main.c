// command to compile program
//  gcc $(mysql_config --cflags) main.c $(mysql_config --libs)

#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#include<time.h>
#include <mysql.h>
#include<string.h>


char  query[200] ;
char ch[20],c ;

//structures
struct BOOK {
  char name[25]  ;
  char publisher[25]  ;
  char ISBN[15]  ;
  int quantity  ;
  }  ;


#include "func.h"

//main function starts




void pause()
{
   while(1)
    {
       printf("Press y to continue:");
       scanf("%c",&c);
       if(c=='y')
  	{
       	   break;
       	}
    }
}
int main()
{
  int choice ;
  printf( "\nWELCOME TO LIBRARY MANAGEMENT  SYSTEM\n			       by Shashi\n-------------------------------------------------------------------------------------------------------------------------\n\n" ) ;
  
  MYSQL *connect ;
  MYSQL_RES *res ;
  MYSQL_ROW row ;
  	
  char *server = "localhost" , user[10] , password[10] , *database = "libmanagesys"  ;
  printf( "Enter Username:\t" ) ;
  scanf( "%s", user) ;
  printf( "Enter Password:\t" ) ;
  scanf( "%s", password ) ;
  
  
  
  /* Connection to database */
  connect = mysql_init(NULL) ;
  if (!mysql_real_connect(connect, server, user, password, database, 0, NULL, 0))
    {
	fprintf( stderr, "%s\n", mysql_error(connect) ) ;
	exit(1) ;
    }
    
  //Program Starts  
  
  while(1)
  {
    cls() ;
    printf( "\nWELCOME TO LIBRARY MANAGEMENT  SYSTEM\n			       by Shashi\n-------------------------------------------------------------------------------------------------------------------------\n\n ") ;
    printf( "\n\t1. Add Book" ) ;
    printf( "\n\t2. Search Book" ) ;
    printf( "\n\t3. Issue Book" ) ;
    printf( "\n\t4. Deposit Book" ) ;
    printf( "\n\t5. Calculate fine" ) ;
    printf( "\n\t6. Modify Book Record" ) ;
    printf( "\n\t7. Exit" ) ;
    printf( "\v\t  Enter your choice:\t " ) ;
    scanf( "%d",&choice ) ;
        switch( choice )
        {
            case 1:
                cls() ;
                add_book( connect, res, row ) ;
                pause();
                
            case 2:
                cls() ;
                search_book( connect, res, row ) ;
                pause();
                
            case 3:
                cls() ;
                issue_book( connect, res, row ) ;
                pause();
                
            case 4:
                cls() ;
                deposit_book( connect, res, row ) ;
                pause();
                
            case 5:
                cls() ;
                Fine( connect, res, row ) ;
                pause();
                
            case 6:
                cls() ;
                mod_book( connect, res, row ) ;
                pause();
                
            case 7:
                 while(1)
                  {
    		     printf("Press y to continue:");
    		     scanf("%c",&c);
    		     if(c=='y')
      			{
      		       	   mysql_close( connect );
      		       	   exit(0) ;
      		       	}
   		  }
        }

    }
    
}


