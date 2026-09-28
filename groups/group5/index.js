/*
 * 📸 FUN CAMERA – YOUR GROUP'S SCREEN
 *
 * This file already works: it shows the camera, takes a photo and shows it.
 * Your job: add ONE fun twist. Pick an idea (or invent your own and ask the teacher):
 *
 *  🖼  Frame or shape overlay – circle mask, polaroid frame, "WANTED" poster, date stamp
 *  ⏱  Countdown shot        – show 3-2-1 on screen, then take the photo automatically
 *  🎞  Photo booth strip     – take 4 photos in a row and show them stacked like a strip
 *  🎨  Color filter          – a see-through colored View on top (sepia, neon, "b&w"),
 *                              with buttons to switch between filters
 *  🥕  Themed challenge      – a random challenge ("Find something red!") and a small
 *                              gallery of the photos taken so far
 *  😎  Emoji stickers        – tap on the captured photo to place emojis
 *  🪞  Selfie mirror mode    – front camera, preview mirrored and shown twice side by side
 *
 * RULES
 *  - Only edit files inside YOUR group folder. You may add new files there.
 *  - Do not install new packages.
 *  - Broke everything? Copy groups/_starter/CameraStarter.tsx back into this file.
 */
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView } from 'expo-camera';
import { PermissionGate, pickFromGallery, useCameraSetup } from '../../components/shared';

// ✏️ Change this to rename your screen and pick your emoji on the home screen.
export const meta = {
  title: 'Group 5',
  emoji: '👾',
};




