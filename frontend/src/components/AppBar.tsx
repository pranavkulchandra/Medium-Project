import { Avatar } from "./BlogCard"

export const AppBar = () => {
    return ( 

        <div className="flex justify-between border-b px-10 py-4">
            <div className="flex justify-center flex-col">
                Medum
            </div>
            <div>
                <Avatar size="big" name="Pranav"/>
            </div>
        </div>
    )
 }