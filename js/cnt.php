<?PHP 
$countfile = "cnt.txt"; 

if (($fp = fopen($countfile, "r+")) == false) {
printf ("open file %s failed.",$countfile); 
exit; 
} 
else 
{ 
$count = fread ($fp,10); 
$count = $count + 1; 
fclose ($fp); 
$fp = fopen($countfile, "w+"); 
fwrite ($fp,$count); 
fclose ($fp); 

echo $count; 
} 
?> 