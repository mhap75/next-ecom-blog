import { clearFormError, signupUsers } from "@/redux/user/userActions";
import {
	Button,
	Card,
	Input,
	Text,
	useTheme,
	Loading,
} from "@nextui-org/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Signup = () => {
	const { isDark } = useTheme();
	const { user, loading, error } = useSelector((state) => state.userSignup);
	const dispatch = useDispatch();
	const router = useRouter();

	const onSubmit = (values) => {
		const { password, email, name, phone: phoneNumber } = values;
		const data = { password, email, name, phoneNumber };
		dispatch(signupUsers(data));
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, "Name length must be at least 2 characters")
			.required("Required"),
		password: Yup.string()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				"Password must be at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
			)
			.required("Password cannot be empty"),
		email: Yup.string().email("Invalid email address").required("Required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords don't match")
			.required("Please confirm your password"),
		phone: Yup.string()
			.matches(/^[0-9]{11}$/, "Invalid phone number")
			.required("Required"),
		termsChecked: Yup.boolean()
			.oneOf([true], "You need to accept the terms and conditions")
			.required("Required"),
	});

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			termsChecked: false,
			phone: "",
			confirmPassword: "",
		},
		onSubmit,
		validationSchema,
		validateOnMount: true,
	});

	const setValidation = (input) => {
		if (formik.touched[input] && formik.errors[input]) {
			return {
				color: "error",
				message: formik.errors[input],
			};
		} else if (formik.touched[input] && !formik.errors[input]) {
			return {
				color: "success",
				message: "",
			};
		} else {
			return {
				color: "",
				message: "",
			};
		}
	};

	useEffect(() => {
		dispatch(clearFormError())
	}, []);

	useEffect(() => {
		user && router.push("/");
	}, [user]);

	return (
		<form onSubmit={formik.handleSubmit}>
			<Card className="max-w-md mx-auto">
				<Card.Header className="justify-center pb-0">
					<Text b>Sign up</Text>
				</Card.Header>
				<Card.Body className="gap-5">
					<Input
						clearable
						shadow={false}
						status={
							!error
								? setValidation("emailOrPhone").color
								: "error"
						}
						helperColor={
							!error
								? setValidation("emailOrPhone").color
								: "error"
						}
						helperText={
							!error
								? setValidation("emailOrPhone").message
								: error
						}
						type="email"
						label="Email"
						placeholder="Enter your email"
						name="email"
						{...formik.getFieldProps("email")}
					/>
					<Input
						clearable
						type="text"
						label="Name"
						status={setValidation("name").color}
						helperColor={setValidation("name").color}
						helperText={setValidation("name").message}
						placeholder="Enter your name"
						shadow={false}
						name="name"
						{...formik.getFieldProps("name")}
					/>
					<Input
						clearable
						type="text"
						label="Phone Number"
						status={setValidation("phone").color}
						helperColor={setValidation("phone").color}
						helperText={setValidation("phone").message}
						placeholder="Enter your phone number"
						shadow={false}
						name="phone"
						{...formik.getFieldProps("phone")}
					/>
					<Input.Password
						label="Password"
						status={setValidation("password").color}
						shadow={false}
						helperColor={setValidation("password").color}
						helperText={setValidation("password").message}
						name="password"
						{...formik.getFieldProps("password")}
						placeholder="Enter your password"
					/>

					<Input.Password
						label="Confirm Password"
						status={setValidation("confirmPassword").color}
						helperColor={setValidation("confirmPassword").color}
						helperText={setValidation("confirmPassword").message}
						shadow={false}
						name="confirmPassword"
						{...formik.getFieldProps("confirmPassword")}
					/>
				</Card.Body>
				<Card.Footer className="flex-col items-start gap-2">
					<div className="flex items-center gap-2">
						<input
							name="termsChecked"
							{...formik.getFieldProps("termsChecked")}
							value={true}
							type="checkbox"
							className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 ${
								isDark
									? "focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
									: ""
							}`}
						/>
						I accept the
						<Link
							href="/"
							className="text-blue-500 hover:underline"
						>
							Terms and conditions
						</Link>
					</div>
					<div className="text-[#F31260] text-xs">
						{setValidation("termsChecked").message}
					</div>
					<Button
						type="submit"
						className={`${
							isDark ? "bg-blue-800" : "bg-blue-500"
						} hover:bg-opacity-80`}
						auto
						disabled={!formik.isValid}
					>
						{loading ? (
							<Loading
								type="points-opacity"
								color="currentColor"
								size="sm"
							/>
						) : (
							"Sign up"
						)}
					</Button>
				</Card.Footer>
			</Card>
		</form>
	);
};

export default Signup;
