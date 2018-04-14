const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');
var request = require('request');

//mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pass', //your pass
  database : 'digger'
});
connection.connect();

var power = 0.1;
var price = 1;
function tool(name) {
    this.name = name;
    this.power = Math.round(power * 100)/100;
	this.price = Math.round(this.power * (10 + price));
	power = power*2;
	price += 1;
	//this.picture = "./tools/" + name + ".png";
	tools.push(this);
}


//promenljive
var diameter = 0;
let planet = {name: "", radius:"", players:0};

var driveurl = "https://drive.google.com/uc?export=view&id=";
var picid = ['0B2ob3T_dKGCqdzhFUi1udjRwUUE','0B2ob3T_dKGCqR19IVXg2a2t1eVE','0B2ob3T_dKGCqbkhuSTFlZFpITkE','0B2ob3T_dKGCqN1NRbmlYTTRyd28','0B2ob3T_dKGCqaDlEeUtrMXItQjA','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg','0B_vRfbkXRe5TZFhKTmV2NFlBajg'];

var idleshop = ['hamster','mole','novice worker','experienced worker','professional worker','expert','demolisher','crew','demolishing crew','small company','medium company','large company','small mining company', 'medium mining company','mining holding',];
let lostthings = ['cellphone','helmet','flashlight','watch','shoe'];

let toolsmaker = ['hands','spoon','gloves','trowel','pickaxe','shovel','demolition hammer','excavator','light drill','medium drill','heavy drill','oil drill','tunnel boring machine','silver drill','golden drill','platinum drill','light laser','medium laser','heavy laser',
'supersonic laser','ground burner prototype','ground burner v100','ground burner v500','ground burner v1000','solar ground burner','tesla ground burner','nuclear ground burner'];
let tools = [];
for(i=0;i<toolsmaker.length;i++){ //tools maker
	new tool(toolsmaker[i]);
}
var cooldown = [];
var idle = [];

var anticheatarray = [];
var cheaters = [];
//kod

