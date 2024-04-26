import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'DELETE')
        return res.status(405).end();
    
    try {
        const { userId } = req.body;
        const { currentUser } = await serverAuth(req, res);

        if(!userId || typeof userId !== 'string')
            throw new Error('Invalid ID');
        
        const user = await prisma.user.findUnique({where: { id: userId }});

        if(!user)
            throw new Error('Invalid ID');
        
        let updatedfollowing = [...(currentUser.following || [])];
        let updatedfollowers = [...(user.followers || [])]

        if (req.method === 'POST')
            updatedfollowing.push(userId);
            updatedfollowers.push(userId);

        if(req.method === 'DELETE')
            updatedfollowing = updatedfollowing.filter((followingId) => followingId !== userId);
            updatedfollowers = updatedfollowers.filter((followerId) => followerId !== userId);

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            }, 
            data: {
                following: updatedfollowing
            }
        });

        const updatedFollower = await prisma.user.update({
            where: {
                id: user.id
            }, 
            data: {
                followers: updatedfollowers
            }
        });

        return res.status(200).json(updatedUser && updatedFollower)
    } catch (err) {
        console.log(err);
        res.status(400).end()
    }
}