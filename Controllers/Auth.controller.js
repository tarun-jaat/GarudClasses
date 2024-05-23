const bcrypt = require("bcrypt");
const User = require("../model/User.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();





//login contorller 
exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `All fields are required`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email }).populate("additionalDetails");

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email },
				process.env.JWT_SECRET,
				{
					expiresIn: "1h",
				}
			);

			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			// const options = {
			// 	expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
			// 	httpOnly: true,
			// 	sameSite: 'lax', // This line is added to prevent CSRF attacks
			// };
			// res.cookie("token", token, options).status(200).json({
			// 	success: true,
			// 	token,
			// 	user,
			// 	message: `User Login Success`,
			// });

			return res.status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});

		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};
