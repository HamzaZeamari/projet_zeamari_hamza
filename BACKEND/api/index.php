<?php


require '../vendor/autoload.php';
require '../bootstrap.php';

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;


$app = AppFactory::create();

const JWT_SECRET = "azerty123456789";


function addHeaders(Response $response): Response
{
    $response = $response->withHeader("Content-Type", "application/json")
        ->withHeader("Access-Control-Allow-Origin", "https://projet-db.herokuapp.com")
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


// POST  => /api/connexion
$app->post('/api/connexion', function(Request $request, Response $response, $args) {

    $body = $request->getParsedBody();


    $identifiant = $body['login'] ?? "";
    $mdp =  $body['password'] ?? "";

    $err = $identifiant == "" || $mdp == "";
    if ($err) {
        // Problème avec les champs
        $donnees["error"] = "Error with the accounts field";
        $response = $response->withStatus(403);
        $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));
        return $response;
    }

    $repClient = Config::getInstance()->entityManager->getRepository('Client');
    $clientLogin = $repClient->findOneBy(array("login" => $identifiant));

    if ($clientLogin == null || password_verify($mdp, $clientLogin->getPassword()) == false) {
        $donnees["error"] = "Error with the email or password";
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
    $response = createJWT($response, $identifiant);
    $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));

    return $response;
});


// POST    =>  /api/inscription
$app->post('/api/inscription', function(Request $request, Response $response, $args){

    // on met en place la récupération du corps de la requete
    $body = $request->getParsedBody();

    $nom = $body['nom'] ?? "";
    $prenom = $body['prenom'] ?? "";
    $identifiant = $body['login'] ?? "";
    $mdp = $body['password'] ?? "";
    $email = $body['email'] ?? "";


    $error = $email == "" ||
        $nom == "" ||
        $prenom == "" ||
        $mdp == "" ||
        $identifiant == "";

    // Si une erreur est récupéré du fait que des champs sont manquants
    if ($error) {
        $donnees["error"] = "Erreur dans remplissage des champs";
        $response = $response->withStatus(403);
        $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));
        return $response;
    }

    $repClient = Config::getInstance()->entityManager->getRepository('Client');

    $clientEmail = $repClient->findOneBy(array("email" => $email));

    if ($clientEmail != null) {
        // Si le client existe déjà de part son e-mail on renvoie une erreur
        $donnees["error"] = "Cet e-mail est déjà utilisé";
        $response = $response->withStatus(403);
        $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));
        return $response;
    }

    $clientIdentifiant = $repClient->findOneBy(array("login" => $identifiant));

    if ($clientIdentifiant != null) {
        // Si le client existe déjà de part son login on renvoie une erreur
        $donnees["error"] = "Cet identifiant est déjà utilisé";
        $response = $response->withStatus(403);
        $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));
        return $response;
    }

    // On rassemble ensuite dans un nouvel objet les informations du client
    $newClient = new Client();
    $newClient->setEmail($email);
    $newClient->setPrenom($prenom);
    $newClient->setNom($nom);
    $newClient->setLogin($identifiant);
    $newClient->setMDP(password_hash($mdp, PASSWORD_DEFAULT));

    // Qui sera ajouter à notre liste
    Config::getInstance()->entityManager->persist($newClient);
    Config::getInstance()->entityManager->flush();

    //On garde le mail et l'id pour les reutiliser ultérieurement
    $donnees["email"] = $email;
    $donnees["login"] = $identifiant;


    $response = addHeaders($response);
    $response = $response->withHeader("Access-Control-Max-Age", 600);
    $response->getBody()->write(json_encode($donnees, JSON_UNESCAPED_SLASHES));

    return $response;
});



// GET   =>  /api/produits
$app->get('/api/produits', function(Request $request, Response $response, $args) {
    $repProd = Config::getInstance()->entityManager->getRepository('Produit');
    // Recupération de tous les produits de la table
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




