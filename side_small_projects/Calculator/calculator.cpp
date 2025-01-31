#include<bits/stdc++.h> 
#include<cstdio>
#include<stdlib.h>
#include<math.h>
#include<iostream>


using namespace std;

#define new_calc 1
#define old_calc 0

int choice=5,choice1,choice2,flag,temp;
double num1,num2,num3;
char z;
 

void standard();
void scientific();



 
class calc_standard{
  public:
  static double addition(double,double);
  static double subtraction(double,double);
  static double multiplication(double,double);
  static double division(double,double *);
  static double modulus(double *,double *);
  
  };
class calc_scientific{
  public:
  static double square(double);
  static double cube(double);
  static double power(double,double);
  static double sq_root(double);
  static long int fact(double);
  static double sin_func(double);
  static double cos_func(double);
  static double tan_func(double);
  
  };
  
  double calc_standard::addition(double x,double y)
   {
     return x+y;
   }
   
  double calc_standard::subtraction(double x,double y)
   {
     return x-y;
   }
   
   double calc_standard::multiplication(double x,double y)
   {
     return x*y;
   }
   
   double calc_standard::division(double x,double *y)
   {
     while(*y==0)
      {
        cout<<"\n Division by \"ZERO\" is not possible.";
        cout<<"\n Enter divisor again";
        cin>>*y;
      }
     return x/(*y);
   }
  
   double calc_standard::modulus(double *x,double *y)
   {
     
     while(*y==0)
      {
        cout<<"\n Division by \"ZERO\" is not possible.";
        cout<<"\n Enter divisor again";
        cin>>*y;
      }
     int a=(int)*x,b=(int)*y;
     return a%b;
   }
   
   
   
   
   double calc_scientific::square(double x)
   {
     return x*x;
   }
   
  double calc_scientific::cube(double x)
   {
     return x*x*x;
   }
   
   double calc_scientific::power(double x,double y)
   {
     return pow(x,y);
   }
   
   double calc_scientific::sq_root(double x)
   {
     return sqrt(x);
   }
   long int calc_scientific::fact(double x)
   {
     x=(int)x;
     if ((int)x==1)
       return (long int)x;
     else 
       return (double)(x*calc_scientific::fact(x-1)); 
   }
   double calc_scientific::sin_func(double x)
   {
     return sin(x);
   }
   
   double calc_scientific::cos_func(double x)
   {
     return cos(x);
   }
   
   double calc_scientific::tan_func(double x)
   {
     return tan(x);
   }
   
   
   int main()
   {
     
     while(choice!=3)
     {
       
       system("clear");
       cout<<"\n**********************Type of Calculator**********************\n";
       cout<<" 1. Standard calculator.\n 2. Scientific calculator.\n 3. Quit.\n  Choose the type of calculator.\t";     
       cin>>choice;
       flag=new_calc;
       switch (choice)
       {
        case 1:
             standard() ;
             break;
        case 2:
             scientific();
             break;
      case 3:
        cout<<"\n Quiting.........";
        cout<<"\n Press any key to continue.....\t";
        cin>>z ;
        exit(0);
      default:
             cout<<"\n Invalid Choice.\n Press any key to continue";
             cin>>z ;
             break;
      }
      
      

}    } 


