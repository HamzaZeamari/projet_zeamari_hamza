<?php


require '../vendor/autoload.php';
require '../bootstrap.php';

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;


$app = AppFactory::create();

$JWT_SECRET = "azerty123456789";


function addHeaders(Response $response): Response
{
    $response = $response->withHeader("Content-Type", "application/json")
        ->withHeader("Access-Control-Allow-Origin", "https://projet-zeamari-hamza.herokuapp.com")
        ->withHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
        ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
        ->withHeader("Access-Control-Expose-Headers", "Authorization");

    return $response;
}

function createJWT(Response $response, string $login): Response
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
        'login' => $login,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token= JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token}");
    return $response;
}
$app->post('/api/connexion', function(Request $request, Response $response, $args) {

    $body = $request->getParsedBody();


    $login = $body['login'] ?? "";
    $password =  $body['password'] ?? "";

    $err = $login == "" || $password == "";
    if ($err) {
        $donnees["error"] = "Error";
        $response = $response->withStatus(403);
        $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));
        return $response;
    }
    $repClient = Config::getInstance()->entityManager->getRepository('Client');
    $clientLogin = $repClient->findOneBy(array("login" => $login));
    if ($clientLogin == null || password_verify($password, $clientLogin->getPassword()) == false) {
        $donnees["error"] = "Error";
        $response = $response->withStatus(403);
        $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));
        return $response;
    }
    // Getters des infos du compte
    $donnees["email"] = $clientLogin->getEmail();
    $donnees["login"] = $clientLogin->getLogin();
    $donnees["prenom"] = $clientLogin->getPrenom();
    $donnees["nom"] = $clientLogin->getNom();
    $response = addHeaders($response);
    $response = createJWT($response, $login);
    $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));
    return $response;
});
$app->post('/api/inscription', function(Request $request, Response $response, $args){
    $body = $request->getParsedBody();
    $nom = $body['nom'] ?? "";
    $prenom = $body['prenom'] ?? "";
    $login = $body['login'] ?? "";
    $password = $body['password'] ?? "";
    $email = $body['email'] ?? "";
    $error = $email == "" ||
        $nom == "" ||
        $prenom == "" ||
        $password == "" ||
        $login == "";

    if ($error) {
        $donnees["error"] = "Erreur";
        $response = $response->withStatus(403);
        $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));
        return $response;
    }
    $repClient = Config::getInstance()->entityManager->getRepository('Client');
    $clientEmail = $repClient->findOneBy(array("email" => $email));
    if ($clientEmail != null) {
        $donnees["error"] = "Cet e-mail est déjà utilisé";
        $response = $response->withStatus(403);
        $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));
        return $response;
    }
    $clientIdentifiant = $repClient->findOneBy(array("login" => $login));
    if ($clientIdentifiant != null) {
        $donnees["error"] = "Cet identifiant est déjà utilisé";
        $response = $response->withStatus(403);
        $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));
        return $response;
    }
    $newClient = new Client();
    $newClient->setEmail($email);
    $newClient->setPrenom($prenom);
    $newClient->setNom($nom);
    $newClient->setLogin($login);
    $newClient->setPassword(password_hash($password, PASSWORD_DEFAULT));
    Config::getInstance()->entityManager->persist($newClient);
    Config::getInstance()->entityManager->flush();
    $donnees["email"] = $email;
    $donnees["login"] = $login;

    $response = addHeaders($response);
    $response = $response->withHeader("Access-Control-Max-Age", 600);
    $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));

    return $response;
});

$app->get('/api/produits', function(Request $request, Response $response, $args) {
    $repProd = Config::getInstance()->entityManager->getRepository('Produit');
    $produits = $repProd->findAll();

    $table = array();
    foreach($produits as $p) {
        $productInfo = array(
            "id" => $p->getId(),
            "nom" => $p->getNom(),
            "stock" => $p->getStock(),
            "categorie" => $p->getCategorie(),
            "prix" => $p->getPrix()
        );
        array_push($table, $productInfo);
    }

    $response = addHeaders($response);
    $response->getBody()->write(json_encode($table));
    return $response;
});

$app->add(new \Tuupola\Middleware\JwtAuthentication(Config::getInstance()->options));
$app->run();


