import React from 'react'
import emailjs, { init } from '@emailjs/browser'



function Newsletter() {

  const [formData, setFormData] = React.useState('')
  const [isValidEmail, setIsValidEmail] = React.useState(true)
  const [isSent, setIsSent] = React.useState(false)
  init('user_dTYhId9PfnHHtjIv8laXU')

  const handleChange = (e) => {
    setIsValidEmail(false)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    if (!formData || !formData.to_name.includes('@')) {
      setIsValidEmail(false)
      return
    }
    try {
      await emailjs.send(
        'service_k8g2a9f',
        'template_wv1hvjh',
        formData)
      setFormData('')
      console.log('success')
      setIsSent(true)
    } catch (err) {
      console.log(err)
    }

  }


  console.log(formData)


  return (
    <div className="container h-screen flex justify-center mx-auto">
      <div className="newsletter-background h-full w-full border-2 border-black flex md:justify-start sm:justify-center">
        <form className="bg-white md:w-1/2 sm:w-full h-1/2 pb-10 mb-20 m-10 shadow flex flex-col" onSubmit={sendEmail}>
          {!isValidEmail && <div>
            <div className="border border-red-400 rounded-b bg-red-100 px-4 py-3 w-4/5 mt-5 mx-auto text-red-700">
              <p>Please enter a valid email address</p>
            </div>
          </div>}
          {isSent && <div>
            <div className="border border-pawhub-grey rounded-b bg-pawhub-yellow/50 px-4 py-3 w-4/5 mt-5 mx-auto text-pawhub-grey">
              <p>Thank you for signing up! please check your inbox</p>
            </div>
          </div>}
          <h2 className="text-2xl p-5">Signup to our newsletter</h2>
          <hr className="mx-5 mb-5"></hr>
          <p className="m-5">Enter your email address below to receive regular pupdates from our homeless hounds</p>
          <label className="block mx-5 mb-2 text-pawhub-grey text-sm font-bold" htmlFor="to_name">
            Email
          </label>
          <input
            className="block shadow rounded border-2 h-8 w-1/2 py-2 px-3 mx-5 text-gray-700 leading-tight focus:outline-none focus:border-pawhub-yellow mb-5" id="to_name" type="text" name="to_name" placeholder="signup to our newsletter" onChange={handleChange}>
          </input>
          <div className="h-14 flex justify-end">
            <button className="rounded-md w-1/6 mr-32 bg-cyan-600 text-white font-bold" type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Newsletter