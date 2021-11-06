<?php require_once( __DIR__ . '/vendor/autoload.php' );
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


?>
<html>
    <head>
        <title></title>
        <link type="text/css" rel="stylesheet" href="<?= $_SERVER['ASSETS_PATH']?>/css/styles<?= $_SERVER['APP_ENV'] === 'prod' ? '.min' : null?>.css"/>
    </head>
    <body>
    <script src="<?= $_SERVER['ASSETS_PATH']?>/js/vendor<?= $_SERVER['APP_ENV'] === 'prod' ? '.min' : null?>.js"></script>
    <script src="<?= $_SERVER['ASSETS_PATH']?>/js/app<?= $_SERVER['APP_ENV'] === 'prod' ? '.min' : null?>.js"></script>
    <script>
        $(function(){
            DefaultPage.init();
        })
    </script>
    </body>
</html>