void standard()
{

  do 
         {
          system("clear");
          cout<<"\n**********************Standard Calculator**********************\n";
          cout<<" 1. Addition.\n 2. Subtraction.\n 3. Multiplication.\n 4. Division.\n 5. Modulus\n 6. Previous menu\n 7. Quit.";
          if (flag==old_calc)
            cout<<"\n 8. Clear Memory.";
          cout<<"\nChoose the type of calculation:\t";
          cin>>choice1;
          switch(choice1){
           case 1:
              if (flag==new_calc)
               {
                 cout<<"\nEnter first number:\t";
                 cin>>num1;
               }
               else
                {
                  num1=temp;
                  cout<<"\n The first number is "<<num1<<endl;
                }
                cout<<"\nEnter second number:\t";
                cin>>num2;
                num3=calc_standard::addition(num1,num2);
                cout<<"\n Addition of "<<num1<<" and "<<num2<<" is "<<num3<<endl;
                cout<<"\nPress any key to continue.........";
                cin>>z ;
                temp=num3;
                flag=old_calc;
                break;
            case 2:
              if (flag==new_calc)
               {
                 cout<<"\nEnter first number:\t";
                 cin>>num1;
               }
               else
                {
                  num1=temp;
                  cout<<"\n The first number is "<<num1<<endl;
                }
                cout<<"\nEnter second number:\t";
                cin>>num2;
                num3=calc_standard::subtraction(num1,num2);
                cout<<"\n Subtraction of "<<num1<<" and "<<num2<<" is "<<num3<<endl;
                cout<<"\nPress any key to continue.........";
                cin>>z ;
                temp=num3;
                flag=old_calc;
                break;
            case 3:
               if (flag==new_calc)
                {
                  cout<<"\nEnter first number:\t";
                  cin>>num1;
                }
               else
                {
                  num1=temp;
                  cout<<"\n The first number is "<<num1<<endl;
                }
               cout<<"\nEnter second number:\t";
               cin>>num2;
               num3=calc_standard::multiplication(num1,num2);
               cout<<"\n Multiplication of "<<num1<<" and "<<num2<<" is "<<num3<<endl;
               cout<<"\nPress any key to continue.........";
               cin>>z ;
               temp=num3;
               flag=old_calc;
               break;
            case 4:
              if (flag==new_calc)
               {
                 cout<<"\nEnter first number:\t";
                 cin>>num1;
               }
              else
               {
                 num1=temp;
                 cout<<"\n The first number is "<<num1<<endl;
               }
               cout<<"\nEnter second number:\t";
               cin>>num2;
               num3=calc_standard::division(num1,&num2);
               cout<<"\n Division of "<<num1<<" and "<<num2<<" is "<<num3<<endl;
               cout<<"\nPress any key to continue.........";
               cin>>z ;
               temp=num3;
               flag=old_calc;
               break;
          case 5:
              if (flag==new_calc)
               {
                 cout<<"\nEnter first number:\t";
                 cin>>num1;
               }
              else
                {
                  num1=temp;
                  cout<<"\n The first number is "<<num1<<endl;
                }
               cout<<"\nEnter second number:\t";
               cin>>num2;
               num3=calc_standard::modulus(&num1,&num2);
               cout<<"\n Modulus of "<<num1<<" and "<<num2<<" is "<<num3<<endl;
               cout<<"\nPress any key to continue.........\t";
               cin>>z ;
               temp=num3;
               flag=old_calc;
               break;
          case 6:
               cout<<"\n Returning to previous menu.........";
               cout<<"\n Press any key to continue.....\t";
               cin>>z ;
               break;
          case 7:
               cout<<"\n Quiting.........";
               cout<<"\n Press any key to continue.....\t";
               ;
               exit(0);
          case 8:
              if (flag==old_calc)
                {
                  temp=0;
                  flag=new_calc;
                }
              else
              {
               cout<<"\n Invalid Choice.\n Press any key to continue";
               cin>>z ;
              }
               break;
          default:
              cout<<"\n Invalid Choice.\n Press any key to continue";
              cin>>z ;
              break;
          }
         }while(choice1!=6);
          
}

