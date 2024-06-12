import z from "zod";

export const signupInput = z.object({ 
    email : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional() 
})

export const signinInput = z.object({ 
    email  : z.string().email(), 
    password : z.string().min(6),
})

export const createBlogInput = z.object({ 
    title : z.string().max(100),
    content : z.string().max(5500)
})


export const updateBlogInput = z.object({ 
    title : z.string().max(100), 
    content : z.string().max(5500),
    id : z.string(),
    autherId :z.string()
})


export type SignupInput = z.infer<typeof signupInput>

export type SigninInput = z.infer<typeof signinInput>

export type CreateBlogTypes = z.infer<typeof createBlogInput>

export type UpdateBlogInput = z.infer<typeof updateBlogInput>
