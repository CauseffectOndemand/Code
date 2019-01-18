<?php
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/
$db_host = 'mysql';
$db_name = 'causeffe_db';
$db_user = 'root';//'admin_causeffect';
$db_pass = 'qwerty';//'Xxi8q%14';

sql::$con = new mysqli($db_host, $db_user, $db_pass, $db_name);

class sql {

    public static $con;

}

if (!sql::$con->set_charset("utf8")) {
    
  printf("Error loading character set utf8: %s\n", sql::$con->error);
  exit();

}

?>
