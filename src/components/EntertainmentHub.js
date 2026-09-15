import React, { useState, useMemo } from 'react';
import {
  Film,
  Tv,
  Play,
  Search,
  Server,
  Star,
  Sparkles,
  Flame,
  ChevronRight,
  RotateCcw,
  Maximize2,
  ExternalLink,
  ShieldCheck,
  Clapperboard,
  Sliders,
  CheckCircle2,
  ListVideo
} from 'lucide-react';

// Comprehensive catalog of movies and TV shows across platforms
const STREAM_CATALOG = {
  'disney-plus': {
    name: 'Disney+',
    brandColor: '#0063e5',
    accentColor: '#0ea5e9',
    tagline: 'Stream Disney, Pixar, Marvel, Star Wars & National Geographic',
    loginUrl: 'https://www.disneyplus.com/login',
    hubs: ['All', 'Marvel', 'Star Wars', 'Pixar', 'Disney Classics', 'Series'],
    items: [
      {
        id: '533535',
        type: 'movie',
        title: 'Deadpool & Wolverine',
        year: '2024',
        rating: '8.1',
        genre: 'Action / Comedy',
        category: 'Marvel',
        banner: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
        desc: 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool. They team up to defeat a common enemy.'
      },
      {
        id: '1241982',
        type: 'movie',
        title: 'Moana 2',
        year: '2024',
        rating: '7.8',
        genre: 'Animation / Adventure',
        category: 'Disney Classics',
        banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        desc: 'After receiving an unexpected call from her wayfinding ancestors, Moana journeys to the far seas of Oceania on an expansive new voyage.'
      },
      {
        id: '1022789',
        type: 'movie',
        title: 'Inside Out 2',
        year: '2024',
        rating: '8.0',
        genre: 'Animation / Family',
        category: 'Pixar',
        banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
        desc: 'Joy, Sadness, Anger, Fear, and Disgust have been running a successful operation until Anxiety, Envy, and Embarrassment show up.'
      },
      {
        id: '299534',
        type: 'movie',
        title: 'Avengers: Endgame',
        year: '2019',
        rating: '8.4',
        genre: 'Sci-Fi / Action',
        category: 'Marvel',
        banner: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
        desc: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.'
      },
      {
        id: '82856',
        type: 'tv',
        title: 'The Mandalorian',
        year: '2019-2024',
        rating: '8.7',
        genre: 'Sci-Fi / Space',
        category: 'Star Wars',
        totalSeasons: 3,
        episodesPerSeason: 8,
        banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
        desc: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.'
      },
      {
        id: '84958',
        type: 'tv',
        title: 'Loki',
        year: '2021-2023',
        rating: '8.2',
        genre: 'Sci-Fi / Fantasy',
        category: 'Marvel',
        totalSeasons: 2,
        episodesPerSeason: 6,
        banner: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=80',
        desc: 'The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers: Endgame.'
      },
      {
        id: '76600',
        type: 'movie',
        title: 'Avatar: The Way of Water',
        year: '2022',
        rating: '7.8',
        genre: 'Sci-Fi / Adventure',
        category: 'Disney Classics',
        banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        desc: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns, Jake must work with Neytiri.'
      },
      {
        id: '505642',
        type: 'movie',
        title: 'Black Panther: Wakanda Forever',
        year: '2022',
        rating: '7.6',
        genre: 'Action / Sci-Fi',
        category: 'Marvel',
        banner: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
        desc: 'The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T\'Challa.'
      },
      {
        id: '447365',
        type: 'movie',
        title: 'Guardians of the Galaxy Vol. 3',
        year: '2023',
        rating: '8.0',
        genre: 'Sci-Fi / Comedy',
        category: 'Marvel',
        banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
        desc: 'Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own.'
      },
      {
        id: '453395',
        type: 'movie',
        title: 'Doctor Strange in the Multiverse of Madness',
        year: '2022',
        rating: '7.5',
        genre: 'Fantasy / Action',
        category: 'Marvel',
        banner: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=80',
        desc: 'Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses to battle multiple threats.'
      },
      {
        id: '92783',
        type: 'tv',
        title: 'She-Hulk: Attorney at Law',
        year: '2022',
        rating: '7.0',
        genre: 'Comedy / Action',
        category: 'Marvel',
        totalSeasons: 1,
        episodesPerSeason: 9,
        banner: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
        desc: 'Jennifer Walters navigates the complicated life of a single, 30-something attorney who also happens to be a green 6-foot-7-inch superpowered hulk.'
      },
      {
        id: '85271',
        type: 'tv',
        title: 'WandaVision',
        year: '2021',
        rating: '8.0',
        genre: 'Drama / Mystery',
        category: 'Marvel',
        totalSeasons: 1,
        episodesPerSeason: 9,
        banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
        desc: 'Blends the style of classic sitcoms with the MCU in which Wanda Maximoff and Vision live idealized suburban lives.'
      }
    ]
  },
  'netflix': {
    name: 'Netflix',
    brandColor: '#e50914',
    accentColor: '#f43f5e',
    tagline: 'Watch TV Shows & Movies Anytime, Anywhere',
    loginUrl: 'https://www.netflix.com/login',
    hubs: ['All', 'Top 10', 'Binge-Worthy Series', 'Action Movies', 'Sci-Fi'],
    items: [
      {
        id: '66732',
        type: 'tv',
        title: 'Stranger Things',
        year: '2016-2025',
        rating: '8.7',
        genre: 'Sci-Fi / Horror',
        category: 'Top 10',
        totalSeasons: 4,
        episodesPerSeason: 9,
        banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
        desc: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.'
      },
      {
        id: '93405',
        type: 'tv',
        title: 'Squid Game',
        year: '2021-2024',
        rating: '8.4',
        genre: 'Thriller / Drama',
        category: 'Top 10',
        totalSeasons: 2,
        episodesPerSeason: 9,
        banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        desc: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.'
      },
      {
        id: '119051',
        type: 'tv',
        title: 'Wednesday',
        year: '2022-2024',
        rating: '8.1',
        genre: 'Comedy / Fantasy',
        category: 'Binge-Worthy Series',
        totalSeasons: 1,
        episodesPerSeason: 8,
        banner: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=80',
        desc: 'Follows Wednesday Addams\' years as a student, when she attempts to master her emerging psychic ability, thwart and solve a mystery.'
      },
      {
        id: '111110',
        type: 'tv',
        title: 'One Piece (Live Action)',
        year: '2023-2024',
        rating: '8.3',
        genre: 'Action / Adventure',
        category: 'Top 10',
        totalSeasons: 1,
        episodesPerSeason: 8,
        banner: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
        desc: 'In a seafaring world, a young pirate captain sets out with his crew to attain the title of Pirate King, and discover the mythical treasure One Piece.'
      },
      {
        id: '1396',
        type: 'tv',
        title: 'Breaking Bad',
        year: '2008-2013',
        rating: '9.5',
        genre: 'Crime / Drama',
        category: 'Binge-Worthy Series',
        totalSeasons: 5,
        episodesPerSeason: 13,
        banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
        desc: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student.'
      },
      {
        id: '77169',
        type: 'tv',
        title: 'Cobra Kai',
        year: '2018-2024',
        rating: '8.5',
        genre: 'Action / Comedy',
        category: 'Binge-Worthy Series',
        totalSeasons: 6,
        episodesPerSeason: 10,
        banner: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
        desc: 'Decades after their 1984 All Valley Karate Tournament bout, a middle-aged Daniel LaRusso and Johnny Lawrence find themselves martial-arts rivals again.'
      },
      {
        id: '512195',
        type: 'movie',
        title: 'Red Notice',
        year: '2021',
        rating: '7.3',
        genre: 'Action / Comedy',
        category: 'Action Movies',
        banner: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
        desc: 'An Interpol agent tracks the world\'s most wanted art thief, but is forced to team up with a rival thief to catch an elusive master criminal.'
      },
      {
        id: '693134',
        type: 'movie',
        title: 'Dune: Part Two',
        year: '2024',
        rating: '8.6',
        genre: 'Sci-Fi / Adventure',
        category: 'Sci-Fi',
        banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        desc: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.'
      },
      {
        id: '872585',
        type: 'movie',
        title: 'Oppenheimer',
        year: '2023',
        rating: '8.9',
        genre: 'Biography / Drama',
        category: 'Top 10',
        banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
        desc: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'
      },
      {
        id: '866398',
        type: 'movie',
        title: 'The Beekeeper',
        year: '2024',
        rating: '7.1',
        genre: 'Action / Thriller',
        category: 'Action Movies',
        banner: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
        desc: 'One man\'s brutal campaign for vengeance takes on national stakes after he is revealed to be a former operative of a powerful clandestine organization.'
      }
    ]
  },
  'hulu': {
    name: 'Hulu',
    brandColor: '#1ce783',
    accentColor: '#10b981',
    tagline: 'Stream TV Episodes, Hulu Originals & FX Blockbusters',
    loginUrl: 'https://www.hulu.com/welcome',
    hubs: ['All', 'FX on Hulu', 'Emmy Winners', 'Adult Animation', 'Comedy'],
    items: [
      {
        id: '136283',
        type: 'tv',
        title: 'The Bear',
        year: '2022-2024',
        rating: '8.6',
        genre: 'Drama / Comedy',
        category: 'Emmy Winners',
        totalSeasons: 3,
        episodesPerSeason: 10,
        banner: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=80',
        desc: 'A young chef from the fine dining world comes home to Chicago to run his family Italian beef sandwich shop after a tragic death in the family.'
      },
      {
        id: '126308',
        type: 'tv',
        title: 'Shōgun',
        year: '2024',
        rating: '8.8',
        genre: 'Historical / Drama',
        category: 'FX on Hulu',
        totalSeasons: 1,
        episodesPerSeason: 10,
        banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        desc: 'When a mysterious European ship is found marooned in a nearby fishing village, Lord Toranaga discovers secrets that could tip the scales of power.'
      },
      {
        id: '106379',
        type: 'tv',
        title: 'Fallout',
        year: '2024',
        rating: '8.4',
        genre: 'Sci-Fi / Action',
        category: 'Emmy Winners',
        totalSeasons: 1,
        episodesPerSeason: 8,
        banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
        desc: 'In a future, post-apocalyptic Los Angeles brought about by nuclear decimation, citizens must live in underground bunkers to protect themselves from radiation.'
      },
      {
        id: '79744',
        type: 'tv',
        title: 'The Rookie',
        year: '2018-2024',
        rating: '8.0',
        genre: 'Crime / Drama',
        category: 'FX on Hulu',
        totalSeasons: 6,
        episodesPerSeason: 20,
        banner: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
        desc: 'Starting over isn\'t easy, especially for small-town guy John Nolan who, after a life-altering incident, is pursuing his dream of being an LAPD officer.'
      },
      {
        id: '1434',
        type: 'tv',
        title: 'Family Guy',
        year: '1999-2024',
        rating: '8.2',
        genre: 'Animation / Comedy',
        category: 'Adult Animation',
        totalSeasons: 22,
        episodesPerSeason: 20,
        banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
        desc: 'In a wacky Rhode Island town, a dysfunctional family strives to cope with everyday life as they are thrown from one crazy scenario to another.'
      },
      {
        id: '615',
        type: 'tv',
        title: 'Futurama',
        year: '1999-2024',
        rating: '8.5',
        genre: 'Animation / Sci-Fi',
        category: 'Adult Animation',
        totalSeasons: 12,
        episodesPerSeason: 10,
        banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        desc: 'Philip J. Fry, a pizza delivery boy, is accidentally frozen in 1999 and thawed out on New Year\'s Eve 2999.'
      },
      {
        id: '92749',
        type: 'tv',
        title: 'Only Murders in the Building',
        year: '2021-2024',
        rating: '8.1',
        genre: 'Comedy / Mystery',
        category: 'Comedy',
        totalSeasons: 4,
        episodesPerSeason: 10,
        banner: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=80',
        desc: 'Three strangers who share an obsession with true crime podcasts suddenly find themselves wrapped up in one when a gruesome death occurs in their apartment building.'
      },
      {
        id: '766507',
        type: 'movie',
        title: 'Prey',
        year: '2022',
        rating: '7.2',
        genre: 'Action / Sci-Fi',
        category: 'FX on Hulu',
        banner: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
        desc: 'Naru, a fierce and highly skilled warrior of the Comanche Nation, strives to protect her people when an alien predator begins hunting them.'
      }
    ]
  },
  'cineby': {
    name: 'Cineby Cinema',
    brandColor: '#8b5cf6',
    accentColor: '#a855f7',
    tagline: 'High-Definition Box Office Movies & Premieres',
    loginUrl: 'https://cineby.app/',
    hubs: ['All', 'Action', 'Sci-Fi', 'Blockbusters'],
    items: [
      {
        id: '533535',
        type: 'movie',
        title: 'Deadpool & Wolverine',
        year: '2024',
        rating: '8.1',
        genre: 'Action / Comedy',
        category: 'Blockbusters',
        banner: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
        desc: 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool.'
      },
      {
        id: '693134',
        type: 'movie',
        title: 'Dune: Part Two',
        year: '2024',
        rating: '8.6',
        genre: 'Sci-Fi / Adventure',
        category: 'Sci-Fi',
        banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        desc: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators.'
      },
      {
        id: '872585',
        type: 'movie',
        title: 'Oppenheimer',
        year: '2023',
        rating: '8.9',
        genre: 'Drama / History',
        category: 'Blockbusters',
        banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
        desc: 'The story of American scientist J. Robert Oppenheimer and the development of the atomic bomb.'
      },
      {
        id: '569094',
        type: 'movie',
        title: 'Spider-Man: Across the Spider-Verse',
        year: '2023',
        rating: '8.7',
        genre: 'Animation / Action',
        category: 'Action',
        banner: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
        desc: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.'
      }
    ]
  },
  'lumelo-tv': {
    name: 'LumeLo TV',
    brandColor: '#f97316',
    accentColor: '#fb923c',
    tagline: 'Unlimited Free Movies, Cult Classics & TV Streams',
    loginUrl: 'https://lumelotv.com/',
    hubs: ['All', 'Featured Films', 'Popular', 'Sci-Fi'],
    items: [
      {
        id: '157336',
        type: 'movie',
        title: 'Interstellar',
        year: '2014',
        rating: '8.7',
        genre: 'Sci-Fi / Adventure',
        category: 'Sci-Fi',
        banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
        desc: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft.'
      },
      {
        id: '27205',
        type: 'movie',
        title: 'Inception',
        year: '2010',
        rating: '8.8',
        genre: 'Sci-Fi / Action',
        category: 'Featured Films',
        banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        desc: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.'
      },
      {
        id: '155',
        type: 'movie',
        title: 'The Dark Knight',
        year: '2008',
        rating: '9.0',
        genre: 'Action / Crime',
        category: 'Popular',
        banner: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
        desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests.'
      },
      {
        id: '361743',
        type: 'movie',
        title: 'Top Gun: Maverick',
        year: '2022',
        rating: '8.3',
        genre: 'Action / Drama',
        category: 'Featured Films',
        banner: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
        desc: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, training a detachment of graduates for a specialized mission.'
      }
    ]
  },
  'espn': {
    name: 'ESPN Sports',
    brandColor: '#d00000',
    accentColor: '#ef4444',
    tagline: 'Live Sports Ticker, Highlights & Match Streams',
    loginUrl: 'https://www.espn.com/watch/',
    hubs: ['All', 'NBA', 'NFL', 'Soccer', 'UFC'],
    items: [
      {
        id: '1K6qT6B4Usc',
        type: 'video',
        title: 'NBA Top 10 Plays & Game Highlights',
        year: '2024-2026',
        rating: '9.2',
        genre: 'Basketball / Highlights',
        category: 'NBA',
        banner: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
        desc: 'The best monster dunks, game-winning buzzer beaters, and ankle-breaking crossover plays from today\'s NBA games.'
      },
      {
        id: 'aOC8E8R_N5c',
        type: 'video',
        title: 'NFL Top Touchdowns & Game Recaps',
        year: '2024-2026',
        rating: '9.0',
        genre: 'Football / Recaps',
        category: 'NFL',
        banner: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&auto=format&fit=crop&q=80',
        desc: 'Incredible 80-yard hail mary passes, pick-sixes, and game recaps from Sunday Night Football and the playoffs.'
      },
      {
        id: '73_1biulkYk',
        type: 'video',
        title: 'UEFA Champions League & World Soccer',
        year: '2024-2026',
        rating: '9.3',
        genre: 'Soccer / Football',
        category: 'Soccer',
        banner: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
        desc: 'Top screamers, bicycle kicks, and championship highlights from Real Madrid, Manchester City, and world clubs.'
      }
    ]
  }
};

