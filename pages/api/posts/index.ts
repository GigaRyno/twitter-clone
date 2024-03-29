import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        }
      });
      return res.status(200).json(post);
    }

    if (req.method === 'GET') {
      const { userId } = req.query;

      let posts;

      if (userId && typeof userId === 'string') {
        posts = await prisma.post.findMany({
          where: {
            userId
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
      }

      return res.status(200).json(posts);
    }

  //   if (req.method === 'DELETE') {
  //     let deleteRetweet;

  //     const findretweet = await prisma.retweet.findMany({ where: { postId: postId, userId: currentUser.id } });

  //     const originalpost = await prisma.post.findUnique({
  //       where: { id: postId }
  //     });

  //     let updatedRetweetIds = [...(originalpost?.retweetedIds || [])];

  //     // Updates retweetIds array by removing the current user's id
  //     if (updatedRetweetIds.includes(currentUser?.id)) {
  //       updatedRetweetIds = updatedRetweetIds.filter((retweetedId) => retweetedId !== currentUser?.id);
  //     }

  //     const updatedPost = await prisma.post.update({
  //       where: {id: postId},
  //       data: {retweetedIds: updatedRetweetIds}
  //     });

  //     // delete the retweet that was created by the user
  //     deleteRetweet = await prisma.retweet.delete({
  //       where: {
  //         id: findretweet[0].id,
  //         postId: postId,
  //         userId: currentUser.id
  //       }
  //     });
  //     // res.status(200).json(updatedPost);
  //     res.status(200).json(deleteRetweet && updatedPost);
  // }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}