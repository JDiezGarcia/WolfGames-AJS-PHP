<?php

require_once "/jquery_php/model/JWT.php";

function encode(){

    $header = '{"typ":"JWT", "alg":"HS256"}';
    $secret = 'withgreatpowercomesgreatresponsibility';
    $payload = '{
        "iat":time(), 
        "exp":time() + (60*60),
        "name":"yomogan"
    }';

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;

}

function decode($token){

    $JWT = new JWT;
    $secret = 'withgreatpowercomesgreatresponsability';
    $json = $JWT->decode($token, $secret);
    return $json;

}
