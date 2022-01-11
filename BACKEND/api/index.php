<?php


require '../vendor/autoload.php'; // Obligatoire sinon les libs ne seront pas chargés

use Tuupola\Middleware\JwtAuthentication;
use Slim\Factory\AppFactory;

options = [ // On défini un tableau d'options pour les JWT
"attribute" => "token",
"header" => "Authorization",
"regexp" => "/Bearer\s+(.*)$/i",
"secure" => false,
"algorithm" => ["HS256"],
"secret" => JWT_SECRET,
"path" => ["/api"], // le path de base
"ignore" => ["/api/login", "/api/signin"], // les path dont il doit ignorer les requetes, donc en gros les paths qui n'ont pas besoin de JWT
"error" => function ($response, $arguments) { // La fonction qui sera appelé s'il n'a pas de JWT
$data["status"] = "error";
$data["message"] = $arguments["message"];
return $response
->withHeader("Content-Type", "application/json")
->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}
]

$app = AppFactory::create(); // Objet dont on se sert pour déf les routes

$app->get('/api/products', function($request, $response, $args) {
// Ici tu définis ce qu'il se passe pour l'appel GET sur /api/produts
});

$app->post('/api/login', function($request, $response, $args) {
// Ici tu définis ce qu'il se passe pour l'appel POST sur /api/login
});

$app->add(new JwtAuthentication(options));
$app->run();