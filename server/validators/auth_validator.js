const {z} = require("zod");

//creating an object schema

const signupSchema = z.object({
    username: z
    .string({required_error: "Name is required"})
    .trim()
    .min(3, { msg : "Name must be atleast of 3 characters"})
    .max(255, {msg: "Name must not be more than 255 chharacters"}),

    email : z
    .string({required_error: "Email is required"})
    .trim()
    .email({meg : "Invalid email address"})
    .min(3, { msg : "Email must be atleast of 3 characters"})
    .max(255, {msg: "Email must not be more than 255 chharacters"}),

    phone: z
    .string({required_error: "Name is required"})
    .trim()
    .min(10, { msg : "Name must be atleast of 10 characters"})
    .max(20 ,{ msg: "Name must not be more than 20 chharacters"}),

    password: z
    .string({required_error: "Name is required"})
    .min(7, { msg : "Name must be atleast of 7 characters"})
    .max(1024, {msg: "Name must not be more than 1024 chharacters"}),
})

module.exports = signupSchema;