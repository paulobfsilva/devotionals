import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, BackHandler, Easing, Linking, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { movements } from './src/content';

type Place = { screen: 'home' | 'reading' | 'prayer' | 'closing' | 'done'; page: number; topic: number };
const INITIAL: Place = { screen: 'home', page: 0, topic: 0 };
const KEY = 'devotionals-native-v1';
const paper = '#F6F2E9', ink = '#233F35', gold = '#C7AB79';
const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' });
const readings = [
  { label: 'SCRIPTURE', title: 'Come to your Father.', source: 'MATTHEW 6:9–13 · KJV', text: 'After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name.\n\nThy kingdom come. Thy will be done in earth, as it is in heaven.\n\nGive us this day our daily bread.\n\nAnd forgive us our debts, as we forgive our debtors.\n\nAnd lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen.', next: 'A word from the sermon' },
  { label: 'SERMON EXCERPT', title: 'Before you decide.', source: 'WILLIAM BRANHAM', text: 'Read the Bible every day. Pray every day. Don\'t make any decisions too harshly or too quickly, without first considering God about it.', next: 'Reflect on what you have read' },
  { label: 'REFLECTION', title: 'What are you carrying today?', source: 'A MOMENT WITH THE WORD', text: 'Jesus teaches us to bring our needs to the Father and to ask for His will to be done.\n\nA decision you face today can become part of that prayer. Speak honestly about what you hope for, while asking for help to act according to His Word.', next: 'Personal prayer, at your own pace' },
];

