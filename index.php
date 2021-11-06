<?php require_once( __DIR__ .'/vendor/autoload.php' );
$dotenv = Dotenv\Dotenv::createImmutable( __DIR__ );
$dotenv->load();


?>
<html>
    <head>
        <title></title>
        <link type="text/css" rel="stylesheet" href="<?= getenv('ASSETS_PATH')?>/css/style<?= getenv('APP_ENV') === 'prod' ? '.min' : null?>.css"/>
    </head>
    <body>
    <script src="<?= getenv('ASSETS_PATH')?>/js/vendor<?= getenv('APP_ENV') === 'prod' ? '.min' : null?>.css"></script>
    <script src="<?= getenv('ASSETS_PATH')?>/js/app<?= getenv('APP_ENV') === 'prod' ? '.min' : null?>.css"></script>
    <script>
        $(function(){
            DefaultPage.init();
        })
    </script>
    </body>
</html>
