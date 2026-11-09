/**
 * Raw card tables, part two: [title, year, fact].
 * Split from deckData.ts purely to keep each module a readable length.
 */

import type {RawCard} from './deckData';

export const MEDICINE_CARDS: RawCard[] = [
  [
    'Trepanation Practised',
    -7000,
    'Neolithic skulls from France and Peru carry healed circular openings, cut while the patient lived. Bone regrowth at the margins proves a startling number of these people survived the operation.',
  ],
  [
    'Egyptian Surgical Papyrus',
    -1600,
    'The Edwin Smith papyrus describes forty-eight injuries, from skull fractures down, with examination, diagnosis and prognosis. It is the first medical text that declines to blame demons for anything.',
  ],
  [
    'The Hippocratic Oath',
    -400,
    'Greek physicians on Kos separated medicine from temple healing and insisted disease has natural causes. The famous oath binds a doctor to the profession as much as to the patient.',
  ],
  [
    'Galen Dissects Animals',
    160,
    'Physician to Roman gladiators, Galen inferred human anatomy from Barbary apes and pigs. His mistakes were copied faithfully for fourteen centuries because nobody dared check them.',
  ],
  [
    'Hospitals in Baghdad',
    805,
    'The bimaristan founded under Harun al-Rashid had separate wards, a pharmacy and salaried staff who sat examinations. Treatment was free, and the records were kept well enough to teach from.',
  ],
  [
    'Avicenna’s Canon',
    1025,
    'The Canon of Medicine organised Greek, Persian and Indian practice into one system and described contagion and quarantine. It remained a European university textbook until the seventeenth century.',
  ],
  [
    'Vesalius Corrects Anatomy',
    1543,
    'De humani corporis fabrica was drawn from human dissection and quietly listed two hundred errors in Galen. Vesalius was twenty-eight, and the woodcuts are still reproduced for their accuracy.',
  ],
  [
    'Smallpox Variolation',
    1721,
    'Lady Mary Wortley Montagu brought the Ottoman practice of scratching live smallpox into the skin to London. It killed roughly one patient in fifty, against one in six for the natural disease.',
  ],
  [
    'Scurvy Trial at Sea',
    1747,
    'James Lind divided twelve sick sailors into six pairs and gave each pair a different remedy. The citrus pair recovered, and medicine had its first properly controlled clinical trial.',
  ],
  [
    'Jenner’s Vaccination',
    1796,
    'Milkmaids who caught cowpox did not catch smallpox, so Jenner deliberately infected a boy with the milder disease. The Latin for cow, vacca, gave the entire field its name.',
  ],
  [
    'The Stethoscope',
    1816,
    'Laennec rolled a sheet of paper into a tube rather than press his ear to a young woman’s chest. Listening to the body from outside turned diagnosis from guesswork into something approaching measurement.',
  ],
  [
    'Anaesthesia Demonstrated',
    1846,
    'At Massachusetts General Hospital a dentist put a patient to sleep with ether and a tumour was removed painlessly. The surgeon told the audience, with some understatement, that this was no humbug.',
  ],
  [
    'Snow Maps the Cholera Outbreak',
    1854,
    'Plotting deaths around the Broad Street pump showed cholera travelled in water, not in bad air. Snow had the pump handle removed, and epidemiology had its founding case study.',
  ],
  [
    'Nightingale’s Sanitation Reforms',
    1855,
    'At Scutari, Florence Nightingale cut the death rate by scrubbing wards and drawing polar-area diagrams that ministers could not ignore. She was a formidable statistician before she was a saint.',
  ],
  [
    'Germ Theory Established',
    1861,
    'Pasteur’s swan-neck flasks stayed sterile while open to the air, killing spontaneous generation. Lister read the work and began spraying carbolic acid over operating theatres.',
  ],
  [
    'X-rays Discovered',
    1895,
    'Röntgen noticed a screen glowing across the room from a covered tube and spent six weeks alone checking it. His first published radiograph is of his wife’s hand, wedding ring included.',
  ],
  [
    'Blood Groups Identified',
    1901,
    'Landsteiner found that mixing some people’s blood caused clumping, and sorted the pattern into A, B and O. Transfusion stopped being a lottery, and the discovery took him thirty years to get a prize for.',
  ],
  [
    'Insulin Isolated',
    1921,
    'Banting and Best extracted the hormone from dog pancreas, and a dying fourteen-year-old in Toronto recovered within days. The patent was sold to the university for one dollar.',
  ],
  [
    'Penicillin Observed',
    1928,
    'Fleming returned from holiday to a contaminated plate where mould had cleared a ring in the staphylococci. He could not purify it, and it took Florey and Chain twelve years to turn the note into a drug.',
  ],
  [
    'First Dialysis Machine',
    1943,
    'Willem Kolff built a rotating-drum kidney from sausage casing, orange juice cans and a water pump in occupied Holland. His first fifteen patients died; the sixteenth walked out of hospital.',
  ],
  [
    'Polio Vaccine Trials',
    1955,
    'The Salk field trial enrolled 1.8 million children and is still the largest medical experiment ever run. When the results were announced, church bells rang in American towns.',
  ],
  [
    'First Heart Transplant',
    1967,
    'Christiaan Barnard transplanted a heart in Cape Town and the recipient lived eighteen days before pneumonia killed him. The operation was never the hard part; suppressing rejection was.',
  ],
  [
    'Smallpox Eradicated',
    1980,
    'Ring vaccination chased the last natural case to Somalia in 1977, and the WHO declared the disease gone. It is the only human infectious disease ever deliberately driven to extinction.',
  ],
  [
    'MRI Scans Patients',
    1977,
    'Damadian and Lauterbur turned nuclear magnetic resonance into a way of imaging soft tissue without radiation. The first full-body scan took almost five hours to acquire.',
  ],
  [
    'HIV Identified',
    1983,
    'Teams in Paris and Bethesda isolated the retrovirus behind AIDS within two years of the first case reports. Effective combination therapy still took another thirteen years to arrive.',
  ],
  [
    'Dolly the Sheep Cloned',
    1996,
    'A mammary cell nucleus was transferred into an emptied egg, proving adult cells can be reset to an embryonic state. It took 277 attempts and reopened every argument about what a cell is allowed to be.',
  ],
  [
    'CRISPR Gene Editing',
    2012,
    'Doudna and Charpentier showed a bacterial immune system could be aimed at any DNA sequence with a short guide. Gene editing went from a specialist craft to something a well-run lab could do in a week.',
  ],
  [
    'mRNA Vaccines Deployed',
    2020,
    'Decades of unglamorous work on nucleoside modification allowed a vaccine to be designed from a published sequence in days. Two billion doses were manufactured within the first year.',
  ],
];

