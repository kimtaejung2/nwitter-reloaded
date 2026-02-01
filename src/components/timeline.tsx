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

// ITweet interface: 트윗 데이터의 구조를 정의, photo는 선택적
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
  overflow-y: scroll;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweet = async () => {
      // 만들어진 순서, 내림차순으로 최대 25개만 받는 tweets 컬렉션을 query 객체로 저장.
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25),
      );
      /*       const snapshot = await getDocs(tweetsQuery);
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
      }); */

      // onSnapshot: 실시간 리스너, 데이터가 변경될 때마다 snapshot을 받아와 ITweet형태로 전환 후, setTweet에 저장.
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

    // 언마운트시 구독 해제
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
