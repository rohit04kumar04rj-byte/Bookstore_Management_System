const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("../models/Book");

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

const sampleBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    genre: "Self Help",
    stock: 12,
    isbn: "9780735211292",
    description:
      "A practical guide to building good habits, breaking bad ones, and improving daily systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 349,
    genre: "Fiction",
    stock: 18,
    isbn: "9780062315007",
    description:
      "A timeless novel about dreams, destiny, and the courage to follow your own path.",
    imageUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    price: 599,
    genre: "Science",
    stock: 9,
    isbn: "9780553380163",
    description:
      "An accessible exploration of cosmology, black holes, time, and the universe.",
    imageUrl:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 699,
    genre: "History",
    stock: 11,
    isbn: "9780062316097",
    description:
      "A compelling history of humankind, from ancient ancestors to modern societies.",
    imageUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 299,
    genre: "Romance",
    stock: 14,
    isbn: "9780141439518",
    description:
      "A classic romance exploring manners, marriage, and misunderstanding in Regency England.",
    imageUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    price: 399,
    genre: "Biography",
    stock: 10,
    isbn: "9780553296983",
    description:
      "Anne Frank's moving diary offering a powerful personal account of life during wartime.",
    imageUrl:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    price: 459,
    genre: "Self Help",
    stock: 16,
    isbn: "9781455586691",
    description:
      "A focused guide to building concentration, producing better work, and reducing distraction.",
    imageUrl:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 429,
    genre: "Fiction",
    stock: 13,
    isbn: "9780525559474",
    description:
      "A reflective novel about regret, possibility, and the many lives a person might have lived.",
    imageUrl:
      "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "The Gene",
    author: "Siddhartha Mukherjee",
    price: 649,
    genre: "Science",
    stock: 8,
    isbn: "9781476733500",
    description:
      "A rich, human-centered history of genetic science and its effect on medicine and identity.",
    imageUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    price: 579,
    genre: "History",
    stock: 7,
    isbn: "9780393354324",
    description:
      "An influential account of how geography, technology, and disease shaped world civilizations.",
    imageUrl:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Me Before You",
    author: "Jojo Moyes",
    price: 369,
    genre: "Romance",
    stock: 15,
    isbn: "9780143124542",
    description:
      "A heartfelt romance about unlikely connection, difficult choices, and personal transformation.",
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    price: 799,
    genre: "Biography",
    stock: 9,
    isbn: "9781451648539",
    description:
      "A detailed biography tracing the ambition, creativity, and contradictions of Steve Jobs.",
    imageUrl:
      "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Think Like a Monk",
    author: "Jay Shetty",
    price: 489,
    genre: "Self Help",
    stock: 20,
    isbn: "9781982134488",
    description:
      "A practical book on calm, clarity, and purposeful living inspired by monastic principles.",
    imageUrl:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 559,
    genre: "Science",
    stock: 12,
    isbn: "9780593135204",
    description:
      "A fast-paced science fiction adventure built around survival, discovery, and interstellar problem-solving.",
    imageUrl:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    price: 399,
    genre: "Fiction",
    stock: 17,
    isbn: "9780375842207",
    description:
      "A moving novel set in wartime Germany, centered on words, loss, and quiet acts of courage.",
    imageUrl:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    price: 699,
    genre: "Biography",
    stock: 11,
    isbn: "9781524763138",
    description:
      "A personal memoir about identity, ambition, service, and life in the public eye.",
    imageUrl:
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=900&q=80",
  },
];

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    await Book.deleteMany({});
    await Book.insertMany(sampleBooks);

    console.log(`Seeded ${sampleBooks.length} books successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed books:", error.message);
    process.exit(1);
  }
};

seedBooks();