export const EVERYDAY_CARDS: RawCard[] = [
  [
    'Bread Baked',
    -8000,
    'Charred flatbread crumbs at Shubayqa in Jordan predate agriculture by four thousand years. People were grinding and baking wild grain long before anyone thought to plant it.',
  ],
  [
    'Beer Brewed',
    -7000,
    'Residue in jars from Jiahu in China shows rice, honey and fruit fermented together. Several archaeologists have argued, not entirely as a joke, that beer came before bread.',
  ],
  [
    'Soap Made',
    -2800,
    'Babylonian tablets give a recipe of fats boiled with ashes, used mainly for washing wool rather than people. Soap spent most of its history as an industrial chemical, not a toiletry.',
  ],
  [
    'Glass Blown',
    -50,
    'Syrian craftsmen discovered that a blob of molten glass on a hollow rod could be inflated. Glass dropped from a luxury to an everyday container within a single generation.',
  ],
  [
    'Paper Invented',
    105,
    'Cai Lun reported a method using mulberry bark, hemp and rags to the Han court. Paper reached Samarkand seven hundred years later, and Europe only after another four centuries.',
  ],
  [
    'The Horse Collar',
    900,
    'A padded collar resting on the shoulders let a horse pull with four times the load a throat strap allowed. European ploughing speeds roughly doubled, which is a quiet agricultural revolution.',
  ],
  [
    'Spectacles Appear',
    1286,
    'Convex lenses in riveted frames turn up in Italian records and sermons. Reading glasses doubled the working life of every scribe, notary and jeweller in Europe.',
  ],
  [
    'The Mechanical Clock',
    1335,
    'The first public striking clock in Milan divided the day into equal hours regardless of season. Time stopped being a thing the sun did and became a thing a bell announced.',
  ],
  [
    'Movable Type in Europe',
    1440,
    'Gutenberg combined an oil-based ink, a wine-press frame and a hand mould for casting identical letters. The hand mould, not the press, was the invention nobody had managed before.',
  ],
  [
    'The Pencil',
    1565,
    'A graphite deposit at Borrowdale in Cumbria was pure enough to saw into sticks and wrap in wood. For two centuries England had a near monopoly and guarded the mine under armed watch.',
  ],
  [
    'The Flush Toilet',
    1596,
    'Sir John Harington installed a valve closet for Queen Elizabeth, who reportedly refused to use it because of the noise. Without a sewer system to connect to, it stayed a curiosity for two hundred years.',
  ],
  [
    'The Pressure Cooker',
    1679,
    'Denis Papin’s steam digester cooked bones to jelly and needed a safety valve, which he also had to invent. The valve mattered far more than the dinner it produced.',
  ],
  [
    'The Seed Drill',
    1701,
    'Jethro Tull’s machine planted seed in straight rows at a controlled depth instead of broadcasting it by hand. Yields rose sharply, and weeding between rows became possible.',
  ],
  [
    'Canned Food',
    1810,
    'Nicolas Appert won a French prize for preserving food in sealed glass, decades before anyone knew why it worked. The tin can followed within months; the can opener took another forty-eight years.',
  ],
  [
    'Friction Matches',
    1826,
    'John Walker scraped a coated stick on his hearth and set it alight by accident. Early matches used white phosphorus, which gave factory workers necrosis of the jaw until it was banned.',
  ],
  [
    'The Safety Pin',
    1849,
    'Walter Hunt twisted a single piece of wire into a clasp with a guard, patented it, and sold the rights for four hundred dollars to settle a debt. The design has not needed changing since.',
  ],
  [
    'The Zip Fastener',
    1913,
    'Gideon Sundback’s interlocking teeth worked reliably where twenty years of hook-and-eye versions had not. Boot makers adopted it first; clothing resisted for another twenty years.',
  ],
  [
    'Stainless Steel',
    1913,
    'Harry Brearley, looking for a gun-barrel alloy in Sheffield, noticed a rejected sample that would not rust. Cutlery was the first market, and he never earned royalties on it.',
  ],
  [
    'Sliced Bread Sold',
    1928,
    'Otto Rohwedder’s machine was rejected for years because sliced loaves went stale, until he added wrapping. The phrase about the best thing since came from the advertising.',
  ],
  [
    'The Supermarket Trolley',
    1937,
    'Sylvan Goldman bolted wheels to folding chairs so shoppers could carry more than two hands allowed. Customers refused to use them until he hired actors to push them around the store.',
  ],
  [
    'The Ballpoint Pen',
    1938,
    'László Bíró, a Hungarian journalist, paired a rolling ball tip with quick-drying newspaper ink. The Royal Air Force bought them because, unlike fountain pens, they did not leak at altitude.',
  ],
  [
    'Microwave Oven',
    1945,
    'Percy Spencer noticed a chocolate bar melting in his pocket near an active radar magnetron. The first commercial model weighed three hundred kilograms and needed its own plumbing.',
  ],
  [
    'Velcro Patented',
    1955,
    'George de Mestral examined the burrs stuck to his dog under a microscope and found tiny hooks. It took eight years to work out how to weave the loops reliably by machine.',
  ],
  [
    'The Shipping Container',
    1956,
    'Malcom McLean sent fifty-eight boxes from Newark to Houston and cut loading costs by about ninety-five percent. Standardising the corner fittings mattered more than the box itself.',
  ],
  [
    'The Pull-Tab Can',
    1963,
    'Ermal Fraze designed a tab after a picnic without an opener. Detachable tabs littered beaches for a decade until the stay-on tab replaced them.',
  ],
  [
    'The Barcode Scanned',
    1974,
    'A packet of chewing gum in Troy, Ohio was the first item ever rung up by laser. The pack is now in the Smithsonian; the patent had been filed twenty-two years earlier.',
  ],
  [
    'The Post-it Note',
    1980,
    'A failed strong adhesive sat unused for five years until a colleague wanted bookmarks that stayed in a hymn book. The yellow was simply the scrap paper the lab happened to have.',
  ],
  [
    'Lithium-Ion Battery Sold',
    1991,
    'Sony commercialised a cell using a cobalt-oxide cathode and a graphite anode. Every portable device since has been shaped around what that chemistry will tolerate.',
  ],
];

