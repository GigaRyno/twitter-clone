import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET' && req.method !== 'DELETE') {
    return res.status(405).end();
  }
  /*

    ok so right now im trying to figure out how to slow down the requests to the server

    things to figure out:

    - how do I slow down the requests to the server
    - how do I make sure that the retweet is being created and deleted properly
    - how do I make sure that the retweet is getting the proper tweet that is needing to be deleted or retweeted
    - how do I make sure that the GET method is getting the proper retweets for the current user and not another tweet that is not the current user's tweet

  */


 let postId = req.body.postId;

  try {
    const { currentUser } = await serverAuth(req, res);

    
    if (req.method === 'POST') {

      const originalpost = await prisma.post.findUnique({
        where: { id: postId }
      });

      let updatedRetweetIds = [...(originalpost?.retweetedIds || [])];
      
      if(currentUser.id === originalpost?.userId) {
        return res.status(600).json({error: 'You cannot retweet your own post'});
      }

      // Updates retweetIds array with the current user's id
      if (!updatedRetweetIds.includes(currentUser.id)) {
        updatedRetweetIds.push(currentUser.id);
      }

      // Updates the post with the updated retweetIds array
      const updatedPost = await prisma.post.update({
        where: {id: postId},
        data: {retweetedIds: updatedRetweetIds}
      });

      // Create a new retweet based on the original tweet that was retweeted
      let post = await prisma.retweet.create({
        data: {
          userId: currentUser.id,
          body: originalpost?.body || '',
          postId: postId,
        }
      });

      res.status(200).json(post && updatedPost);
    }

    if (req.method === 'GET') {
      let grabretweets = await prisma.retweet.findMany({
        where: {
          postId: postId
        },
        include: {
          user: true,
          post: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          updatedAt: 'desc'
        },
      });

      res.status(200).json(grabretweets);
    }

    if (req.method === 'DELETE') {
        let deleteRetweet;

        const findretweet = await prisma.retweet.findMany({ where: { postId: postId, userId: currentUser.id } });

        const originalpost = await prisma.post.findUnique({
          where: { id: postId }
        });
  
        let updatedRetweetIds = [...(originalpost?.retweetedIds || [])];

        // Updates retweetIds array by removing the current user's id
        if (updatedRetweetIds.includes(currentUser?.id)) {
          updatedRetweetIds = updatedRetweetIds.filter((retweetedId) => retweetedId !== currentUser?.id);
        }

        const updatedPost = await prisma.post.update({
          where: {id: postId},
          data: {retweetedIds: updatedRetweetIds}
        });

        // delete the retweet that was created by the user
        deleteRetweet = await prisma.retweet.delete({
          where: {
            id: findretweet[0].id,
            postId: postId,
            userId: currentUser.id
          }
        });
        // res.status(200).json(updatedPost);
        res.status(200).json(deleteRetweet && updatedPost);
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "message" });
  }
}