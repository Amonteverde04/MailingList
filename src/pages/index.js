import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Heading, Text, Image  } from '@chakra-ui/react';
import MailingList from '@/components/mailingList';

export default function Home() {
  return (
    <>
      <Head>
        <title>Destination Wedding - 2025</title>
        <meta name="description" content="Let us know if you want to come to our destination wedding!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.mainWrapper}>
          <Heading>
            Welcome to our destination wedding mailing list!
          </Heading>
          <Image src="/images/hero.png"
                 boxSize={["300px", "400px", "500px"]}
                 alt="Picture of the author"/>
          <Text fontSize={"xl"}>
            We created this site with &#128153; to gauge your interest in traveling with us to celebrate our marriage.
          </Text> 
          <MailingList />
        </div>
      </main>
    </>
  );
}