export const FLIGHT_SPACE_CARDS: RawCard[] = [
  [
    'Chinese Rockets in War',
    1232,
    'Defenders of Kaifeng launched fire arrows propelled by gunpowder tubes against Mongol besiegers. The military rocket then spent six centuries being inaccurate before anyone solved guidance.',
  ],
  [
    'Da Vinci’s Flight Studies',
    1505,
    'The Codex on the Flight of Birds analyses lift, stall and centre of gravity with real rigour. None of the machines would have flown, because no power source existed that was light enough.',
  ],
  [
    'First Hot Air Balloon Flight',
    1783,
    'The Montgolfier brothers sent a sheep, a duck and a cockerel aloft before risking a person. Two months later Pilâtre de Rozier flew over Paris, and humans had left the ground for good.',
  ],
  [
    'Cayley Defines the Aeroplane',
    1799,
    'George Cayley engraved a disc showing lift, drag, thrust and weight as separate forces on a fixed wing. Every aircraft since has used the layout he sketched: fixed wings, a fuselage and a tail.',
  ],
  [
    'First Glider Carries a Person',
    1853,
    'Cayley’s coachman was sent across a Yorkshire valley in a glider and reportedly resigned on landing. He said he had been hired to drive, not to fly.',
  ],
  [
    'Lilienthal’s Glides',
    1891,
    'Otto Lilienthal made some two thousand flights from an artificial hill and published careful lift tables. He died in a stall, and his last words were that sacrifices must be made.',
  ],
  [
    'The Wright Flyer',
    1903,
    'Twelve seconds and thirty-seven metres at Kitty Hawk. The Wrights’ real advance was three-axis control by wing warping, which they worked out in a wind tunnel built from a starch box.',
  ],
  [
    'First Flight Across the Channel',
    1909,
    'Louis Blériot crossed from Calais in thirty-seven minutes with no compass, following a French destroyer until he lost sight of it. Britain woke up the next morning no longer an island.',
  ],
  [
    'Goddard’s Liquid-Fuel Rocket',
    1926,
    'A gasoline and liquid oxygen rocket rose twelve metres from a Massachusetts cabbage field. A newspaper had mocked Goddard for thinking rockets would work in a vacuum; it apologised in 1969.',
  ],
  [
    'First Transatlantic Solo Flight',
    1927,
    'Charles Lindbergh flew thirty-three and a half hours to Paris with no front window and a periscope instead. He stayed awake by flying low enough to feel the spray.',
  ],
  [
    'The Jet Engine Runs',
    1937,
    'Frank Whittle’s bench test terrified the laboratory when it ran away above its set speed. Von Ohain flew a jet first, in Germany, two years later; neither knew of the other’s work.',
  ],
  [
    'The Sound Barrier Broken',
    1947,
    'Chuck Yeager flew the Bell X-1 past Mach 1 over the Mojave with two ribs broken from falling off a horse. He had sawn off a broom handle to close the hatch one-handed.',
  ],
  [
    'Sputnik Orbits',
    1957,
    'A polished aluminium sphere the size of a beach ball beeped on a frequency any radio amateur could hear, which was the point. The United States created NASA within a year.',
  ],
  [
    'Laika in Orbit',
    1957,
    'A Moscow street dog became the first living creature in orbit aboard Sputnik 2, which had no return plan. Telemetry released decades later showed she died of overheating within hours.',
  ],
  [
    'Gagarin Orbits the Earth',
    1961,
    'The flight lasted 108 minutes, and Gagarin ejected and parachuted separately because Vostok could not land softly. The Soviet Union concealed that detail for years to secure the record.',
  ],
  [
    'First Spacewalk',
    1965,
    'Alexei Leonov’s suit ballooned so badly in vacuum that he had to bleed off pressure to squeeze back inside. He did not tell mission control until he was already doing it.',
  ],
  [
    'Apollo 8 Rounds the Moon',
    1968,
    'The first crew to leave earth orbit photographed Earthrise over the lunar limb. The picture is often credited with starting the modern environmental movement.',
  ],
  [
    'Apollo 11 Lands',
    1969,
    'The lunar module touched down with programme alarms sounding and barely twenty-five seconds of fuel margin. Six hundred million people watched the broadcast live.',
  ],
  [
    'Apollo 13 Returns Safely',
    1970,
    'An oxygen tank ruptured two days out, and the crew used the lunar module as a lifeboat around the moon. The carbon dioxide scrubber was adapted with a flight plan cover, tape and a sock.',
  ],
  [
    'First Space Station Crewed',
    1971,
    'Salyut 1 received a crew who spent twenty-three days aboard and then died on re-entry when a valve opened. They remain the only people to have died in space rather than in the atmosphere.',
  ],
  [
    'Viking Lands on Mars',
    1976,
    'Two landers returned the first pictures from the Martian surface and ran four biology experiments. One gave a positive result that is still being argued about half a century later.',
  ],
  [
    'Voyager 2 Launched',
    1977,
    'A rare alignment of the outer planets let one probe visit Jupiter, Saturn, Uranus and Neptune in sequence. It is still transmitting, on roughly the power of a refrigerator bulb.',
  ],
  [
    'Space Shuttle Flies',
    1981,
    'Columbia was the first crewed spacecraft to launch without an uncrewed test flight. The tiles were so unproven that the crew were given ejection seats for the first four missions.',
  ],
  [
    'Hubble Telescope Repaired',
    1993,
    'Launched with a mirror ground wrong by about two microns, Hubble was fitted with corrective optics by a shuttle crew. Astronauts installed what amounted to a very expensive pair of glasses.',
  ],
  [
    'Mir Hosts Long Stays',
    1995,
    'Valeri Polyakov returned after 437 continuous days aboard Mir, still the longest single spaceflight. He walked from the capsule to a chair to prove a Mars crew could.',
  ],
  [
    'Mars Rover Spirit Lands',
    2004,
    'Designed for ninety days, Spirit worked for six years and Opportunity for fourteen. Both landed by bouncing to a halt inside clusters of airbags.',
  ],
  [
    'Falcon 9 Booster Lands',
    2015,
    'An orbital-class first stage flew back and landed upright at Cape Canaveral. Reuse cut the dominant cost of spaceflight, which had always been throwing the rocket away.',
  ],
  [
    'Webb Telescope Opens',
    2022,
    'A folded 6.5-metre mirror and a tennis-court sunshield deployed through 344 single-point failures without one going wrong. It sees the universe in infrared from a point beyond the moon.',
  ],
];

