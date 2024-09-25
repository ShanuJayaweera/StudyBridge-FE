import '../assets/css/componentCSS/card.css'
import '../assets/css/pageCSS/login.css'
import logoImage from '../assets/images/horizontal-logo.png';
import Button from '../components/button';
import FormCheckbox from '../components/formCheckbox';
import FormInput from '../components/formInput';

function Login() {
    return (
        <div className='login-card-container'>
            <div className="card card-custom login-card">
                <div className="card-body">
                    <div className='logo-container'>
                        <img src={logoImage} alt="study-bridge-logo" />
                    </div>
                    <FormInput label={'Email'} type={'email'} id={'email'} placeholder={'Email'} />
                    <FormInput label={'Password'} type={'password'} id={'password'} placeholder={'Password'} />

                    <div className='login-options'>
                        <FormCheckbox label={'Remember Me'} id={'rememberMe'} />
                        <a href='#'><p className='card-subtitle form-label-style'>Forgot Password?</p></a>
                    </div>

                    <Button btnText={'SIGN IN'} btnType='sign-in' />

                    <hr></hr>

                    <div className='login-options'>
                        <p className='card-subtitle text-body-secondary form-label-style'>Continue with google</p>
                    </div>

                    <Button btnText={'SIGN IN'} btnType='sign-in' />

                    <div className='login-options'>
                        <p className='card-subtitle text-body-secondary form-label-style'>Don't Have An Account ?</p>
                        <a href='#'><p className='card-subtitle form-label-style'>Create New Account</p></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;