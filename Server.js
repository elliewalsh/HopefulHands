const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
// const userRouter = require("./router/user");
// const PostRouter = require("./router/Post")


// Define JWT_SECRET globally
const JWT_SECRET = 'uhduyw72y3r7834y()gfiwehgd9283eiunvwo?eureuw£^ueds{sdefieofja]~}[[fjnerna334j3n';

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
// app.use("/api/user" , userRouter);
// app.use("/api/post" , PostRouter )

// app.use("/api", router);

const mongoUrl = 'mongodb+srv://ewalsh27:uGkiVYrmB8@cluster.e5jaz1u.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((e) => console.error('Database connection error:', e));

require('./UserDetails');
const User = mongoose.model('UserInfo');

require('./ProductDetails'); // Assuming ProductDetails.js contains the Product model
const ProductModel = mongoose.model('ProductInfo');

require('./MessageDetails');
const Message = mongoose.model('Message');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Destination folder for storing uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // File naming convention
  }
});

// Multer instance
const upload = multer({ 
  storage: storage,
  // Limit file size if needed
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});


//Register as a user
app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ status: "error", error: "Email already registered" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });

    res.send({ status: 'ok' });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Login User
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email, userType: user.userType }, JWT_SECRET);
      res.json({ status: 'ok', data: token });
    } else {
      res.status(401).json({ error: 'Invalid Email or Password' });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reset Password
app.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ status: "error", error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ status: "ok", message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "An error occurred" });
  }
});

// // Authenticate User middleware
// function authenticateUser(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = { email: decoded.email };
//     next();
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// }

// Get user data
app.post('/userData', authenticateUser, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userData = await User.findOne({ email: userEmail });
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.send({ status: 'ok', userData: userData }); // Return all user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.get("/api/user", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create product
app.post('/createProduct', authenticateUser, upload.array('productImages', 5), async (req, res) => {
  try {
    console.log("Received form data:", req.body);

    const { product, description, category, donatedByContact, donatedByName } = req.body;
    const imageUrls = req.files.map(file => file.path.replace("public/", ""));
    const isDonated = false;

    const newProduct = await ProductModel.create({
      product,
      description,
      category,
      imageUrls,
      donatedByContact,
      donatedByName,
      isDonated
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: 'Failed to create product. Please try again later.' });
  }
});

// Fetch products endpoint
app.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: 'Failed to fetch products. Please try again later.' });
  }
});

// Fetch products endpoint
app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const products = await ProductModel.findById(productId);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: 'Failed to fetch products. Please try again later.' });
  }
});



// Update the route for updating a product (admin)
app.put('/api/donations/:id', authenticateUser, async (req, res) => {
  const donationId = req.params.id;
  const { product, description, category } = req.body;

  try {
    // Verify if the donationId is a valid ObjectId (if using MongoDB)
    if (!mongoose.isValidObjectId(donationId)) {
      return res.status(400).json({ error: 'Invalid donation ID' });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      donationId,
      { product, description, category },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product. Please try again later.' });
  }
});

// Add a route for deleting a product (admin)
app.delete('/api/products/:id', authenticateUser, async (req, res) => {
  const productId = req.params.id;

  try {
    // Verify if the productId is a valid ObjectId (if using MongoDB)
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product. Please try again later.' });
  }
});

// Get all users
app.get('/users', authenticateUser, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users. Please try again later.' });
  }
});

// Get a single user
app.get('/api/users/:id', authenticateUser, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user. Please try again later.' });
  }
});

// Update user type (admin only)
app.put('/api/users/:id/userType', authenticateUser, async (req, res) => {
  const userId = req.params.id;
  const { userType } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userType },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user type:', error);
    res.status(500).json({ error: 'Failed to update user type. Please try again later.' });
  }
});

// Delete a user
app.delete('/api/users/:id', authenticateUser, async (req, res) => {
  const userId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user. Please try again later.' });
  }
});

// Update user details (account)
app.put('/api/users/:id', authenticateUser, async (req, res) => {
  const userId = req.params.id;
  const { fname, lname, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fname, lname, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Failed to update user details. Please try again later.' });
  }
});

// Delete a product (account)
app.delete('/api/products/:id', authenticateUser, async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product. Please try again later.' });
  }
});


// Display My Listing
app.get('/api/mylistings/:email', authenticateUser, async (req, res) => {
  try {
    const userEmail = req.params.email;
    console.log("User Email:", userEmail);

    const myListings = await ProductModel.find({ donatedByContact: userEmail }).distinct('_id');
    console.log("My Listings:", myListings);

    const uniqueListings = await ProductModel.find({ _id: { $in: myListings } });
    console.log("Unique Listings:", uniqueListings);

    console.log("Sending response:", uniqueListings);
    res.json(uniqueListings);
  } catch (error) {
    console.error('Error fetching user listings:', error);
    res.status(500).json({ error: 'Failed to fetch user listings. Please try again later.' });
  }
});

// Update user listing
app.put('/api/listings/:id', authenticateUser, upload.single('productImage'), async (req, res) => {
  const listingId = req.params.id;
  const { product, description, category } = req.body;

  try {
    // Verify if the listingId is a valid ObjectId (if using MongoDB)
    if (!mongoose.isValidObjectId(listingId)) {
      return res.status(400).json({ error: 'Invalid listing ID' });
    }

    const existingListing = await ProductModel.findById(listingId);
    if (!existingListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Check if the authenticated user is the owner of the listing
    if (existingListing.donatedByContact !== req.user.email) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updatedFields = {
      product,
      description,
      category,
    };

    if (req.file) {
      const imageUrl = req.file.path.replace("public/", "");
      updatedFields.imageUrls = [imageUrl];
    }

    const updatedListing = await ProductModel.findByIdAndUpdate(
      listingId,
      updatedFields,
      { new: true }
    );

    res.json(updatedListing);
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ error: 'Failed to update listing. Please try again later.' });
  }
});

