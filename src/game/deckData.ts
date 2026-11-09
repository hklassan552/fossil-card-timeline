/**
 * Raw card tables for the eight decks: [title, year, fact].
 *
 * A card's year is a signed integer:
 *   -252000000  = 252 million years ago (deep time)
 *   -1200       = 1200 BCE
 *    1440       = 1440 CE
 */

export type RawCard = [title: string, year: number, fact: string];

export const DEEP_TIME_CARDS: RawCard[] = [
  [
    'First Oxygen in the Air',
    -2400000000,
    'Cyanobacteria had been splitting water for hundreds of millions of years before free oxygen finally overwhelmed the planet’s iron sinks. The Great Oxidation Event poisoned most life then living and set the chemistry of every breath since.',
  ],
  [
    'First Animals with Shells',
    -541000000,
    'The Cambrian opens with a sudden bloom of hard parts. Within a geological eye-blink the sea floor fills with armour, claws and the first true eyes, and predation becomes an arms race preserved in stone.',
  ],
  [
    'First Land Plants',
    -470000000,
    'Simple liverwort-like plants crept out of the shallows, their spores waterproofed against the air. Root systems began to crack bedrock into soil, quietly building the surface every later land animal would walk on.',
  ],
  [
    'First Tetrapod Walks Ashore',
    -375000000,
    'Fish with sturdy limb bones and a neck, such as Tiktaalik, hauled themselves through Devonian swamps. The shoulder joint that let them push up from the mud is the same joint a person uses to raise a cup.',
  ],
  [
    'First Insects Take Flight',
    -324000000,
    'Carboniferous air was rich enough to support dragonflies with a seventy-centimetre wingspan. Insects had the sky entirely to themselves for roughly a hundred million years before any vertebrate joined them.',
  ],
  [
    'The Great Dying',
    -252000000,
    'Siberian volcanism cooked the carbon out of coal beds and acidified the oceans. Around ninety-six percent of marine species vanished in the Permian extinction, the closest life has come to being erased.',
  ],
  [
    'First Dinosaurs',
    -233000000,
    'Small, fast bipeds appeared in the Triassic while crocodile relatives still ruled. Dinosaurs spent their first thirty million years as a minor group before the next extinction cleared the field for them.',
  ],
  [
    'First Mammals',
    -225000000,
    'Shrew-sized, nocturnal and warm, the earliest mammals specialised in being small and inconspicuous. Their distinguishing feature is dull but decisive: three tiny bones in the middle ear, repurposed from the jaw.',
  ],
  [
    'Pangaea Begins to Split',
    -200000000,
    'Rift valleys tore the single supercontinent along what is now the eastern seaboard of North America. The Atlantic began as a chain of lakes and has been widening at roughly the rate fingernails grow ever since.',
  ],
  [
    'First Birds',
    -150000000,
    'Archaeopteryx had feathers, a wishbone, and the teeth and long bony tail of a small dinosaur. It is the specimen that convinced Victorian naturalists that birds are not merely bird-like but literally dinosaurs.',
  ],
  [
    'First Flowering Plants',
    -130000000,
    'Angiosperms arrived late and then took over, trading wind pollination for a bargain struck with insects. Nearly every fruit, grain and vegetable eaten today descends from that Cretaceous innovation.',
  ],
  [
    'The Chicxulub Impact',
    -66000000,
    'A ten-kilometre asteroid struck the Yucatan shelf, filling the sky with vaporised rock. The non-avian dinosaurs, the ammonites and three quarters of all species ended in a layer of iridium-rich clay.',
  ],
  [
    'Grasses Spread Worldwide',
    -20000000,
    'Cooling, drying climates favoured grasses, which grow from the base and survive being eaten. Open grassland reshaped mammals into runners and grinders, and eventually into upright apes on an African savanna.',
  ],
  [
    'First Hominins Walk Upright',
    -4400000,
    'Ardipithecus and its relatives combined a grasping foot with a pelvis built for walking. Bipedalism came long before the big brain, which arrived nearly three million years later.',
  ],
  [
    'First Stone Tools',
    -3300000,
    'Sharp flakes struck from river cobbles at Lomekwi in Kenya predate the genus Homo. The technique is simple but not obvious, and it marks the start of an unbroken technological record.',
  ],
  [
    'Control of Fire',
    -1000000,
    'Burnt bone and ash in Wonderwerk Cave suggest deliberate hearths. Cooking unlocked calories from tough food, shrank the gut, and bought the energy budget that an expensive brain requires.',
  ],
  [
    'Homo sapiens Appears',
    -300000,
    'Fossils from Jebel Irhoud in Morocco pushed the origin of our species back by a hundred thousand years. The face was already modern; the rounded braincase took much longer to arrive.',
  ],
  [
    'Cave Art at Chauvet',
    -32000,
    'Charcoal lions and rhinoceroses were drawn on a French cave wall with shading and perspective. The artists returned over thousands of years, and in places their footprints survive beside a wolf’s.',
  ],
  [
    'End of the Last Ice Age',
    -11700,
    'The Pleistocene ends as ice sheets retreat from northern Europe and North America. Sea level rose about a hundred and twenty metres, drowning the land bridges and coastlines people had been living on.',
  ],
  [
    'Farming Begins',
    -9500,
    'In the Fertile Crescent, wheat and barley were sown deliberately for the first time. Settled villages, stored surplus, property and taxation all follow from this single change in how calories are obtained.',
  ],
  [
    'First Pottery Villages',
    -7000,
    'Fired clay vessels let communities boil, store and brew. Pottery is the archaeologist’s clock: it breaks easily, survives forever, and its styles change fast enough to date a settlement layer.',
  ],
  [
    'Copper Smelting',
    -5000,
    'Ore heated in a charcoal furnace yielded metal that could be cast rather than hammered. Copper was too soft for good tools, but the furnace itself was the breakthrough that made bronze and iron possible.',
  ],
  [
    'The Wheel',
    -3500,
    'The earliest wheels were potters’ turntables and solid wooden discs for carts in Mesopotamia and the Carpathians. The hard part was never the wheel but the axle, which has to be round, smooth and strong.',
  ],
  [
    'Writing Invented',
    -3200,
    'Sumerian scribes pressed reed styluses into clay to track grain and beer rations. Literature came centuries after accounting; the first named author in history is a Mesopotamian temple administrator.',
  ],
  [
    'Bronze Age Begins',
    -3000,
    'Alloying copper with roughly ten percent tin gave a metal hard enough for ploughshares and swords. Tin is rare, so the Bronze Age ran on long-distance trade and collapsed when those routes failed.',
  ],
  [
    'Iron Working Spreads',
    -1200,
    'Iron ore is common where tin is not, so once smiths learned to carburise and quench it, metal tools stopped being aristocratic. The Bronze Age collapse and the spread of iron are the same story.',
  ],
  [
    'Alphabetic Writing',
    -1050,
    'Phoenician traders reduced writing to about twenty-two consonant signs that anyone could learn in days. Every alphabet now in use, from Greek to Latin to Cyrillic to Arabic, descends from that shortlist.',
  ],
  [
    'Coined Money',
    -600,
    'The kingdom of Lydia struck lumps of electrum stamped with a lion’s head, guaranteeing weight and purity. A coin is a portable promise, and it made markets possible between strangers who trusted no one.',
  ],
];