void scientific()
{
  do {
          system("clear");
          cout<<"\n**********************Scientific Calculator**********************\n";
          cout<<" 1. Square.\n 2. Cube.\n 3. Square root \n 4. Power.\n 5. Factorial.\n 6. sin\n 7. cos\n 8. tan\n 9. Previous menu\n 10. Quit.";
          if (flag==old_calc)
            cout<<"\n 11. Clear Memory.";
          cout<<"\nChoose the type of calculation:\t";
          cin>>choice2;
          switch(choice2)
          {
           case 1:
             if (flag==new_calc)
              {
                cout<<"\nEnter number:\t";
                cin>>num1;
              }
              else
               {
                 num1=temp;
                 cout<<"\n The number to find square is "<<num1<<endl;
               }
               num3=calc_scientific::square(num1);
               cout<<"\n Square of "<<num1<<" is "<<num3<<endl;
               cout<<"\nPress any key to continue.........\t";
               cin>>z ;
               temp=num3;
               flag=old_calc;
               break;
           case 2:
             if (flag==new_calc)
              {
                cout<<"\nEnter number:\t";
                cin>>num1;
              }
              else
               {
                 num1=temp;
                 cout<<"\n The number to find cube is "<<num1<<endl;
               }
               num3=calc_scientific::cube(num1);
               cout<<"\n cube of "<<num1<<" is "<<num3<<endl;
               cout<<"\nPress any key to continue.........\t";
               cin>>z ;
               temp=num3;
               flag=old_calc;
               break;
           case 3:
             if (flag==new_calc)
              {
                cout<<"\nEnter number to find square root:\t";
                cin>>num1;
              }
              else
               {
                 num1=temp;
                 cout<<"\n The number to find square root is "<<num1<<endl;
               }
               num3=calc_scientific::sq_root(num1);
               cout<<"\n square root of "<<num1<<" is "<<num3<<endl;
               cout<<"\nPress any key to continue.........\t";
               cin>>z ;
               temp=num3;
               flag=old_calc;
               break;
           case 4:
             if (flag==new_calc)
              {
                cout<<"\nEnter the number(base):\t";
                cin>>num1;
              }
              else
               {
                 num1=temp;
                 cout<<"\n The number(base) is "<<num1<<endl;
               }
               cout<<"\nEnter number(power):\t";
               cin>>num2;
               num3=calc_scientific::power(num1,num2);
               cout<<"\n Power of "<<num1<<" to "<<num2<<" is "<<num3<<endl;
               cout<<"\nPress any key to continue.........\t";
               cin>>z ;
               temp=num3;
               flag=old_calc;
               break;
             case 5:
             if (flag==new_calc)
              {
                cout<<"\nEnter the number:\t";
                cin>>num1;
              }
              else
               {
                 num1=temp;
                 cout<<"\n The number to find factoral is "<<num1<<endl;
               }
               num3=calc_scientific::fact(num1);
               cout<<"\n Factorial of "<<num1<<" is "<<num3<<endl;
               cout<<"\nPress any key to continue.........\t";
               cin>>z ;
               temp=num3;
               flag=old_calc;
               break;
             case 6:
             if (flag==new_calc)
              {
                cout<<"\nEnter the value in radian:\t";
                cin>>num1;
              }
              else
               {
                 num1=temp;
                 cout<<"\n The value to calculate is "<<num1<<" rad"<<endl;
               }
               num3=calc_scientific::sin_func(num1);
               cout<<"\n sine of "<<num1<<" rad is "<<num3<<endl;
               cout<<"\nPress any key to continue.........\t";
               cin>>z ;
               temp=num3;
               flag=old_calc;
               break;
             case 7:
             if (flag==new_calc)
              {
                cout<<"\nEnter the value in radian:\t";
                cin>>num1;
              }
              else
               {
                 num1=temp;
                 cout<<"\n The value to calculate is "<<num1<<" rad"<<endl;
               }
               num3=calc_scientific::cos_func(num1);
               cout<<"\n cosine of "<<num1<<" rad is "<<num3<<endl;
               cout<<"\nPress any key to continue.........\t";
               cin>>z ;
               temp=num3;
               flag=old_calc;
               break;
             case 8:
             if (flag==new_calc)
              {
                cout<<"\nEnter the value in radian:\t";
                cin>>num1;
              }
              else
               {
                 num1=temp;
                 cout<<"\n The value to calculate is "<<num1<<" rad"<<endl;
               }
               num3=calc_scientific::tan_func(num1);
               cout<<"\n tangent of "<<num1<<" rad is "<<num3<<endl;
               cout<<"\nPress any key to continue.........\t";
               cin>>z ;
               temp=num3;
               flag=old_calc;
               break;
          case 9:
              cout<<"\n Returning to previous menu.........";
              cout<<"\n Press any key to continue.....\t";
              cin>>z ;
              break;
          case 10:
              cout<<"\n Quiting.........";
              cout<<"\n Press any key to continue.....\t";
              cin>>z ;
              exit(0);
          case 11:
              if (flag==old_calc)
                {
                  temp=0;
                  flag=new_calc;
                }
              else
              {
               cout<<"\n Invalid Choice.\n Press any key to continue";
               cin>>z ;
              }
              break;
          default:
             cout<<"\n Invalid Choice.\n Press any key to continue";
             cin>>z ;
             break;
          }
        }while(choice2!=9);
         
    
}
       
             
