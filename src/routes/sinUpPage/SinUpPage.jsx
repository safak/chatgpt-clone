import './SinUpPage.css'
import {
  SignUp,
} from "@clerk/react";
const SinUpPage = () => {
  return (
    <div className="sinUpPage">
      <SignUp path="/sign-up" />
    </div>
  )
}
export default SinUpPage
