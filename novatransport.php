<?php
    
/**
 *  Example usage:
 *
 *      /novatransport.php?endpoint=assignments
 *          Returns a list (json) of assigments
 *
 */

header('Content-Type: application/json');


$endpoint = '/' . @$_GET['endpoint'];

function endpoint($endpoint)
{
    $apikey = 'a59c8fc125ca463a85433e6ef01190fe';
    $url = 'http://novatransport.azurewebsites.net/api';    
    
    return file_get_contents($url . $endpoint . '?apikey=' . $apikey);
}

if($endpoint == '/assignmentcargo')
{   
    $assignments_tmp = json_decode(endpoint('/assignments'));
    $cargo_tmp = json_decode(endpoint('/cargo'));
    
    $assignmentcargo = array();
    $cargo = array();
    
    foreach($cargo_tmp as $itm)
    {
        $cargo[$itm->id] = $itm->description;
    }
    
    foreach($assignments_tmp as $itm)
    {
        $itm->description = $cargo[$itm->cargoId];   
        $assignmentcargo[] = $itm;
    }
    
    echo json_encode($assignmentcargo);
}
else
{
    if(isset($_GET['id']))
        $endpoint .= '/' . $_GET['id'];

    echo endpoint($endpoint);
}