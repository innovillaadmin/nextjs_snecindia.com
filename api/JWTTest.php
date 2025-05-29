<?php
$key = "your_secret_key";
$algorithm = 'HS256';
$payload = array(
    "iss" => "http://yourdomain.com",
    "aud" => "http://yourdomain.com",
    "iat" => time(),
    "nbf" => time(),
    "exp" => time() + (60 * 60),  // JWT expiration time, e.g., 1 hour
    "user_id" => '546546546',      // Unique user identifier
    "email" => '65465464646546'      // User's email or username
);

// Encode
$jwt = JWT::encode($payload, $key, $algorithm);
echo "Encoded JWT: " . $jwt;

setcookie("token", $jwt, [
    'expires' => time() + (60 * 60),  // Same as JWT expiration time
    'path' => '/',
    'domain' => 'localhost',   // Use the main domain for SSO
    'secure' => true,               // Only send over HTTPS
    'httponly' => true,             // Accessible only via HTTP, not JavaScript
    'samesite' => 'Lax'             // Helps prevent CSRF attacks
]);

// Decode
$decoded = JWT::decode($jwt, new Key($key, $algorithm));
print_r($decoded);

?>