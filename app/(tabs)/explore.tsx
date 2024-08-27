import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button, Linking } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect, useRef } from 'react';

import * as rssParser from 'react-native-rss-parser';
export default function TabTwoScreen() {

  const [rssFeed, setRssFeed] = useState([{ "authors": [], "categories": [{ "name": "Live" }], "content": undefined, "description": "Looking for the best resources for today's launch of The War Within? We've compiled our most helpful posts from Early Access with relevant information to help you journey through Khaz Algar.<p>Leveling<p>Tips for Quick LevelingLooking for quick advice to prepare for leveling? Look no further!<p>Going from Level 70 to 80 in Three Hours<br>The fastest way to level from 70 to 80 is an ol' reliable.<br><br><em><b><a href=\"https://www.wowhead.com/news=346163/what-to-do-at-level-80-in-war-within\">Continue reading »</a></b></em>", "enclosures": [], "id": "https://www.wowhead.com/news=346163", "itunes": { "authors": [], "block": undefined, "duration": undefined, "explicit": undefined, "image": undefined, "isClosedCaptioned": undefined, "order": undefined, "subtitle": undefined, "summary": undefined }, "links": [{ "rel": "", "url": "https://www.wowhead.com/news=346163/what-to-do-at-level-80-in-war-within" }], "published": "Mon, 26 Aug 2024 19:03:49 -0500", "title": "What to Do at Level 80 in War Within" }, { "authors": [], "categories": [{ "name": "Live" }], "content": undefined, "description": "Looking for the best resources for today's launch of The War Within? We've compiled our most helpful posts from Early Access with relevant information to help you journey through Khaz Algar.<p>Leveling<p>Tips for Quick LevelingLooking for quick advice to prepare for leveling? Look no further!<p>Going from Level 70 to 80 in Three Hours<br>The fastest way to level from 70 to 80 is an ol' reliable.<br><br><em><b><a href=\"https://www.wowhead.com/news=346163/what-to-do-at-level-80-in-war-within\">Continue reading »</a></b></em>", "enclosures": [], "id": "https://www.wowhead.com/news=346163", "itunes": { "authors": [], "block": undefined, "duration": undefined, "explicit": undefined, "image": undefined, "isClosedCaptioned": undefined, "order": undefined, "subtitle": undefined, "summary": undefined }, "links": [{ "rel": "", "url": "https://www.wowhead.com/news=346163/what-to-do-at-level-80-in-war-within" }], "published": "Mon, 26 Aug 2024 19:03:49 -0500", "title": "What to Do at Level 80 in War Within" }]);

  useEffect(() => {
    fetch('https://www.wowhead.com/news/rss/all')
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        setRssFeed(rss.items)
      });

  }, [])

  const navigate = (link) => {
    Linking.openURL(link)
  }

  const renderRss = () => {

    console.log(rssFeed[1])

    return (

      <>
        {rssFeed.map(news =>
          <Collapsible key={news.id} title={news.title}>
            <ThemedText key={news.id} type='subtitle'>{news.published}
            </ThemedText>
            <Image
              style={{ width: 250, height: 100 }}
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu5mZisoe4yzdsplfsiH4QErvWgc2Z3GDA8g&s' }}
            />
            <ThemedText key={news.id} >{news.description}
            </ThemedText>
            <Button
              title="Celí článek"
              color="#841584"
              accessibilityLabel="Pořídí fotografii"
              onPress={() => navigate(news.links[0].url)}
            />
          </Collapsible>)}
      </>)


  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/wowhead.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Wowhead</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      {renderRss()}

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reactLogo: {
    height: 250,
    width: 400,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
