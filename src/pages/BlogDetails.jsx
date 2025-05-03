import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetails.css"; // Optional CSS for styling

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "The Beauty of Flowers",
      content:
        "A Language Without Words. Flowers have been a symbol of beauty and love for centuries. They can convey emotions that words sometimes cannot. Whether it's a bouquet of roses for a loved one or a simple daisy to brighten someone's day, flowers have a unique way of expressing feelings.  The Science Behind the Beauty  Flowers are not just pretty to look at; they play a crucial role in our ecosystem. They are essential for pollination, which is vital for the reproduction of many plants. Without flowers, we wouldn't have fruits, vegetables, or even the beautiful landscapes we enjoy today. A Source of Inspiration  Artists, poets, and writers have drawn inspiration from flowers for centuries. Their colors, shapes, and fragrances have been the muse for countless works of art. From Van Gogh's sunflowers to Shakespeare's sonnets about roses, flowers have a way of capturing our imagination. A Part of Every Special Moment  Flowers are often associated with special occasions. Weddings, birthdays, anniversaries, and even funerals are marked by the presence of flowers. They add beauty and meaning to these moments, making them even more memorable.  The Therapeutic Power of Flowers  Studies have shown that being around flowers can improve our mood and reduce stress. They have a calming effect on our minds and can even boost our creativity. So, whether it's a bouquet on your desk or a garden in your backyard, surround yourself with flowers for a happier life. Healing and Happiness  Flowers have a unique ability to heal and bring happiness. They can brighten up a dull room, lift our spirits, and even help us connect with nature. Whether it's a single flower in a vase or a garden full of blooms, flowers have the power to transform our surroundings and our mood. Timeless and Ever-Changing  Flowers are timeless yet ever-changing. They bloom, wilt, and then bloom again, reminding us of the cycle of life. Each season brings new flowers, each with its own beauty and significance. So, take a moment to appreciate the beauty of flowers in your life. Whether it's a garden, a bouquet, or a single bloom, flowers have a way of making our world a more beautiful place.",
      author: "Trevor Kinyanjui",
      date: "April 28, 2025",
      image: "images/vase.JPG",
    },
    {
      id: 2,
      title: "How to Care for Your Plants",
      content:
       "Choose the Right Spot  Before you even start watering, make sure your plant is in the right location.Some plants love sunlight, while others prefer indirect light or shade.Sun-lovers: Succulents, cacti, and most flowering plants.Shade-lovers: Ferns, snake plants, peace lilies.Tip: If your plant’s leaves are getting scorched or turning yellow, it might be getting too much direct sun. Water Wisely Before you even start watering, make sure your plant is in the right location.Some plants love sunlight, while others prefer indirect light or shade.Sun-lovers: Succulents, cacti, and most flowering plants.Shade-lovers: Ferns, snake plants, peace lilies.Tip: If your plant’s leaves are getting scorched or turning yellow, it might be getting too much direct sun. Feed Them Nutrients Plants, like us, need food! A little fertilizer goes a long way. Use plant-specific fertilizers: Some are for flowering plants, others for leafy greens. Follow a schedule: During spring and summer (growing season), feed once a month. In winter, plants rest and don't need much feeding.Tip: Over-fertilizing can harm your plant — less is often more. Repot When Needed-  If you notice roots growing out of the pot's drainage holes or the plant looks cramped, it's time for a new home. Choose a pot 1-2 inches bigger in diameter. Use fresh potting soil for better nutrients and drainage.Tip: Spring is the best time to repot because the plant is actively growing. Keep an Eye Out for Pests- Regularly check your plants for pests like aphids, spider mites, or mealybugs. If you spot any, act fast! Use insecticidal soap or neem oil to treat them. Keep your plants clean by wiping leaves with a damp cloth to prevent dust buildup.  Prune and Groom -  Regularly check your plants for pests like aphids, spider mites, or mealybugs. If you spot any, act fast! Use insecticidal soap or neem oil to treat them. Keep your plants clean by wiping leaves with a damp cloth to prevent dust buildup.",
      author: "Shantaal Dahaboo",
      date: "April 27, 2025",
      image: "images/vase2.JPG",
    },
    {
      id: 3,
      title: "Top 5 Flowers for Every Occasion",
      content:
      "Roses – The Timeless Classic      Best for: Love, Anniversaries, Apologies, Celebrations Roses are the ultimate symbol of love and appreciation. While red roses express passionate love, pink ones convey admiration, white symbolizes purity and remembrance, and yellow stands for friendship and joy.     Fun Tip: A mixed bouquet of different colored roses can perfectly capture complex emotions — like celebrating a friend who means the world to you.  Lilies – Elegant and Versatile     Best for: Sympathy, Weddings, Birthdays, Get Well SoonLilies represent purity, commitment, and rebirth, making them ideal for many occasions. White lilies are commonly used for sympathy arrangements, while bright-colored lilies (like orange or pink) make beautiful birthday or congratulatory bouquets.Fun Tip: Stargazer lilies are bold and fragrant — perfect if you want a bouquet that makes a grand impression. Tulips – Cheerful and Charming   Best for: Birthdays, Anniversaries, Spring CelebrationsTulips are a symbol of spring and renewal. They come in various colors, each with its own meaning. Red tulips symbolize true love, while yellow tulips represent cheerfulness and sunshine. Fun Tip: A bouquet of mixed tulips can brighten anyone's day and is perfect for spring celebrations. Sunflowers – Bright and Joyful     Best for: Birthdays, Get Well Soon, CelebrationsSunflowers are known for their vibrant yellow petals and large size. They symbolize adoration, loyalty, and longevity. Sunflowers are perfect for birthdays or to cheer someone up.Fun Tip: Pair sunflowers with other bright flowers like daisies or zinnias for a cheerful bouquet.",
      author: "Shantaal Dahaboo",
      date: "April 26, 2025",
      image: "images/vase3.JPG",
    },
  ];

  const blog = blogPosts.find((post) => post.id === parseInt(id));

  if (!blog) {
    return <p>Blog not found!</p>;
  }

  return (
    <div className="blog-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <img src={blog.image} alt={blog.title} className="blog-details-image" />
      <h1 className="blog-details-title">{blog.title}</h1>
      <p className="blog-details-meta">
        By {blog.author} on {blog.date}
      </p>
      <p className="blog-details-content">{blog.content}</p>
    </div>
  );
};

export default BlogDetails;