client.on('ready', () => {
	pokupi();
});
client.on('message', message => {
if(cheaters.indexOf(message.author.id) == -1 && message.channel.type == "text"){
		if(message.content.toUpperCase().startsWith(".D")){
			var contentsplit = message.content.split(" ");
			var preindex = cooldown.map(function(e) { return e.id; }).indexOf(message.author.id);
			if(contentsplit.length == 1 && preindex != -1){
				const embed = new Discord.RichEmbed()
				.setAuthor("Use .d [answer]")
				.setColor(10892771)
				.setImage(cooldown[preindex].url)	
				message.channel.send({embed});
			}else if(contentsplit.length == 1 && preindex == -1){
				const embed = new Discord.RichEmbed()
				.setAuthor("Type .d start to start digging!")
				.setColor(10892771)
				message.channel.send({embed});				
			}else{
				var answerstring = contentsplit[1]
					if(message.author.id !== client.user.id && !message.author.bot){ //cooldown
								var getuserinfo = connection.query("select * from users order by digged DESC", function(err, rows){
									
									let userurows = -1;
									let playerssadigged = [];
									for(i=0;i<rows.length;i++){
										if(rows[i].id == message.author.id){
											userurows = i;
										}
										if(rows[i] != 0){
											playerssadigged.push(rows[i]);
										}
									}
									if(playerssadigged.length == 0){
										planet.players = 1;
									}else{
										planet.players = playerssadigged.length;
									}

									if(err){
									}else{
										 ///index tool-a
										if(userurows == -1){ //ako ga nema u bazi4
											var iskopano = digg("hands");
											var reqstring = "http://api.img4me.com/?text=" + new cdplayer(message, 0.1).question + "&font=verdana&fcolor=FFFFFF&size=10&bcolor=&type=png";
											var index = cooldown.map(function(e) { return e.id; }).indexOf(message.author.id);
											request(reqstring, function response(err,res,body){
												cooldown[index].url = body;
												var addplayer = connection.query("INSERT INTO users (id, username, avatar, tool, digged, coins, digged_all_time) VALUES ('" + message.author.id + "','" + encodeURI(message.author.username) + "','" + message.author.avatarURL + "', 'hands', " + iskopano + ", " + iskopano + ", " + iskopano + ")");
												const embed = new Discord.RichEmbed()
												.setAuthor("You dug: " + formatirajbr((iskopano)))
												.setColor(10892771)
												.setImage(body)
												message.channel.send({embed});
											});
										}else{ // ako ga ima
											var toolindex = tools.map(function(e) { return e.name; }).indexOf(rows[userurows].tool);
											var index = cooldown.map(function(e) { return e.id; }).indexOf(message.author.id);
											if(index != -1){ //ako ga ima u cooldown
												if(answerstring == cooldown[index].answer){
													var iskopano = cooldown[index].boost * digg(rows[userurows].tool);
													var reqstring = "http://api.img4me.com/?text=" + new cdplayer(message, tools[toolindex].power).question + "&font=verdana&fcolor=FFFFFF&size=10&bcolor=&type=png";
													request(reqstring, function response(err,res,body){
														cooldown[index].url = body;
														var update = connection.query("UPDATE users SET digged = digged + " + iskopano + ", digged_all_time = digged_all_time + " + iskopano + ", coins = coins + " + iskopano + " WHERE id = " + rows[userurows].id);
														const embed = new Discord.RichEmbed()
														.setAuthor("You dug: " + formatirajbr((iskopano)))
														.setColor(10892771)
														.setImage(body)
														message.channel.send({embed});
													});
												}else{
													const embed = new Discord.RichEmbed()
													.setAuthor("Wrong answer, try again!")
													.setColor(10892771)
													.setImage(cooldown[index].url)	
													message.channel.send({embed});
												}
											}else{ // ako ga nema u cooldown
												var iskopano = digg(rows[userurows].tool);
												var reqstring = "http://api.img4me.com/?text=" + new cdplayer(message, tools[toolindex].power).question + "&font=verdana&fcolor=FFFFFF&size=10&bcolor=&type=png";
												var indexpropali = cooldown.map(function(e) { return e.id; }).indexOf(message.author.id);
												request(reqstring, function response(err,res,body){
													cooldown[indexpropali].url = body;
													var update = connection.query("UPDATE users SET digged = digged + " + iskopano + ", digged_all_time = digged_all_time + " + iskopano + ", coins = coins + " + iskopano + " WHERE id = " + rows[userurows].id);
													const embed = new Discord.RichEmbed()
													.setAuthor("You dug: " + formatirajbr((iskopano)))
													.setColor(10892771)
													.setImage(body)	
													message.channel.send({embed});
												});
											}
										}
									}
							    });	
					}
				}
		}
		if(message.content.toUpperCase().startsWith(".PROFILE")){
			var queryTP = connection.query('select * from users WHERE id = ' + message.author.id, function(err, rows){
				if(rows.length == 0){
					message.channel.send("```css\nYou are not active player!```");
				}else{
					var indexigraca = tools.map(function(e) { return e.name; }).indexOf(rows[0].tool);
					//za footer
					var cdindex = cooldown.map(function(e) { return e.id; }).indexOf(rows[0].id);
					let footerstring = ""
					if(cdindex != -1){
						footerstring = "Your " + cooldown[cdindex].lost.toUpperCase() + " is missing!";
					}
					var toolcaring = ""
					if(rows[0].idle == null){
						toolcaring = "None";
					}else{
						toolcaring = String(rows[0].idle);
					}
					message.channel.send({embed: {
			            color: 3447003,
			            author: {
			            name: message.author.username,
			            icon_url: message.author.avatarURL
			            },
			            fields: [
			            {
			                name: "Coins:",
			                value: String(rows[0].coins)
			            },
			            {
			                name: "Tool:",
			                value: rows[0].tool
			            },
			            {
			                name: "Idle:",
			                value: toolcaring

			            },
			            {
			                name: "Idle power:",
			                value: String(formatirajbr(rows[0].idle_power)) + "/5min"

			            },
			            {
			                name: "Shards:",
			                value: "**Mercury**: " + String(rows[0].Mercury) + "\n**Venus**: " + String(rows[0].Venus) + "\n**Earth**: " + String(rows[0].Earth) + "\n**Mars**: " + String(rows[0].Mars) + "\n**Jupiter**: " + String(rows[0].Jupiter) + 
			                "\n**Saturn**: " + String(rows[0].Saturn) + "\n**Uranus**: " + String(rows[0].Uranus) + "\n**Neptune**: " + String(rows[0].Neptune) + "\n**Pluto**: " + String(rows[0].Pluto)

			            }],
			            thumbnail: {
			            "url": driveurl + picid[indexigraca - 1]
			                        },
			            footer: { text: footerstring

			            }
			            }
		        	});
				}	          
	      });
		}
		if(message.content.toUpperCase().startsWith(".SHOP")){
			let ssplit = message.content.split(" ");
			if(ssplit.length == 1){
				message.channel.send("```css\nPlease use [.shop tools] or [.shop idle]!```");
			}else{
				var itemstring = ssplit[1];
				if(itemstring.toUpperCase().startsWith("TOOLS")){
					var toollist = "";
					var getuserinfo = connection.query('select * from users WHERE id = ' + message.author.id, function(err, rows){
						if(rows.length == 0){
							message.channel.send("```css\nYou are not active player!```");
						}else{
							var youritemvalue = tools.map(function(e) { return e.name; }).indexOf(rows[0].tool);
							for(i=youritemvalue + 1;i<=(youritemvalue+4);i++){
								if(tools[i] == undefined){
									break;
								}
								toollist += "[" + tools[i].name + "]" + "[Price: " + tools[i].price + "]\n";
							}
							message.channel.send("```md\n#________SHOP________#\n" + toollist + "(...and more)```");
						}
					});
				}else if(itemstring.toUpperCase().startsWith("IDLE")){
					var getuserinfo = connection.query('select * from users WHERE id = ' + message.author.id, function(err, rows){
						if(rows.length == 0){
							message.channel.send("```css\nYou are not active player!```");
						}else{
							var idlelist = "";
							var itemobj = idleshop.indexOf(rows[0].idle);
							for(i=itemobj + 1;i<=(itemobj+4);i++){
								if(idleshop[i] == undefined){
									break;
								}
								idlelist += "[" + idleshop[i] + "]" + "[Price: " + tools[i + 4].price * 10 + "](" + tools[i + 4].power + "m/5min)\n";
							}
							message.channel.send("```md\n#________SHOP________#\n" + idlelist + "(...and more)```");
						}
					});
				}
			}
		}
		if(message.content.toUpperCase().startsWith(".BUY ")){
			var itemstring = message.content.slice(5);
			if(idleshop.indexOf(itemstring) != -1){
				var getuserinfo = connection.query('select * from users WHERE id = ' + message.author.id, function(err, rows){
					if(rows.length == 0){
						message.channel.send("```css\nYou are not active player!```");
					}else{
						if(idleshop.indexOf(itemstring) <= idleshop.indexOf(rows[0].idle)){
							message.channel.send("```css\nYou already have same or better item.```");
						}else{
							var itemobj = tools[idleshop.indexOf(itemstring) + 4]; //worker je za 4 levela veći od tool-a
							if(rows[0].coins >= itemobj.price * 10){ //cena workera je * 5 od cene toola-a tog levela
								var updatemysql = connection.query("update users set idle = '" + itemstring + "' , idle_power = '" + itemobj.power + "' , coins = coins - " + itemobj.price * 10 + " where id = " + message.author.id);
								message.channel.send("```css\nYou have successfully bought: " + itemstring + "\n" + itemstring + " will digg " + itemobj.power + "m every 5min for you! ```");						
							}else{
								message.channel.send("```css\nNot enough coins!```");
							}	
						}					
					}
				});
			}else{
				for(i=0;i<tools.length;i++){
					if(tools[i]['name'].toUpperCase() == itemstring.toUpperCase()){
						var getuserinfo = connection.query('select * from users WHERE id = ' + message.author.id, function(err, rows){
							if(rows.length == 0){
								message.channel.send("```css\nYou are not active player!```");
							}else{
								var youritemvalue = tools.map(function(e) { return e.name; }).indexOf(rows[0].tool);
								if(youritemvalue >= i){
									message.channel.send("```css\nYou already have same or better item!```");
								}else{
									if(rows.length == 0){ //ako ga nema u bazi
										message.channel.send("```css\nYou are not active player!```");
									}else if(rows[0].coins >= tools[i].price){ //ako ga ima i ima dovoljno para
										var update = connection.query("UPDATE users SET coins = coins - " + tools[i].price + ", tool = '" + tools[i].name + "' WHERE id = " + message.author.id);
										const embed = new Discord.RichEmbed()
										.setTitle("You have successfully bought: " + tools[i].name)
										.setColor(10892771)
										.setImage(driveurl + picid[i - 1])
										message.channel.send({embed});
									}else{
										message.channel.send("```css\nNot enough coins!```");
									}								
								}								
							}
						});
						break;
					}
				}
			}
		}
		if(message.content.toUpperCase().startsWith(".TOP10")){
			let splitstr = message.content.split(" ");
			var mysqlstring = "";
			if(splitstr.length == 1){
				mysqlstring = "digged";
			}else if(splitstr.length == 3 && splitstr[1].toUpperCase() == "ALL" && splitstr[2].toUpperCase() == "TIME"){
				mysqlstring = "digged_all_time";
			}else if(splitstr.length == 2 && splitstr[1].toUpperCase() == "COINS"){
				mysqlstring = "coins";
			}
			if(mysqlstring != ""){
				var getuserinfo = connection.query('select * from users where ' + mysqlstring + ' != 0 order by ' + mysqlstring + ' DESC', function(err, rows){
				var mojrank = rows.map(function(e) { return e.id; }).indexOf(message.author.id) + 1;
				var sendstring = "";
				for(i=0;i<rows.length;i++){
					if(i <= 10){
						if(mysqlstring == "coins"){
							sendstring += i+1 + ". [" + rows[i].username + "]" + "[" + rows[i][mysqlstring] + "]\n";
						}else{
							sendstring += i+1 + ". [" + rows[i].username + "]" + "[" + formatirajbr(rows[i][mysqlstring]) + "]\n";
						}
					}
				}
				message.channel.send("```md\n#______TOP10______#\n" + sendstring + "Your rank: #" + mojrank + " (top " + Math.round((((mojrank + 1)*100)/planet.players)) + "%)```");
			});
			}else{
				message.channel.send("```css\nPlease use [.top10], [.top10 all time] or [.top10 coins]!```");
			}
		}
		if(message.content.toUpperCase().startsWith(".INFO")){
			let aktivniigraci = [];
			for(i = 0; i < cooldown.length;i++){
				if(cooldown[i].lost != ""){
					aktivniigraci.push(cooldown[i].id);
				}
			}
			message.channel.send("```css\nActive players: " + aktivniigraci.length + "\nNumber of servers: " + client.guilds.size + "```");
		}
		if(message.content.toUpperCase().startsWith(".HELP")){
			message.channel.send("```css\nGoal: Players have to reach center of the planet by digging.\n"+
				".d start - start digging\n"+
				".d [answer] - to continue digging you have to answer on question.\n" +
				".profile - view your profile.\n" + 
				".shop  ['tools', 'idle'] - view specific shop.\n" + 
				".buy [item] - buy item.\n" + 
				".top10 -  show leaderboards for this planet.\n" + 
				".top10 [all time, coins] -  show specific leaderboard.\n" + 
				".lostitem - show info about item found.\n" +
				".lostitem return [@user] - return the player his item.\n" +
				".lostitem drop - drop the item (useful if you cannot find player)\n" + 
				".info - shows the info about bot.\n" + 
				".help - shows this help.\n" + 
				".invite - bot will send invite link.\n" + 
				".patron - become a patron```");
		}
		if(message.content.toUpperCase().startsWith(".BANLIST")){
			if(cheaters.length != 0){
				var cheaterslist = "";
				for(i=0;i<cheaters.length;i++){
					cheaterslist += cheaters[i].id + "\n";
				}
				message.channel.send(cheaterslist);
			}else{
				message.channel.send("no1 is banned yet :P");
			}	
		}
		if(message.content.toUpperCase().startsWith(".SERVERS")){
			let servers = client.guilds.sort(function (a, b) {
			  return b.memberCount - a.memberCount;
			}).first(10);
			let sstring = "";
			for(let i = 0;i<10;i++){
					sstring += servers[i].name + "\n";
			}
			message.channel.send("```css\n" + sstring + "```");
		}
		if(message.content.toUpperCase().startsWith(".LOSTITEM")){
			let split = message.content.split(" ");
			if(split.length == 1){
				let myindex = cooldown.map(function(e) { return e.id; }).indexOf(message.author.id);
				if(myindex != -1 && cooldown[myindex].found.id != ""){
					message.channel.send("```md\n[Username:][" + cooldown[myindex].found.username + "]\n[Item:][" + cooldown[myindex].found.lost + "]\n[Server:][" + cooldown[myindex].found.guild + "]```");
				}else{
					message.channel.send("```css\nYou didn't find any item```")
				}
				
			}else{
				if(split[1].toUpperCase() == "RETURN"){
					if(message.mentions.users.size != 0){ // 
						let foundindex = cooldown.map(function(e) { return e.id; }).indexOf(message.author.id); //nadji index sendera
						let lostindex = cooldown.map(function(e) { return e.id; }).indexOf(cooldown[foundindex].found.id); //index onog što je izgubio
						if(cooldown[foundindex].found.id == message.mentions.users.first().id){
							message.channel.send("```css\nWoah, " + cooldown[foundindex].found.username + " is very grateful! You recieved boost 200% next 10min!```");
							cooldown[lostindex].lost = "";
							cooldown[lostindex].lostfound = false;
							cooldown[foundindex].found.id = "";
							cooldown[foundindex].found.username = "";
							cooldown[foundindex].found.lost = "";
							cooldown[foundindex].found.guild = "";

							cooldown[foundindex].boost *= 2;
							setTimeout(function lale(){
								cooldown[foundindex].boost /= 2;
							}, 600000)
							console.log("boost: " + cooldown[foundindex].boost);
						}else if(cooldown[foundindex].found.id == ""){
							message.channel.send("```css\nYou didn't find any item! ```");
						}else{
							message.channel.send("```css\nWrong player! ```");
						}
						
					}else{
						message.channel.send("```css\nYou have to mention reciever like this: [.lostitem return @user] ```");
					}				
				}else if(split[1].toUpperCase() == "DROP"){
					let foundindex = cooldown.map(function(e) { return e.id; }).indexOf(message.author.id); //nadji index sendera
					let lostindex = cooldown.map(function(e) { return e.id; }).indexOf(cooldown[foundindex].found.id); //index onog što je izgubio
					if(cooldown[foundindex].found.id != ""){
						message.channel.send("```css\nItem " + cooldown[foundindex].found.lost + " dropped!```");
						cooldown[lostindex].lostfound = false;
						cooldown[foundindex].found.id = "";
						cooldown[foundindex].found.username = "";
						cooldown[foundindex].found.lost = "";
						cooldown[foundindex].found.guild = "";
					}else{
						message.channel.send("```css\nNothing to drop!```");
					}
				}

			}
		}
		if(message.content.toUpperCase().startsWith(".INVITE")){
			message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=342562300676407297&scope=bot&permissions=3072");
		}
		if(message.content.toUpperCase().startsWith(".PATRON")){
			message.channel.send("To become a patron visit: https://www.patreon.com/PlanetDigger");
		}
}else if(message.channel.type != "text"){
	//something
}else{
	message.channel.send("```css\n You are banned ```");
}
});
setInterval(function idemo(){
	//updatuj ikonicu, ime ubaci novu planetu
	if(diameter <= 0){
		let calcpercent = Math.round((10*(planet.players))/100) + 1; //ovo + 1 da ne bi bilo 0 nikad
		let dajsardove = connection.query("update users set " + planet.name + " = " + planet.name + " + 1 where digged != 0 order by digged DESC limit " + calcpercent);
		var update = connection.query('UPDATE planet SET active = 0, radius_left = radius WHERE active = 1');
		var queryTP = connection.query('select * from planet', function(err, rows){
			var randomplaneta = rows[Math.floor(Math.random()*rows.length)];
			diameter = randomplaneta.radius;
			var update = connection.query("UPDATE users SET digged = 0");
			var update = connection.query("UPDATE planet SET active = 1 WHERE name = '" + randomplaneta.name + "'");
				client.user.setAvatar("./avatars/" + randomplaneta.name + ".png");
				client.guilds.get('251841380110827521').me.setNickname(randomplaneta.name); //nja

		});

	}else{
		var update = connection.query('UPDATE `planet` SET radius_left = ' + diameter + ' WHERE active = 1');
		client.user.setPresence({ game: { name: Math.round(diameter) + "m Left!", type: 0 } });	
	}
}, 10000);
function digg(tool){
	for(i=0;i<tools.length;i++){
		if(tools[i].name == tool){
			var iskopano = iskopaj(tools[i].power*50,tools[i].power*150)/100;
			diameter -= iskopano;
			return iskopano;
		}
		function iskopaj(min,max)
		{
		    return Math.floor(Math.random()*(max-min+1)+min);
		}
	}
}
setInterval(function idle(){
			var update = connection.query("UPDATE users SET digged = digged + idle_power, digged_all_time = digged_all_time + idle_power, coins = coins + idle_power WHERE idle_power <> 0");
	}, 300000);

