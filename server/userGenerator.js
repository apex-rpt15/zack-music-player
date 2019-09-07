var loremIpsum = require('lorem-ipsum').loremIpsum;
var Users = require('../db.js');
var request = require('request');

module.exports = (recordNum) => {
  // var usernameStarter = loremIpsum({
  //   count: 1 + Math.ceil(Math.random() * 2), // Number of "words" will be between 2-3
  //   units: "words",
  //   words: [                                 // repo of words to draw from
  //     'cats', 'Joey', 'hoola', 'God', 'dude', 'joke', 'green', 'blueEyez', 'does', 'giant',
  //     'puppy', 'Zebra', 'star', 'sweet', 'Katie', 'tonsOf', 'funny', 'happy', 'classy', 'creative',
  //     'Fred', 'Jefferson', 'Maybe', 'Lover', 'killer', 'juicy', 'jams', '1111', '88', 'number1',
  //     'Love', 'Jessica', 'Jones', 'Smith', 'banana', 'peach', 'Unicorn', 'Grrrl', 'BigBoi', 'Lex',
  //     'winner', 'Honda', 'clever', '777', 'lion', 'always', 'forest', 'savvy', 'tricky', 'hamburger',
  //     'flex', 'bounce', 'Cali', 'Apex', '404', 'lizard', 'lips', 'cool', 'Ferrari', 'King', 'Queen',
  //     '1', '22', '333', '5', '666', '99', '0', 'rider', 'Lexus', 'JavaScripter', 'Hacker', 'plum',
  //     'Jester', 'red', 'boom', 'singer', 'lazy', '123', '1000', 'Giant', 'yellow', 'CPU', 'the', 'gets',
  //     'eats', 'mosDef', 'Geek', 'slippery', 'Pete', 'Zoe', 'jade', 'seeMe', 'iAm', 'homie', 'Amigo',
  //     'Bella', 'taco', 'sleepy', 'Fella', 'freaky', 'Texas', 'goodness', 'likeIt', 'future', 'otherWords'
  //   ]
  // });
  var usernameArr = [ 'slipperybounce', 'dudeJones', 'GrrrlApex', 'lizardGodgreen', 'tonsOfslipperyTexas',
  '404Lex', 'starHonda', 'Lovergiantclassy', 'AmigoKing', '1killer', 'riderlionred', 'getsTexas',
  'cleverlazy', 'FredGiant', 'doeslizard', 'savvyBella', 'catsJonesgoodness', 'likeItbananaZoe',
  'lizardflex0', 'getsbanana', 'futurelazycreative', '1Jones', 'lizardLex', 'plumTexasgiant', '333881000',
  'BigBoijamsotherWords', 'Lovesweet', '1000seeMe', 'jokeTexas', 'getshoola', 'flexSmithhappy',
  'singerLove', 'starGodJefferson', 'cooljoke', 'Jonesclever', 'greenZebra', 'goodnessKing',
  'ZebraLexLover', 'LexuslikeItjoke', 'HackerLexus99', 'Ferrariplum', 'joketheUnicorn', 'winnerhoolared',
  'redtacoboom', 'FerrariGrrrlPete', 'KatieHondabanana', 'flexLex', 'peachsweet', 'juicyyellowgets',
  '123lazy', 'giantJefferson', 'jamsLexustricky', 'tonsOfAmigo', 'creativeGiantalways', 'puppytonsOflazy',
  'singerFerrariJoey', 'boom0', 'CPUCali', 'juicytheJones', 'cleverjams', '99FellaTexas', 'catsrider',
  'Lex777happy', 'happygets', 'Grrrlplum', 'jokefunny', 'bouncealways', 'slippery333', 'number1SmithGeek',
  '777333green', '99Pete', 'Katie88Cali', 'doeslikeIt', 'Bellasleepy', 'jadeotherWordsFred', 'cleveralways',
  'bounceLover', 'savvyJessicaSmith', '1tonsOfalways', 'Hacker1000', 'hoola333Bella', 'Katiesinger',
  '5rider', 'singer404', 'forestsleepyJoey', 'redcoolGrrrl', 'FellaiAm', 'iAmApextricky', 'the22',
  'always0JavaScripter', 'BigBoi99dude', 'lipskiller', 'QueenGrrrlCali', 'Queenhomiejade', 'Zebra777Hacker',
  'Fredfunny', 'plumCPUJones', 'Lex1000', 'Maybered', 'BigBoiAmigo' ];

  var city = loremIpsum({
    count: 1,
    units: "words",
    words: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio',
      'San Diego', 'Dallas', 'San Jose', 'Detroit', 'Jacksonville', 'Indianapolis', 'San Francisco', 'Columbus',
      'Austin', 'Memphis', 'Fort Worth', 'Baltimore', 'Charlotte', 'El Paso', 'Boston', 'Seattle', 'Washington',
      'Milwaukee', 'Denver', 'Louisville', 'Las Vegas', 'Nashville', 'Oklahoma City',
      'Portland', 'Tucson', 'Albuquerque', 'Atlanta', 'Long Beach', 'Fresno', 'Sacramento', 'Mesa', 'Kansas City',
      'Cleveland', 'Virginia Beach', 'Omaha', 'Miami', 'Oakland', 'Tulsa', 'Honolulu', 'Minneapolis', 'Colorado Springs',
      'Arlington', 'Wichita', 'Raleigh', 'St. Louis', 'Santa Ana', 'Anaheim', 'Tampa', 'Cincinnati', 'Pittsburgh',
      'Bakersfield', 'Aurora', 'Toledo', 'Riverside', 'Stockton', 'Corpus Christi', 'Newark', 'Anchorage', 'Buffalo',
      'St. Paul', 'Lexington', 'Plano', 'Fort Wayne', 'St. Petersburg', 'Glendale', 'Jersey City', 'Lincoln',
      'Henderson', 'Chandler', 'Greensboro', 'Scottsdale', 'Baton Rouge', 'Birmingham', 'Norfolk', 'Madison', 'New Orleans',
      'Chesapeake', 'Orlando', 'Garland', 'Hialeah', 'Laredo', 'Chula Vista', 'Lubbock', 'Reno', 'Akron', 'Durham',
      'Rochester', 'Modesto', 'Montgomery', 'Fremont', 'Shreveport', 'Arlington', 'Glendale'
    ]
  });

  var state = loremIpsum({
    count: 1,
    units: "words",
    words: [
      'AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS',
      'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
      'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'
    ]
  });

  // var username = usernameStarter.replace(/ /g, '');
  var username = usernameArr[recordNum];
  var followers = Math.round(Math.random() * 100000); // 0-100,000 followers
  var tracks = Math.floor(Math.random() * 51); // 0-50 tracks
  var location = city + ', ' + state;
  var description = loremIpsum({sentenceLowerBound: 1,   // one sentence from 1-5 words.
                                sentenceUpperBound: 5
                              });

  // this request generates the user picture from unsplash API
  request('https://source.unsplash.com/collection/895539/240x240', (err, result) => { // collection of faces
    if (err) {
      console.log(err)
    } else {
      var photo = result.request.uri.href;
      new Users({ username, photo, followers, tracks, description, location }).save().then(() => {
        return;
    });
  }
});
};