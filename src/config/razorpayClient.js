import Razorpay from "razorpay";

const razorpay_key_id = "rzp_test_SiQdlK7nOemXIj";
const razorpay_key_secret = "P6dcYHegqgrj3gVG2CXqVvxx";

var razorpay = new Razorpay({
  key_id: razorpay_key_id,
  key_secret: razorpay_key_secret,
});

export default razorpay;