function cdplayer(message, power) {
	if(power > 20000){
		power = 20000;
	}
	var lvl = Math.round(Math.pow(Math.round(power+1), 1/6));
    let question = "";
    var answer = ""; //answer
    var rng = Math.floor(Math.random() * 2);
    if(rng == 0){
    	var holdnumb = 0;
    	for(i=0;i<=lvl;i++){
    		var rnd = Math.floor(Math.random() * lvl*10);
    		question += rnd + " %2B ";
    		holdnumb += rnd;
    		answer = holdnumb;
    	}
    	question = "Question: " + question.slice(0, question.length-5) + " = ?";
    }else if(rng ==1){
    	  var text = "";
		  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		  for (var i = 0; i < lvl*5; i++)
		  text += possible.charAt(Math.floor(Math.random() * possible.length));
		  question = "Question: " + text.toLowerCase() + " in reverse ?";
		  answer = text.toLowerCase().split("").reverse().join("");
    }

	    //PUSH
	    let cdindex = cooldown.map(function(e) { return e.id; }).indexOf(message.author.id); //index igraca u cooldown
	    if(cdindex == -1){ //ako ga nema u cooldown
	    	this.id = message.author.id;
	    	this.username = message.author.username;
	    	this.guild = message.guild.name;

	    	this.question = question;
	    	this.answer = answer;
	    	
	    	this.lost = lostthings[Math.floor(Math.random() * lostthings.length)];
	    	this.lostfound = false;

	    	this.found = {id:"",username:"",lost:"",guild:""};
		    this.boost = 1;

		    this.url = "";
	    	cooldown.push(this);	
		}else{
			if(cooldown[cdindex].lost == ""){
				cooldown[cdindex].lost = lostthings[Math.floor(Math.random() * lostthings.length)];
			}
			this.question = question;
	    	this.answer = answer;
			cooldown[cdindex].question = question;
			cooldown[cdindex].answer = answer;
			if(message.guild.name == null){
				cooldown[cdindex].guild = "Private Message";
			}else{
				cooldown[cdindex].guild = message.guild.name;				
			}
			
			let nadjenitem = nadji(message.author.id) // "" - neuspesno, [objekad] - uspesno
			if(nadjenitem != "" && cooldown[cdindex].found.id == ""){
				let nadjenuser = cooldown.map(function(e) { return e.id; }).indexOf(nadjenitem.id); //index u cooldown
				cooldown[nadjenuser].lostfound = true;

				cooldown[cdindex].found.id = nadjenitem.id;
				cooldown[cdindex].found.username = nadjenitem.username;
				cooldown[cdindex].found.lost = nadjenitem.lost;
				cooldown[cdindex].found.guild = nadjenitem.guild;

				message.channel.send("```css\n" + nadjenitem.username + " lost his " + nadjenitem.lost + ". Try to find him and give him back his " + nadjenitem.lost + " with [.lostitem return @user] and you will be rewarded! ```");
			}
		}


    //za anticheat
    var acindex = anticheatarray.map(function(e) { return e.id; }).indexOf(message.author.id);
    if(acindex != -1){
    	anticheatarray[acindex].time += 1.5 * lvl;
    }else{
    	anticheat(message.author.id, lvl);
    }
}