export const EntertainmentHub = ({ app }) => {
  const serviceKey = app.id in STREAM_CATALOG ? app.id : 'disney-plus';
  const service = STREAM_CATALOG[serviceKey];

  // State
  const [selectedItem, setSelectedItem] = useState(service.items[0]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [selectedServer, setSelectedServer] = useState('server1'); // 'server1' | 'server2' | 'server3'
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Filter items by category and search
  const filteredItems = useMemo(() => {
    return service.items.filter((item) => {
      const matchCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [service.items, activeCategory, searchQuery]);

  // Compute streaming iframe URL based on active server, item type, and episode
  const getStreamUrl = (item, server, season, episode) => {
    if (!item) return '';

    // If it's a direct sports/video clip embed
    if (item.type === 'video') {
      return `https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0`;
    }

    const tmdbId = item.id;

    if (item.type === 'movie') {
      if (server === 'server1') {
        return `https://autoembed.co/movie/tmdb/${tmdbId}`;
      } else if (server === 'server2') {
        return `https://vidsrcme.ru/embed/movie?tmdb=${tmdbId}`;
      } else {
        return `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`;
      }
    } else {
      // TV Series
      if (server === 'server1') {
        return `https://autoembed.co/tv/tmdb/${tmdbId}/${season}/${episode}`;
      } else if (server === 'server2') {
        return `https://vidsrcme.ru/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`;
      } else {
        return `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}`;
      }
    }
  };

  const currentStreamUrl = getStreamUrl(selectedItem, selectedServer, selectedSeason, selectedEpisode);

  // Handle custom title/ID search
  const handlePlayCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    // Check if user entered a number (TMDB ID) or a string
    const input = customInput.trim();
    const isNum = /^\d+$/.test(input);

    const newItem = {
      id: isNum ? input : '533535', // default fallback if title
      type: 'movie',
      title: input,
      year: '2024',
      rating: '8.5',
      genre: 'Custom Stream / Search',
      category: 'All',
      banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      desc: `Now streaming ${input} across high-speed unblocked servers.`
    };

    setSelectedItem(newItem);
    setReloadKey((k) => k + 1);
  };

  return (
    <div className="w-full h-full bg-[#0a0c14] text-white flex flex-col select-none overflow-hidden font-sans">
      {/* Top Streaming Header */}
      <header
        className="px-4 py-2.5 flex items-center justify-between border-b border-slate-800 shrink-0"
        style={{
          background: `linear-gradient(90deg, #0a0c14 0%, rgba(15, 23, 42, 0.8) 100%)`,
          borderBottomColor: `${service.brandColor}33`
        }}
      >
        {/* Brand Title & Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-lg"
            style={{
              backgroundColor: service.brandColor,
              boxShadow: `0 4px 14px ${service.brandColor}66`
            }}
          >
            <Film className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm tracking-wide text-white uppercase">
                {service.name}
              </h2>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                1080p Stream
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Search Input */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search movie or show..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Server Switcher */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
            <Server className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
            <button
              onClick={() => {
                setSelectedServer('server1');
                setReloadKey((k) => k + 1);
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all ${
                selectedServer === 'server1'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Server 1
            </button>
            <button
              onClick={() => {
                setSelectedServer('server2');
                setReloadKey((k) => k + 1);
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all ${
                selectedServer === 'server2'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Server 2
            </button>
            <button
              onClick={() => {
                setSelectedServer('server3');
                setReloadKey((k) => k + 1);
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all ${
                selectedServer === 'server3'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Server 3
            </button>
          </div>

          {/* Official Account Login */}
          <a
            href={service.loginUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-all"
          >
            <span>Log In</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </header>

      {/* Main Streaming & Catalog View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT: Video Player Stage */}
        <div className="flex-1 flex flex-col bg-black relative overflow-hidden">
          {/* Active Player Iframe */}
          <div className="flex-1 relative w-full h-full bg-black flex items-center justify-center">
            <iframe
              key={`${selectedItem?.id}-${selectedServer}-${selectedSeason}-${selectedEpisode}-${reloadKey}`}
              src={currentStreamUrl}
              title={selectedItem?.title || 'Streaming Player'}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="w-full h-full border-0 absolute inset-0"
            />
          </div>

          {/* Under-Player Metadata & TV Season/Episode Selector Bar */}
          <div className="bg-slate-950/95 border-t border-slate-800/80 px-4 py-3 shrink-0 flex flex-wrap items-center justify-between gap-3">
            {/* Title, Year, Genre & Rating */}
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-white">
                    {selectedItem?.title}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {selectedItem?.rating || '8.5'}
                  </span>
                  <span className="text-xs text-slate-400">({selectedItem?.year})</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-xl">
                  {selectedItem?.desc}
                </p>
              </div>
            </div>

            {/* TV Show Episode Controller */}
            {selectedItem?.type === 'tv' && (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
                {/* Season Select */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Season:
                  </span>
                  <select
                    value={selectedSeason}
                    onChange={(e) => {
                      setSelectedSeason(Number(e.target.value));
                      setSelectedEpisode(1);
                    }}
                    className="bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded border border-slate-700 focus:outline-none focus:border-cyan-500"
                  >
                    {Array.from({ length: selectedItem.totalSeasons || 1 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Season {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Episode Select */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Episode:
                  </span>
                  <select
                    value={selectedEpisode}
                    onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                    className="bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded border border-slate-700 focus:outline-none focus:border-cyan-500"
                  >
                    {Array.from({ length: selectedItem.episodesPerSeason || 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Episode {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reload Stream Button */}
                <button
                  onClick={() => setReloadKey((k) => k + 1)}
                  title="Reload Stream"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all ml-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT / BOTTOM: Interactive Movie & Show Catalog */}
        <div className="w-full lg:w-96 bg-[#0f1422] border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col shrink-0 h-64 lg:h-full overflow-hidden">
          {/* Category Tabs */}
          <div className="p-3 border-b border-slate-800 bg-[#0d121d] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {service.hubs.map((hub) => (
              <button
                key={hub}
                onClick={() => setActiveCategory(hub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === hub
                    ? 'bg-cyan-600 text-white shadow'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {hub}
              </button>
            ))}
          </div>

          {/* Quick Custom Search Input for Any Movie */}
          <form onSubmit={handlePlayCustom} className="p-2.5 border-b border-slate-800/80 bg-slate-950 flex gap-2">
            <input
              type="text"
              placeholder="Search or enter TMDB ID..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Play</span>
            </button>
          </form>

          {/* Scrollable Titles Grid */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {activeCategory} Titles ({filteredItems.length})
              </span>
              <span className="text-[10px] text-cyan-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Unblocked 1080p
              </span>
            </div>

            {filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setSelectedSeason(1);
                    setSelectedEpisode(1);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-all border ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900/60 hover:bg-slate-800/50 border-slate-800/60'
                  }`}
                >
                  {/* Thumbnail / Poster */}
                  <div className="w-14 h-16 rounded-lg bg-slate-950 overflow-hidden relative shrink-0 border border-slate-800">
                    <img
                      src={item.banner}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/90 flex items-center justify-center text-white">
                        <Play className="w-3 h-3 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Title Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4
                        className={`text-xs font-bold truncate ${
                          isSelected ? 'text-cyan-400' : 'text-slate-200'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-amber-400 font-bold shrink-0 flex items-center gap-0.5">
                        ★ {item.rating}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {item.genre}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                        {item.year}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-400 font-medium uppercase">
                        {item.type === 'tv' ? 'TV Series' : 'Movie'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
