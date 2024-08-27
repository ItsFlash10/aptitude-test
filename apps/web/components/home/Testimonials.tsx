import React from "react";
import TweetEmbed from "react-tweet-embed";
import { Card } from "../ui/card";

const Testimonials = () => {
  return (
    <div>
      <Card className="flex max-h-10">
        <TweetEmbed tweetId="1827862907784241179" />
      </Card>
    </div>
  );
};

export default Testimonials;
