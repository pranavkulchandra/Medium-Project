import { createBlogInput, updateBlogInput } from "@pkulchandra/medium-common-package"
import { Prisma, PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { verify } from "hono/jwt"

export const blogRouter = new Hono<{
    Bindings : { 
        DATABASE_URL : string, 
        JWT_SECRET : string
    }, 
    Variables : {  
        userId : string
    }
}>

blogRouter.post("/test", async( c) => { 
    return c.text("test sucessfull")
})

//middleware 
blogRouter.use("/*", async (c, next) => { 
    const authHeader = c.req.header("authorization") || "";

    const user = await verify(authHeader, c.env.JWT_SECRET); 
        if(user) { 
            c.set("userId", user.id);
            await next();
        } else { 
            c.status(403); 
            return c.json({ 
                Message : "You are not logged in!!"
            })
        }


})


blogRouter.get("/me", async(c) => { 
    const autherId = c.get("userId")
    console.log(autherId)
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const autherName = await prisma.user.findFirst({ 
            where : {
                id : autherId
            },
            select : { 
                email : true,
                name : true
            }
        })
        c.status(200)
        return c.json(autherName)
    } catch (error) {
        console.log(error)
    }

})



//bulk API 
blogRouter.get("/bulk", async (c) => { 
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findMany({
            where : { 
                isDeleted : false
            },
            select: { 
                title: true, 
                content: true, 
                id : true, 
                auther: { 
                    select: {
                        name: true
                    }
                }
            }
        })
        c.status(200)
        return c.json(blog)
    } catch (error) {
        console.log(error)
    }
})

blogRouter.get("/personal", async(c) => { 
    const autherId = c.get("userId")
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany({ 
            where : { 
                autherId : autherId,
                isDeleted : false
            }
        })
        c.status(200)
        return c.json(blogs)
    } catch (error) {
        console.log(error)
    }

})

//Get Blog Post
blogRouter.get("/:id", async (c)=> { 

    const id = c.req.param("id")
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({ 
            where : { 
                id : id,
                isDeleted : false
            }, 
            select : { 
                content : true, 
                title : true,
                id : true, 
                auther : {
                    select : { 
                        name: true
                    }
                }
            }
        })

        c.status(200)
        return c.json({ 
            blog
        })
    } catch (error) {
        return c.json({ 
            error
        })
        
    }

  })
  



blogRouter.post("/post", async(c) => { 
    const body = await c.req.json()
    const { success } = createBlogInput.safeParse(body)

    console.log("Validation Result", success)

    if ( !success) { 
        c.status(403)
        return c.json({ 
            Message : "Invalid Input"
        })
    }
    const userId = c.get("userId")
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.create({ 
            data : { 
                title : body.title, 
                content : body.content,
                autherId : userId
            }, select : { 
                id : true
            }
        })
        c.status(200)
        return c.json({ 
            blog
        })
    } catch (error) {
        c.status(413)
        return console.log( "Error Creating Blogs ", error)
    }

})


blogRouter.put("/", async(c) => { 
    const id = c.get("userId")
    const body = await c.req.json()
    const { success} = updateBlogInput.safeParse(body);
    if (!success) { 
        c.status(403)
        return c.json({Message : "Invalid Input"})
    }

    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const updatedBlog = await prisma.blog.update({ 
            where : { 
                id : body.id,
                autherId : id,
                isDeleted : false
            }, 
            data : { 
                title : body.title, 
                content : body.content
            }
        })
        c.status(200)
        return c.json({ 
            Message : "Post Updated!!", updatedBlog
        })
    } catch (error) {
        console.log( error)
    }

})


blogRouter.delete("/:id", async(c) => { 
    const id = c.req.param("id"); 
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const deletBlog = await prisma.blog.update({ 
            where : { 
                id : id, 
                isDeleted : false 
            }, 
            data : { 
                isDeleted : true
            }
        }); 
        c.status(200)
        return c.json({ 
            Message : `${deletBlog.title} has been deleted`
        })
    } catch (error) {
        console.log(error)
        c.status(500)
        c.json({
            Message : `Error Deleting blog`
        })
    }
})