export const EVOLUTION_CARDS: RawCard[] = [
  [
    'Stromatolites Build Reefs',
    -3480000000,
    'Layered mats of microbes in Western Australia are the oldest widely accepted fossils. They grew by trapping sediment one film at a time, and near-identical mats still grow in Shark Bay today.',
  ],
  [
    'Eukaryotic Cell Forms',
    -1800000000,
    'One cell swallowed another and failed to digest it. The survivor became the mitochondrion, which still carries its own circular DNA and divides on its own schedule inside every cell of your body.',
  ],
  [
    'Sexual Reproduction',
    -1200000000,
    'Red algae fossils from Arctic Canada preserve spore-bearing structures. Shuffling two genomes is costly and slow, but it lets a population outrun parasites, which is why almost everything complex does it.',
  ],
  [
    'The Ediacaran Garden',
    -575000000,
    'Soft, quilted, fronded organisms covered the sea floor with no mouths, guts or obvious predators. Nothing quite like them has existed since, and biologists still argue about which kingdom they belong to.',
  ],
  [
    'First Vertebrates',
    -518000000,
    'Finger-length swimmers such as Myllokunmingia carried a notochord, gill arches and a simple skull. Every fish, frog, lizard, bird and mammal is a modification of that small Cambrian body plan.',
  ],
  [
    'Jaws Evolve',
    -430000000,
    'The front gill arch hinged and became a biting jaw, and the ocean’s food web was rewritten. Placoderms grew armoured heads and the first teeth, and the age of passive filter-feeding ended.',
  ],
  [
    'First Forests',
    -385000000,
    'Archaeopteris trees reached thirty metres and cast the first deep shade. Their roots pulled so much carbon dioxide into soil and rock that they are blamed for a global cooling and a mass extinction.',
  ],
  [
    'The Amniotic Egg',
    -312000000,
    'A shelled egg with its own private pond let vertebrates breed far from water. Reptiles, birds and mammals are all amniotes, and the membrane that made it work is still wrapped around every human foetus.',
  ],
  [
    'Mammal-like Reptiles Rule',
    -270000000,
    'Sail-backed Dimetrodon and its kin dominated Permian land before any dinosaur existed. Despite the look, it is closer kin to you than to a lizard, and it already had differentiated teeth.',
  ],
  [
    'Feathers Before Flight',
    -160000000,
    'Chinese fossils show dinosaurs with fuzz, down and fully vaned feathers that could not have flown. Feathers began as insulation and display, and only later were co-opted as an airfoil.',
  ],
  [
    'Primates in the Trees',
    -55000000,
    'Forward-facing eyes, grasping hands and nails instead of claws suited life on thin branches. Every primate trait, including the depth perception you are using now, was first an adaptation for not falling.',
  ],
  [
    'Placental Mammals Diversify',
    -65000000,
    'Within ten million years of the asteroid, mammals went from shrew-sized to bear-sized and filled the empty niches. Nearly all modern mammal orders appear in a single burst of fossils after the impact.',
  ],
  [
    'Whales Return to the Sea',
    -50000000,
    'Pakicetus was a wolf-sized hoofed carnivore with a whale’s distinctive ear bone. Over eight million years its descendants lost their hind legs, and modern whales still grow vestigial pelvic bones.',
  ],
  [
    'Apes Lose Their Tails',
    -25000000,
    'A single jumping-gene insertion in an ape ancestor disabled tail development. The mutation survives in human DNA, and the tailbone at the base of your spine is the stub it left behind.',
  ],
  [
    'Human and Chimp Lines Split',
    -7000000,
    'Molecular clocks and the Sahelanthropus skull place the split in Central Africa. The two lineages still share about ninety-eight percent of their DNA and interbred for some time after separating.',
  ],
  [
    'Lucy Walks',
    -3200000,
    'The Australopithecus afarensis skeleton from Hadar is forty percent complete and unmistakably bipedal. Her knee angles inward exactly as a walker’s must, yet her brain was no larger than a chimpanzee’s.',
  ],
  [
    'Homo erectus Leaves Africa',
    -1800000,
    'Fossils at Dmanisi in Georgia show a small-brained, long-legged human already two continents from home. Homo erectus lasted well over a million years, longer than any other human species.',
  ],
  [
    'Neanderthals Appear',
    -400000,
    'Cold-adapted, barrel-chested and large-brained, Neanderthals buried their dead and made glue from birch tar. Most living people outside Africa carry one to two percent of their DNA.',
  ],
  [
    'Denisovans Identified',
    -200000,
    'A single finger bone from a Siberian cave yielded a genome belonging to no known human species. Their altitude-adaptation gene is why Tibetans breathe comfortably where other people cannot.',
  ],
  [
    'Behavioural Modernity',
    -70000,
    'Ochre crayons, shell beads and engraved plaques appear at Blombos Cave in South Africa. Symbol use, not anatomy, is what finally separates modern humans from every earlier population.',
  ],
  [
    'Dogs Domesticated',
    -15000,
    'Wolves that tolerated human camps bred with other tolerant wolves, and selection did the rest. Dogs read human pointing gestures better than chimpanzees do, a skill no wolf shares.',
  ],
  [
    'Lactose Tolerance Spreads',
    -5000,
    'A mutation keeping the lactase gene switched on into adulthood appeared among European and African herders. It is one of the strongest and fastest selection signals in the entire human genome.',
  ],
  [
    'Linnaeus Names Species',
    1735,
    'Systema Naturae gave every organism a two-word Latin name and a nested hierarchy of groups. Linnaeus intended to catalogue a fixed creation, but his nested boxes turned out to be a family tree.',
  ],
  [
    'Cuvier Proves Extinction',
    1796,
    'By showing that mammoth and mastodon jaws belonged to no living elephant, Cuvier established that species can vanish. Before him, a perfect creation was not supposed to be able to lose pieces.',
  ],
  [
    'Darwin Sails on the Beagle',
    1831,
    'Five years of collecting, from Patagonian fossil beds to Galapagos mockingbirds, gave Darwin his raw material. The finches became famous later; at the time he barely labelled which island each came from.',
  ],
  [
    'On the Origin of Species',
    1859,
    'Darwin published after twenty years of hesitation, prodded by Wallace arriving at the same idea. The first print run of 1,250 copies sold out in a day, and the word evolution appears only at the very end.',
  ],
  [
    'Mendel’s Pea Experiments',
    1866,
    'An Austrian friar counted some 28,000 pea plants and found that inheritance comes in discrete units. His paper was cited three times in thirty-five years and was rediscovered only after his death.',
  ],
  [
    'DNA’s Double Helix',
    1953,
    'Watson and Crick built the model using Rosalind Franklin’s X-ray diffraction image of the B form. The paired bases instantly suggested the copying mechanism, which the paper notes in one famous sentence.',
  ],
];

