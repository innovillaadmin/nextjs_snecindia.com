<?php
require('Config.php');
class ManageUser extends Config
{

    public function getuserdata($userid)
    {
        global $conn;
        $qry = $conn->query("select `id`, `fname`, `mname`, 
                                `lname`, `dob`, `gender`, 
                                `address`, `city`, `state`, 
                                `pincode`, `landmark`, 
                                `useremail`, `usercontact` 
                                from userdata where id='$userid'");

        if ($qry->num_rows > 0) {
            return $qry->fetch_object();
        } else {
            return null;
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $act = new ManageUser();
    $conn = $act->connection();
    $data = json_decode(file_get_contents("php://input")); // pass ,true if you want to return array instead of an object

    if (isset($data->action) && $act->isUserValid($data->usertoken)) {

        // get user data
        if ($data->action == 'getuserdatainbulk') {
            $retval = $conn->query("
                        select * from userdata where userrole !='admin'
                    ")->fetch_all(MYSQLI_ASSOC);
            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);

            }
            echo $conn->error;
        }
        // get user data by id 
        if ($data->action == 'getuserdatabyid') {
            $userid = $act->sanitize($data->userid);
            $retval = $conn->query("
                        select * from userdata where id='$userid'
                    ")->fetch_object();
            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);

            }
            echo $conn->error;
        }

        if ($data->action == 'updateuserinfo') {

            $id = $act->sanitize($data->id);
            $fname = $act->sanitize($data->fname);
            $mname = $act->sanitize($data->mname);
            $lname = $act->sanitize($data->lname);
            $email = $act->sanitize($data->email);
            $contact = $act->sanitize($data->contact);
            $newpassword = $act->sanitize($data->newpassword);
            $address = $act->sanitize($data->address);
            $city = $act->sanitize($data->city);
            $state = $act->sanitize($data->state);
            $pincode = $act->sanitize($data->pincode);

            $qry = "update userdata set `fname`='$fname', 
                                    `mname`='$mname', 
                                    `lname`='$lname', 
                                    `lname`='$lname', 
                                    `useremail`='$email', 
                                    `usercontact`='$contact', 
                                    `address`='$address', 
                                    `city`='$city', 
                                    `state`='$state', 
                                    `pincode`='$pincode' 
                                    ";

            if (!empty($newpassword)) {
                $newpass = md5($newpassword);
                $qry .= " , `userpassword`='$newpassword'";
            }

            $qry .= " where `id`='$id' ";

            $conn->query($qry);

            if (!$conn->error && $conn->affected_rows > 0) {
                echo json_encode([
                    'status' => 'success'
                ]);
            }

            echo $conn->error;


        }

        // update user profile for hotel users

        if ($data->action == 'updateuserprofile') {
            $ud = $data->data;
            $userid = $act->sanitize($data->userid);

            $conn->query("UPDATE `userdata` SET 
                            `fname`='$ud->fname',
                            `mname`='$ud->mname',
                            `lname`='$ud->lname',
                            `useremail`='$ud->useremail',
                            `usercontact`='$ud->usercontact',
                            `gender`='$ud->gender',
                            `is_business`='$ud->is_business',
                            `business_name`='$ud->business_name',
                            `gst_number`='$ud->gst_number',
                            `address`='$ud->address',
                            `city`='$ud->city',
                            `state`='$ud->state',
                            `pincode`='$ud->pincode',
                            `id_type`='$ud->id_type',
                            `id_number`='$ud->id_number',
                            `id2_type`='$ud->id2_type',
                            `id2_number`='$ud->id2_number',
                            `id3_type`='$ud->id3_type',
                            `id3_number`='$ud->id3_number'
                            WHERE id='$userid'");

            if (!$conn->error && $conn->affected_rows > 0) {
                echo json_encode([
                    'status' => 'success'
                ]);
            }
        }

    }
}
?>