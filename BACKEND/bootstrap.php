<?php

require_once "vendor/autoload.php";
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

date_default_timezone_set('Europe/Paris');
const JWT_SECRET = "azerty123456789";

class Config {
    private static ?Config $instance = null;
    public ?EntityManager $entityManager = null;
    public Mixed $options = null;

    private function __construct()
    {
        $isDevMode = true;
        $config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);

        $connexionInformation = array(
            'host' => 'ec2-63-34-223-144.eu-west-1.compute.amazonaws.com',
            'driver' => 'pdo_pgsql',
            'user' => 'jmgssdxlswmaym',
            'password' => '8e2ade095f8f5e62c79df7b8834c290d6d99fdff4161d7d8048538d0e47f08ce',
            'dbname' => 'd1b62kb45deoov',
            'port' => '5432'
        );

        $this->entityManager = EntityManager::create($connexionInformation, $config);

        $this->options = [
            "attribute" => "token",
            "header" => "Authorization",
            "regexp" => "/Bearer\s+(.*)$/i",
            "secure" => false,
            "algorithm" => ["HS256"],
            "secret" => JWT_SECRET,
            "path" => ["/api"],
            "ignore" => ["/api/connexion", "/api/inscription"],
            "error" => function ($response, $arguments) {
                $data["status"] = "error";
                $data["message"] = $arguments["message"];
                return $response
                    ->withHeader("Content-Type", "application/json")
                    ->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES));
            }
        ];
    }

    public static function getInstance() : Config {
        if (self::$instance == null) {
            self::$instance = new Config();
        }
        return self::$instance;
    }

}