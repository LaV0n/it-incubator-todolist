import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import { useFormik} from 'formik'
import {Redirect} from 'react-router-dom'
import auth from "../../store/auth";
import {observer} from "mobx-react-lite";

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = observer(() => {

    const isLoggedIn = auth.isLoggedIn

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit:  (values: FormValuesType) => {
           auth.logIn(values);
        },
    })

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }

    return <Grid container justifyContent="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                        target={'_blank'}>here</a>
                        </p>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p> Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email
                            ? <div style={{color:"red"}}>{formik.errors.email}</div>
                            : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password
                            ? <div style={{color:"red"}}>{formik.errors.password}</div>
                            : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'}
                                variant={'contained'}
                                disabled={!formik.values.email || !formik.values.password}
                                color={'primary'}>
                            Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
})
