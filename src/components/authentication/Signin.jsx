import { clearFormError, loginUsers } from "@/redux/user/userActions";
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
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Signin = () => {
	const { isDark } = useTheme();
	const { user, loading, error } = useSelector(state => state.userLogin)
	const dispatch = useDispatch()

	const onSubmit = (values, { resetForm }) => {
		const { password, emailOrPhone: email } = values;
		const data = {password, email}
		dispatch(loginUsers(data));
	};

	const validationSchema = Yup.object().shape({
		password: Yup.string()
			.min(8, "Passwords are at least 8 characters")
			.required("Password cannot be empty"),
		emailOrPhone: Yup.string()
			.matches(
				/^([0-9]{5,11}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,})$/i,
				"Invalid email or phone number"
			)
			.required("Required"),
	});

	const formik = useFormik({
		initialValues: {
			emailOrPhone: "",
			password: "",
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

	return (
		<form onSubmit={formik.handleSubmit}>
			<Card className="max-w-md mx-auto">
				<Card.Header className="justify-center pb-0">
					<Text b>Login</Text>
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
						type="text"
						label="Email / Phone"
						placeholder="Enter your email / phone number"
						name="emailOrPhone"
						{...formik.getFieldProps("emailOrPhone")}
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
						Remember me
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
						<Loading type="" color="currentColor" size="sm" />
						{loading ? (
							<Loading
								type="points-opacity"
								color="currentColor"
								size="sm"
							/>
						) : (
							"Login"
						)}
					</Button>
					<Link className="text-blue-500" href="/signup">
						Already a member? Sign up!
					</Link>
				</Card.Footer>
			</Card>
		</form>
	);
};

export default Signin;
