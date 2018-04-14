# PlanetDigger
This is my 1st game on discord, its soo bad coded, sorry :(
It uses mysql for database, so mysql server is requied.
To install, you need NodeJS with dependecies: 'mysql','request','discord.js','fs'
1. Insert edit PlanetDigger.js, lines 9-12 with your mysql properties.
2. Insert your token at last line in PlanetDigger.js
3. Insert digger.sql in your database.
4. Run PlanetDigger.js with node.

# Goal: Players have to reach center of the planet by digging.
.d start - start digging
.d [answer] - to continue digging you have to answer on question.
.profile - view your profile. 
.shop  ['tools', 'idle'] - view specific shop.
.buy [item] - buy item.
.top10 -  show leaderboards for this planet.
.top10 [all time, coins] -  show specific leaderboard.
.lostitem - show info about item found.
.lostitem return [@user] - return the player his item.
.lostitem drop - drop the item (useful if you cannot find player) 
.info - shows the info about bot. 
.help - shows this help. 
.invite - bot will send invite link. 
.patron - become a patron
