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
            'host' => 'ec2-54-74-35-87.eu-west-1.compute.amazonaws.com',
            'driver' => 'pdo_pgsql',
            'user' => 'vbwuomevvnbwgg',
            'password' => '301966df7eddd260617f5c383cea77c62955daf7eb378a4dda739d81d6aa2cce',
            'dbname' => 'd4l6rma9dejrbr',
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