export const COMMUNICATION_CARDS: RawCard[] = [
  [
    'Cuneiform on Clay',
    -3200,
    'Reed-pressed wedges on clay began as a tally for grain and sheep and grew into a full writing system. Clay is the reason we can read it: fire preserves a tablet that a fire would destroy on papyrus.',
  ],
  [
    'Egyptian Hieroglyphs',
    -3100,
    'Hieroglyphs mixed pictures, sounds and silent classifiers in the same line of text. The Narmer Palette already uses them to label a king, so writing and the state arrive together.',
  ],
  [
    'Papyrus Scrolls',
    -2500,
    'Strips of split reed pressed at right angles made a light writing surface that could be rolled. Egypt had a near monopoly on the material, and cutting off supply was a workable foreign policy.',
  ],
  [
    'Phoenician Alphabet',
    -1050,
    'Twenty-two consonant letters, learnable in days, spread with traders all round the Mediterranean. Literacy stopped being a profession and became a skill.',
  ],
  [
    'The Library of Alexandria',
    -295,
    'Ptolemaic agents copied every scroll arriving in the harbour and sometimes returned the copy. The collection was not destroyed in one fire but declined over centuries of budget cuts and neglect.',
  ],
  [
    'The Roman Postal Relay',
    -20,
    'The cursus publicus kept fresh horses at posts along the imperial roads for official dispatches. A message could cross eight hundred kilometres in a week, a speed Europe did not match again until 1800.',
  ],
  [
    'The Codex Replaces the Scroll',
    150,
    'Stacking and binding leaves gave a book that could be opened at any page and written on both sides. Early Christians adopted it enthusiastically, which is why the scroll lost.',
  ],
  [
    'Woodblock Printing',
    868,
    'The Diamond Sutra is the earliest dated printed book, with a colophon naming the printer and the day. Block printing suited Chinese characters better than movable type did for centuries.',
  ],
  [
    'Gutenberg Bible Printed',
    1455,
    'About 180 copies were produced, each page set from reusable cast letters. The price was still equal to three years of a clerk’s wages, but it fell by ninety percent within a lifetime.',
  ],
  [
    'The First Newspapers',
    1605,
    'Johann Carolus printed the Relation weekly in Strasbourg, with no comment and no analysis. News became a product with a delivery schedule rather than a rumour with a direction.',
  ],
  [
    'The Optical Telegraph',
    1792,
    'Claude Chappe’s shutter towers relayed coded signals across France at roughly 200 kilometres an hour in clear weather. Paris to Lille took about nine minutes, fog permitting.',
  ],
  [
    'Braille Published',
    1824,
    'Louis Braille, blinded at three, adapted a military night-writing code into a six-dot cell at fifteen. His own school banned it for years because sighted teachers could not read it.',
  ],
  [
    'The Electric Telegraph',
    1844,
    'Morse’s line from Washington to Baltimore carried the message asking what God had wrought. For the first time a message could move faster than the person carrying it.',
  ],
  [
    'Transatlantic Cable Works',
    1866,
    'After two failures and a snapped cable, the Great Eastern laid a line that carried eight words a minute. Communication between continents dropped from ten days to a few minutes.',
  ],
  [
    'The Telephone Patented',
    1876,
    'Bell filed hours before Elisha Gray on the same principle, and spent the next two decades in court about it. The first sentence transmitted was a request for his assistant to come in.',
  ],
  [
    'The Phonograph',
    1877,
    'Edison shouted a nursery rhyme into a tinfoil cylinder and heard it back, reportedly frightening himself. Sound had never been storable before; every recording medium descends from that tinfoil.',
  ],
  [
    'Wireless Crosses the Atlantic',
    1901,
    'Marconi claimed to hear the letter S in Morse at St John’s, and sceptics still argue he heard static. Within five years ships were carrying radio as a matter of course.',
  ],
  [
    'Public Radio Broadcasting',
    1920,
    'KDKA in Pittsburgh announced the presidential election results to anyone with a receiver. Broadcasting to strangers, rather than signalling to one correspondent, was the genuinely new idea.',
  ],
  [
    'Television Demonstrated',
    1926,
    'John Logie Baird showed a recognisable moving human face on a thirty-line mechanical system in a Soho attic. Electronic scanning replaced the spinning disc within a decade.',
  ],
  [
    'Information Theory',
    1948,
    'Claude Shannon defined the bit and proved exactly how much can be sent over a noisy channel. Every modem, codec and error-correcting code is an application of one 1948 paper.',
  ],
  [
    'The Transistor',
    1947,
    'Bardeen, Brattain and Shockley made a germanium amplifier with no vacuum and no warm-up time. It is the single component that every later piece of electronics is made of.',
  ],
  [
    'Communications Satellite',
    1962,
    'Telstar relayed live television between Andover and Brittany, though only for twenty minutes per orbit. Arthur C. Clarke had described geostationary relays seventeen years earlier.',
  ],
  [
    'The First Email',
    1971,
    'Ray Tomlinson sent a message between two machines side by side and chose the at sign because no name contained it. He later said the first message was entirely forgettable, and he has forgotten it.',
  ],
  [
    'The Mobile Phone Call',
    1973,
    'Martin Cooper stood on a New York street with a kilogram handset and rang his rival at Bell Labs. The battery gave twenty minutes of talk after ten hours of charging.',
  ],
  [
    'TCP/IP Standardised',
    1983,
    'The ARPANET switched to TCP/IP on one day, and separate networks could finally interconnect. The design assumes the network is unreliable, which is why it has survived everything since.',
  ],
  [
    'The World Wide Web',
    1989,
    'Tim Berners-Lee proposed hypertext over the internet to manage CERN’s documentation. His manager’s note on the proposal read: vague, but exciting.',
  ],
  [
    'SMS Text Message Sent',
    1992,
    'An engineer typed Merry Christmas on a computer and sent it to a phone that could not reply. Texting was an afterthought in the GSM standard, using spare capacity in the signalling channel.',
  ],
  [
    'Smartphone Era Begins',
    2007,
    'Capacitive multi-touch replaced the stylus and the keypad, and the phone became a general-purpose computer. Within a decade more people reached the internet by phone than by any other means.',
  ],
];
