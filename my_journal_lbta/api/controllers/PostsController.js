// Create
const create = async(req, res) => {
  try {
    const title = req.body.title;
    const body = req.body.body;

    await Post.create({
      title: title,
      body: body
    });

    res.ok();
  } catch (err) {
    res.serverError(err.toString());
  }
};

// Get all
const posts = async(req, res) => {
  try {
    const allPost = await Post.find();
    res.send(allPost);
  } catch (err) {
    res.serverError(err.toString());
  }
};

// Get by id
const findById = async(req, res) => {
  try {
    const postId = req.param('postId');

    const post = await Post.findOne({
      id: postId
    });

    if (!post) {
      sails.log(`Could not find post by id: ${postId}, sorry.`);
      res.send(`Could not find post by id: ${postId}, sorry.`);
    }
    else {
      sails.log('Found "%s"', post);
      res.send(post);
    }
  } catch (err) {
    res.serverError(err.toString());
  }
};

// Remove
const remove = async(req, res) => {
  try {
    const postId = req.param('postId');

    const post = await Post.destroyOne({id: postId});
    if (post) {
      sails.log(`Deleted post with id = ${postId}.`);
      res.send(`Deleted post with id = ${postId}.`);
    } else {
      sails.log(`The database does not have a post with id = ${postId}.`);
      res.send(`The database does not have a post with id = ${postId}.`);
    }
  } catch (err) {
    res.serverError(err.toString());
  }
};

module.exports = {
  create: create,
  posts: posts,
  findById: findById,
  remove: remove
};
