import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;
  const limit = parseInt(query.limit) || 10; // Add this line

  try {
    const posts = await prisma.post.findMany({
      take: limit,
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // setTimeout(() => {
    res.status(200).json(posts);
    // }, 3000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    }
    res.status(200).json({ ...post, isSaved: false });

    // Get related posts
    const relatedPosts = await getRelatedPosts(post.city, post.type);
    res.status(200).json({ ...post, isSaved: false, relatedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};



export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

export const getRelatedPosts = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    const relatedPosts = await getRelatedPosts(post.city, post.type);
    res.status(200).json(relatedPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get related posts" });
  }
};

export const addComment = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  const postId = req.params.id;

  try {
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        postId,
        userId: tokenUserId,
      },
     
    });
    
    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create comment" });
  }
};

export const getComments = async (req, res) => {
  const postId = req.params.id;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get comments" });
  }
};

export const addReview = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  const postId = req.params.id;

  try {
    const newReview = await prisma.review.create({
      data: {
        rating: body.rating,
        text: body.text,
        postId,
        userId: tokenUserId,
      },
    });
    res.status(201).json(newReview);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create review" });
  }
};

export const getReviews = async (req, res) => {
  const postId = req.params.id;

  try {
    const reviews = await prisma.review.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
      
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get reviews" });
  }
};