export default function App() { return <SafeAreaProvider><Experience /></SafeAreaProvider>; }
function Experience() {
  const [place, setPlace] = useState<Place>(INITIAL);
  const [ready, setReady] = useState(false);
  const [sheet, setSheet] = useState<'about' | 'topics' | 'suggestions' | null>(null);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [audioError, setAudioError] = useState('');
  const [storageError, setStorageError] = useState(false);
  const fade = useRef(new Animated.Value(1)).current;
  const slide = useRef(new Animated.Value(0)).current;
  const busy = useRef(false);
  const scroller = useRef<ScrollView>(null);
  const player = useAudioPlayer(require('./assets/prayer-piano.mp3'));
  const audio = useAudioPlayerStatus(player);
  const dark = place.screen === 'prayer' || place.screen === 'closing';
  const m = movements[place.topic];

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduced);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);
    AsyncStorage.getItem(KEY).then(value => {
      if (!value) return;
      const saved = JSON.parse(value);
      if (['home','reading','prayer','closing','done'].includes(saved.screen) && Number.isInteger(saved.page) && saved.page >= 0 && saved.page < 3 && Number.isInteger(saved.topic) && saved.topic >= 0 && saved.topic < movements.length) setPlace(saved);
    }).catch(() => setStorageError(true)).finally(() => setReady(true));
    return () => subscription.remove();
  }, []);
  useEffect(() => {
    if (ready) AsyncStorage.setItem(KEY, JSON.stringify(place)).catch(() => setStorageError(true));
  }, [place, ready]);
  useEffect(() => {
    player.loop = true;
    player.volume = .35;
    setAudioModeAsync({ playsInSilentMode: true, shouldPlayInBackground: true, interruptionMode: 'doNotMix' }).catch(() => setAudioError('Audio setup was unavailable. You can continue in silence.'));
  }, [player]);

  function move(next: Place, direction = 1) {
    if (busy.current) return;
    busy.current = true;
    setSheet(null);
    if (Platform.OS !== 'web') Haptics.selectionAsync().catch(() => {});
    const change = () => {
      setHidden(false);
      setPlace(next);
      scroller.current?.scrollTo({ y: 0, animated: false });
      if (reduced) { fade.setValue(1); slide.setValue(0); busy.current = false; return; }
      slide.setValue(direction * 26);
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 420, useNativeDriver: true }),
        Animated.timing(slide, { toValue: 0, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start(() => { busy.current = false; });
    };
    if (reduced) change();
    else Animated.timing(fade, { toValue: 0, duration: 120, useNativeDriver: true }).start(change);
  }
  function back() {
    if (sheet) { setSheet(null); return true; }
    if (hidden) { setHidden(false); return true; }
    if (place.screen === 'home') return false;
    if (place.screen === 'reading' && place.page > 0) move({ ...place, page: place.page - 1 }, -1);
    else if (place.screen === 'closing') move({ ...place, screen: 'prayer' }, -1);
    else move({ ...place, screen: 'home' }, -1);
    return true;
  }
  useEffect(() => { const sub = BackHandler.addEventListener('hardwareBackPress', back); return () => sub.remove(); }, [place, sheet, hidden, reduced]);
  async function toggleAudio() {
    setAudioError('');
    try {
      if (audio.playing) player.pause();
      else {
        if (!audio.isLoaded) { setAudioError('Piano is loading. Please try again in a moment.'); return; }
        if (Platform.OS !== 'web') player.setActiveForLockScreen(true, { title: 'Time alone with God', artist: 'Harmony-of-Heaven · God Is My Everything' });
        player.play();
      }
    } catch { setAudioError('Piano could not start. You can continue in silence.'); }
  }
  function finish() { player.pause(); if (Platform.OS !== 'web') player.setActiveForLockScreen(false); move({ ...place, screen: 'done' }); }
  const labelColor = dark ? '#B5C5BA' : '#6E7C70';
  const Body = ({ children }: { children: React.ReactNode }) => <Text style={[styles.body, dark && styles.light]}>{children}</Text>;
  const small = (text: string) => <Text style={[styles.eyebrow, { color: labelColor }]}>{text}</Text>;
  function action(title: string, onPress: () => void, secondary = false, hint?: string) {
    return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.action, secondary ? styles.secondary : dark ? styles.lightAction : styles.filled, pressed && { opacity: .75, transform: [{ scale: .985 }] }]}>
      <Text style={[styles.actionText, { color: secondary ? dark ? paper : ink : dark ? ink : paper }]}>{title}</Text>
      {hint && <Text style={[styles.actionHint, { color: dark ? '#566D5D' : '#D7E2D5' }]}>{hint}</Text>}
    </Pressable>;
  }
  if (!ready) return <SafeAreaView style={[styles.root, { backgroundColor: paper }]}><Text style={styles.brand}>Devotionals</Text></SafeAreaView>;
  return <View style={[styles.root, { backgroundColor: dark ? '#173D31' : paper }]}>
    <StatusBar style={dark ? 'light' : 'dark'} />
    {dark && <LinearGradient colors={['#234D3D','#112D25']} style={StyleSheet.absoluteFill} />}
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel={place.screen === 'home' ? 'About this prototype' : 'Go back'} onPress={place.screen === 'home' ? () => setSheet('about') : back} style={styles.iconButton}><Text style={[styles.headerIcon, dark && styles.light]}>{place.screen === 'home' ? '☰' : '‹'}</Text></Pressable>
        <Text style={[styles.brand, dark && styles.light]}>Devotionals</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={audio.playing ? 'Pause piano' : 'Play piano'} onPress={toggleAudio} style={[styles.iconButton, styles.sound, audio.playing && { backgroundColor: dark ? '#456A52' : '#DDE5D8' }]}><Text style={[styles.soundIcon, dark && styles.light]}>{audio.playing ? 'Ⅱ' : '♫'}</Text></Pressable>
      </View>
      {!!audioError && <Text accessibilityRole="alert" style={[styles.notice, { color: labelColor }]}>{audioError}</Text>}
      {storageError && <Text style={[styles.notice, { color: labelColor }]}>Your place could not be saved on this device.</Text>}
      <Animated.View style={[styles.stage, { opacity: fade, transform: [{ translateX: slide }] }]}>
        <ScrollView ref={scroller} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {place.screen === 'home' && <>
            {small('MAKE ROOM FOR GOD EACH DAY')}
            <Text style={styles.heroTitle}>A quiet place.{'\n'}An open heart.</Text>
            <Text style={styles.intro}>A little Scripture. Time to reflect.{'\n'}Room to pray in your own words.</Text>
            <LinearGradient colors={['#3F614A','#193E30']} style={styles.cover}>
              <View style={styles.archOuter}><View style={styles.archInner} /></View>
              <Text style={styles.coverOverline}>MAKING ROOM FOR GOD</Text>
              <Text style={styles.coverTitle}>Before{ '\n'}you decide.</Text>
              <View style={styles.coverRule} />
              <Text style={styles.coverMeta}>Matthew 6:9–13 · KJV</Text>
              <Text style={styles.coverMeta}>With an excerpt from William Branham</Text>
            </LinearGradient>
            <Text style={styles.footnote}>One sample devotional · Content for review</Text>
          </>}
          {place.screen === 'reading' && <>
            <View style={styles.path}>{readings.map((r, i) => <View key={r.label} style={[styles.pathPart, i <= place.page && { backgroundColor: '#58775A' }]} />)}</View>
            {small(readings[place.page].label)}
            <Text accessibilityRole="header" style={styles.title}>{readings[place.page].title}</Text>
            {small(readings[place.page].source)}
            <Text selectable style={place.page < 2 ? styles.scripture : styles.body}>{readings[place.page].text}</Text>
            {place.page === 1 && <Text style={styles.citation}>The Prophet Elisha · 54-0723 · paragraph 10{ '\n'}Excerpt supplied during our design work.</Text>}
            {place.page === 2 && <View style={styles.reflection}><Text style={styles.reflectionLabel}>LET THIS BECOME YOUR PRAYER</Text><Text style={styles.reflectionText}>What decision do you want to bring before your Father?</Text></View>}
          </>}
          {place.screen === 'prayer' && <>
            <View style={styles.prayerHeading}>{small('TIME ALONE WITH GOD')}<Pressable accessibilityRole="button" onPress={() => setSheet('topics')} hitSlop={12}><Text style={styles.topicLink}>Topics</Text></Pressable></View>
            <Text accessibilityRole="header" style={[styles.title, styles.light]}>{m.title === 'Arrive' ? 'You are here.' : m.title}</Text>
            <Text selectable style={styles.anchor}>{m.anchor}</Text>
            <Text style={styles.prayerSource}>{m.reference}</Text>
            {!hidden && <>
              <View style={styles.prayerDivider} />
              <Body>{m.prompt}</Body>
              <Pressable accessibilityRole="button" onPress={() => setSheet('suggestions')} style={styles.suggestion}><Text style={styles.topicLink}>More ideas for this prayer  +</Text></Pressable>
            </>}
            <Text style={styles.stillness}>{hidden ? 'There is room to remain.' : 'Pray now, in your own words. Stay as long as you wish.'}</Text>
            <Pressable accessibilityRole="button" onPress={() => setHidden(!hidden)} style={styles.hideButton}><Text style={styles.quietLink}>{hidden ? 'Show prayer guidance' : 'Hide prayer guidance'}</Text></Pressable>
          </>}
          {place.screen === 'closing' && <>
            {small('WHEN YOU ARE READY')}
            <Text accessibilityRole="header" style={[styles.heroTitle, styles.light]}>Carry this{ '\n'}into your day.</Text>
            <Body>Give thanks to your Father. Is there one response to carry with you—a decision to bring before Him again, forgiveness to seek, or care to offer someone?</Body>
            <View style={styles.prayerDivider} />
            <Body>Close your prayer in your own words, in the name of the Lord Jesus Christ.</Body>
          </>}
          {place.screen === 'done' && <View style={styles.farewell}>
            {small('UNTIL YOU RETURN')}
            <Text accessibilityRole="header" style={styles.heroTitle}>Make room{ '\n'}again tomorrow.</Text>
            <Body>Carry a phrase from the Scripture with you. You can return to it as your day unfolds.</Body>
            <Text style={styles.footnote}>There is no required length, and nothing to catch up on.</Text>
          </View>}
        </ScrollView>
        <View style={[styles.footer, dark && { borderTopColor: '#426052' }]}>
          {place.screen === 'home' && action('Read today’s devotional  →', () => move({ ...place, screen: 'reading', page: 0 }), false, 'Scripture → Reflection → Personal prayer')}
          {place.screen === 'reading' && action(place.page === 2 ? 'Continue into prayer  →' : 'Continue  →', () => move(place.page < 2 ? { ...place, page: place.page + 1 } : { ...place, screen: 'prayer', topic: 0 }), false, readings[place.page].next)}
          {place.screen === 'prayer' && <>
            {!hidden && action(place.topic === 4 ? 'Close my prayer' : `Next: ${movements[place.topic + 1].title.toLowerCase()}  →`, () => move(place.topic === 4 ? { ...place, screen: 'closing' } : { ...place, topic: place.topic + 1 }), true)}
            {place.topic !== 4 && <Pressable accessibilityRole="button" onPress={() => move({ ...place, screen: 'closing' })} style={styles.closeButton}><Text style={styles.quietLink}>Close my prayer</Text></Pressable>}
            {hidden && place.topic === 4 && action('Close my prayer', () => move({ ...place, screen: 'closing' }), true)}
          </>}
          {place.screen === 'closing' && <>{action('Finish for today', finish)}{action('Keep praying', () => move({ ...place, screen: 'prayer' }, -1), true)}</>}
          {place.screen === 'done' && action('Return home', () => move(INITIAL))}
        </View>
      </Animated.View>
    </SafeAreaView>
    <Modal visible={sheet !== null} transparent animationType={reduced ? 'none' : 'slide'} onRequestClose={() => setSheet(null)}>
      <View style={styles.modalRoot}><Pressable accessibilityLabel="Dismiss panel" accessibilityRole="button" style={styles.backdrop} onPress={() => setSheet(null)} />
        <SafeAreaView edges={['bottom']} style={styles.sheet}><View style={styles.handle} /><View style={styles.sheetHeader}><Text style={styles.sheetTitle}>{sheet === 'topics' ? 'Where would you like to pray?' : sheet === 'suggestions' ? 'Another way to begin' : 'Your quiet space'}</Text><Pressable accessibilityRole="button" accessibilityLabel="Close panel" style={styles.iconButton} onPress={() => setSheet(null)}><Text style={styles.headerIcon}>×</Text></Pressable></View>
          <ScrollView contentContainerStyle={styles.sheetContent}>
            {sheet === 'topics' && <><Text style={styles.footnote}>These are openings for prayer. You do not need to follow every topic.</Text>{movements.map((topic,i) => <Pressable accessibilityRole="button" accessibilityState={{ selected: i === place.topic }} key={topic.title} style={styles.topicRow} onPress={() => move({ ...place, screen: 'prayer', topic: i })}><Text style={styles.topicText}>{topic.title}</Text><Text style={styles.topicText}>{place.topic === i ? '•' : '→'}</Text></Pressable>)}</>}
            {sheet === 'suggestions' && <Text style={styles.body}>{m.more}</Text>}
            {sheet === 'about' && <><Text style={styles.body}>A mobile experience prototype for iPhone and Android. One devotional, rooted in Scripture, leading into personal prayer.</Text><Text style={styles.citation}>English · King James Version{ '\n'}Content awaits Paulo’s editorial review.{ '\n'}Your place stays on this device. No account or analytics.</Text><Text style={styles.body}>Music: “God Is My Everything” by Harmony-of-Heaven. Use your phone’s volume buttons. Sound starts only when you choose it.</Text><Pressable accessibilityRole="link" onPress={() => Linking.openURL('https://pixabay.com/music/ambient-piano-ambient-music-no-copyright-god-is-my-everything-589755/')}><Text style={styles.link}>Music source and attribution ↗</Text></Pressable><Text style={styles.footnote}>Native experience · review build 1</Text></>}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  </View>;
}