function nadji(id){
	if(Math.round(Math.random() * 100) < 5){
		let returnobj = {};
		let notfound = []; //igraci kojima niko nije pronasao item
		for(let i = 0;i<cooldown.length;i++){//ubaci sve kojima nije pronađen item u array
			if(cooldown[i].lostfound == false && cooldown[i].lost != "" && cooldown[i].id != id){ //  && cooldown[i].guild != null razmisljam se
				notfound.push(cooldown[i]);
			}
		}
		if(notfound.length != 0){ //izaberi random čoveka iz array-a
			let randomcovek = Math.floor(Math.random() * notfound.length);
			let indexrc = cooldown.map(function(e) { return e.id; }).indexOf(notfound[randomcovek].id);
			return cooldown[indexrc];
		}else{
			return ""
		}
	}else{
		return ""
	}
}

function anticheat(id, time){
	this.id = id;
	this.time = time;
	anticheatarray.push(this);
}
setInterval(function acdecreser(){
	for(i=0;i<anticheatarray.length;i++){
		if(anticheatarray[i].time >= 40){
			if(cheaters.indexOf(anticheatarray[i].id) == -1){
				cheaters.push(anticheatarray[i].id);
				console.log("cheater: " + anticheatarray[i].id);	
			}
		}else if(anticheatarray[i].time >= 2){
			anticheatarray[i].time -= 2;	
		}
		
	}

}, 2000);

function formatirajbr(broj){
	if(broj >= 1000000000){
		return Math.round(broj / 100000000)/10 + "Gm"
	}else if(broj >= 1000000){
		return Math.round(broj / 100000)/10 + "Mm"
	}else if(broj >= 1000){
		return Math.round(broj / 100)/10 + "Km"
	}else{
		return broj + "m"
	}
}

function pokupi(){
	var queryTP = connection.query('select * from `planet` WHERE active = 1', function(err, rows){
		if(rows.length == 0){
			var queryTP = connection.query("update planet set active = 1 where name = 'Earth'");
			pokupi();
		}else{
			planet.name = rows[0].name;
			planet.radius = rows[0].radius;
			diameter = rows[0].radius_left;// 500 sigurnost da ode ispod nule
		}
			
	});
}
 client.login('TOKEN');