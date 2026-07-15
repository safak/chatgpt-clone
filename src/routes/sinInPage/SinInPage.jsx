import './SinInPage.css'
import { Show, SignIn } from '@clerk/react'

const SinInPage = () => {
  return (
    <div className="sinInPage">
      <SignIn path="/sign-in" />
    </div>
  )
}
export default SinInPage
