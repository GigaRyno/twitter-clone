import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    // console.log("REQ METHOD: " + req.method);
    return res.status(405).end();
  }

  try {
    const postId = req.query.retweet ?? '';

    console.log({ req: req });
    console.log({ BODY: req.body });

    // console.log("POSTID: " + req.query);
    console.log("req: ", {req});

    // if (!postId || typeof postId !== 'string') {
    //   // console.log("POSTID: " + req);
    //   // throw new Error('Invalid ID');
    //   console.log("POSTID: " + postId);
    // }

    // console.log("POSTID: " + postId);
    // console.log("[retweet].ts");
    // console.log("POSTID: " + postId);

    const post = await prisma.retweet.findMany({
      where: {
        // id: postId as string,
        postId: postId as string,
        // userId: 
      },
      include: {
        user: true,
        post: {
          include: {
            user: true,
            comments: {
              include: {
                user: true
              },
              orderBy: {
                createdAt: 'desc'
              }
            },
            retweets: {
              include: {
                user: true
              },
              orderBy: {
                createdAt: 'desc'
              }
            },
          },
        },
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(600).json({ error: "message" });
  }
}