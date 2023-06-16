import React from 'react'
import {
   Checkbox,
   FormControl,
   FormControlLabel,
   FormGroup,
   FormLabel,
   TextField,
   Button,
   Grid,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { Redirect } from 'react-router-dom'
import auth from '../../store/auth'
import { observer } from 'mobx-react-lite'
import { FormValuesType } from '../../common/types/types'
import '../../app/App.css'

export const Login = observer(() => {
   const isLoggedIn = auth.isLoggedIn

   const formik = useFormik({
      validate: values => {
         if (!values.email) {
            return {
               email: 'Email is required',
            }
         }
         if (!values.password) {
            return {
               password: 'Password is required',
            }
         }
      },
      initialValues: {
         email: '',
         password: '',
         rememberMe: false,
      },
      onSubmit: (values: FormValuesType) => {
         auth.logIn(values)
      },
   })

   const testAccountLogin = () => {
      const testUser = {
         email: 'free@samuraijs.com',
         password: 'free',
         rememberMe: false,
      }
      auth.logIn(testUser)
   }

   if (isLoggedIn) {
      return <Redirect to={'/'} />
   }

   return (
      <Grid container justifyContent="center">
         <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
               <FormControl className="formControl" style={{ padding: 20, marginTop: 20 }}>
                  <FormLabel>
                     <p>
                        To log in get registered{' '}
                        <a
                           href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}
                           rel="noreferrer"
                        >
                           here
                        </a>
                     </p>
                     <p>
                        or use
                        <span className="testAccountTitle" onClick={testAccountLogin}>
                           common test account
                        </span>
                     </p>
                  </FormLabel>
                  <FormGroup>
                     <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
                     {formik.errors.email ? (
                        <div style={{ color: 'red' }}>{formik.errors.email}</div>
                     ) : null}
                     <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        {...formik.getFieldProps('password')}
                     />
                     {formik.errors.password ? (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                     ) : null}
                     <FormControlLabel
                        label={'Remember me'}
                        control={
                           <Checkbox
                              {...formik.getFieldProps('rememberMe')}
                              checked={formik.values.rememberMe}
                           />
                        }
                     />
                     <Button
                        type={'submit'}
                        variant={'contained'}
                        disabled={!formik.values.email || !formik.values.password}
                        style={{
                           backgroundColor:
                              !formik.values.email || !formik.values.password
                                 ? 'rgba(13, 114, 8, 0.2)'
                                 : 'rgba(13, 114, 8, 0.8)',
                        }}
                     >
                        Login
                     </Button>
                  </FormGroup>
               </FormControl>
            </form>
         </Grid>
      </Grid>
   )
})