const drunkQuotes = [
  // =========================
  // DRUNK LOGIC
  // =========================

  "Jeg er ikke fuld. Jeg er bare dårligt kalibreret.",
  "Jeg kan sagtens gå lige. Vejen kan bare ikke.",
  "Det er ikke mig der sejler. Det er Jorden.",
  "Jeg har fuld kontrol. Over absolut ingenting.",
  "Jeg er ikke fuld, gulvet er skævt.",
  "Min promille er højere end min IQ lige nu.",
  "Jeg er ikke påvirket. Jeg er bare opdateret til en dårligere version.",
  "Jeg drikker kun på dage der slutter på G.",
  "Min lever har opsagt vores samarbejde.",
  "Jeg er 70% vand og 30% dårlige beslutninger.",
  "Jeg har ikke drukket for meget. Jeg har bare drukket for hurtigt.",
  "Jeg er ikke væk. Jeg er på eventyr.",
  "Det her er min sidste øl. Igen.",
  "Jeg har aldrig været mere sikker på noget, jeg ikke kan huske.",
  "Min hjerne er gået på weekend uden at sige det.",
  "Jeg kan stadig stave til alkohol. Tror jeg.",
  "Jeg er ikke fuld. Jeg er midlertidigt svensk.",
  "Jeg har ikke et alkoholproblem. Jeg har et balanceproblem.",
  "Jeg kan godt køre. Bare ikke bil.",
  "Jeg er ikke beruset. Jeg er bare i widescreen.",
  "Jeg er i kontrol. Kontrollen er bare et andet sted.",
  "Jeg har kun fået to øl. Resten tæller ikke.",
  "Min hukommelse er i flytilstand.",
  "Jeg kan sagtens huske i går. Bare ikke hvad der skete.",
  "Jeg er ikke fuld, jeg er bare socialt overclocket.",
  "Promillen er midlertidig. Skammen er permanent.",
  "Jeg er ikke stiv. Jeg er fleksibel.",
  "Min koordinering er på ferie.",
  "Jeg er helt normal. Det er jer der er underlige.",
  "Jeg drikker ansvarligt. Ansvaret ligger bare hos andre.",

  // =========================
  // TERRIBLE DECISIONS
  // =========================

  "Det virkede som en god idé for fem minutter siden.",
  "Jeg har aldrig fortrudt noget så hurtigt.",
  "Det her bliver enten legendarisk eller en politisag.",
  "Min mor må aldrig se det her.",
  "Jeg tager konsekvenserne i morgen.",
  "Det tæller ikke, hvis ingen filmer det.",
  "Jeg burde ikke have adgang til MobilePay.",
  "Det her var ikke med i min femårsplan.",
  "Jeg har taget værre beslutninger. Tror jeg.",
  "Det er ikke en fejl. Det er karakterudvikling.",
  "Jeg har ikke lært noget, og jeg gør det igen.",
  "Det er kun dumt, hvis vi overlever og husker det.",
  "Det her bliver svært at forklare til forsikringen.",
  "Jeg tror, vi skal ringe til en voksen.",
  "Jeg er teknisk set voksen. Det er problemet.",
  "Vi behøver ikke en plan. Vi har selvtillid.",
  "Det her er præcis grunden til, at jeg ikke må være alene.",
  "Jeg har lige gjort noget, fremtidige mig kommer til at hade.",
  "Jeg tager ingen ansvar, men al æren.",
  "Jeg fortryder allerede den næste beslutning.",
  "Det er ikke dumt, hvis man siger YOLO først.",
  "Jeg er én dårlig idé fra at blive en lokal legende.",
  "Jeg har mistet kontrollen over både aftenen og mine sko.",
  "Det her var en gruppebeslutning. Jeg nægter at tage skylden.",
  "Jeg burde have været hjemme for tre timer siden.",

  // =========================
  // HORRIBLE FLIRTING
  // =========================

  "Er du single, eller skal jeg gøre aftenen akavet?",
  "Du ligner en, der træffer dårlige beslutninger. Hej.",
  "Jeg er måske ikke din type, men jeg er tilgængelig.",
  "Er du en parkeringsbøde? For du ødelægger min dag.",
  "Du er flottere, jo længere aftenen bliver.",
  "Jeg har lav standard, men høje ambitioner.",
  "Skal vi dele en taxa og en dårlig beslutning?",
  "Du ligner min næste undskyldning til min psykolog.",
  "Jeg er ikke desperat. Jeg er bare meget effektiv.",
  "Har du en kæreste, eller skal jeg ødelægge din aften?",
  "Jeg har glemt dit navn, men ikke mine intentioner.",
  "Er du WiFi? For jeg føler en ustabil forbindelse.",
  "Du ligner en, min mor ville advare mig imod.",
  "Hvis du var en drink, ville jeg bestille to.",
  "Jeg ville give dig mit nummer, men min telefon har blokeret mig.",
  "Du er ikke min type, men min type har også afvist mig.",
  "Skal vi springe smalltalk over og direkte til dårlig kommunikation?",
  "Er det kærlighed ved første blik, eller skal jeg drikke mere?",
  "Du ser bekendt ud. Har jeg allerede gjort mig pinlig foran dig?",
  "Jeg har ingen røde flag. Jeg er hele paraden.",
  "Du fortjener bedre. Men jeg er her nu.",
  "Mit kærlighedssprog er dårlige beslutninger.",
  "Jeg er ikke et catch. Jeg er en advarsel.",
  "Du er årsagen til, at jeg kommer til at skamme mig i morgen.",
  "Skal vi gøre noget, vi begge benægter på mandag?",

  // =========================
  // SELF-ROASTS
  // =========================

  "Jeg er grunden til, at shampoo har instruktioner.",
  "Jeg har potentiale. Det ligger bare ubrugt hen.",
  "Min personlighed er 90% koffein og 10% panik.",
  "Jeg er ikke dum. Jeg er bare konsekvent uheldig med tanker.",
  "Jeg er beviset på, at evolutionen holder pauser.",
  "Min sidste hjernecelle arbejder overtid.",
  "Jeg er et levende argument imod fri vilje.",
  "Jeg er ikke et rødt flag. Jeg er hele cirkusset.",
  "Jeg har samme energi som en våd sok.",
  "Mit liv er en gruppeopgave, hvor ingen laver noget.",
  "Jeg er ikke problemet. Jeg er hele problemstillingen.",
  "Min selvtillid er sponsoreret af alkohol.",
  "Jeg har flere problemer end løsninger.",
  "Jeg har personlighed som en defekt printer.",
  "Jeg er ikke mystisk. Jeg er bare dårlig til at kommunikere.",
  "Jeg er årsagen til, at familien har en gruppechat uden mig.",
  "Jeg er ikke perfekt. Jeg er faktisk imponerende langt fra.",
  "Mit største talent er at gøre ting værre.",
  "Jeg har en PhD i dårlige undskyldninger.",
  "Jeg er en begrænset udgave. Heldigvis.",
  "Jeg er min egen værste investering.",
  "Jeg har ikke styr på mit liv, men jeg har snacks.",
  "Jeg er et menneskeligt fejl-404.",
  "Jeg er bygget anderledes. Forkert, men anderledes.",
  "Hvis dumhed var en sport, ville jeg stadig tabe.",

  // =========================
  // PARTY DISASTERS
  // =========================

  "Jeg kom for én øl. Nu kender jeg bartenderens mor.",
  "Hvorfor har jeg en trafikkegle?",
  "Hvem har taget min værdighed med hjem?",
  "Jeg er ikke blevet væk. I har bare forladt mig.",
  "Hvem fanden er Brian, og hvorfor skylder jeg ham penge?",
  "Jeg er kommet hjem med flere venner end jeg tog afsted med.",
  "Jeg har mistet min jakke, men fundet mig selv.",
  "Hvem har bestilt 17 cheeseburgere?",
  "Min taxa har flere spørgsmål end svar.",
  "Jeg er blevet smidt ud af bedre steder.",
  "Hvorfor står der en cykel i køkkenet?",
  "Jeg gik ud efter isterninger. Det var i går.",
  "Jeg kender ikke de her mennesker, men vi er familie nu.",
  "Hvorfor har jeg en kvittering på 2.400 kroner?",
  "Jeg er kommet til at invitere hele baren til efterfest.",
  "Hvem har givet mig mikrofonen?",
  "Jeg har ikke mistet mine sko. Jeg har befriet mine fødder.",
  "Jeg er DJ nu. Ingen har bedt om det.",
  "Jeg kom for musikken. Jeg blev for dramaet.",
  "Hvis nogen spørger, har jeg været hjemme hele aftenen.",
  "Jeg har været til fest i fire forskellige postnumre.",
  "Det startede med en enkelt øl og sluttede med en havetraktor.",
  "Jeg har ikke stjålet den. Jeg har adopteret den.",
  "Nogen burde have stoppet mig ved tredje tequila.",
  "Jeg er på vej hjem. Det har jeg været i to timer.",

  // =========================
  // NEXT DAY REGRETS
  // =========================

  "Jeg vågnede med tømmermænd og en ny kontakt der hedder Skat.",
  "Min bankkonto har anmeldt mig.",
  "Jeg har brug for en voksen og en elektrolytdrik.",
  "Min lever vil gerne tale med min advokat.",
  "Jeg har flere ubesvarede opkald end hjerneceller.",
  "Hvorfor har jeg sendt min chef en Snapchat?",
  "Jeg er vågnet i en anden kommune.",
  "Min telefon har beviser mod mig.",
  "Jeg har mistet både min pung og min selvrespekt.",
  "Jeg er ikke klar til at se min kamerarulle.",
  "Jeg skal aldrig drikke igen. Vi ses fredag.",
  "Jeg har tømmermænd i min sjæl.",
  "Min krop har indgivet en formel klage.",
  "Jeg vågnede med en kebab i lommen.",
  "Jeg har brug for en ny identitet.",
  "Jeg kan ikke åbne MobilePay uden at græde.",
  "Jeg har brugt 600 kroner på en samtale med en fremmed.",
  "Min søgehistorik skal slettes inden begravelsen.",
  "Jeg har sagt undskyld til folk, jeg ikke kan huske.",
  "Min værdighed ligger stadig på dansegulvet.",
  "Jeg er vågnet op med en pizzabakke som dyne.",
  "Min mor har sendt mig et screenshot.",
  "Jeg tror, jeg er blevet gift. Med hvem ved jeg ikke.",
  "Min telefon er på 2%, ligesom min livsglæde.",
  "Jeg vil gerne afmelde gårsdagens handlinger.",

  // =========================
  // ABSURD NONSENSE
  // =========================

  "Jeg har aldrig stolet på en mand med to venstre sokker.",
  "Hvis en fisk kan svømme, hvorfor kan jeg så ikke flyve?",
  "Jeg har lige diskuteret med en lygtepæl. Den vandt.",
  "Hvorfor er der ingen, der taler om duer?",
  "Jeg tror, min ost dømmer mig.",
  "Jeg har set fremtiden. Den var lukket for renovering.",
  "Min spirit animal er en våd pomfrit.",
  "Jeg har mistanke om, at min stol arbejder for kommunen.",
  "Hvis livet giver dig citroner, så find tequila.",
  "Jeg har lige tabt en stirrekonkurrence til en kartoffel.",
  "Hvorfor har alle mine problemer ben?",
  "Jeg ville forklare det, men min hjerne er på norsk.",
  "Jeg tror, jeg er blevet venner med et træ.",
  "Har nogen set min anden personlighed?",
  "Jeg har lige opfundet en ny måde at sidde forkert på.",
  "Er det her virkeligheden, eller er vi stadig i Netto?",
  "Jeg føler mig som en mikrobølgeovn med følelser.",
  "Mit indre barn har fået adgang til mit dankort.",
  "Hvis du ser min fornuft, så sig den skal komme hjem.",
  "Jeg har en stærk mistanke om, at månen følger efter mig.",

  // =========================
  // DANISH PARTY CULTURE
  // =========================

  "Jeg skulle bare lige have en enkelt på bodegaen.",
  "Der er altid plads til en ekstra Fernet.",
  "Jeg er ikke fuld. Jeg har bare fået snaps.",
  "Det er ikke en rigtig fest, før nogen mister en sko.",
  "Jeg har drukket mig fra SU til kontanthjælp.",
  "Jeg tror, jeg har købt en omgang til hele Netto.",
  "Min promille er højere end min SU.",
  "Det er ikke alkoholisme, hvis det er fredag.",
  "Jeg er ikke væk. Jeg er bare på vej til 7-Eleven.",
  "Hvorfor er jeg i Roskilde?",
  "Jeg har lige betalt 89 kroner for en øl.",
  "Jeg tog S-toget. Nu er jeg i Sverige.",
  "Jeg har mere Fernet end blod i kroppen.",
  "Jeg kan stadig mærke den sidste julefrokost.",
  "Min lever har meldt sig ud af fagforeningen.",
  "Jeg er én øl fra at bestille en tur til Mallorca.",
  "Min kontoudskrift ligner en politirapport.",
  "Jeg kom for at hygge. Nu er jeg hovedmistænkt.",
  "Jeg har fået karantæne fra min egen lejlighed.",
  "Jeg har lige sunget nationalsangen til en kebab.",

  // =========================
  // HORRIBLE LIFE ADVICE
  // =========================

  "Følg dine drømme. Medmindre de kræver koordinering.",
  "Man lever kun én gang. Heldigvis.",
  "Hvis du ikke kan huske det, skete det ikke.",
  "Penge kan ikke købe lykke, men de kan købe shots.",
  "Livet er kort. Gør det akavet.",
  "Tænk før du taler. Eller lad være. Det gør jeg.",
  "Giv aldrig op. Medmindre det er en virkelig dårlig idé.",
  "Hvis ingen griner, så sig det højere.",
  "Problemer forsvinder ikke. De bliver bare sjovere med alkohol.",
  "Husk at drikke vand. Især hvis det er blandet med vodka.",
  "Tro på dig selv. Ingen andre gør det.",
  "Følg dit hjerte. Din hjerne har alligevel givet op.",
  "Man lærer af sine fejl. Jeg må være genial efterhånden.",
  "Du kan ikke tabe, hvis du ikke ved, hvad spillet går ud på.",
  "Vær dig selv. Medmindre du er mig.",
  "Et problem delt er et problem, to mennesker har.",
  "Tag chancer. Især når konsekvenserne rammer i morgen.",
  "Hvis livet er en joke, er jeg punchlinen.",
  "Det er aldrig for sent at gøre noget dumt.",
  "Selvrespekt er midlertidig. Screenshots er for evigt.",




  //============= LIST GOES ON
  "Jeg er ikke fuld. Gulvet går bare mærkeligt.",
  "Jeg skulle kun have én. Jeg specificerede aldrig én hvad.",
  "Hvem har sat min telefon på flytilstand? Den kan jo ikke flyve.",
  "Jeg kender en genvej hjem. Hvor bor jeg?",
  "Jeg er ikke fuld. Gulvet går bare mærkeligt.",
  "Jeg skulle kun have én. Jeg specificerede aldrig én hvad.",
  "Hvem har sat min telefon på flytilstand? Den kan jo ikke flyve.",
  "Jeg kender en genvej hjem. Hvor bor jeg?",
  "Jeg er ikke fuld. Gulvet går bare mærkeligt.",
  "Jeg skulle kun have én. Jeg specificerede aldrig én hvad.",
  "Hvem har sat min telefon på flytilstand? Den kan jo ikke flyve.",
  "Jeg kender en genvej hjem. Hvor bor jeg?",
  "Jeg er ikke fuld. Gulvet går bare mærkeligt.",
  "Jeg skulle kun have én. Jeg specificerede aldrig én hvad.",
  "Hvem har sat min telefon på flytilstand? Den kan jo ikke flyve.",
  "Jeg kender en genvej hjem. Hvor bor jeg?",
  "Klokken er ikke sent. Den er bare meget.",
  "Hvorfor smager vand så godt lige nu?",
  "Jeg har en fantastisk idé. Mind mig om den i morgen.",
  "Jeg tabte ikke min pomfrit. Jeg gav den frihed.",
  "Det her er den bedste sang nogensinde. Det sagde jeg også om den sidste.",
  "Jeg er ikke faret vild. Jeg udforsker.",
  "Kan nogen fortælle min cykel, hvor jeg er?",
  "Jeg kan godt hviske. SE, HVOR STILLE JEG ER!",
  "Mit ur siger, vi skal hjem. Det bestemmer ikke over mig.",
  "Jeg skal bare have en snack, og så bliver jeg et helt nyt menneske.",
  "Jeg tror, jeg har fået en genial idé til vores klasseprojekt.",
  "Vi er ikke forsinkede. Vi ankommer dramatisk."
];




