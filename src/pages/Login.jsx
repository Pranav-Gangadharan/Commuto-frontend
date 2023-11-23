import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SlSocialStumbleupon } from 'react-icons/sl';
import { TextInput, Loading, CustomButton } from '../components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BgImg } from '../assets';
import { apiRequest } from '../utils';
import { UserLogin } from '../redux/userSlice';
import { BsFileEaselFill } from 'react-icons/bs';

const Login = () => {
	const [errMsg, setErrMsg] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	const onSubmit = async (data) => {
		setIsSubmitting(true);

		try {
			const res = await apiRequest({
				url: '/auth/login',
				data: data,
				method: 'POST',
			});

			if (res?.status === 'failed') {
				setErrMsg(res);
			} else {
				setErrMsg('');

				const newData = { token: res?.token, ...res?.user };
				dispatch(UserLogin(newData));
				window.location.replace('/');
			}
			setIsSubmitting(false);
		} catch (error) {
			console.log(error);
			setIsSubmitting(false);
		}
	};

	return (
		<div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
			<div className='w-full md:w-2/3 h-fit lg:h-full 2xl"h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl'>
				{/* Left */}
				<div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
					<div className='w-full flex gap-2 items-center mb-6'>
						<div className='p-2 bg-[#065ad8] rounded text-white'>
							<SlSocialStumbleupon />
						</div>
						<span className='text-2xl text-[#065ad8] font-semibold'>
							Commuto
						</span>
					</div>

					<p className='text-ascent-1 text-base font-semibold'>
						Log in to your account
					</p>
					<span className=' text-sm mt-2 text-ascent-2'>Welcome back</span>
					<form
						className='py-8 flex flex-col gap-5'
						onSubmit={handleSubmit(onSubmit)}
					>
						<TextInput
							name='email'
							placeholder='email@example.com'
							label='Email Address'
							type='email'
							register={register('email', {
								required: 'Email Address is required',
							})}
							styles='w-full rounded-full'
							labelStyle='ml-2'
							error={errors.email ? errors.email.message : ''}
						/>

						<TextInput
							name='password'
							placeholder='Password'
							label='Password'
							type='password'
							register={register('password', {
								required: 'Password is required',
							})}
							styles='w-full rounded-full'
							labelStyle='ml-2'
							error={errors.password ? errors.password.message : ''}
						/>

						<Link
							to='/reset-password'
							className='text-sm text-right text-blue font-semibold'
						>
							Forget Password?
						</Link>

						{errMsg?.message && (
							<span
								className={`text-sm ${
									errMsg?.status == 'failed' ? 'text-red' : 'text-green'
								} mt-0.5`}
							>
								{errMsg?.message}
							</span>
						)}

						{isSubmitting ? (
							<Loading />
						) : (
							<CustomButton
								type='submit'
								containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
								title='login'
							/>
						)}
					</form>

					<p className='text-ascent-1 text-base font-semibold'>
						Don't have an account?
						<Link
							to='/register'
							className='text-blue font-semibold ml-2 cursor-pointer'
						>
							Create Account
						</Link>
					</p>
				</div>

				{/* Right */}
				<div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
					<div className='relative w-full flex items-center justify-center'>
						<img
							src={BgImg}
							alt='Bg Image'
							className='w-60 2xl:w-64 h-60 2xl:h-64 rounded-full object-cover'
						/>
					</div>

					<div className='mt-16 text-center'>
						<p className='text-white text-base'>
							Connect with friends and the world
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
