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

    let updatedRetweetedIds = [...(post.retweetedIds || [])];

    if (req.method === 'POST') {
      updatedRetweetedIds.push(currentUser.id);   
      console.log('POST -- UPDATED RETWEETED IDS', updatedRetweetedIds);
    }

    if (req.method === 'DELETE') {
      updatedRetweetedIds = updatedRetweetedIds.filter((retweetedId) => retweetedId !== currentUser?.id);
      console.log('DELETE -- UPDATED RETWEETED IDS', updatedRetweetedIds);
    }

    const updatedPost = await prisma.post.update({
      where: {id: postId},
      data: {retweetedIds: updatedRetweetedIds},
    });
     console.log("UPDATED POST", updatedPost);

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}