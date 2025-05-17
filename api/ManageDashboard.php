<?php
require('Config.php');
class ManageDashboard extends Config{
    
}

if($_SERVER["REQUEST_METHOD"]=="POST"){
    
    $act = new ManageDashboard();
    $conn = $act->connection();
    $data = json_decode(file_get_contents("php://input")); // pass ,true if you want to return array instead of an object
    
    if (isset($data->action) && $act->isUserValid($data->usertoken)){
        
        // get admin dashboard data 
        if($data->action==='getadmindashboard'){
           
        }

        
    }
    

        
    
    
   
}
?>