app.get('/api/donatedProducts', async (req, res) => {
  try {
      // Retrieve donated products from the database
      const donatedProducts = await ProductModel.find({ donated: true });
      return res.status(200).json(donatedProducts);
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route to mark a product as donated
app.put('/api/markAsDonated/:id', async (req, res) => {
  try {
      const productId = req.params.id;
      // Find the product by ID
      const product = await ProductModel.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      // Update the product's donated status
      product.isDonated = true;
      await product.save();
      return res.status(200).json(product);
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

//Unmark as product as donated
app.put('/api/unmarkAsDonated/:id', authenticateUser, async (req, res) => {
  const productId = req.params.id;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { isDonated: false },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error unmarking product as donated:', error);
    res.status(500).json({ error: 'Failed to unmark product as donated. Please try again later.' });
  }
});

// Upload profile picture
app.post("/api/users/:id/profile-picture", authenticateUser, upload.single("profilePicture"), async (req, res) => {
  const userId = req.params.id;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const profilePicture = req.file.filename;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ error: "Failed to update profile picture. Please try again later." });
  }
});

// Update authenticateUser middleware to extract token from "Authorization" header with "Bearer " prefix
function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const userEmail = decoded.email;
    
    User.findOne({ email: userEmail })
      .then((userData) => {
        if (!userData) {
          return res.status(401).json({ error: 'User not found' });
        }
       req.user = { email: userEmail };
       next();
      })
      .catch((error) => {
        console.error("Error authenticating user:", error);
        res.status(500).json({ error: 'Internal server error' });
      });

  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}

// Create message
app.post('/api/post/msg', authenticateUser, async (req, res) => {
  try {
    const { from, to, message } = req.body;

    // Check if 'from' and 'to' are valid ObjectId strings
    if (!mongoose.Types.ObjectId.isValid(from) || !mongoose.Types.ObjectId.isValid(to)) {
      return res.status(400).json({ error: 'Invalid user IDs' });
    }

    const newMessage = new Message({
      message: message,
      Chatusers: [from, to],
      Sender: from,
    });

    await newMessage.save();

    return res.status(200).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get chat messages
app.get('/api/post/get/chat/msg/:user1Id/:user2Id', async (req, res) => {
  try {
    const user1Id = req.params.user1Id;
    const user2Id = req.params.user2Id;

    // Check if user1Id and user2Id are valid ObjectId strings
    if (!mongoose.Types.ObjectId.isValid(user1Id) || !mongoose.Types.ObjectId.isValid(user2Id)) {
      return res.status(400).json({ error: 'Invalid user IDs' });
    }

    const messages = await Message.find({
      Chatusers: { $all: [user1Id, user2Id] },
    }).sort({ createdAt: -1 });

    const allMessages = messages.map((msg) => ({
      myself: msg.Sender.toString() === user1Id,
      message: msg.message,
    }));

    return res.status(200).json(allMessages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get unread message count for a user
app.get('/api/unread-messages', authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;

    const unreadMessageCount = await Message.countDocuments({
      Chatusers: userId,
      readBy: { $ne: userId },
    });

    return res.status(200).json({ count: unreadMessageCount });
  } catch (error) {
    console.error('Error fetching unread message count:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get the list of users who have sent messages to the current user
app.get('/api/chat-users', authenticateUser, async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const chatUsers = await Message.aggregate([
      { $match: { Chatusers: currentUserId } },
      { $group: { _id: '$Sender' } },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: '$user._id',
          fname: '$user.fname',
          lname: '$user.lname',
          profilePicture: '$user.profilePicture',
        },
      },
    ]);

    return res.status(200).json(chatUsers);
  } catch (error) {
    console.error('Error fetching chat users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get chat messages for a user
app.get('/api/chat-messages/:userId', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;

    const messages = await Message.find({
      Chatusers: userId,
    })
      .sort({ createdAt: 1 })
      .populate('Sender', 'fname lname profilePicture'); // Populate the Sender field with user details

    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// // Add a new route to fetch users who have donated
// app.get('/api/donators', authenticateUser, async (req, res) => {
//   try {
//     const donators = await User.find({ donatedByContact: { $exists: true, $ne: null } });
//     const donatorData = donators.map(user => ({
//       _id: user._id,
//       fname: user.fname,
//       lname: user.lname,
//       profilePicture: user.profilePicture,
//     }));
//     res.json(donatorData);
//   } catch (error) {
//     console.error('Error fetching donators:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Get user by donatorId
// app.get('/api/users/:donatorId', authenticateUser, async (req, res) => {
//   try {
//     const donatorId = req.params.donatorId;
//     const user = await User.findOne({ email: donatorId });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     return res.status(200).json(user);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return res.status(500).json({ error: 'Failed to fetch user. Please try again later.' });
//   }
// });

// Get user by donatedByContact (email)
app.get('/api/products/byContact/:donatedByContact', authenticateUser, async (req, res) => {
  try {
    const donatedByContact = req.params.donatedByContact;
    const user = await User.findOne({ email: donatedByContact });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Failed to fetch user. Please try again later.' });
  }
});

// Get user by ID
app.get('/api/users/:userId', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get product by ID
app.get('/api/products/:productId', authenticateUser, async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 5321;
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});