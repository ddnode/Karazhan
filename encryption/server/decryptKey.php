<?php
    //每次请求随机生成加密之后的16||32位，公共密钥，指定算法模式。
	//遵循AES算法
    $decry  =  array("p"=>"656cd9b0af9435b0fc692268364e2ff7","v"=>"2801003954373300");
    echo json_encode($decry);
?>