export const EXPLORATION_CARDS: RawCard[] = [
  [
    'Humans Reach Australia',
    -65000,
    'Crossing to Sahul required open-water voyages of at least seventy kilometres, with no sight of the far shore. It is the first clear evidence anywhere that people could plan and build seagoing craft.',
  ],
  [
    'Humans Reach the Americas',
    -16000,
    'Footprints at White Sands and coastal sites in Chile push arrival well before the ice-free corridor opened. The first Americans most likely came down the Pacific coast by boat, not on foot through Canada.',
  ],
  [
    'Polynesians Settle Hawaii',
    1000,
    'Double-hulled voyaging canoes crossed three thousand kilometres of empty Pacific using stars, swell patterns and bird flight. Navigators carried the entire chart in memory, as a chanted sequence of star bearings.',
  ],
  [
    'Phoenicians Circle Africa',
    -600,
    'Herodotus reports an Egyptian-sponsored Phoenician fleet sailing from the Red Sea and returning via the Pillars of Hercules. He disbelieved their claim that the sun stood to their right, which is exactly what proves it.',
  ],
  [
    'Pytheas Sails to the Arctic',
    -325,
    'A Greek from Massalia rounded Britain and reported a frozen sea and a land where the sun barely set. His account was mocked for centuries, and almost every detail has since been vindicated.',
  ],
  [
    'The Silk Road Opens',
    -130,
    'Zhang Qian’s embassies west for the Han court linked China to Central Asia. Silk, paper and gunpowder travelled one way; glass, horses and eventually the Black Death travelled the other.',
  ],
  [
    'Leif Erikson in Vinland',
    1000,
    'Norse settlers built turf houses at L’Anse aux Meadows in Newfoundland, five centuries before Columbus. Butternut shells found there prove they explored further south than the settlement itself.',
  ],
  [
    'Marco Polo Reaches China',
    1275,
    'A Venetian merchant family spent seventeen years in the service of Kublai Khan. The book Polo dictated in a Genoese prison was the main European source on Asia for two hundred years.',
  ],
  [
    'Ibn Battuta Sets Out',
    1325,
    'A young Moroccan scholar left for Mecca and did not come home for twenty-nine years, covering some 120,000 kilometres. His Rihla describes India, the Maldives, China, Mali and the Crimea from the inside.',
  ],
  [
    'Zheng He’s Treasure Fleets',
    1405,
    'Ming China sent 317 ships and 28,000 men as far as Kenya, with vessels several times the length of a European caravel. Within thirty years the voyages were cancelled and the shipyard records burned.',
  ],
  [
    'Portugal Rounds the Cape',
    1488,
    'Bartolomeu Dias was blown past the southern tip of Africa without seeing it and found the coast turning east. The route to India by sea existed, and his crew forced him to turn back before using it.',
  ],
  [
    'Columbus Crosses the Atlantic',
    1492,
    'Columbus underestimated the earth’s circumference by a quarter and died convinced he had reached Asia. The voyage’s real consequence was the Columbian exchange of crops, animals and disease.',
  ],
  [
    'Da Gama Reaches India',
    1498,
    'Four ships rounded Africa and arrived at Calicut, carrying trade goods so shabby the local court was insulted. The cargo they brought home still sold for sixty times the cost of the entire expedition.',
  ],
  [
    'Magellan’s Fleet Circles the Globe',
    1519,
    'Five ships and 270 men left Seville; one ship and eighteen men returned three years later. Magellan was killed in the Philippines, so the first man to circle the earth was his slave and interpreter, Enrique.',
  ],
  [
    'Mercator’s Projection',
    1569,
    'Mercator stretched the latitudes so that a line of constant compass bearing becomes a straight line. Navigators loved it, and schoolchildren have been overestimating Greenland ever since.',
  ],
  [
    'Tasman Charts New Zealand',
    1642,
    'Abel Tasman sailed round Australia without once seeing its coast, then mapped Tasmania and the west of New Zealand. The Dutch concluded there was nothing worth claiming and left for a century.',
  ],
  [
    'Cook’s First Voyage',
    1768,
    'The Endeavour carried astronomers to Tahiti to time the transit of Venus, then opened sealed orders to search for a southern continent. Cook kept his crew free of scurvy and charted New Zealand almost perfectly.',
  ],
  [
    'Lewis and Clark Set Out',
    1804,
    'The Corps of Discovery followed the Missouri to the Pacific and back in twenty-eight months, losing one man. Their journals named 178 plants and 122 animals previously unrecorded by science.',
  ],
  [
    'Darwin Lands at the Galapagos',
    1835,
    'The Beagle spent five weeks in the archipelago, and the vice-governor casually mentioned that tortoise shells differed island by island. Darwin recorded it and only grasped its meaning years later in London.',
  ],
  [
    'Burke and Wills Cross Australia',
    1860,
    'The expedition reached the north coast and died on the return within sight of rescue, having refused local knowledge of how to prepare nardoo seed. It remains the country’s most studied failure.',
  ],
  [
    'Stanley Finds Livingstone',
    1871,
    'A New York Herald reporter tracked the missing missionary to Ujiji on Lake Tanganyika. Livingstone, who had not been lost in his own opinion, stayed in Africa and died there two years later.',
  ],
  [
    'Nansen Drifts with the Ice',
    1893,
    'The Fram was built to be squeezed upward rather than crushed, then deliberately frozen into the polar pack. Nansen’s dash for the pole failed, but the ship drifted exactly as he predicted.',
  ],
  [
    'Amundsen Reaches the Pole',
    1911,
    'Skis, dogs and depot discipline brought the Norwegian party to ninety degrees south and back without a death. Scott arrived thirty-four days later and died with his companions on the return march.',
  ],
  [
    'Shackleton’s Open-Boat Voyage',
    1916,
    'With the Endurance crushed, Shackleton navigated 1,300 kilometres of the Southern Ocean in a seven-metre lifeboat. Every one of his twenty-seven men survived the two-year ordeal.',
  ],
  [
    'Everest Summited',
    1953,
    'Edmund Hillary and Tenzing Norgay reached the summit at 11.30 in the morning and stayed about fifteen minutes. News reached London on the morning of the coronation, which is why it made every front page.',
  ],
  [
    'Challenger Deep Descent',
    1960,
    'The bathyscaphe Trieste took Jacques Piccard and Don Walsh to 10,916 metres in the Mariana Trench. The window cracked on the way down, and nobody returned to the bottom for fifty-two years.',
  ],
  [
    'First Humans on the Moon',
    1969,
    'Armstrong took manual control with about twenty-five seconds of fuel left and set down in the Sea of Tranquillity. The guidance computer had less memory than a modern greetings card.',
  ],
  [
    'Mariana Trench Mapped by Sonar',
    1951,
    'HMS Challenger II used echo sounding to find the deepest point in the ocean and gave Challenger Deep its name. Sonar turned the sea floor from a blank into a landscape with ridges, trenches and plains.',
  ],
];

