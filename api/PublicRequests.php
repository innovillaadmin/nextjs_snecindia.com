<?php
require 'Config.php';
class PublicRequests extends Config
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

    $act = new PublicRequests();
    $conn = $act->connection();
    $data = json_decode(file_get_contents("php://input")); // pass ,true if you want to return array instead of an object

    if ($data->action == 'fetchDepartments') {
        $query = "select * from departments order by id desc limit 100";
        $result = $conn->query($query);
        if ($result && !$conn->error) {
            echo json_encode([
                'status' => 'success',
                'retval' => $result->fetch_all(MYSQLI_ASSOC)
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => $conn->error
            ]);
        }
        echo $conn->error;
    }
    if ($data->action == 'fetchCourses') {
        $departmentid = $act->sanitize($data->departmentid);
        $query = "select * from departments where id='$departmentid' order by id desc limit 100";
        $result = $conn->query($query);
        if ($result && !$conn->error) {
            echo json_encode([
                'status' => 'success',
                'retval' => $result->fetch_all(MYSQLI_ASSOC)
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => $conn->error
            ]);
        }
    }
    if ($data->action == 'fetchSubjects') {
        $courseid = $act->sanitize($data->courseid);
        $query = "select * from subjects where course_id='$courseid' order by id desc limit 100";
        $result = $conn->query($query);
        if ($result && !$conn->error) {
            echo json_encode([
                'status' => 'success',
                'retval' => $result->fetch_all(MYSQLI_ASSOC)
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => $conn->error
            ]);
        }
    }
    if ($data->action == 'getCourseStructure') {
        $depid = $act->sanitize($data->depid);
        $query = "select * from departments where id='$depid' order by id desc limit 1";
        $query2 = "select * from courses where department_id='$depid' order by name asc limit 200";
        $depres = $conn->query($query);
        $courseres = $conn->query($query2);
        if (!$conn->error) {
            echo json_encode([
                'status' => 'success',
                'department' => $depres->fetch_object(),
                'course' => $courseres->fetch_all(MYSQLI_ASSOC),
            ]);
        }
    }
    if ($data->action == 'getNewFranchiseList') {
        $query = "select * from userdata where userrole='franchise' order by id desc limit 100";
        $res = $conn->query($query);
        if (!$conn->error) {
            echo json_encode([
                'status' => 'success',
                'retval' => $res->fetch_all(MYSQLI_ASSOC),
            ]);
        }
    }
    if ($data->action == 'getActiveFranchiseList') {
        $query = "select * from userdata where userrole='franchise' and status='active' order by id desc limit 100";
        $res = $conn->query($query);
        if (!$conn->error) {
            echo json_encode([
                'status' => 'success',
                'retval' => $res->fetch_all(MYSQLI_ASSOC),
            ]);
        }
    }
    if ($data->action == 'getStudyCentreList') {
        $query = "select * from userdata where userrole='study-centre' and status='active' order by id desc limit 100";
        $res = $conn->query($query);
        if (!$conn->error) {
            echo json_encode([
                'status' => 'success',
                'retval' => $res->fetch_all(MYSQLI_ASSOC),
            ]);
        }
    }

}
