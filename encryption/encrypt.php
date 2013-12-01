<?php
	//服务端加密，提供密文给前端解密。
	$encryptedData = '{"type":"d","d":"123"}';
	$privateKey = '656cd9b0af9435b0fc692268364e2ff7';
	$iv = '2801003954373300';
	$d = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $privateKey, $encryptedData, MCRYPT_MODE_CBC, $iv);
	echo (base64_encode($d));
?>