export const SCIENCE_CARDS: RawCard[] = [
  [
    'Babylonian Astronomy Tables',
    -700,
    'Scribes recorded eclipses and planetary risings on clay for centuries, long enough to find the cycles. Their arithmetic methods could predict a lunar eclipse without any model of what the moon was.',
  ],
  [
    'Pythagorean Theorem Proved',
    -530,
    'The relation between the sides of a right triangle was known to Babylonian and Indian surveyors much earlier. What the Greeks contributed was the idea that it needs a proof at all.',
  ],
  [
    'Euclid’s Elements',
    -300,
    'Thirteen books derive all of known geometry from five postulates and five common notions. It stayed in print as a school textbook for more than two thousand years, outlasting every language it was written in.',
  ],
  [
    'Eratosthenes Measures the Earth',
    -240,
    'Comparing noon shadows at Alexandria and Syene gave a circumference within a few percent of the true value. His only instruments were a stick, a well and the distance a camel caravan walked.',
  ],
  [
    'Archimedes on Buoyancy',
    -250,
    'On Floating Bodies states that a submerged object is pushed up by the weight of fluid it displaces. The bath story is probably an invention; the mathematics in the treatise certainly is not.',
  ],
  [
    'Ptolemy’s Almagest',
    150,
    'Epicycles on deferents reproduced planetary motion well enough to predict positions for fourteen centuries. It was wrong about the centre of the universe and remarkably good at everything else.',
  ],
  [
    'Al-Khwarizmi Founds Algebra',
    820,
    'The Compendious Book on Calculation by Completion and Balancing gave general methods for solving equations. The words algebra and algorithm both come out of this one author.',
  ],
  [
    'Ibn al-Haytham’s Optics',
    1021,
    'The Book of Optics argued that light travels to the eye rather than out of it, and tested the claim with a camera obscura. It is the earliest work that reads recognisably like experimental physics.',
  ],
  [
    'Copernicus Moves the Sun',
    1543,
    'De revolutionibus put the sun at the centre and was published as its author lay dying. It was no simpler than Ptolemy and no more accurate, but it put the earth in motion and that could not be undone.',
  ],
  [
    'Galileo’s Telescope',
    1610,
    'Sidereus Nuncius reported mountains on the moon, four satellites of Jupiter and that the Milky Way is made of stars. Any of the three would have been enough to break the crystalline spheres.',
  ],
  [
    'Kepler’s Laws of Motion',
    1609,
    'Eight minutes of arc in Tycho’s Mars data refused to fit a circle, so Kepler tried an ellipse. He spent years on the arithmetic by hand and called the result a war against Mars.',
  ],
  [
    'Harvey Maps the Circulation',
    1628,
    'Measuring the volume the heart pumps each hour showed the blood must return, not be made afresh. It is one of the first biological arguments won by quantity rather than dissection alone.',
  ],
  [
    'Newton’s Principia',
    1687,
    'Three laws and one inverse-square force accounted for falling apples, the tides, the moon and the comets together. Halley paid for the printing himself because the Royal Society had spent its money on a fish book.',
  ],
  [
    'Lavoisier Names Oxygen',
    1778,
    'Careful weighing before and after combustion destroyed the phlogiston theory and founded modern chemistry. Lavoisier was guillotined sixteen years later; the judge reportedly said the Republic had no need of savants.',
  ],
  [
    'Volta’s Electric Pile',
    1800,
    'Alternating zinc and silver discs separated by brine gave the first steady electric current. Within weeks of the announcement, others had used it to split water into hydrogen and oxygen.',
  ],
  [
    'Faraday’s Induction',
    1831,
    'Moving a magnet through a coil generates a current, which is the operating principle of every generator since. Faraday had almost no mathematics and the best physical intuition of the century.',
  ],
  [
    'Maxwell’s Equations',
    1865,
    'Four equations unified electricity, magnetism and light, and predicted waves travelling at exactly the measured speed of light. Einstein kept Maxwell’s portrait on his study wall.',
  ],
  [
    'Mendeleev’s Periodic Table',
    1869,
    'Mendeleev left gaps and predicted the properties of elements nobody had found. When gallium and germanium turned up matching his forecasts, the table stopped being a filing system and became a law.',
  ],
  [
    'Radioactivity Discovered',
    1896,
    'Becquerel’s uranium salts fogged a photographic plate shut in a drawer with no sunlight involved. Marie Curie named the phenomenon and isolated two new elements from tonnes of pitchblende residue.',
  ],
  [
    'Quantum Theory Born',
    1900,
    'Planck fitted the blackbody spectrum by assuming energy comes in discrete packets, a step he called an act of desperation. He spent years trying to get rid of the assumption and failed.',
  ],
  [
    'Special Relativity',
    1905,
    'In one year Einstein published on the photoelectric effect, Brownian motion and relativity while working as a patent clerk. Making the speed of light absolute forced simultaneity to become relative.',
  ],
  [
    'Continental Drift Proposed',
    1912,
    'Wegener matched coastlines, fossils and rock sequences across the Atlantic and was dismissed for lacking a mechanism. Sea-floor spreading supplied the mechanism half a century later.',
  ],
  [
    'The Expanding Universe',
    1929,
    'Hubble showed that a galaxy’s redshift rises with its distance, so space itself is stretching. Einstein called the fudge factor he had added to prevent this his greatest blunder.',
  ],
  [
    'Nuclear Fission Explained',
    1938,
    'Meitner and Frisch worked out on a Christmas walk that a uranium nucleus had split, releasing enormous energy. Hahn published the chemistry alone and took the Nobel Prize alone.',
  ],
  [
    'Plate Tectonics Accepted',
    1967,
    'Magnetic stripes on the sea floor recorded reversals of the earth’s field in mirror-image bands. The pattern proved new crust is made at ridges, and geology acquired a unifying theory overnight.',
  ],
  [
    'Cosmic Microwave Background',
    1965,
    'Penzias and Wilson scrubbed pigeon droppings from a horn antenna and still could not get rid of the hiss. The noise turned out to be the cooled glow of the Big Bang, filling the whole sky.',
  ],
  [
    'Human Genome Sequenced',
    2003,
    'A public consortium and a private company finished a draft of three billion base pairs. The biggest surprise was how few genes there are: about twenty thousand, fewer than in a water flea.',
  ],
  [
    'Higgs Boson Detected',
    2012,
    'Two detectors at the Large Hadron Collider independently found a bump at 125 billion electronvolts. The particle had been predicted forty-eight years earlier by a paper that was initially rejected.',
  ],
];
