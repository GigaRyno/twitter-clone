import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== 'string')
      throw new Error('Invalid ID');

    const post = await prisma.post.findUnique({
        where: {id: postId}
    });

    if (!post)
      throw new Error('Invalid ID');

    let updatedRetweetIds = [...(post.retweetedIds || [])];

    if (req.method === 'POST')
      updatedRetweetIds.push(currentUser.id);   

    if (req.method === 'DELETE')
      updatedRetweetIds = updatedRetweetIds.filter((retweetedId) => retweetedId !== currentUser?.id);
    
    const updateRetweet = await prisma.retweet.update({
      where: {id: postId},
      data: {retweetedIds: updatedRetweetIds}
    });

    return res.status(200).json(updateRetweet);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}