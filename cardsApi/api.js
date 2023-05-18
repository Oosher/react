const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid"); // import uuidv4 function from the uuid package

const app = express();
app.use(cors({ origin: "*" }));
const key = "secret";
app.use(express.json());

const cards = [
  {
    _id: "eafeswfwr2326346tf3254f",
    title: "apple",
    subtitle: "Consumer electronics ",
    description: " Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the world's largest technology company by revenue, with US$394.3 billion in 2022 revenue. As of March 2023, Apple is the world's biggest company by market capitalization. As of June 2022, Apple is the fourth-largest personal computer vendor by unit sales and second-largest mobile phone manufacturer. It is one of the Big Five American information technology companies, alongside Alphabet Inc. (parent company of Google), Amazon, Meta Platforms (formerly Facebook, Inc.), and Microsoft.",
    phone: "1-800-275-2273",
    email: "apple@ios.com",
    web: "https://www..apple.com/",
    image: {
      url: "https://tse2.mm.bing.net/th/id/OIP.6x6s1sTIRrU8my_FCLwPqwHaFj?pid=ImgDet",
      alt: "Apple logo",
    },
    address: {
      state: "WA",
      country: "United States",
      street: "NW",
      houseNumber: 401,
      city: "Seattle",
      zip: 98125,
    },
    bizNumber: 12321324,
    likes: [],
    user_id: "4235234234mfnjrb2h3vbry23",
    
  },
  {
    _id: "daslfjhbasfjba123124123",
    title: "INTEL",
    subtitle: "Semiconductors",
    description: "Intel Corporation (commonly known as Intel) is an American multinational corporation and technology company headquartered in Santa Clara, California. It is one of the world's largest semiconductor chip manufacturer by revenue, and is one of the developers of the x86 series of instruction sets found in most personal computers (PCs). Incorporated in Delaware, Intel ranked No. 45 in the 2020 Fortune 500 list of the largest United States corporations by total revenue for nearly a decade, from 2007 to 2016 fiscal years.",
    phone: "02-5897575",
    email: "jerx.commcenter@intel.com",
    web: "https://www.intel.co.il/content/www/il/he/homepage.html",
    image: {
      url: "https://www.intel.com/etc.clientlibs/settings/wcm/designs/intel/us/en/images/resources/printlogo.png",
      alt: "Intel logo ",
    },
    address: {
      state: "JER",
      country: "Israerl",
      street: "Har Hotzvim",
      houseNumber: 3,
      city: "Jerusalem",
      zip: 97774,
      
    },
    bizNumber: 22312323,
    likes: [],
    user_id: "4235234234mfnjrb2h3vbry23",
  },
  {
    _id: "asdfaa54sdf158as4ass",
    title: "Google",
    subtitle: "Cloud computing",
    description: "Google LLC is an American multinational technology company focusing on online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics. It has been referred to as the most powerful company in the world and one of the world's most valuable brands due to its market dominance, data collection, and technological advantages in the area of artificial intelligence. Its parent company Alphabet is considered one of the Big Five American information technology companies, alongside Amazon, Apple, Meta, and Microsoft",
    phone: "050-4242424",
    email: "google@gmail.com",
    web: "https://www.google.com/",
    image: {
      url: "https://cdn.mos.cms.futurecdn.net/rjqJEKv6P9Yjy9d3KMGvp8.jpg",
      alt: "Google Logo",
    },
    address: {
      state: "CA",
      country: "United States",
      street: "Amphitheatre Parkway",
      houseNumber: 1600,
      city: "Santa Clara Co",
      zip: 1312,
    },
    bizNumber: 32131231,
    likes: [],
    user_id: "4235234234mfnjasdasdry23",
    
  },
];

const users = [
  {
    name: {
      first: "Tzach",
      middle: "",
      last: "Dabush",
    },
    phone: "055-5555555",
    email: "admin@admin.com",
    password: "Abc123!",
    address: {
      state: "Haifa",
      country: "Israel",
      city: "Haifa",
      street: "HaNasi",
      zip: 123456,
      houseNumber: 12,
    },
    image: {
      url: "www.example.com",
      alt: "profile image",
    },
    isBusiness: true,
    isAdmin: true,
    user_id: "4235234234mfnjrb2h3vbry23",
  },
  {
    name: {
      first: "Tzach1",
      middle: "",
      last: "Dabush1",
    },
    phone: "055-5555555",
    email: "admin1@admin.com",
    password: "Abc123!",
    address: {
      state: "Haifa",
      country: "Israel",
      city: "Haifa",
      street: "HaNasi",
      zip: 123456,
      houseNumber: 12,
    },
    image: {
      url: "www.example.com",
      alt: "profile image",
    },
    isBusiness: true,
    isAdmin: false,
    user_id: "4235234234mfnjasdasdry23",
  },
];
const verifyToken = (tokenFromClient) => {
  try {
    const userDataFromPayload = jwt.verify(tokenFromClient, key);
    return userDataFromPayload;
  } catch (error) {
    return null;
  }
};

