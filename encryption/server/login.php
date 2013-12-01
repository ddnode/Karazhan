<?php
    $info = $_POST['info'];
    $publiKey = '656cd9b0af9435b0fc692268364e2ff7';
    $cipher_alg = MCRYPT_RIJNDAEL_128;
    $iv ='2801003954373300';
    $miwen = base64_decode($info);
    $mi = mcrypt_decrypt($cipher_alg,$publiKey,$miwen,MCRYPT_MODE_CBC,$iv);
    $rtr = rtrim($mi,'\0');
    echo $rtr;
?>
