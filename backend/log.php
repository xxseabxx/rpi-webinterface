<?php
    
    // enable CORS (only for testing)
    header("Access-Control-Allow-Origin: *");
    
    // text
    header('Content-type:text/plain;charset=utf-8');
    
    // nocache
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    
    // enable PHP error reporting
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    
    // define vars
    $filename = '/home/pi/rpi-scripts/error.log';
    
    // function for shell script
    function clear_file($filename) {
        $output = shell_exec("true > ".$filename."; echo $?");
        return $output;
    }
    
    // delete log
    if (isset($_GET['delete']))
    {
        if (file_exists($filename)) {
            file_put_contents($filename, "");
        }
    }
    
    // read log
    if (file_exists($filename)) {
        echo file_get_contents($filename);
    } else {
        echo "NOFILE";
    }
    
?>