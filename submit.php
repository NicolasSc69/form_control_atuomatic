<?php

error_reporting(E_ALL ^ E_NOTICE);
mb_internal_encoding('UTF-8');
ini_set('display_errors', true);

if(!$_POST['form']) {
    $aData = array();
   $file = fopen("submit.txt", "a+"); 
    foreach ($_POST['data'] as $type => $data) {
        $aData[$data['ID_INPUT']][] = $data['VALUE'];

    }
    //var_dump($aData);
	$contenu .= '=========================='. PHP_EOL;
	foreach ($aData as $key => $value) {
		$contenu .= date('d/m/Y : H:i') . ' ==> ' . $key . '<|>' . implode('@', $value ) . PHP_EOL;		
    }    
	$contenu .= '=========================='. PHP_EOL;

	fwrite($file, $contenu);
	fclose($file); 

    echo '<span class="submit-ok">Enregistrement OK</span>';
} else {
    header("Location: index.html");
    exit();
}

?>