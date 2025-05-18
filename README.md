## Description : 
Create a backend for the blogging app

1. Store the user email, password
2. Login with email and generate the jwt session
3. Store the blogs in the blogDB with the userId
4. get /blogs get all the blogs

How to store the blogs in the blogs collection ? 
1. store with the below data along with the userId store the 

1. Create the 20 dummy blogs and feed to the DB with
const categoryToSelect = [
    "Personal Development",
    "Health & Fitness",
    "Food & Recipes",
    "Travel",
    "Finance & Money Management",
    "Technology",
    "Parenting & Family",
    "Education / Study Tips",
    "Fashion & Beauty",
    "Lifestyle",
    "Career & Job Search",
    "Entrepreneurship / Startups",
    "Digital Marketing",
    "Photography",
    "DIY & Crafts",
    "Gaming",
    "Book Reviews",
    "Movies & TV Shows",
    "Pet Care",
    "Sustainability / Eco-Living",
  ];
   {
   topic: string,
   category: String,
   author: Ganez
   content: String,
   userId: 682970713b006f9883358fc0,
   createdAt: Date,
   updatedAt: Date
   }
2. And perform filter options for the rendered blogs
3. Render the blogs with the sequence of createdAt date
4. In My blogs section display the blogs of the logged user