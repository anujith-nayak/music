import React, { useState } from 'react';
import { Search, Disc, Mic, ArrowLeft } from 'lucide-react';

// Types based on your database schema
interface Artist {
  artist_id: number;
  artist_name: string;
  artist_contact: string;
  image_url: string;
}

interface Song {
  song_id: number;
  genre: string;
  song_name: string;
  artist_id: number;
}

interface Album {
  album_id: number;
  album_name: string;
  release_date: string;
  artist_id: number;
  cover_url: string;
}

interface Track {
  track_id: number;
  track_name: string;
  track_duration: string;
  album_id: number;
}

interface Concert {
  concert_number: number;
  concert_loc: string;
  concert_date: string;
  venue_image: string;
}

// Mock data with high-quality images
const artists: Artist[] = [
  { 
    artist_id: 7, 
    artist_name: 'Kendrick Lamar', 
    artist_contact: 'kendrick@example.com',
    image_url: 'https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?auto=format&fit=crop&q=80&w=800'
  },
  { 
    artist_id: 8, 
    artist_name: 'Ariana Grande', 
    artist_contact: 'ariana@example.com',
    image_url: 'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?auto=format&fit=crop&q=80&w=800'
  },
  { 
    artist_id: 9, 
    artist_name: 'Justin Bieber', 
    artist_contact: 'justin@example.com',
    image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    artist_id: 10, 
    artist_name: 'Sia', 
    artist_contact: 'sia@example.com',
    image_url: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80&w=800'
  }
];

const songs: Song[] = [
  { song_id: 107, genre: 'Rap', song_name: 'HUMBLE.', artist_id: 7 },
  { song_id: 108, genre: 'Pop', song_name: 'No Tears Left to Cry', artist_id: 8 },
  { song_id: 109, genre: 'Pop', song_name: 'Peaches', artist_id: 9 },
  { song_id: 110, genre: 'Pop', song_name: 'Chandelier', artist_id: 10 }
];

const albums: Album[] = [
  { 
    album_id: 207, 
    album_name: 'DAMN.', 
    release_date: '2017-04-14', 
    artist_id: 7,
    cover_url: 'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?auto=format&fit=crop&q=80&w=800'
  },
  { 
    album_id: 208, 
    album_name: 'Sweetener', 
    release_date: '2018-08-17', 
    artist_id: 8,
    cover_url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800'
  },
  { 
    album_id: 209, 
    album_name: 'Purpose', 
    release_date: '2015-11-13', 
    artist_id: 9,
    cover_url: 'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?auto=format&fit=crop&q=80&w=800'
  },
  { 
    album_id: 210, 
    album_name: 'This Is Acting', 
    release_date: '2016-01-29', 
    artist_id: 10,
    cover_url: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?auto=format&fit=crop&q=80&w=800'
  }
];

const tracks: Track[] = [
  { track_id: 307, track_name: 'HUMBLE. - Track 1', track_duration: '00:02:57', album_id: 207 },
  { track_id: 308, track_name: 'No Tears Left to Cry - Track 1', track_duration: '00:03:40', album_id: 208 },
  { track_id: 309, track_name: 'Peaches - Track 2', track_duration: '00:03:18', album_id: 209 },
  { track_id: 310, track_name: 'Chandelier - Track 1', track_duration: '00:04:13', album_id: 210 }
];

function ArtistDiscography({ artist, onBack }: { artist: Artist; onBack: () => void }) {
  const artistAlbums = albums.filter(album => album.artist_id === artist.artist_id);
  const artistSongs = songs.filter(song => song.artist_id === artist.artist_id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={artist.image_url} 
            alt={artist.artist_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={24} />
            Back to Home
          </button>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-4">{artist.artist_name}</h1>
            <p className="text-xl text-gray-300">{artist.artist_contact}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Albums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistAlbums.map(album => (
              <div key={album.album_id} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden">
                <img 
                  src={album.cover_url} 
                  alt={album.album_name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{album.album_name}</h3>
                  <p className="text-gray-400">
                    Released: {new Date(album.release_date).toLocaleDateString()}
                  </p>
                  <div className="mt-4 space-y-2">
                    {tracks
                      .filter(track => track.album_id === album.album_id)
                      .map(track => (
                        <div key={track.track_id} className="flex items-center justify-between py-2 border-t border-gray-700">
                          <span>{track.track_name}</span>
                          <span className="text-gray-400">{track.track_duration}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistSongs.map(song => (
              <div key={song.song_id} className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl">
                <h3 className="text-2xl font-bold mb-2">{song.song_name}</h3>
                <p className="text-gray-400">Genre: {song.genre}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const filteredArtists = artists.filter(artist => 
    artist.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredData = {
    artists: artists.filter(artist => 
      artist.artist_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.artist_contact.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    albums: albums.filter(album => 
      album.album_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  if (selectedArtist) {
    return <ArtistDiscography artist={selectedArtist} onBack={() => setSelectedArtist(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80"
            alt="Hero"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <h1 className="text-6xl font-bold tracking-tight">Music Management System</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover and manage your favorite artists, songs, albums, and concerts
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sticky top-0 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search artists or albums..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full bg-gray-800/50 text-white px-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
                <div className="p-2">
                  {filteredArtists.map(artist => (
                    <button
                      key={artist.artist_id}
                      onClick={() => {
                        setSelectedArtist(artist);
                        setShowSearchResults(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-4 w-full p-3 hover:bg-gray-800/50 rounded-xl transition-colors"
                    >
                      <img 
                        src={artist.image_url} 
                        alt={artist.artist_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <h3 className="font-semibold">{artist.artist_name}</h3>
                        <p className="text-sm text-gray-400">Artist</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Artists Section */}
        <section className="mb-24">
          <div className="flex items-center gap-2 mb-12">
            <Mic size={32} />
            <h2 className="text-4xl font-bold">Featured Artists</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredData.artists.map(artist => (
              <button
                key={artist.artist_id}
                onClick={() => setSelectedArtist(artist)}
                className="group relative overflow-hidden rounded-2xl text-left"
              >
                <img 
                  src={artist.image_url} 
                  alt={artist.artist_name}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{artist.artist_name}</h3>
                    <p className="text-gray-300">{artist.artist_contact}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Albums Section */}
        <section className="mb-24">
          <div className="flex items-center gap-2 mb-12">
            <Disc size={32} />
            <h2 className="text-4xl font-bold">Latest Albums</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.albums.map(album => (
              <div key={album.album_id} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden">
                <img 
                  src={album.cover_url} 
                  alt={album.album_name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{album.album_name}</h3>
                  <p className="text-gray-300 mb-4">
                    {artists.find(a => a.artist_id === album.artist_id)?.artist_name}
                  </p>
                  <p className="text-gray-400 mb-4">
                    Released: {new Date(album.release_date).toLocaleDateString()}
                  </p>
                  <div className="space-y-2">
                    {tracks
                      .filter(track => track.album_id === album.album_id)
                      .map(track => (
                        <div key={track.track_id} className="flex items-center justify-between py-2 border-t border-gray-700">
                          <span>{track.track_name}</span>
                          <span className="text-gray-400">{track.track_duration}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">&copy; 2024 Music Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;