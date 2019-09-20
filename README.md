# Project Name

bottom-music-player (zack-music-player)

> RPT15 Hack Reactor 2019 - Apex group's FEC project
This component is the mini-music player that occupies the bottom of the screen.

  - https://github.com/apex-rpt15/zack-music-player

## Related Projects

  - https://github.com/apex-rpt15/zack-proxy
  - https://github.com/apex-rpt15/alastair-track-player
  - https://github.com/apex-rpt15/ryan-comments

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Installation](#installation)

## Usage

> This component is currently set up to be run with the zack-proxy project through Amazon's EC2.

> To run independently on localhost:3004: 
	/public/dist/index.html --> uncomment line 8 containing the <audio> element
      Terminal: $ npm start
                $ npm run build

> To use the MongoDB setup:
      /db.js --> uncomment line 2, comment out line 3

> To generate 100 random users and save to MongoDB:
      Terminal: $ npm run seed

## Requirements

- Node v10.15.3

### Installing Dependencies

From within the root directory:

```
$ npm install -g webpack
$ npm install
```

