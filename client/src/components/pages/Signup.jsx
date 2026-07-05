import React from 'react'
import '../../styles/Signup.css'

function Signup() {

  return (
    
    <div className="signup">
				<form>
					<label htmlFor="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="name" placeholder="Name" required=""/>
                    <input type="email" name="email" placeholder="Email" required=""/>
					<input type="password" name="pswd" placeholder="Password" required=""/>
					<button>Sign up</button>
				</form>
			</div>
    
    
  )
}

export default Signup
