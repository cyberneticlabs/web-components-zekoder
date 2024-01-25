<template>
    <div class="row" :style="styleObj">
        <div class="col">
            <template v-if="socialIcons && socialIcons.length">
                <div class="social-login">
                    <div
                        class="social-icon"
                        :class="social.label"
                        v-for="(social, i) in socialIcons"
                        :key="i"
                        :title="social.label"
                        :style="social.styleObj"
                        @click.prevent="onSocialClick(social)"
                    >
                        <i v-if="social.icon" :class="social.icon"></i>
                        <img v-else-if="social.image" :src="social.image" :alt="social.label">
                    </div>
                </div>
                <div class="row or">
                    <span v-if="orText" class="custom-or">{{orText}}</span>
                    <div v-else class="col-8 col-offset-2">
                        <p>or</p>
                        <div class="line"></div>
                    </div>
                </div>
            </template>
            <div class="row">
                <zek-form
                    class="col-12"
                    :class="customClass"
                    :theme="theme"
                    :inputs="inputs"
                    :submitButton="submitButton"
                    :cancelButton="{show:false}"
                    :errorMessage="error"
                    :forgotPassword="( showForgotLink || forgotPassword ) && (forgotPassword || {})"
                    :rememberMe="( showRememberMe || rememberMe ) && (rememberMe || {})"
                    @rememberMeUpdated="onRememberMeUpdated($event)"
                    @submit="login($event)"
                    @cancel="cancel()"
                ></zek-form>
            </div>
        </div>
    </div>
</template>
<script>
  import ZekForm from "../form/Form.vue";
  import auth0 from 'auth0-js';
  import * as axios from 'axios';
  import { initializeApp } from 'firebase/app';
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  export default {
    name: 'ZekLogin',
    components: { ZekForm },
    props: {
        theme: String,
        customClass: String,
        email: Object,
        password: Object,
        showForgotLink: Boolean,
        showRememberMe: Boolean,
        rememberMe: Object,
        forgotPassword: Object,
        loginButton: [String, Object],
        socialIcons: Array, // [{icon: '', image:'', label:''}]
        image: Object,
        webAuthConfig: Object,
        firebaseConfig: Object,
        url: String, //login endpoint url
        orText: String,
        styleObj: Object,
        customError:String,
    },
    data() {
        const data = {
            error: '',
            inputs:[
                {
                    name: 'email',
                    type: 'short-text',
                    inputType: 'email',
                    customClass: 'email-username',
                    placeholder: 'Please enter your e-mail',
                    label: 'e-mail address',
                    required: false,
                },
                {
                    name: 'password',
                    type: 'short-text',
                    inputType: 'password',
                    customClass: 'password',
                    placeholder: 'Please enter your password',
                    label: 'password',
                    required: false,
                }
            ],
            webAuth: null,
            fireBase: null,
            rememberUser: this.rememberMe?.checked || false
        }
        if ( this.email ) {
            data.inputs[0] = this.email;
        }
        if ( this.password ) {
            data.inputs[1] = this.password;
        }
        return data;
    },
    created() {
        if(this.webAuthConfig) {
            this.webAuth = new auth0.WebAuth(this.webAuthConfig);
        } else if (this.firebaseConfig) {
            this.fireBase = initializeApp(this.firebaseConfig);
        }
    },
    computed:{
        submitButton() {
            let props = {
                theme: this.theme,
                buttonType: 'submit',
                label: 'Sign In',
                show: true
            };
            if(typeof(this.loginButton)=='string'){
                props = {
                    ...props,
                    label: this.loginButton,
                    show: this.loginButton
                }
            } else {
                props = {
                    ...props,
                    ...this.loginButton
                }
            }
            return props
        }
    },
    methods:{
        login(data) {
            this.$emit('beforeLogin', data);
            if(!this.email?.error && !this.password?.error){
                if(this.webAuth) {
                    this.auth0Login(data);
                } else if (this.fireBase) {
                    this.firebaseLogin(data);
                } else {
                    this.defaultLogin(data);
                }
            }
        },
        firebaseLogin(data) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, data['email'], data['password'])
            .then((userCredential) => {
                localStorage.setItem('userInfo', JSON.stringify(userCredential.user));
                localStorage.setItem('accessToken', userCredential.user.stsTokenManager.accessToken);
                this.error = '';
                this.$emit('onLoginSuccess', userCredential);
            })
            .catch((error) => {
                this.$emit('onLoginError', error);
                const errorCode = error.code;
                // const errorMessage = error.message;
                this.error = errorCode;
            });
        },
        auth0Login(data){
            this.webAuth.login({
                realm: 'Username-Password-Authentication',
                username: data['email'],
                password: data['password'],
            }, (err,dat) =>  {
                if ( err ) {
                    this.$emit('onLoginError', err);
                    this.error = err.description || err.error_description || 'There was an error. Please try again';
                } else if ( dat ) {
                    this.$emit('onLoginSuccess', dat);
                    this.error = '';
                }
            });
        },
        defaultLogin(data){
            axios({
                method: 'post',
                url: this.url || 'https://zkdoer-zeauth-dev-kacxkbhvxa-uc.a.run.app/login',
                data
            })
            .then((res) => {
                localStorage.setItem('userInfo', JSON.stringify(res.data.user));
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                localStorage.setItem('expirationTime', res.data.expirationTime);
                this.error = '';
                this.$emit('onLoginSuccess', res.data);
            })
            .catch((error) => {
                this.$emit('onLoginError', error);
                if(this.customError){
                    this.error = this.customError
                }else{
                    this.error = error && error.response && error.response.data && error.response.data.detail ? error.response.data.detail : 'There was a problem logging you in, please check your username and password. If the problem persists, please contact admin';
                }
            });
        },
        cancel() {
            this.error = '';
        },
        onSocialClick(socialIcon) {
            if ( socialIcon.url ) {
                location.replace(socialIcon.url);
            }
            this.$emit('socialIconClicked', socialIcon.label)
        },
        onRememberMeUpdated(checked) {
            this.rememberUser = checked;
            localStorage.setItem('rememberUser', checked);
        },
    },
    watch: {
        customError(val) {
            this.error = val;
        }
    }
  }
</script>
<style lang="scss">
.social-icon {
    cursor: pointer;
    &:hover {
        cursor: pointer;
    }
}
.or {
    margin-top: -17px;
    margin-bottom: 5px;
    text-align: center;
    justify-content: center;
    .line {
        height: 2px;
        background: #CBCBD4;
        margin-bottom: 20px;
    }
    p {
        position: relative;
        top: 30px;
        background: #fff;
        display: inline-block;
        padding: 0 10px;
        width: initial;
        font-size: 22px;
        font-weight: 500;
    }
}
</style>
