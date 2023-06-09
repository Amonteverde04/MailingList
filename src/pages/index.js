import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Heading, Text, Image  } from '@chakra-ui/react';
import MailingList from '@/components/mailingList';
import ScrollButton from '@/components/scrollButton';
import OptionsList from '@/components/optionsList';

export default function Home() {
  const scrollToQuestionnaire = () => {
    var elmntToView = document.getElementById("questionnaireHeading");
    elmntToView.scrollIntoView({ behavior: "smooth"}); 
  }

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
            Welcome to our destination wedding announcement and questionnaire!
          </Heading>
          <Image src="/images/hero.png"
                 boxSize={["300px", "400px", "500px"]}
                 alt="Picture of Alex and Abbey"/>
          <Text fontSize={"xl"}>
            We created this site with &#128153; to gauge your interest in traveling with us to Jamaica to celebrate our marriage in October 2025.
          </Text> 
          <ScrollButton scrollToQuestionnaire={scrollToQuestionnaire} />
        </div>
        <div className={styles.mainSectionTwoWrapper}>
          <OptionsList />
        </div>
        <div className={styles.mainSectionThreeWrapper}>
          <MailingList />
        </div>
      </main>
    </>
  );
}