const styles = StyleSheet.create({
  root: { flex: 1 }, safe: { flex: 1, width: '100%', maxWidth: 640, alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, paddingVertical: 8 },
  brand: { fontFamily: serif, fontSize: 23, color: ink }, headerIcon: { fontSize: 30, color: ink, fontWeight: '300' },
  iconButton: { minWidth: 46, minHeight: 46, justifyContent: 'center', alignItems: 'center' }, sound: { borderWidth: 1, borderColor: '#87978566', borderRadius: 25 }, soundIcon: { color: ink, fontSize: 21 },
  stage: { flex: 1 }, content: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 24, paddingBottom: 28 },
  eyebrow: { fontSize: 10, fontWeight: '600', letterSpacing: 2.4, lineHeight: 19, marginBottom: 14 },
  heroTitle: { fontFamily: serif, fontSize: 42, lineHeight: 48, letterSpacing: -1.5, color: ink, marginBottom: 20 },
  title: { fontFamily: serif, fontSize: 37, lineHeight: 44, color: ink, letterSpacing: -.8, marginBottom: 26 },
  intro: { fontSize: 16, lineHeight: 26, color: '#6C786D', marginBottom: 28 },
  cover: { borderRadius: 24, padding: 28, minHeight: 295, overflow: 'hidden', justifyContent: 'flex-end' },
  archOuter: { position: 'absolute', width: 205, height: 280, right: -22, top: 20, borderWidth: 1, borderColor: '#C7AB7950', borderTopLeftRadius: 110, borderTopRightRadius: 110 },
  archInner: { position: 'absolute', top: 18, left: 18, right: 18, bottom: -1, borderWidth: 1, borderColor: '#C7AB7930', borderTopLeftRadius: 100, borderTopRightRadius: 100 },
  coverOverline: { color: '#D4DBCC', fontSize: 9, letterSpacing: 2.1, marginBottom: 20 },
  coverTitle: { fontFamily: serif, color: paper, fontSize: 39, lineHeight: 44 }, coverRule: { height: 1, width: 35, backgroundColor: gold, marginVertical: 20 }, coverMeta: { color: '#CDD8C9', fontSize: 11, lineHeight: 20 },
  footnote: { fontSize: 12, lineHeight: 20, color: '#758173', marginTop: 17 }, path: { flexDirection: 'row', gap: 7, marginBottom: 26 }, pathPart: { flex: 1, height: 3, borderRadius: 2, backgroundColor: '#DADFD2' },
  scripture: { fontFamily: serif, color: ink, fontSize: 23, lineHeight: 35, marginTop: 12 }, body: { color: ink, fontSize: 18, lineHeight: 30 },
  citation: { color: '#73806F', fontSize: 12, lineHeight: 22, marginTop: 26, marginBottom: 16 },
  reflection: { padding: 24, backgroundColor: '#E8EBDD', borderRadius: 18, marginTop: 30 }, reflectionLabel: { color: '#637859', fontSize: 9, letterSpacing: 1.5, marginBottom: 12 }, reflectionText: { fontFamily: serif, fontSize: 24, lineHeight: 34, color: ink },
  footer: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 10, borderTopWidth: 1, borderTopColor: '#E0E2D6', gap: 6 },
  action: { minHeight: 58, borderRadius: 18, paddingVertical: 15, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center' }, filled: { backgroundColor: ink }, lightAction: { backgroundColor: '#E3EAD8' }, secondary: { borderWidth: 1, borderColor: '#85978380' }, actionText: { fontSize: 16, fontWeight: '600', textAlign: 'center' }, actionHint: { fontSize: 10, lineHeight: 17, marginTop: 5, textAlign: 'center' },
  light: { color: paper }, prayerHeading: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }, topicLink: { color: '#C6D8BE', fontSize: 13, lineHeight: 24 }, anchor: { fontFamily: serif, color: '#EDF0E3', fontSize: 29, lineHeight: 41 }, prayerSource: { color: '#A9BFA9', fontSize: 11, marginTop: 16 }, prayerDivider: { height: 1, backgroundColor: '#78937455', width: 48, marginVertical: 28 }, suggestion: { marginTop: 16, minHeight: 44, justifyContent: 'center' }, stillness: { fontFamily: serif, fontStyle: 'italic', color: '#B7C9AF', fontSize: 17, lineHeight: 27, marginTop: 32 }, quietLink: { color: '#C4D3BD', fontSize: 13, textAlign: 'center' }, hideButton: { minHeight: 48, justifyContent: 'center', alignSelf: 'flex-start', marginTop: 20 }, closeButton: { minHeight: 44, justifyContent: 'center' }, farewell: { flex: 1, justifyContent: 'center', paddingBottom: 50 }, notice: { fontSize: 12, paddingHorizontal: 28, marginBottom: 8 },
  modalRoot: { flex: 1, justifyContent: 'flex-end' }, backdrop: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#081E19AA' }, sheet: { backgroundColor: paper, borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '80%', paddingTop: 12, width: '100%', maxWidth: 640, alignSelf: 'center' }, handle: { height: 4, width: 36, backgroundColor: '#CED4C6', borderRadius: 3, alignSelf: 'center', marginBottom: 16 }, sheetHeader: { paddingLeft: 28, paddingRight: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, sheetTitle: { flex: 1, fontFamily: serif, fontSize: 26, color: ink }, sheetContent: { paddingHorizontal: 28, paddingTop: 12, paddingBottom: 28 }, topicRow: { minHeight: 60, borderBottomWidth: 1, borderColor: '#DDE1D3', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, topicText: { color: ink, fontSize: 17 }, link: { color: ink, fontSize: 14, paddingVertical: 18 },
});
