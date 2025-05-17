<?php
require('Config.php');
class ManageHotel extends Config{
    
}

if($_SERVER["REQUEST_METHOD"]=="POST"){
    
    $act = new ManageHotel();
    $conn = $act->connection();
    $data = json_decode(file_get_contents("php://input")); // pass ,true if you want to return array instead of an object
    
    if (isset($data->action) && $act->isUserValid(isset($data->usertoken))){
        
        // get admin dashboard data 
        if($data->action == 'getroomsdata'){
            $qry = $conn->query("SELECT 
                                    r.id AS roomid, 
                                    r.name AS room_name, 
                                    r.max_price, 
                                    r.offer_price,
                                    b.order_status AS booking_status,
                                    b.check_in_date AS booked_from,
                                    b.check_out_date AS booked_till
                                FROM 
                                    rooms r
                                LEFT JOIN (
                                    SELECT 
                                        id, 
                                        userid, 
                                        room_id, 
                                        order_status, 
                                        check_in_date, 
                                        check_out_date 
                                    FROM 
                                        booking
                                    ORDER BY id DESC Limit 1
                                ) b ON r.id = b.room_id
                                GROUP BY 
                                    r.id")->fetch_all(MYSQLI_ASSOC);

            if(!$conn->error){
                echo json_encode([
                    'status'=>'success', 
                    'retval'=>$qry
                ]);
            }
        }
        
        // get admin dashboard data 
        if($data->action == 'getroomsdatabyid'){
            $id = $act->sanitize($data->id);
            $qry = $conn->query("SELECT 
                                r.id AS roomid, 
                                r.name AS room_name, 
                                r.max_price, 
                                r.offer_price,
                                b.id as booking_id,
                                b.order_status,
                                b.check_in_date,
                                b.check_out_date,
                                b.userid, 
                                b.user_name, 
                                b.check_in_time, 
                                b.check_out_time, 
                                b.person_count, 
                                b.adult_count, 
                                b.minor_count, 
                                b.total_stay_in_days, 
                                b.total_due_for_room, 
                                b.other_expenses, 
                                b.additional_charges, 
                                b.discount, 
                                b.total_payable, 
                                b.total_paid, 
                                b.balance_amount, 
                                b.pay_mode, 
                                b.pay_date, 
                                b.pay_ref_id, 
                                b.pay_time, 
                                b.orderid, 
                                b.date, 
                                b.time
                            FROM 
                                rooms r
                            LEFT JOIN (
                                SELECT 
                                    * 
                                FROM 
                                    booking 
                                ORDER BY id DESC limit 1
                            ) b ON r.id = b.room_id where r.id='$id' 
                            GROUP BY 
                                r.id")->fetch_object();
            // $qry = $conn->query("select * from rooms where id = '$id'")->fetch_object();
            $qry2 = $conn->query("select id, fname, mname, lname  from userdata order by fname, mname, lname asc")->fetch_all(MYSQLI_ASSOC);
            if(!$conn->error){
                echo json_encode([
                    'status'=>'success', 
                    'retval'=>$qry,
                    'retval2'=>$qry2
                ]);
            }
        }

        // update room config

        if($data->action == 'updateroomconfig'){
          $updateid        = $act->sanitize($data->updateid);
          $roomname        = $act->sanitize($data->roomname);
          $maxprice        = $act->sanitize($data->maxprice);
          $currentprice    = $act->sanitize($data->currentprice);

          $qry             = $conn->query("update rooms set 
                                            name='$roomname', 
                                            max_price='$maxprice', 
                                            offer_price='$currentprice' 
                                            where id='$updateid'");
            if($qry && !$conn->error){
                echo json_encode([
                    'status'=>'success'
                ]);
            }
        }

        // get room booking status and historical data  
        if($data->action == 'getbookinghistory'){
            $filter = $act->sanitize($data->orderfilter);
            $qry = "";
            if($filter=='new'){
                $qry = $conn->query("select * from booking where order_status = 'generated' order by id desc");
            }else{
                $qry = $conn->query("select * from booking order by id desc limit 200");
            }

            if($qry && !$conn->error){
                echo json_encode([
                    'status'=>'success',
                    'retval'=>$qry->fetch_all(MYSQLI_ASSOC)
                ]);
            }
        }

        // add room to cart 
        if($data->action == 'addroomtocart'){
            
            $userid          =$act->sanitize($data->userid);   
            $username        =$act->sanitize($data->username);   
            $roomid          =$act->sanitize($data->roomid);   
            $roomname        =$act->sanitize($data->roomname);   
            $maxprice        =$act->sanitize($data->maxprice);   
            $offerprice      =$act->sanitize($data->offerprice);   
            $bookingtotal    =$act->sanitize($data->bookingtotal);           
            $checkInDate     =$act->sanitize($data->checkInDate);           
            $checkInTime     =$act->sanitize($data->checkInTime);           
            $checkOutDate    =$act->sanitize($data->checkOutDate);           
            $checkOutTime    =$act->sanitize($data->checkOutTime);           
            $adultcount      =(int) $act->sanitize($data->adultcount);       
            $minorcount      =(int) $act->sanitize($data->minorcount);       
            $totalstay       =(int) $act->sanitize($data->totalstay);       
            $personcount     =$adultcount+$minorcount;       


            # Check Availibility 

            $checkbookingstatus = $conn->query("select * from booking where room_id = '$roomid' and order_status!='closed'")->num_rows;

            if($checkbookingstatus>0){
                echo json_encode([
                    'status'=>'failed',
                    'err'=>'booked'
                ]);
            }else{
                $conn->query("INSERT INTO booking(
                            userid, user_name, 
                            check_in_date, check_in_time, 
                            check_out_date, check_out_time, 
                            room_id, room_name, 
                            max_price, booking_price, 
                            person_count, adult_count, 
                            minor_count, total_stay_in_days, 
                            total_due_for_room, total_payable, 
                            date, time
                            ) VALUES (
                            '$userid','$username',
                            '$checkInDate', '$checkInTime',
                            '$checkOutDate', '$checkOutTime',
                            '$roomid', '$roomname',
                            '$maxprice', '$offerprice',
                            '$personcount', '$adultcount',
                            '$minorcount', '$totalstay',
                            '$bookingtotal', '$bookingtotal',
                            CURRENT_DATE(), CURRENT_TIME()
                            )");

                    if(!$conn->error){
                        echo json_encode([
                            'status'=>'success'
                        ]);
                    }

            }
        }

        if($data->action=='getcartitemsforuser'){
            $userid = $act->sanitize($data->userid);
            $retval = $conn->query("select * from booking 
                                    where userid='$userid' 
                                    and order_status='pending'
                                    ")->fetch_all(MYSQLI_ASSOC);

            $total = $conn->query("select sum(total_payable) as total from booking 
                                    where userid='$userid' 
                                    and order_status='pending'
                                    ")->fetch_object()->total;

            if(!$conn->error){
                echo json_encode([
                    'status'=>'success',
                    'retval'=>$retval,
                    'total'=>$total
                ]);
            }
        }

        if($data->action=='deleteitemfromcart'){
            $delid = $act->sanitize($data->delid);

            $conn->query("delete from booking where id = '$delid'");

            if(!$conn->error){
                echo json_encode([
                    'status'=>'success'
                ]);
            }
        }

        if($data->action == 'completeordergeneration'){
            $userid = $act->sanitize($data->userid);
            $paymode = $act->sanitize($data->paymentMethod);
            $tref = $act->sanitize($data->transactionRef);
            $paidamount = isset($data->paidamount)?$act->sanitize($data->paidamount):0;

            $orderid = '';
            
            if($paymode=='online'){
                $orderid = $act->sanitize($data->orderid);
            }else{
                $orderid = $act->generateUniqueOrderId() ;
            }

            $conn->query("UPDATE booking set 
                        order_status='generated', 
                        pay_mode='$paymode', 
                        pay_date=CURRENT_DATE(), 
                        pay_ref_id='$tref', 
                        pay_time=CURRENT_TIME(), 
                        orderid='$orderid', 
                        total_paid = '$paidamount'
                        where userid='$userid' and order_status='pending'");

            if(!$conn->error && $conn->affected_rows>0){
                echo json_encode([
                    'status'=>'success'
                ]);
            }
        }

        if($data->action=='getuserorderhistory'){
            $userid = $act->sanitize($data->userid);
            $retval = $conn->query("select * from booking where userid = '$userid' and order_status != 'pending'")->fetch_all(MYSQLI_ASSOC);
            if(!$conn->error){
                echo json_encode([
                    'status'=>'success',
                    'retval'=>$retval
                ]);
            }

        }

        if($data->action == 'getcheckoutdata'){
            
            $userid     = $act->sanitize($data->userid);
            
            $cartinfo   = $conn->query("select sum(total_payable) as payable_amount 
                                        from booking where userid='$userid' 
                                        and order_status='pending'
                                        ")->fetch_object();
            
            $userinfo   = $conn->query("select fname, mname, lname, useremail, 
                                        usercontact, business_name, address, city, 
                                        state, pincode from userdata where id='$userid'
                                        ")->fetch_object(); 

            if(!$conn->error){
                echo json_encode([
                    'status'=>'success',
                    'cartinfo'=>$cartinfo,
                    'userinfo'=>$userinfo,
                ]);
            }
        }

        if($data->action == 'managebooking'){
             $userid                   = $act->sanitize($data->userid);
             $roomid                   = $act->sanitize($data->roomid);
             $roomname                 = $act->sanitize($data->roomname);
             $bookingid                = $act->sanitize($data->bookingid);
             $bookingtype              = $act->sanitize($data->bookingtype);
             $customerid               = $act->sanitize($data->customerid);
             $customername             = $act->sanitize($data->customername);
             $checkindate              = $act->sanitize($data->checkindate);
             $checkintime              = $act->sanitize($data->checkintime);
             $checkoutdate             = $act->sanitize($data->checkoutdate);
             $checkouttime             = $act->sanitize($data->checkouttime);
             $maxprice                 = $act->sanitize($data->maxprice);
             $bookingprice             = $act->sanitize($data->bookingprice);
             $personcount              = $act->sanitize($data->personcount);
             $adultcount               = $act->sanitize($data->adultcount);
             $minorcount               = $act->sanitize($data->minorcount);
             $totalstaydays            = $act->sanitize($data->totalstaydays);
             $totaldue                 = $act->sanitize($data->totaldue);
             $otherexpenses            = $act->sanitize($data->otherexpenses);
             $additionalcharges        = $act->sanitize($data->additionalcharges);
             $extradiscount            = $act->sanitize($data->extradiscount);
             $totalpayable             = $act->sanitize($data->totalpayable);
             $totalpaid                = $act->sanitize($data->totalpaid);
             $balanceamount            = $act->sanitize($data->balanceamount);
             $paymode                  = $act->sanitize($data->paymode);
             $orderid                  = $act->generateUniqueOrderId();

             if($bookingtype == 'close'){
                $conn->query("UPDATE `booking` SET 
                `check_in_date`='$checkindate',
                `check_in_time`='$checkintime',
                `check_out_date`='$checkoutdate',
                `check_out_time`='$checkouttime',
                `booking_price`='$bookingprice',
                `person_count`='$personcount',
                `adult_count`='$adultcount',
                `minor_count`='$minorcount',
                `total_stay_in_days`='$totalstaydays',
                `total_due_for_room`='$totaldue',
                `other_expenses`='$otherexpenses',
                `additional_charges`='$additionalcharges',
                `discount`='$extradiscount',
                `total_payable`='$totalpayable',
                `total_paid`='$totalpaid',
                `balance_amount`='$balanceamount',
                `pay_mode`='$paymode',
                `orderid`='$orderid', 
                `order_status`='closed'
                WHERE id='$bookingid' and order_status='generated'");
             }else{
                $conn->query("INSERT INTO `booking`(
                                `userid`, `user_name`, 
                                `check_in_date`, `check_in_time`, 
                                `check_out_date`, `check_out_time`, 
                                `room_id`, `room_name`, 
                                `max_price`, `booking_price`, 
                                `person_count`, `adult_count`, 
                                `minor_count`, `total_stay_in_days`, 
                                `total_due_for_room`, `other_expenses`, 
                                `additional_charges`, `discount`, 
                                `total_payable`, `total_paid`, 
                                `balance_amount`, `pay_mode`, 
                                `pay_date`, `pay_ref_id`, 
                                `pay_time`, `orderid`, 
                                `order_status`, 
                                `date`, `time`) VALUES (
                                    '$customerid', '$customername', 
                                    '$checkindate', '$checkintime', 
                                    '$checkoutdate', '$checkouttime', 
                                    '$roomid', '$roomname', 
                                    '$maxprice', '$bookingprice', 
                                    '$personcount', '$adultcount', 
                                    '$minorcount', '$totalstaydays', 
                                    '$totaldue', '$otherexpenses', 
                                    '$additionalcharges', '$extradiscount', 
                                    '$totalpayable', '$totalpaid', 
                                    '$balanceamount', '$paymode', 
                                    CURRENT_DATE(), 'NA', 
                                    CURRENT_TIME(), '$orderid', 
                                    'generated', 
                                    CURRENT_DATE(),CURRENt_TIME()
                                )");
             }

             if(!$conn->error && $conn->affected_rows>0){
                echo json_encode([
                    'status'=>'success'
                ]);
             }


        }

        if($data->action=='rejectbookingfromcustomer'){
            $usertoken      = $act->sanitize($data->usertoken);        
            $bookingid      = $act->sanitize($data->bookingid);        

            $conn->query("update booking set 
                            order_status='rejected' 
                            where id='$bookingid' 
                            and order_status!='closed'");

            if(!$conn->error && $conn->affected_rows>0){
                echo json_encode([
                    'status'=>'success'
                ]);
            }
        }

        if($data->action === 'getcontactrequests'){
            $limit = $act->sanitize($data->userid);

            $retval = $conn->query("select * from contact_requests 
                                            order by id 
                                            desc limit $limit ")->fetch_all(MYSQLI_ASSOC);

            if(!$conn->error){
                echo json_encode([
                    'status'=>'success', 
                    'retval'=>$retval
                ]);
            }
        }
        if($data->action === 'getemailrequests'){
            $limit = $act->sanitize($data->userid);

            $retval = $conn->query("select * from email_subscriptions 
                                            order by id 
                                            desc limit $limit ")->fetch_all(MYSQLI_ASSOC);

            if(!$conn->error){
                echo json_encode([
                    'status'=>'success', 
                    'retval'=>$retval
                ]);
            }
        }

        

        
    }

    // action which does not require authentication
    if($data->action == 'getroominfofromdb'){
        $roomid = $act->sanitize($data->roomid);
        $retval = $conn->query("select * from rooms where id = '$roomid'")->fetch_object();

        if(!$conn->error){
            echo json_encode([
                'status'=>'success', 
                'retval'=>$retval
            ]);
        }
    }

    if($data->action == "subscribemailinglist"){
        $email = $act->sanitize($data->email);

        $checkmail = $conn->query("select email 
                                    from email_subscriptions 
                                    where email='$email' 
                                    and status='active'")->num_rows;
        if($checkmail>0){
            echo json_encode([
                'status'=>'failed', 
                'err'=>'multi'
            ]);
        }else{
            $conn->query("INSERT INTO `email_subscriptions`(
            `email`, `date`, `time`) VALUES (
            '$email', CURRENT_DATE(), CURRENT_TIME()
            )  ");

            if(!$conn->error && $conn->affected_rows>0){
                echo json_encode([
                    'status'=>'success'
                ]);
            }
        }
    }

    if($data->action == 'submitcontactrequest'){
        $fullname    = $act->sanitize($data->fullname);           
        $contact     = $act->sanitize($data->contact);           
        $email       = $act->sanitize($data->email);       
        $purpose     = $act->sanitize($data->purpose);           

        $checkformulti = $conn->query("select id from contact_requests 
                                                where contact_number ='$contact' 
                                                and email='$email'")->num_rows;

        if($checkformulti>0){
            echo json_encode([
                'status'=>'failed', 
                'err'=>'multi'
            ]);
        }else{
            $conn->query("INSERT INTO `contact_requests`(
                                `full_name`, `contact_number`, 
                                `email`, `purpose`, 
                                `date`, `time`) VALUES (
                                    '$fullname', '$contact', 
                                    '$email', '$purpose',
                                    CURRENT_DATE(), CURRENT_TIME() 
                                )");
            if(!$conn->error){
                echo json_encode([
                    'status'=>'success', 
                ]);
            }

        }
    }
    

        
    
    
   
}
?>