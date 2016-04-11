<?php
 /*获得表单提交过来的所有值*/
   $username=$_POST["username"];
   echo $username;
   $phone_num=$_POST["phone"];
   $URL=$_POST["url"];
   $content=$_POST["content"];
   $connect=mysql_connect("localhost","root","880319");
   /*把获得的数据插入表格*/
   mysql_select_db("internet_info");
   $sql="INSERT INTO information1 (ID,username,phone,url,content) VALUES(0,'{$username}','{$phone_num}','{$URL}','{$content}')";
   $insert=mysql_query($sql);
?>