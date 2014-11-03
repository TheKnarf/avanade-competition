<?php

$apikey = 'a59c8fc125ca463a85433e6ef01190fe';
$url = 'http://novatransport.azurewebsites.net/api';


$endpoint = @$_GET['endpoint'];

$newurl = $url . '/' . $endpoint;

if(isset($_GET['id']))
    $newurl .= '/' . $_GET['id'];

$newurl .= '?apiKey=' . $apikey;

echo file_get_contents($newurl);