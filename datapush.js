const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

var count=0;

var data={};
for(var i=1;i<=9;i++)
{
    count+=1;
    temp="21PA1A050"+i
    data[temp]="0";
    data[i-1]=temp;
} 
for(var i=10;i<=99;i++)
{
    count+=1;
    temp="21PA1A05"+i
    data[temp]="0";
    data[i-1]=temp;
}
for(var i=0;i<=9;i++)
{
    count+=1;
    temp="21PA1A05A"+i
    data[temp]="0";
    data[99+i]=temp;
} 
for(var i=0;i<=9;i++)
{
    count+=1;
    temp="21PA1A05B"+i
    data[temp]="0";
    data[109+i]=temp;
} 
for(var i=0;i<=9;i++)
{
    count+=1;
    temp="21PA1A05C"+i
    data[temp]="0";
    data[119+i]=temp;
} 
for(var i=0;i<=9;i++)
{
    count+=1;
    temp="21PA1A05D"+i
    data[temp]="0";
    data[129+i]=temp;
} 
for(var i=0;i<=9;i++)
{
    count+=1;
    temp="21PA1A05E"+i
    data[temp]="0";
    data[139+i]=temp;
} 
for(var i=0;i<=9;i++)
{
    count+=1;
    temp="21PA1A05F"+i
    data[temp]="0";
    data[149+i]=temp;
} 
for(var i=0;i<=9;i++)
{
    count+=1;
    temp="21PA1A05G"+i
    data[temp]="0";
    data[159+i]=temp;
} 
for(var i=0;i<=9;i++)
{
    count+=1;
    temp="21PA1A05H"+i
    data[temp]="0";
    data[169+i]=temp;
} 
for(var i=0;i<=9;i++)
{
    count+=1;
    temp="21PA1A05I"+i
    data[temp]="0";
    data[179+i]=temp;
} 
for(var i=0;i<=8;i++)
{
    count+=1;
    temp="21PA1A05J"+i
    data[temp]="0";
    data[189+i]=temp;
} 

db.collection('ClassData').doc('RHdHhMT5QCQ5RrtGgRvS').set(data);

console.log(data);

console.log(count);