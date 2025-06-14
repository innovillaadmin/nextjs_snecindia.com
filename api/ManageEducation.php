<?php
require 'Config.php';
class ManageEducation extends Config
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

    $act = new ManageEducation();
    $conn = $act->connection();
    $data = json_decode(file_get_contents("php://input")); // pass ,true if you want to return array instead of an object

    if (isset($data->action) && $act->isUserValid($data->usertoken)) {

        /**
         * Required values for almost all actions
         */

        $userid = isset($data->userid) ? $act->sanitize($data->userid) : '';
        $userrole = isset($data->userid) ? $act->sanitize($data->userid) : 'admin';
        $username = isset($data->username) ? $act->sanitize($data->username) : '';



        if ($data->action == 'addDepartment') {
            $depname = $act->sanitize($data->deptName);
            $depcode = $act->sanitize($data->deptCode);

            $qry = $conn->query("INSERT INTO departments (`name`, `code`, `added_by`,`added_by_name`, `date`, `time`) 
                        VALUES('$depname', '$depcode', '$userid','$username', CURRENT_DATE(), CURRENT_TIME())");

            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                ]);

            }
            echo $conn->error;
        }

        if ($data->action == 'getTableData') {
            $table = $act->sanitize($data->table ?? '');
            $where = $data->where ?? '';
            $limit = $data->limit ?? '100';
            $orderby = $data->orderby ?? 'id desc';

            // Validate table name — only allow specific safe tables
            $allowedTables = ['departments', 'courses', 'subjects', 'franchises', 'userdata'];
            if (!in_array($table, $allowedTables)) {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Table not allowed'
                ]);
                exit;
            }

            $query = "SELECT * FROM `$table`";

            if (!empty($where)) {
                $query .= " WHERE $where";
            }
            if (!empty($orderby)) {
                $query .= " order by $orderby";
            }
            if (!empty($limit)) {
                $query .= " LIMIT $limit";
            }
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
        if ($data->action == 'getCourses') {

            $query = "SELECT c.id, c.name, c.course_code, 
                            c.department_id, c.duration, c.eligibility, 
                            c.added_by, c.added_by_name, c.date, c.time, 
                            d.name as department_name
                            FROM courses c 
                            JOIN departments d ON 
                            d.id = c.department_id 
                            ORDER BY c.id DESC;";

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
        if ($data->action == 'addCourse') {
            $dept = $act->sanitize($data->selectedDept);
            $coursecode = $act->sanitize($data->courseCode);
            $eligibility = $act->sanitize($data->eligibility);
            $duration = $act->sanitize($data->duration);
            $coursename = $act->sanitize($data->courseName);

            $departmentname = $conn->query("select name from departments where id='$dept'")->fetch_object()->name ?? '';

            $query = "INSERT INTO courses (
                        `name`, `course_code`, `department_id`, 
                        `department_name`, 
                        `eligibility`, `duration`, `added_by`, 
                        `added_by_name`, `date`, `time`) 
                        VALUES(
                        '$coursename', '$coursecode', '$dept', 
                        '$departmentname',
                        '$eligibility', '$duration', '$userid', 
                        '$username', CURRENT_DATE(), CURRENT_TIME())";

            $result = $conn->query($query);
            if ($result && !$conn->error) {
                echo json_encode([
                    'status' => 'success',
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => $conn->error
                ]);
            }
        }
        if ($data->action == 'addSubject') {
            $deptid = $act->sanitize($data->selectedDepartment);
            $courseid = $act->sanitize($data->selectedCourse);
            $semester = $act->sanitize($data->semester);
            $subjectname = $act->sanitize($data->subjectName);
            $departmentname = $conn->query("select name from departments where id='$deptid'")->fetch_object()->name ?? '';
            $coursename = $conn->query("select name from courses where id='$courseid'")->fetch_object()->name ?? '';

            $query = "INSERT INTO `subjects`(
                        `course_id`, `department_id`, 
                        `course_name`, `department_name`, 
                        `part_or_semester`, `subject_name`, 
                        `added_by`, `added_by_name`, `date`, 
                        `time`) VALUES (
                        '$courseid', '$deptid', 
                        '$coursename', '$departmentname',
                        '$semester', '$subjectname', 
                        '$userid', '$username', CURRENT_DATE(), 
                        CURRENT_TIME())";

            $result = $conn->query($query);
            if ($result && !$conn->error) {
                echo json_encode([
                    'status' => 'success',
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => $conn->error
                ]);
            }
        }
        if ($data->action == 'addFranchise') {
            $name = $act->sanitize($data->name);
            $email = $act->sanitize($data->email);
            $contact = $act->sanitize($data->contact);
            $address = $act->sanitize($data->address);
            $city = $act->sanitize($data->city);
            $state = $act->sanitize($data->state);
            $pincode = $act->sanitize($data->pincode);
            $status = $act->sanitize($data->status);
            $password = $act->sanitize($data->password);

            $query = "INSERT INTO `userdata`(
                        `status`, `fname`, `contact`, 
                        `email`, `address`, `password`, 
                        `userrole`, `approved_by_id`, `approved_by_name`, 
                        `date_of_approval`, `date_added`, 
                        `time_added`, `date_modified`, `time_modified`, 
                        `added_by_id`, `added_by_name`) VALUES (
                        '$status', '$name', '$contact',
                        '$email', '$address.' '.$city.' '.$state.' '.$pincode', '$password', 
                        'franchise', '$userid', '$username', 
                        CURRENT_DATE(), CURRENT_DATE(), 
                        CURRENT_TIME(), CURRENT_DATE(), 
                        CURRENT_TIME(), '$userid', '$username')";

            $result = $conn->query($query);
            if ($result && !$conn->error) {
                echo json_encode([
                    'status' => 'success',
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => $conn->error
                ]);
            }
        }
        if ($data->action == 'addStudyCenter') {
            $name = $act->sanitize($data->name);
            $email = $act->sanitize($data->email);
            $contact = $act->sanitize($data->contact);
            $address = $act->sanitize($data->address);
            $city = $act->sanitize($data->city);
            $state = $act->sanitize($data->state);
            $pincode = $act->sanitize($data->pincode);
            $status = $act->sanitize($data->status);
            $password = $act->sanitize($data->password);

            $query = "INSERT INTO `userdata`(
                        `status`, `fname`, `contact`, 
                        `email`, `address`, `password`, 
                        `userrole`, `approved_by_id`, `approved_by_name`, 
                        `date_of_approval`, `date_added`, 
                        `time_added`, `date_modified`, `time_modified`, 
                        `added_by_id`, `added_by_name`) VALUES (
                        '$status', '$name', '$contact',
                        '$email', '$address.' '.$city.' '.$state.' '.$pincode', '$password', 
                        'study-centre', '$userid', '$username', 
                        CURRENT_DATE(), CURRENT_DATE(), 
                        CURRENT_TIME(), CURRENT_DATE(), 
                        CURRENT_TIME(), '$userid', '$username')";

            $result = $conn->query($query);
            if ($result && !$conn->error) {
                echo json_encode([
                    'status' => 'success',
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => $conn->error
                ]);
            }
        }
        if ($data->action == 'addAdmission') {
            $userid = $act->sanitize($data->userid);
            $username = $act->sanitize($data->username);

            // userdata table
            $fname = $act->sanitize($data->fname);
            $mname = $act->sanitize($data->mname);
            $lname = $act->sanitize($data->lname);
            $gender = $act->sanitize($data->gender);
            $contact_number = $act->sanitize($data->contact_number);
            $password = md5($contact_number);
            $email_address = $act->sanitize($data->email_address);
            $address = $act->sanitize($data->address); // required field
            $dob = $act->sanitize($data->dob);
            $whatsapp_number = $act->sanitize($data->whatsapp_number);
            $alternate_number = $act->sanitize($data->alternate_number);
            $photograph = $act->sanitize($data->photograph);
            $academic_year = $act->sanitize($data->academic_year);

            $admission_date = $act->sanitize($data->admission_date);
            $previous_qualification = $act->sanitize($data->previous_qualification);
            $previous_institute = $act->sanitize($data->previous_institute);
            $previous_board_university = $act->sanitize($data->previous_board_university);
            $year_of_passing = $act->sanitize($data->year_of_passing);
            $marks_obtained = $act->sanitize($data->marks_obtained);
            $grade_or_percentage = $act->sanitize($data->grade_or_percentage);
            $caste_category = $act->sanitize($data->caste_category);
            $nationality = $act->sanitize($data->nationality);
            $religion = $act->sanitize($data->religion);
            $blood_group = $act->sanitize($data->blood_group);
            $father_name = $act->sanitize($data->father_name);
            $mother_name = $act->sanitize($data->mother_name);
            $guardian_contact = $act->sanitize($data->guardian_contact);


            $mode_of_admission = 'direct';


            $createuser = "INSERT INTO `userdata`(
                                `status`, `fname`, `mname`, `lname`, 
                                `gender`, `contact`, `email`, `address`, 
                                `password`, `userrole`, `dob`, `whatsapp_number`, 
                                `alternate_number`, `photograph`, `enrollment_date`, 
                                `academic_year`, `admission_status`, `mode_of_admission`, 
                                `admission_date`, `previous_qualification`, `previous_institute`, 
                                `previous_board_university`, `year_of_passing`, `marks_obtained`, 
                                `grade_or_percentage`, `caste_category`, `nationality`, 
                                `religion`, `blood_group`, `father_name`, `mother_name`, 
                                `guardian_contact`, `approved_by_id`, `approved_by_name`, 
                                `date_of_approval`, `date_added`, `time_added`, `date_modified`, 
                                `time_modified`, `added_by_id`, `added_by_name`
                            ) VALUES (
                                'active', '$fname', '$mname', '$lname',
                                '$gender', '$contact_number', '$email_address', '$address',
                                '$password', 'student', '$dob', '$whatsapp_number',
                                '$alternate_number', '', $admission_date,
                                '$academic_year', 'admitted', '$mode_of_admission',
                                '$admission_date', '$previous_qualification', '$previous_institute',
                                '$previous_board_university', '$year_of_passing', '$marks_obtained',
                                '$grade_or_percentage', '$caste_category', '$nationality',
                                '$religion', '$blood_group', '$father_name', '$mother_name',
                                '$guardian_contact', '$userid', '$username', 
                                CURRENT_DATE(), CURRENT_DATE(), CURRENT_TIME(), CURRENT_DATE(), 
                                CURRENT_TIME(), '$userid', '$username'
                            )";

            $usercreation = $conn->query($createuser);

            if ($usercreation && !$conn->error) {
                echo json_encode([
                    'status' => 'success',
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => $conn->error
                ]);
            }
        }
        if ($data->action == 'fetchAdmissions') {


            $retval = $conn->query("Select * from userdata 
                                            where userrole='student' 
                                            order by id desc 
                                            limit 100")->fetch_all(MYSQLI_ASSOC);

            if ($retval && !$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => $conn->error
                ]);
            }
        }

    }
}
