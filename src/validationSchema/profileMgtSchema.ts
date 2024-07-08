import * as Yup from 'yup';

export const signUpSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^[A-Za-z\s]{5,}$/, 'fullName can only contain letters and should have at least 5 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .matches(/^[A-Za-z0-9]{8,}$/, 'Password must be at least 8 characters long and contain only letters and numbers')
    .required('Password is required'),
});

export const loginSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{8,}$/, 'Password must be at least 8 characters long and contain only letters and numbers')
      .required('Password is required'),
});

export const twoFactorSchema = Yup.object({
    twoFactorCode: Yup.string()
      .length(6, 'Two factor code must be six digits long')
      .required('Two factor code is required')
})

export const changeEmailSchema = Yup.object({
  newEmail: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
})

export const changePasswordSchema = Yup.object({
  newPassword: Yup.string()
    .matches(/^[A-Za-z0-9]{8,}$/, 'Password must be at least 8 characters long and contain only letters and numbers')
    .required('Password is required'),  
})

export const changeFullNameSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^[A-Za-z\s]{5,}$/, 'fullName can only contain letters and should have at least 5 characters')
    .required('Full name is required')
})

export const passwordSchema = Yup.object({
  password: Yup.string()
    .matches(/^[A-Za-z0-9]{8,}$/, 'Password must be at least 8 characters long and contain only letters and numbers')
    .required('Password is required'),  
})