export default function CameraScreen() {
  // Camera helpers: permission, a ref to the camera, and front/back switching.
  const { permission, requestPermission, cameraRef, facing, toggleFacing } = useCameraSetup();

  // The URI (file path) of the last photo. null = no photo yet, show the camera.
  const [photoUri, setPhotoUri] = useState(null);

const [quote, setQuote] = useState('');

function randomQuote() {
  const randomIndex = Math.floor(Math.random() * drunkQuotes.length);
  setQuote(drunkQuotes[randomIndex]);
}


  // The camera needs a moment to start. We can't take a photo before it's ready.
  const [isCameraReady, setIsCameraReady] = useState(false);

  // Take a photo and remember where it was saved.
  async function takePhoto() {
    if (!cameraRef.current || !isCameraReady) return;

    const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
    
    randomQuote();
    setPhotoUri(photo.uri);
  }

  // No camera (e.g. simulator)? Pick a photo from the gallery instead.
  async function pickPhoto() {
    const uri = await pickFromGallery();
    if (uri) {
      randomQuote();
      setPhotoUri(uri);
    }
  }

  // Go back to the camera.
  function retake() {
    setPhotoUri(null);
    setIsCameraReady(false); // the camera starts again, so wait for it
  }

  // ─────────────────────────────────────────────────────────────
  // SCREEN 1: we have a photo → show it
  // ─────────────────────────────────────────────────────────────
  
if (photoUri) {
  return (
    <View style={styles.container}>

      {/* The captured photo */}
      <Image
        source={{ uri: photoUri }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* Random quote displayed on top of the photo */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>
          "{quote}"
        </Text>
      </View>

      {/* Retake button */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.textButton} onPress={retake}>
          <Text style={styles.textButtonLabel}>
            ↩️ Retake
          </Text>
        </Pressable>
      </View>

    </View>
  );
}


  // ─────────────────────────────────────────────────────────────
  // SCREEN 2: no photo yet → show the live camera
  // ─────────────────────────────────────────────────────────────
  return (
    <PermissionGate permission={permission} requestPermission={requestPermission}>
      <View style={styles.container}>
        {/* The live camera. Don't put children inside CameraView –
            put overlays next to it (below), they're drawn on top. */}
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing={facing}
          onCameraReady={() => setIsCameraReady(true)}
        />

        {/* 🎨 YOUR OVERLAY GOES HERE – anything rendered here appears on top of the camera */}
        
          
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            "{quote}"
          </Text>
        </View>

          
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
             Horrible Quote Photo Booth 
          </Text>

          <Text style={styles.headerSubtitle}>
            Take a picture. Regret the quote.
          </Text>
        </View>




        {/* Switch between front and back camera (top right). */}
        <Pressable style={styles.flipButton} onPress={toggleFacing}>
          <Text style={styles.iconLabel}>🔄</Text>
        </Pressable>

        {/* Bottom row: Gallery – Capture – (empty space to keep capture centered) */}
        <View style={styles.bottomBar}>
          <Pressable style={styles.sideButton} onPress={pickPhoto}>
            <Text style={styles.iconLabel}>🖼️</Text>
            <Text style={styles.smallLabel}>Gallery</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.captureButton,
              pressed && styles.capturePressed,
              !isCameraReady && styles.captureDisabled,
            ]}
            onPress={takePhoto}
            disabled={!isCameraReady}
          >
            <View style={styles.captureInner} />
          </Pressable>

          <View style={styles.sideButton} />
        </View>
      </View>
    </PermissionGate>
  );
}

