import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SlSocialStumbleupon } from 'react-icons/sl';
import { TextInput, Loading, CustomButton } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BgImg } from '../assets';
import { apiRequest } from '../utils';

const Register = () => {
	const [errMsg, setErrMsg] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		try {
			const res = await apiRequest({
				url: '/auth/register',
				data: data,
				method: 'POST',
			});

			setErrMsg(res);
			setTimeout(() => {
				navigate('/login');
			}, 3000);

			setIsSubmitting(false);
		} catch (error) {
			console.log(error);
			setIsSubmitting(false);
		}
	};

	return (
		<div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
			<div className='w-full md:w-2/3 h-fit lg:h-full 2xl"h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl'>
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
						Create your account
					</p>
					<form
						className='py-8 flex flex-col gap-5'
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
							<TextInput
								name='firstName'
								placeholder='First Name'
								label='First Name'
								type='text'
								register={register('firstName', {
									required: 'First Name is required',
								})}
								styles='w-full'
								error={errors.firstName ? errors.firstName.message : ''}
							/>

							<TextInput
								name='lastName'
								placeholder='Last Name'
								label='Last Name'
								type='text'
								register={register('lastName', {
									required: 'Last Name is required',
								})}
								styles='w-full'
								error={errors.lastName ? errors.lastName.message : ''}
							/>
						</div>

						<TextInput
							name='email'
							placeholder='email@example.com'
							label='Email Address'
							type='email'
							register={register('email', {
								required: 'Email Address is required',
							})}
							styles='w-full'
							error={errors.email ? errors.email.message : ''}
						/>

						<div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
							<TextInput
								name='password'
								placeholder='Password'
								label='Password'
								type='password'
								register={register('password', {
									required: 'Password is required',
								})}
								styles='w-full'
								error={errors.password ? errors.password.message : ''}
							/>

							<TextInput
								placeholder='Confirm Password'
								label='Confirm Password'
								type='password'
								register={register('cPassword', {
									validate: (value) => {
										const { password } = getValues();

										if (password != value) {
											return 'Passwords do not match';
										}
									},
								})}
								styles='w-full'
								error={
									errors.cPassword && errors.cPassword.type === 'validate'
										? errors.cPassword?.message
										: ''
								}
							/>
						</div>

						{errMsg?.message && (
							<span
								className={`text-sm ${
									errMsg?.status == 'failed'
										? 'text-[#ff2222f6]'
										: 'text-[#1b9e19f6]'
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
								title='Create Account'
							/>
						)}
					</form>

					<p className='text-ascent-1 text-base font-semibold'>
						Already have an account?{' '}
						<Link
							to='/login'
							className='text-blue font-semibold ml-2 cursor-pointer'
						>
							Login
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

export default Register;