app.get("/cards", (req, res) => {
  //res.status(404).send("Page not found");
  //setTimeout(() => res.json(cards), 3000);
  res.json(cards);
});

app.get("/cards/my-cards", (req, res) => {
  const tokenFromClient = req.header("x-auth-token");
  if (tokenFromClient) {
    const userData = verifyToken(tokenFromClient);
    const user_id = userData.id; // Assume user_id is passed as a parameter in the body
    const userCards = cards.filter((c) => c.user_id === user_id);
    res.json(userCards);
  } else {
    res.status(404).send("login first");
  }
});
app.get("/cards/fav-cards", (req, res) => {
  const tokenFromClient = req.header("x-auth-token");
  if (tokenFromClient) {
    const userData = verifyToken(tokenFromClient);
    const user_id = userData.id; // Assume user_id is passed as a parameter in the body
    const favCards = cards.filter((c) => c.likes.includes(user_id));
    res.json(favCards);
  } else {
    res.status(404).send("login first");
  }
});

app.get("/cards/:cardId", (req, res) => {
  const cardId = req.params.cardId;
  const card = cards.find((card) => card._id === cardId);
  if (!card) {
    res.status(404).json({ error: "Card not found" });
  } else {
    res.json(card);
  }
});
app.post("/cards", (req, res) => {
  // Add a new ID to the card object
  const newId = Date.now().toString();
  const newCardWithId = { ...req.body, _id: newId };

  // Add the new card to the cards array
  cards.push(newCardWithId);
  console.log(cards);
  // Send the new card object back to the client
  res.json(newCardWithId);
});

app.put("/cards/:id", (req, res) => {
  const cardIndex = cards.findIndex((c) => c._id === req.params.id);
  if (cardIndex === -1) {
    res.status(404).send("Card not found");
  } else {
    const updatedCard = {
      ...cards[cardIndex],
      ...req.body,
      _id: req.params.id,
    };
    cards[cardIndex] = updatedCard;
    res.json(updatedCard);
  }
});

app.patch("/cards/:id", (req, res) => {
  const cardIndex = cards.findIndex((c) => c._id === req.params.id);
  if (cardIndex === -1) {
    res.status(404).send("Card not found");
  } else {
    const tokenFromClient = req.header("x-auth-token");
    if (tokenFromClient) {
      const userData = verifyToken(tokenFromClient);
      const user_id = userData.id;
      const card = cards[cardIndex];
      const userLiked = card.likes.includes(user_id);
      const updatedLikes = userLiked
        ? card.likes.filter((id) => id !== user_id)
        : [...card.likes, user_id];
      const updatedCard = { ...card, likes: updatedLikes };
      cards[cardIndex] = updatedCard;
      console.log(updatedCard);
      res.json(updatedCard);
    } else {
      res.status(404).send("Log in first");
    }
  }
});

app.delete("/cards/:id", (req, res) => {
  const cardIndex = cards.findIndex((c) => c._id === req.params.id);
  if (cardIndex === -1) {
    res.status(404).send("Card not found");
  } else {
    const deletedCard = cards.splice(cardIndex, 1)[0];
    res.json(deletedCard);
  }
});

app.post("/users/login", (req, res) => {
  console.log(req.body);
  //const tokenFromClient = req.header("x-auth-token");
  // if (tokenFromClient) {
  //   const userData = verifyToken(tokenFromClient);
  //   if (userData) {
  //     // User is already logged in, so send back the same token
  //     res.send(tokenFromClient);
  //     return;
  //   }
  // }

  // User is not logged in, so check if the email and password are valid
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    // User not found or password incorrect
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  // User found, so generate a new token and send it back
  const userDataForToken = {
    email: user.email,
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
    firstName: user.name.first,
    id: user.user_id,
    ...user,
  };
  const token = jwt.sign(userDataForToken, key);
  res.send(token);
});

app.post("/users", (req, res) => {

  if (users.findIndex((user)=>user.user_id ===req.body.user_id)===-1) {
    const newUser = req.body;
    newUser.user_id = uuidv4(); // generate a new UUID and add it to the newUser object
    users.push(newUser);
    console.log(users);
    res.status(201).send({ message: "User added successfully." });
  }else{

    const index = users.findIndex((user)=>user.user_id ===req.body.user_id);

    users[index]= req.body;

    console.log(index,users);

    res.status(201).send({ message: "User updated successfully." });


  }
  
});

const PORT = 8181;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));