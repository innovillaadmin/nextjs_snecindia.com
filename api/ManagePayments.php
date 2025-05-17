<?php
require('./Config.php');
require('./razorpay/Razorpay.php');

use Razorpay\Api\Api;
// Live APi Keys
// $keyId = 'rzp_live_jRd7mBdYoIGEJC';
// $keySecret = 'hMPwBh6O2sdNTsEslgkMOAty';
// test api keys 
$keyId = 'rzp_test_P7bzWe0qq1lzxn';
$keySecret = 'dBooR2gEhFdQJ1aBR0UF0Rny';
$displayCurrency = 'INR';


$api = new Api($keyId, $keySecret);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $act = new Config();
    $conn = $act->connection();
    $data = json_decode(file_get_contents("php://input")); 
    // pass ,true if you want to return array instead of an object

    if (isset($data->action)) {
        if ($data->action == 'createOrder') {
            $recipt = rand(11111111, 99999999);
            $amount = (int)$data->amount;

            $orderData = [
                'receipt'         => $recipt,
                'amount'          => $amount * 100, // 2000 rupees in paise
                'currency'        => 'INR',
                'payment_capture' => 1 // auto capture
            ];
            $razorpayOrder = $api->order->create($orderData);
            
            echo json_encode([
                'status'=>'success',
                'orderid'=> $razorpayOrder->id,
                'receipt'=> $razorpayOrder->receipt,
            ]);
        }
        
        if($data->action=='updatePaymentAgainstUser'){
            $userid     = $act->sanitize($data->userid);
            $paymentid  = $act->sanitize($data->paymentid);
            $receiptno  = $act->sanitize($data->receiptno);
            $paidamount = $act->sanitize($data->paidamount);
            $plan       = isset($data->plan)?$act->sanitize($data->plan):'basic';

            $qry = $conn->query("
                        update userdata set 
                        user_type = 'paid',
                        pay_status='paid',
                        rzp_pay_id='$paymentid',
                        pay_receipt_no='$receiptno',
                        pay_date=CURRENT_DATE(),
                        pay_time=CURRENT_TIME(), 
                        paid_amount='$paidamount',
                        current_plan='$plan'
                        where id = $userid 
                    ");

            if($qry && !$conn->error){
                echo json_encode([
                    'status'=>'success'
                ]);
            }
        }
    }
}
