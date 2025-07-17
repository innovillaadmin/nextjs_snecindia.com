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
        if ($data->action == 'getDepartment') {

            $retval = $conn->query("SELECT id, name FROM departments order by name")->fetch_all(MYSQLI_ASSOC);

            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);

            }
            echo $conn->error;
        }
        if ($data->action == 'fetchCoursesByDepartment') {
            $depid = $act->sanitize($data->depid);

            $retval = $conn->query("SELECT id, name FROM courses where department_id='$depid' order by name asc")->fetch_all(MYSQLI_ASSOC);

            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);

            }
        }

        if ($data->action == 'fetchsessionbycourse') {
            $courseid = $act->sanitize($data->course);

            $retval = $conn->query("SELECT session FROM course_enrollment where course_id='$courseid' order by session asc")->fetch_all(MYSQLI_ASSOC);

            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);

            }
        }
        if ($data->action == 'fetchsemesterbysession') {
            $session = $act->sanitize($data->session);

            $retval = $conn->query("SELECT semester FROM course_enrollment where session='$session' order by semester asc")->fetch_all(MYSQLI_ASSOC);

            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);

            }
        }
        if ($data->action == 'fetchsemesterbycourse') {
            $course = $act->sanitize($data->course);

            $retval = $conn->query("SELECT part_or_semester FROM subjects where course_id='$course' group by part_or_semester order by part_or_semester asc ")->fetch_all(MYSQLI_ASSOC);

            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);

            }
        }
        if ($data->action == 'fetchsubjectbysemester') {
            $semester = $act->sanitize($data->semester);
            $course = $act->sanitize($data->selectedCourse);

            $retval = $conn->query("SELECT id, subject_name FROM subjects where course_id='$course' and part_or_semester='$semester' order by subject_name asc")->fetch_all(MYSQLI_ASSOC);

            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);

            }
        }

        if ($data->action == 'addExamQuestion') {
            $department = $act->sanitize($data->department);
            $course = $act->sanitize($data->course);
            $semester = $act->sanitize($data->semester);
            $subject = $act->sanitize($data->subject);
            $session = $act->sanitize($data->session);
            $question_text = $act->sanitize($data->question_text);

            $option1 = $act->sanitize($data->option1);
            $option2 = $act->sanitize($data->option2);
            $option3 = $act->sanitize($data->option3);
            $option4 = $act->sanitize($data->option4);

            $correct_answer = $act->sanitize($data->correct_answer);
            $marks = $act->sanitize($data->marks);

            $conn->query("INSERT INTO `exam_questions`(
                            `question`,`option_1`,`option_2`,`option_3`,`option_4`,`correct_answer`, 
                            `marks`, `department_id`, 
                            `course_id`, `semester`, `subject_id`, 
                            `session`, `created_by`
                            ) VALUES (
                            '$question_text','$option1', '$option2', '$option3', '$option4', '$correct_answer', 
                            '$marks', '$department',
                            '$course', '$semester', '$subject',
                            '$session', '$userid'
                            )");

            if (!$conn->error && $conn->affected_rows > 0) {
                echo json_encode([
                    'status' => 'success',
                ]);
            }

        }
        if ($data->action == 'addExamSchedule') {
            $department = $act->sanitize($data->department);
            $course = $act->sanitize($data->course);
            $semester = $act->sanitize($data->semester);
            $subject = $act->sanitize($data->subject);
            $session = $act->sanitize($data->session);
            $date = $act->sanitize($data->date);
            $startTime = $act->sanitize($data->startTime);
            $endTime = $act->sanitize($data->endTime);

            $conn->query("INSERT INTO `exam_schedule`(
                                `department_id`, `course_id`, `subject_id`, 
                                `session`, `semester`, `date`, 
                                `start_time`, `end_time`, 
                                `created_by`) VALUES(
                                '$department', '$course', '$subject',
                                '$session', '$semester', '$date',
                                '$startTime', '$endTime',
                                '$userid'
                                )");

            if (!$conn->error && $conn->affected_rows > 0) {
                echo json_encode([
                    'status' => 'success',
                ]);
            }

        }
        if ($data->action == 'fetchExamQuestions') {
            $department = $act->sanitize($data->department);
            $course = $act->sanitize($data->course);
            $semester = $act->sanitize($data->semester);
            $subject = $act->sanitize($data->subject);


            if (
                empty($department) || empty($course) || empty($semester) || empty($subject)
            ) {
                $retval = $conn->query("SELECT * FROM exam_questions order by id desc limit 100")->fetch_all(MYSQLI_ASSOC);
            } else {
                $qry = "select * from exam_questions where ";
                if (!empty($department)) {
                    $qry .= "department_id='$department' and ";
                }
                if (!empty($course)) {
                    $qry .= "course_id='$course' and ";
                }
                if (!empty($semester)) {
                    $qry .= "semester='$semester' and ";
                }
                if (!empty($subject)) {
                    $qry .= "subject_id='$subject' and ";
                }
                $qry = rtrim($qry, 'and ');
                $retval = $conn->query($qry)->fetch_all(MYSQLI_ASSOC);
            }

            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);

            }
        }
        if ($data->action == 'fetchExamSchedule') {
            $department = $act->sanitize($data->department);
            $course = $act->sanitize($data->course);
            $semester = $act->sanitize($data->semester);
            $subject = $act->sanitize($data->subject);
            $session = (string) $act->sanitize((string) $data->session);


            if (
                empty($department) || empty($course) || empty($semester) || empty($subject) || empty($session)
            ) {
                $retval = $conn->query("SELECT 
                                                (select name from departments where id=department_id) as department_name,
                                                (select name from courses where id=course_id) as course_name,
                                                (select subject_name from subjects where id=subject_id) as subject_name,
                                                session, semester, date, start_time, end_time, status, created_at 
                                                FROM exam_schedule order by id desc limit 100")->fetch_all(MYSQLI_ASSOC);
            } else {
                $qry = "SELECT
                        (select name from departments where id=department_id) as department_name,
                        (select name from courses where id=course_id) as course_name,
                        (select subject_name from subjects where id=subject_id) as subject_name,
                        session, semester, date, start_time, end_time, status, created_at
                        from exam_schedule where ";

                if (!empty($department)) {
                    $qry .= "department_id='$department' and ";
                }
                if (!empty($course)) {
                    $qry .= "course_id='$course' and ";
                }
                if (!empty($semester)) {
                    $qry .= "semester='$semester' and ";
                }
                if (!empty($subject)) {
                    $qry .= " subject_id='$subject' and ";
                }
                if (!empty($session)) {
                    $qry .= "session='$session' and ";
                }

                $qry = rtrim($qry, 'and ');
                $retval = $conn->query($qry)->fetch_all(MYSQLI_ASSOC);
            }

            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);

            }
        }


        if ($data->action == 'updatePaymentStatusAgainstEnrollment') {
            $enrollment_id = $act->sanitize($data->enrollment_id);
            $new_status = $act->sanitize($data->new_status);
            $admitcardstatus = $new_status == 'paid' ? 'issued' : 'pending';

            $retval = $conn->query("UPDATE course_enrollment SET fee_payment_status='$new_status', admit_card_status='$admitcardstatus' where id='$enrollment_id'");

            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
                ]);

            }
        }

        if ($data->action == 'addEnrollment') {
            $studentid = $act->sanitize($data->studentid);
            $studentname = $act->sanitize($data->studentname);
            $rollnumber = $act->sanitize($data->rollnumber);
            $session = $act->sanitize($data->session);
            $department = $act->sanitize($data->department);
            $course = $act->sanitize($data->course);
            $semester = $act->sanitize($data->semester);
            $enrollmentnumber = $act->sanitize($data->enrollmentnumber);

            $depResult = $conn->query("SELECT name FROM departments WHERE id='$department'");
            $depRow = $depResult->fetch_assoc();
            $department_name = $depRow['name'];

            $courseResult = $conn->query("SELECT name, duration FROM courses WHERE id='$course'");
            $courseRow = $courseResult->fetch_assoc();
            $course_name = $courseRow['name'];
            $course_duration = $courseRow['duration'];


            $conn->query(
                "INSERT INTO course_enrollment (
                        student_id, student_name, rollnumber, 
                        session, department_id, department_name,
                        course_id, course_name, course_duration,
                        semester, enrollment_no, added_by_id, 
                        added_by_name, timestamp
                    ) VALUES (
                        '$studentid', '$studentname', '$rollnumber', 
                        '$session', '$department', '$department_name',
                        '$course', '$course_name', '$course_duration',
                        '$semester', '$enrollmentnumber', '$userid', 
                        '$username', NOW()
                    )"
            );

            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                ]);
            }
        }
        if ($data->action == 'getenrollmentdata') {
            $selectedDepartment = $act->sanitize($data->selectedDepartment);
            $selectedCourse = $act->sanitize($data->selectedCourse);
            $selectedSession = $act->sanitize($data->selectedSession);
            $selectedSemester = $act->sanitize($data->selectedSemester);

            if (
                empty($selectedDepartment) &&
                empty($selectedCourse) &&
                empty($selectedSession) &&
                empty($selectedSemester)
            ) {
                $qry = "SELECT * from course_enrollment order by id desc limit 200";

            } else {
                $qry = "SELECT * from course_enrollment where ";
                if (!empty($selectedDepartment)) {
                    $qry .= "department_id='$selectedDepartment' and ";
                }
                if (!empty($selectedCourse)) {
                    $qry .= "course_id='$selectedCourse' and ";
                }
                if (!empty($selectedSession)) {
                    $qry .= "session='$selectedSession' and ";
                }
                if (!empty($selectedSemester)) {
                    $qry .= "semester='$selectedSemester' and ";
                }
                $qry = rtrim($qry, ' and ');
                $qry .= " order by id desc limit 200";
            }

            $retval = $conn->query($qry)->fetch_all(MYSQLI_ASSOC);



            if (!$conn->error) {
                echo json_encode([
                    'status' => 'success',
                    'retval' => $retval
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

        if ($data->action == 'searchstudent') {
            $searchkey = $act->sanitize($data->searchkey) ?? '';

            if ($searchkey != '') {
                $retval = $conn->query("Select * from userdata 
                                                where userrole='student' 
                                                and CONCAT_WS(' ', fname, mname, lname) like '%$searchkey%'
                                                or rollnumber like '%$searchkey%'
                                                or uid_number like '%$searchkey%'
                                                or contact like '%$searchkey%'
                                                or email like '%$searchkey%'
                                                order by id desc 
                                                limit 100")->fetch_all(MYSQLI_ASSOC);
            } else {
                $retval = $conn->query("Select * from userdata 
                                                where userrole='student' 
                                                order by id desc 
                                                limit 100")->fetch_all(MYSQLI_ASSOC);
            }

            echo json_encode([
                'status' => 'success',
                'retval' => $retval
            ]);
        }

        if ($data->action == 'fetchcourseenrollmentbystudentid') {
            $studentid = $act->sanitize($data->userid);
            $retval = $conn->query("Select * from course_enrollment 
                                            where student_id='$studentid' 
                                            order by id desc 
                                            limit 100")->fetch_all(MYSQLI_ASSOC);
            echo json_encode([
                'status' => 'success',
                'retval' => $retval
            ]);
        }

    }

    if (isset($_POST['action']) && $act->isUserValid($_POST['usertoken'])) {
        if ($_POST['action'] == 'addAdmission') {
            $data = (object) $_POST;
            $userid = $act->sanitize($data->userid);
            $username = $act->sanitize($data->username);
            $photograph = (isset($_FILES['photograph'])
                && isset($_FILES['photograph']['error'])
                && $_FILES['photograph']['error'] === UPLOAD_ERR_OK)
                ? $act->uploadImage('photograph', 'assets/img/student/', 'student_')
                : '';
            $rollnumber = $act->sanitize($data->rollnumber);
            $fname = $act->sanitize($data->fname);
            $mname = $act->sanitize($data->mname);
            $lname = $act->sanitize($data->lname);
            $mother_name = $act->sanitize($data->mother_name);
            $father_name = $act->sanitize($data->father_name);
            $dob = $act->sanitize($data->dob);
            $gender = $act->sanitize($data->gender);
            $caste_category = $act->sanitize($data->caste_category);
            $uid_number = $act->sanitize($data->uid_number);
            $nationality = $act->sanitize($data->nationality);
            $corresponding_address = $act->sanitize($data->corresponding_address);
            $corresponding_city = $act->sanitize($data->corresponding_city);
            $corresponding_state = $act->sanitize($data->corresponding_state);
            $corresponding_pincode = $act->sanitize($data->corresponding_pincode);
            $permanent_address = $act->sanitize($data->permanent_address);
            $permanent_city = $act->sanitize($data->permanent_city);
            $permanent_state = $act->sanitize($data->permanent_state);
            $permanent_pincode = $act->sanitize($data->permanent_pincode);
            $contact_number_father = $act->sanitize($data->contact_number_father);
            $contact_number_mother = $act->sanitize($data->contact_number_mother);
            $contact_number = $act->sanitize($data->contact_number);
            $password = md5($contact_number);
            $alternate_number = $act->sanitize($data->alternate_number);
            $email_address = $act->sanitize($data->email_address);
            $whatsapp_number = $act->sanitize($data->whatsapp_number);

            $highschool_school_name = $act->sanitize($data->highschool_school_name);
            $highschool_board_university = $act->sanitize($data->highschool_board_university);
            $highschool_year_of_passing = $act->sanitize($data->highschool_year_of_passing);
            $highschool_stream = $act->sanitize($data->highschool_stream);
            $highschool_marks_obtained = $act->sanitize($data->highschool_marks_obtained);
            $highschool_marks_in_pertentage = $act->sanitize($data->highschool_marks_in_pertentage);
            $intermediate_school_name = $act->sanitize($data->intermediate_school_name);
            $intermediate_board_university = $act->sanitize($data->intermediate_board_university);
            $intermediate_year_of_passing = $act->sanitize($data->intermediate_year_of_passing);
            $intermediate_stream = $act->sanitize($data->intermediate_stream);
            $intermediate_marks_obtained = $act->sanitize($data->intermediate_marks_obtained);
            $intermediate_marks_in_pertentage = $act->sanitize($data->intermediate_marks_in_pertentage);
            $diploma_school_name = $act->sanitize($data->diploma_school_name);
            $diploma_board_university = $act->sanitize($data->diploma_board_university);
            $diploma_year_of_passing = $act->sanitize($data->diploma_year_of_passing);
            $diploma_stream = $act->sanitize($data->diploma_stream);
            $diploma_marks_obtained = $act->sanitize($data->diploma_marks_obtained);
            $diploma_marks_in_pertentage = $act->sanitize($data->diploma_marks_in_pertentage);
            $graduation_school_name = $act->sanitize($data->graduation_school_name);
            $graduation_board_university = $act->sanitize($data->graduation_board_university);
            $graduation_year_of_passing = $act->sanitize($data->graduation_year_of_passing);
            $graduation_stream = $act->sanitize($data->graduation_stream);
            $graduation_marks_obtained = $act->sanitize($data->graduation_marks_obtained);
            $graduation_marks_in_pertentage = $act->sanitize($data->graduation_marks_in_pertentage);
            $others_school_name = $act->sanitize($data->others_school_name);
            $others_board_university = $act->sanitize($data->others_board_university);
            $others_year_of_passing = $act->sanitize($data->others_year_of_passing);
            $others_stream = $act->sanitize($data->others_stream);
            $others_marks_obtained = $act->sanitize($data->others_marks_obtained);
            $others_marks_in_pertentage = $act->sanitize($data->others_marks_in_pertentage);

            $check_user = $conn->query("select * from userdata where contact='$contact_number' or email='$email_address'")->num_rows;

            if ($check_user == 0) {
                $createuser = " INSERT INTO `userdata`(
                                `status`, `rollnumber`, `fname`, 
                                `mname`, `lname`, `mother_name`, 
                                `father_name`, `dob`, `gender`, 
                                `caste_category`, `uid_number`, `nationality`, 
                                `religion`, `corresponding_address`, `corresponding_city`, 
                                `corresponding_state`, `corresponding_pincode`, `permanent_address`, 
                                `permanent_city`, `permanent_state`, `permanent_pincode`, 
                                `contact_number_father`, `contact_number_mother`, `contact`, 
                                `email`, `password`, `userrole`, 
                                `whatsapp_number`, `alternate_number`, `photograph`, 
                                `highschool_school_name`, `highschool_board_university`, `highschool_year_of_passing`, 
                                `highschool_stream`, `highschool_marks_obtained`, `highschool_marks_in_pertentage`, 
                                `intermediate_school_name`, `intermediate_board_university`, `intermediate_year_of_passing`, 
                                `intermediate_stream`, `intermediate_marks_obtained`, `intermediate_marks_in_pertentage`, 
                                `diploma_school_name`, `diploma_board_university`, `diploma_year_of_passing`, 
                                `diploma_stream`, `diploma_marks_obtained`, `diploma_marks_in_pertentage`, 
                                `graduation_school_name`, `graduation_board_university`, `graduation_year_of_passing`, 
                                `graduation_stream`, `graduation_marks_obtained`, `graduation_marks_in_pertentage`, 
                                `others_school_name`, `others_board_university`, `others_year_of_passing`, 
                                `others_stream`, `others_marks_obtained`, `others_marks_in_pertentage`, 
                                `date_added`, `time_added`, `date_modified`, 
                                `time_modified`, `added_by_id`, `added_by_name`) VALUES (
                                'active', '$rollnumber', '$fname', 
                                '$mname', '$lname', '$mother_name', 
                                '$father_name', '$dob', '$gender', 
                                '$caste_category', '$uid_number', '$nationality', 
                                '', '$corresponding_address', '$corresponding_city', 
                                '$corresponding_state', '$corresponding_pincode', '$permanent_address', 
                                '$permanent_city', '$permanent_state', '$permanent_pincode', 
                                '$contact_number_father', '$contact_number_mother', '$contact_number', 
                                '$email_address', '$password', 'student', 
                                '$whatsapp_number', '$alternate_number', '$photograph', 
                                '$highschool_school_name', '$highschool_board_university', '$highschool_year_of_passing', 
                                '$highschool_stream', '$highschool_marks_obtained', '$highschool_marks_in_pertentage', 
                                '$intermediate_school_name', '$intermediate_board_university', '$intermediate_year_of_passing', 
                                '$intermediate_stream', '$intermediate_marks_obtained', '$intermediate_marks_in_pertentage',
                                '$diploma_school_name', '$diploma_board_university', '$diploma_year_of_passing', 
                                '$diploma_stream', '$diploma_marks_obtained', '$diploma_marks_in_pertentage', 
                                '$graduation_school_name', '$graduation_board_university', '$graduation_year_of_passing', 
                                '$graduation_stream', '$graduation_marks_obtained', '$graduation_marks_in_pertentage', 
                                '$others_school_name', '$others_board_university', '$others_year_of_passing', 
                                '$others_stream', '$others_marks_obtained', '$others_marks_in_pertentage', 
                                CURRENT_DATE(), CURRENT_TIME(), CURRENT_DATE(), 
                                CURRENT_TIME(), '$userid', '$username') ";


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
            } else {
                echo json_encode([
                    'status' => 'error',
                    'err' => 'multi'
                ]);
            }
        }
    }
}
