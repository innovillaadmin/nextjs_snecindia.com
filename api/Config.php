<?php
// session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set('Asia/Kolkata');

require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$allowed_domains = [
    "http://localhost:3000",
    "http://localhost:3000/",
    "https://snecindia.netlify.app/",
    "https://snecindia.netlify.app",
    "https://snecindia.com/",
    "https://snecindia.com",

];

if (in_array($_SERVER['HTTP_ORIGIN'], $allowed_domains)) {
    header('Access-Control-Allow-Origin:' . $_SERVER['HTTP_ORIGIN']);
}
// header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE"); // get Method can also be specified in case of any need
// header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow Content-Type and Authorization headers

define('API_SALT', 'd03130b86566a293a9d184a53c8305ea');

class Config
{
    private $jwtsecret = API_SALT;
    private $algorithm = 'HS256';

    public function connection()
    {
        // $connect = new mysqli('localhost:3307', 'root', '', 'abscorp');
        $connect = new mysqli('localhost', 'innovz4y_mpandey', 'Mrityunj@y2290', 'innovz4y_mgs_guest_house');
        $connect->query("SET time_zone = '+05:30'");
        return $connect;
    }
    public function sanitize($input)
    {
        if (!empty($input)) {
            $retval = mysqli_real_escape_string($this->connection(), trim($input));
        } else {
            $retval = '';
        }
        return $retval;
    }
    public function setjwt($userid, $userrole, $username)
    {

        $payload = [
            "iss" => "localhost:3000",
            "aud" => "localhost:3000",
            "iat" => time(),
            "nbf" => time(),
            "exp" => time() + (60 * 60 * 24 * 30), // JWT expiration time, e.g., 1 hour
            "userid" => $userid,                      // Unique user identifier
            "userrole" => $userrole,                    // User's email or username
            "username" => $username,                    // User's full name
        ];

        $jwt = JWT::encode($payload, $this->jwtsecret, $this->algorithm);
        return $jwt;

    }
    public function createcookie($jwt)
    {
        setcookie("token", $jwt, [
            'expires' => time() + (60 * 60 * 24 * 30), // Same as JWT expiration time
            'path' => '/',
            // 'domain' => '',   // Use the main domain for SSO, enable if in production
            'domain' => '.snecindia.com', // Use the main domain for SSO, enable if in dev mode
            'secure' => true,                           // Only send over HTTPS on production
            'httponly' => true,                           // Accessible only via HTTP, not JavaScript
            'samesite' => 'None',                         // Helps prevent CSRF attacks
        ]);
    }
    public function getjwt($jwt)
    {
        $decoded = JWT::decode($jwt, new Key($this->jwtsecret, $this->algorithm));
        return $decoded;
    }
    public function compressImage($source, $destination, $quality)
    {

        // Get image info
        $imgInfo = getimagesize($source);
        $mime = $imgInfo['mime'];

        // Create a new image from file
        switch ($mime) {
            case 'image/jpeg':
                $image = imagecreatefromjpeg($source);
                break;
            case 'image/png':
                $image = imagecreatefrompng($source);
                break;
            case 'image/gif':
                $image = imagecreatefromgif($source);
                break;
            default:
                $image = imagecreatefromjpeg($source);
        }

        // Save image
        imagejpeg($image, $destination, $quality);

        // Return compressed image
        return $destination;
    }

    // function to compress and upload image
    public function uploadImage($imageFileName, $filepath, $imagePrefix)
    {

        global $act;

        if (!empty($_FILES[$imageFileName]['name']) || $_FILES[$imageFileName]['name'] == '') {
            $uploadPath = $filepath;
            $filename = basename($_FILES[$imageFileName]['name']);
            $uploadFilePath = $uploadPath . $filename;

            // create new name to file
            $imagefileType = pathinfo($uploadFilePath, PATHINFO_EXTENSION);
            $newImageName = $imagePrefix . md5(microtime() . rand(1, 999999999)) . '.' . $imagefileType;
            $newUploadFilePath = $uploadPath . $newImageName;

            // Allow certain file formats
            $galallowTypes = ['jpg', 'png', 'jpeg', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF'];

            if (in_array($imagefileType, $galallowTypes)) {
                // Image temp source
                $galimageTemp = $_FILES[$imageFileName]["tmp_name"];
                // Compress size and upload image
                $compressedImage = $this->compressImage($galimageTemp, $newUploadFilePath, 50);
                if ($compressedImage) {
                    return $newImageName;
                }
            } else {
                echo '';
            }
        }
    }

    // validate user before action
    public function isUserValid($token)
    {
        $checkuser = $this->connection()->query("select * from userdata where MD5(id)='$token'")->num_rows;
        if ($checkuser >= 1) {
            $retval = 'true';
        } else {
            $retval = 'false';
        }
        return $retval;
    }

    // unique order id
    public function generateUniqueOrderId()
    {

        // Get the current Unix timestamp with microseconds
        $microtime = microtime(true);

        // Convert the microtime to a string and concatenate with a random value for added uniqueness
        $randomString = mt_rand(1000, 9999); // Generate a random 4-digit number

        // Combine microtime and random string to form a unique ID
        $uniqueId = hash('sha256', $microtime . $randomString);

        // Optionally, shorten the unique ID to a specific length, e.g., 16 characters
        $orderId = substr($uniqueId, 0, 16);

        return strtoupper($orderId); // Return the ID in uppercase for consistency
    }
}