// All the styles for this screen. Change colors and sizes freely!
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white' },
  capturePressed: { transform: [{ scale: 0.92 }] },
  captureDisabled: { opacity: 0.4 },
  sideButton: { width: 64, alignItems: 'center' },
  flipButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLabel: { fontSize: 26 },
  smallLabel: { color: 'white', fontSize: 12, marginTop: 2 },
  textButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  textButtonLabel: { color: 'white', fontSize: 18, fontWeight: '600' },

  
quoteContainer: {
  position: 'absolute',
  bottom: 150,
  left: 20,
  right: 20,
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.65)',
  padding: 20,
  borderRadius: 16,
},

quoteText: {
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: 30,
  textShadowColor: 'rgba(0,0,0,0.9)',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 5,
},

newQuoteButton: {
  marginTop: 15,
  backgroundColor: '#ffcc00',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 20,
},

newQuoteText: {
  color: 'black',
  fontWeight: 'bold',
  fontSize: 16,
},


header: {
  position: 'absolute',
  top: 30,
  left: 20,
  right: 20,
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.65)',
  padding: 16,
  borderRadius: 16,
},

headerTitle: {
  color: '#ffcc00',
  fontSize: 23,
  fontWeight: 'bold',
  textAlign: 'center',
},

headerSubtitle: {
  color: 'white',
  fontSize: 14,
  marginTop: 6,
  textAlign: 'center',
},




});
