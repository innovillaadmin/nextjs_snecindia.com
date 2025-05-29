<?php
require 'Config.php';
class Auth extends Config
{
    public function getUserByLogin($login)
    {
        global $conn;
        return $conn->query("select * from userdata where loginid='$login'")->fetch_object();
    }
    public function checkExist($login)
    {
        global $conn;
        return $conn->query("select * from userdata where loginid='$login'")->num_rows;
    }
    public function getuserdata($userid, $value)
    {
        global $conn;
        $qry = $conn->query("select * from userdata where loginid='$userid'");
        if ($qry->num_rows > 0) {
            return $qry->fetch_object()->$value;
        } else {
            return null;
        }
    }

}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $act = new Auth();
    $conn = $act->connection();
    $data = json_decode(file_get_contents("php://input")); // pass ,true if you want to return array instead of an object

    // user login
    if (isset($data->action) && $data->action === 'userLogin') {
        $loginid = $act->sanitize($data->loginid);
        $password = md5($act->sanitize($data->password));

        $checklogin = $conn->query("
                select * from userdata
                where (
                    contact='$loginid'
                    or email='$loginid'
                    )
                and password='$password'");

        $getUser = $checklogin->fetch_object();

        if ($checklogin->num_rows >= 1) {

            $res = [
                'status' => 'success',
                'isloggedin' => 'true',
                'userrole' => $getUser->userrole,
                'userid' => $getUser->id,
                'usertoken' => md5($getUser->id),
                'username' => $getUser->fname . ' ' . $getUser->mname . ' ' . $getUser->lname,
            ];

            $fullusername = $getUser->fname . ' ' . $getUser->mname . ' ' . $getUser->lname;

            $token = $act->setjwt($getUser->id, $getUser->userrole, $fullusername);
            $act->createcookie($token);

        } else {

            $res = [
                'status' => 'userNotFound',
            ];

        }
        echo json_encode($res);

    }

    if (isset($data->action) && $data->action == 'validateuser') {
        $userid = $act->sanitize($data->userid);
        $usertoken = $act->sanitize($data->usertoken);
        $userrole = $act->sanitize($data->userrole);

        $qry = $conn->query("select id from userdata where id='$userid' and MD5(id)='$usertoken' and userrole='$userrole'");

        if ($qry->num_rows == 1) {
            echo json_encode([
                'status' => 'success',
            ]);
        } else {
            echo json_encode([
                'status' => 'failed',
            ]);
        }
        echo $conn->error;
    }

    if (isset($data->action) && $data->action == 'resetpassword') {
        $userid = $act->sanitize($data->userid);
        $newpass = md5($act->sanitize($data->newpass));

        if ($userid > 0 && $newpass != '') {
            $qry = $conn->query("update userdata set password = '$newpass', firstpasschange='y' where id ='$userid'");
            if ($qry && !$conn->error) {
                echo json_encode([
                    'status' => 'success',
                ]);
            }
        }
    }

    // user registration

    if (isset($data->action) && $data->action === 'userRegistration') {
        $fname = $act->sanitize($data->firstname);
        $mname = $act->sanitize($data->middlename);
        $lname = $act->sanitize($data->lastname);
        $contact = $act->sanitize($data->contactnumber);
        $email = $act->sanitize($data->email);
        $password = md5($act->sanitize($data->password));

        if (empty($fname) || empty($contact) || empty($password)) {
            echo json_encode([
                'status' => 'failed',
                'reason' => 'empty',
            ]);
        } else {

            $checkuser = $conn->query("select id from userdata where contact = '$contact' or email ='$email'");

            if ($checkuser->num_rows > 0) {
                echo json_encode([
                    'status' => 'failed',
                    'reason' => 'userexist',
                ]);
            } else {
                $qry = $conn->query("INSERT INTO userdata (
                    `fname`, `mname`,
                    `lname`, `email`, `contact`,
                    `password`
                    )VALUES(
                        '$fname', '$mname',
                        '$lname', '$email', '$contact',
                        '$password'
                    )");

                if ($qry) {
                    echo json_encode([
                        'status' => 'success',
                    ]);
                } else {
                    echo json_encode([
                        'status' => $conn->error,
                    ]);
                }
            }

        }
        // update upline on user registration

    }

}
