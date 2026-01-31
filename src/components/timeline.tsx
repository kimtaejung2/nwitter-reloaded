import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import type { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  createdAt: number;
  photo?: string;
  tweet: string;
  uid: string;
  username: string;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweet = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25),
      );
      // const snapshot = await getDocs(tweetsQuery);
      // const tweets = snapshot.docs.map((doc) => {
      //   const { createdAt, photo, tweet, uid, username } = doc.data();
      //   return {
      //     createdAt,
      //     photo,
      //     tweet,
      //     uid,
      //     username,
      //     id: doc.id,
      //   };
      // });
      unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { createdAt, photo, tweet, uid, username } = doc.data();
          return {
            createdAt,
            photo,
            tweet,
            uid,
            username,
            id: doc.id,
          };
        });
        setTweet(tweets);
      });
    };
    fetchTweet();
    return () => unsubscribe?.();
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
